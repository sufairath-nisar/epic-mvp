import { useState } from "react";
import { X } from "lucide-react";
import { ASSET_PATH } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { Link } from "../router/RouterProvider";

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

const JoinHeader = () => (
  <header className="absolute left-0 top-0 z-20 w-full">
    <nav className="mx-auto flex h-[116px] max-w-[1440px] items-center px-[50px] text-[#FCEFA7]">
      <Link to="/" className="block">
        <img src={`${ASSET_PATH}logo-cream.svg`} alt="Epic Padel" className="h-[33px] w-[91px] object-contain" />
      </Link>
      <div className="font-display ml-auto hidden items-center gap-[64px] text-[15px] font-bold lowercase leading-none tracking-[0] md:flex">
        {mainNavigation.map((item) => (
          <Link key={item.path} to={item.path} className="transition hover:text-[#FAD7D3]">
            {item.label}
          </Link>
        ))}
      </div>
      <Link to="/profile" aria-label="Profile" className="ml-[58px] hidden md:block">
        <img src={`${ASSET_PATH}profile-icon.png`} alt="" className="h-[17px] w-[15px] object-contain" />
      </Link>
    </nav>
  </header>
);

const FormError = ({ message }) => (message ? <p className="mt-[4px] text-[9px] font-light leading-none text-[#e43d2d]">{message}</p> : null);

const JoinInput = ({ error, label, name, onChange, placeholder, value }) => (
  <label className="block text-[12px] font-light leading-none tracking-[0] text-[#154527]">
    {label}
    <input
      name={name}
      value={value}
      onChange={(event) => onChange(name, event.target.value)}
      className={`mt-[10px] h-[36px] w-full rounded-[6px] border bg-white px-[14px] text-[12px] font-light text-[#154527] outline-none placeholder:text-[#d2d2d2] ${
        error ? "border-[#e43d2d]" : "border-transparent"
      }`}
      placeholder={placeholder}
    />
    <FormError message={error} />
  </label>
);

const SocialButton = ({ children }) => (
  <button type="button" className="flex h-[30px] w-[164px] items-center justify-center rounded-full border border-[#dddddd] bg-white text-[12px] font-light leading-none tracking-[0] text-[#111111] transition hover:border-[#154527]">
    {children}
  </button>
);

const JoinEpicPage = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (field, value) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);

    if (Object.keys(errors).length > 0) {
      setErrors(validateJoinForm(nextForm));
    }

    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateJoinForm(form);
    setErrors(nextErrors);
    setStatus(Object.keys(nextErrors).length > 0 ? "Please complete the required fields." : "OTP sent successfully.");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#c7beb0] font-sans text-[#154527]">
      <img
        src={`${ASSET_PATH}home-hero-player.png`}
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-center blur-[22px]"
      />
      <div className="absolute inset-0 bg-[#d3cabd]/60" />
      <JoinHeader />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-start justify-center overflow-x-auto px-4 pb-[48px] pt-[151px]">
        <div className="grid h-[563px] w-[886px] shrink-0 grid-cols-[410px_476px] overflow-hidden rounded-[45px] bg-white shadow-none">
          <section className="relative h-[563px] bg-white px-[40px] pb-[54px] pt-[60px]">
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[5px] border-[#FCEFA7] text-[#FCEFA7]">
              <span className="font-display text-[58px] font-bold leading-[0.6] tracking-[0]">e</span>
            </div>

            <div className="mt-[135px]">
              <h1 className="font-display text-[64px] font-bold lowercase leading-[0.98] tracking-[0] text-[#FAD7D3]">
                create
                <br />
                <span>an</span>
                <span className="ml-[35px]">account</span>
              </h1>
              <p className="mt-[25px] max-w-[315px] text-[12px] font-light leading-[15px] tracking-[0] text-[#154527]">
                Unlock unlimited access to premium Padel courts and exclusive member benefits.
                <br />
                Sign up today and start playing!
              </p>
            </div>

            <p className="absolute bottom-[54px] left-[40px] text-[10px] font-light leading-none tracking-[0] text-[#547257]">
              Already have an account? Click{" "}
              <Link to="/profile" className="underline">
                here
              </Link>{" "}
              to login
            </p>
          </section>

          <section className="relative h-[563px] bg-[#f4f4f4] px-[60px] pb-[53px] pt-[60px]">
            <Link to="/" aria-label="Close" className="absolute right-[39px] top-[31px] text-[#154527] transition hover:text-[#FAD7D3]">
              <X size={17} strokeWidth={2} />
            </Link>

            <form onSubmit={handleSubmit} noValidate className="mt-[1px] grid gap-[16px]">
              {fieldConfig.map((field) => (
                <JoinInput
                  key={field.name}
                  error={errors[field.name]}
                  label={field.label}
                  name={field.name}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                />
              ))}

              <button type="submit" className="mt-[13px] h-[37px] w-full rounded-full bg-[#154527] text-[12px] font-light uppercase leading-none tracking-[0] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527]">
                Send OTP
              </button>

              {status ? <p className="text-center text-[10px] font-light leading-none text-[#154527]">{status}</p> : null}
            </form>

            <div className="mt-[50px] flex items-center gap-[9px]">
              <span className="h-px flex-1 bg-[#dedede]" />
              <span className="text-[10px] font-light leading-none text-[#d3d3d3]">or</span>
              <span className="h-px flex-1 bg-[#dedede]" />
            </div>

            <div className="mt-[19px] flex gap-[18px]">
              <SocialButton>
                <span className="mr-[9px] text-[16px] font-normal leading-none text-[#4285f4]">G</span>
                Sign in with Google
              </SocialButton>
              <SocialButton>
                <span className="mr-[9px] text-[16px] leading-none">A</span>
                Sign in with Apple
              </SocialButton>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default JoinEpicPage;
