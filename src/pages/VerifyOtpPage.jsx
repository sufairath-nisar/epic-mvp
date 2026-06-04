import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import OverlayShell from "../components/layout/OverlayShell";
import { ASSET_PATH } from "../constants/assets";
import { Link, useRouter } from "../router/RouterProvider";

const OTP_LENGTH = 4;
const EXPIRY_SECONDS = 323; // 5:23

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const VerifyOtpPage = () => {
  const { navigate } = useRouter();
  const [otp, setOtp] = useState(() => Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [secondsLeft]);

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    setError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = (event) => {
    event.preventDefault();

    if (otp.some((digit) => digit === "")) {
      setError("Please enter the 4-digit code.");
      return;
    }

    setError("");
    navigate("/join-epic/membership");
  };

  return (
    <OverlayShell>
      <div className="relative flex min-h-[calc(100vh-71px)] w-full flex-col overflow-hidden rounded-t-[34px] bg-white shadow-none md:grid md:h-[563px] md:min-h-0 md:w-[886px] md:shrink-0 md:grid-cols-[410px_476px] md:rounded-[45px]">
        <Link to="/" aria-label="Close" className="absolute right-[24px] top-[24px] z-10 text-[#154527] transition hover:text-[#FAD7D3] md:right-[39px] md:top-[31px]">
          <X size={17} strokeWidth={2} />
        </Link>

        <section className="relative bg-white px-[40px] pb-[53px] pt-[40px] md:h-[563px] md:pb-[54px] md:pt-[60px]">
          <img src={`${ASSET_PATH}logo-mark-cream.svg`} alt="Epic" className="hidden h-[60px] w-[60px] md:block" />

          <div className="md:mt-[135px]">
            <h1 className="font-display text-[46px] font-bold lowercase leading-[0.98] tracking-[0] text-[#FAD7D3] md:text-[64px]">
              verify your
              <br />
              account
            </h1>
            <p className="mt-[11px] max-w-none text-[11px] font-light leading-[15px] tracking-[0] text-[#154527] md:mt-[20px] md:max-w-[315px] md:text-[12px]">
              We&apos;ve sent a verification code to your email{" "}
              <br className="hidden md:block" />
              and phone number.
              <br />
              Please enter it below.
            </p>
          </div>
        </section>

        <section className="relative flex flex-1 flex-col bg-[#f4f4f4] px-[40px] pb-[60px] pt-[40px] md:block md:h-[563px] md:px-[60px] md:pb-0 md:pt-0">
          <form onSubmit={handleVerify} noValidate className="mt-[25px] md:absolute md:inset-x-[60px] md:top-[266px] md:mt-0">
            <div className="flex justify-between gap-[12px] md:justify-center md:gap-[17px]">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputsRef.current[index] = element;
                  }}
                  value={digit}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Digit ${index + 1}`}
                  className="h-[96px] w-[62px] rounded-[10px] border border-transparent bg-white text-center text-[28px] font-light text-[#154527] outline-none focus:border-[#154527] md:h-[60px] md:w-[45px] md:rounded-[7px] md:text-[24px]"
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-[68px] h-[44px] w-full rounded-full bg-[#154527] text-[12px] font-light uppercase leading-none tracking-[0] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] md:mt-[40px] md:h-[37px]"
            >
              Verify OTP
            </button>

            {error ? <p className="mt-[12px] text-center text-[10px] font-light leading-none text-[#e43d2d]">{error}</p> : null}
          </form>

          <p className="mt-[55px] w-full text-center text-[11px] font-light leading-none tracking-[0] text-[#547257] md:absolute md:bottom-[54px] md:left-0 md:mt-0">
            Code will expire in {formatTime(secondsLeft)} seconds
          </p>
        </section>
      </div>
    </OverlayShell>
  );
};

export default VerifyOtpPage;
