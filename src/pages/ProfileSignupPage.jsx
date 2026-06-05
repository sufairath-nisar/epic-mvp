import { useEffect, useState } from "react";
import { X } from "lucide-react";
import OverlayShell from "../components/layout/OverlayShell";
import { ASSET_PATH } from "../constants/assets";
import { Link, useRouter } from "../router/RouterProvider";
import { saveProfileDetails } from "../utils/profileFlow";
import { isLoggedIn } from "../utils/session";
import { sendOtp, loginWithEmail, splitPhone } from "../api/authApi";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: ""
};

const fieldConfig = [
  {
    label: "First Name",
    name: "firstName",
    placeholder: "Enter your first name"
  },
  {
    label: "Last Name",
    name: "lastName",
    placeholder: "Enter your last name"
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your email"
  },
  {
    label: "Mobile Number",
    name: "mobile",
    placeholder: "+1 Enter your mobile number"
  }
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateJoinForm = (form) => {
  const errors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  if (!emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (form.mobile.replace(/\D/g, "").length < 7) {
    errors.mobile = "Enter a valid mobile number.";
  }

  return errors;
};

const FormError = ({ message }) => (message ? <p className="absolute left-0 top-full mt-[3px] text-[9px] font-light leading-none text-[#e43d2d]">{message}</p> : null);

const JoinInput = ({ error, label, name, onChange, placeholder, value }) => (
  <label className="relative block text-[12px] font-light leading-none tracking-[0] text-[#154527]">
    {label}
    <input
      name={name}
      value={value}
      onChange={(event) => onChange(name, event.target.value)}
      className={`mt-[10px] h-[44px] w-full rounded-[6px] border bg-white px-[14px] text-[12px] font-light text-[#154527] outline-none placeholder:text-[#d2d2d2] md:h-[36px] ${
        error ? "border-[#e43d2d]" : "border-transparent"
      }`}
      placeholder={placeholder}
    />
    <FormError message={error} />
  </label>
);

const SocialButton = ({ children }) => (
  <button
    type="button"
    className="flex h-[44px] flex-1 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[12px] font-light leading-none tracking-[0] text-[#111111] transition hover:border-[#154527] md:h-[30px] md:w-[164px] md:flex-none"
  >
    {children}
  </button>
);

const ProfileSignupPage = () => {
  const { navigate } = useRouter();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already registered? Don't show sign-up again — go to the account view.
  useEffect(() => {
    if (isLoggedIn()) navigate("/account");
  }, [navigate]);

  const handleChange = (field, value) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    if (Object.keys(errors).length > 0) {
      setErrors(validateJoinForm(nextForm));
    }

    setStatus("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateJoinForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Please complete the required fields.");
      return;
    }

    const { phone, country } = splitPhone(form.mobile);
    setSubmitting(true);
    setStatus("Sending OTP...");

    try {
      // Signup sends the OTP to both email and phone.
      await Promise.all([loginWithEmail({ email: form.email.trim() }), sendOtp({ phone, country })]);
      // "both" marker -> the OTP page verifies email AND phone.
      saveProfileDetails({ ...form, phone, country, otpFlow: "both" });
      setStatus("OTP sent successfully.");
      navigate("/profile/otp");
    } catch (error) {
      setStatus(error.message || "Unable to send OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OverlayShell>
      <div className="relative flex min-h-[calc(100vh-71px)] w-full flex-col overflow-hidden rounded-t-[34px] bg-white shadow-none md:grid md:min-h-0 md:w-[886px] md:shrink-0 md:grid-cols-[410px_476px] md:rounded-[45px]">
        <Link to="/" aria-label="Close" className="absolute right-[24px] top-[24px] z-10 text-[#154527] transition hover:text-[#FAD7D3] md:right-[39px] md:top-[31px]">
          <X size={17} strokeWidth={2} />
        </Link>

        <section className="relative bg-white px-[40px] pb-[38px] pt-[40px] md:min-h-[573px] md:pb-[54px] md:pt-[60px]">
          <img src={`${ASSET_PATH}logo-mark-cream.svg`} alt="Epic" className="hidden h-[60px] w-[60px] md:block" />

          <div className="md:mt-[125px]">
            <h1 className="font-display text-[46px] font-bold lowercase leading-[0.98] tracking-[0] text-[#FAD7D3] md:text-[64px]">
              create
              <br />
              <span>an</span>
              <span className="ml-[35px]">account</span>
            </h1>
            <p className="mt-[16px] max-w-[315px] text-[12px] font-light leading-[15px] tracking-[0] text-[#154527] md:mt-[17px]">
              Unlock unlimited access to premium Padel courts and exclusive member benefits.
              <br />
              Sign up today and start playing!
            </p>
          </div>

          <p className="mt-[18px] text-[10px] font-light leading-none tracking-[0] text-[#547257] md:absolute md:bottom-[54px] md:left-[40px] md:mt-0">
            Already have an account? Click{" "}
            <Link to="/profile" className="underline">
              here
            </Link>{" "}
            to login
          </p>
        </section>

        <section className="relative flex-1 bg-[#D9D9D933] px-[40px] pb-[45px] pt-[28px] md:min-h-[573px] md:px-[60px] md:pb-[63px] md:pt-[60px]">
          <form onSubmit={handleSubmit} noValidate className="relative grid gap-[16px] md:mt-[1px]">
            {fieldConfig.map((field) => (
              <JoinInput key={field.name} error={errors[field.name]} label={field.label} name={field.name} onChange={handleChange} placeholder={field.placeholder} value={form[field.name]} />
            ))}

            <button
              type="submit"
              className="mt-[13px] h-[48px] w-full rounded-full bg-[#154527] text-[12px] font-light uppercase leading-none tracking-[0] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] md:h-[37px]"
            >
              Send OTP
            </button>

            {status ? <p className="absolute left-0 right-0 top-full mt-[7px] text-center text-[10px] font-light leading-none text-[#154527]">{status}</p> : null}
          </form>

          <div className="mt-[28px] flex items-center gap-[9px] md:mt-[55px]">
            <span className="h-px flex-1 bg-[#dedede]" />
            <span className="text-[10px] font-light leading-none text-[#d3d3d3]">or</span>
            <span className="h-px flex-1 bg-[#dedede]" />
          </div>

          <div className="mt-[19px] flex gap-[18px]">
            <SocialButton>
              <img src={`${ASSET_PATH}google-icon.svg`} alt="" className="mr-[9px] h-[13px] w-[13px]" />
              Sign in with Google
            </SocialButton>
            <SocialButton>
              <img src={`${ASSET_PATH}apple-icon.svg`} alt="" className="mr-[9px] h-[15px] w-[12px]" />
              Sign in with Apple
            </SocialButton>
          </div>
        </section>
      </div>
    </OverlayShell>
  );
};

export default ProfileSignupPage;
