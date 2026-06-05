import { useMemo, useState } from "react";
import { Trash2, Wallet } from "lucide-react";
import ArrowCircle from "../components/common/ArrowCircle";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { Link } from "../router/RouterProvider";
import { getSelectedMembership } from "../utils/membershipFlow";
import { getJoinDetails } from "../utils/joinFlow";

const membershipBenefits = [
  "All inclusive court access",
  "Zero booking fees",
  "Free rentals",
  "2 guests per month",
  "15% off lessons, clinics & tournaments",
  "Access to exclusive events",
  "Epic welcome pack",
  "1 year contract"
];

const initialCartItems = [
  {
    id: "founding-membership",
    title: "Founding",
    summaryTitle: "Founding Membership",
    subtitle: "Limited Time 50% off",
    summarySubtitle: "Limited Time 50% Off",
    cartPrice: "$149/month",
    price: 149,
    benefits: membershipBenefits
  },
  {
    id: "punch-package",
    title: "Punch Package",
    summaryTitle: "Punch Package",
    subtitle: "50 Punches",
    summarySubtitle: "50 Punches",
    cartPrice: "$50",
    price: 50,
    benefits: []
  }
];

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const NOT_UPLOADED = "Not uploaded yet";
const cleanText = (value) => (value && value !== NOT_UPLOADED ? value : "");

// Build a cart line from the membership plan selected on /join-epic/membership.
const planToCartItem = (plan) => ({
  id: String(plan.id),
  title: plan.name,
  summaryTitle: plan.name,
  subtitle: cleanText(plan.audience?.[0]),
  summarySubtitle: cleanText(plan.audience?.[0]),
  cartPrice: `${plan.price}${plan.period || ""}`,
  price: typeof plan.amount === "number" ? plan.amount : 0,
  benefits: (plan.benefits ?? []).filter((benefit) => benefit && benefit !== NOT_UPLOADED)
});

// Selected plan from the join flow becomes the cart; otherwise fall back to the
// sample cart so the page still renders if opened directly.
const getInitialCartItems = () => {
  const selected = getSelectedMembership();
  return selected ? [planToCartItem(selected)] : initialCartItems;
};

// Prefill contact details from the join sign-up step when available.
const getInitialForm = () => {
  const details = getJoinDetails();
  const fullName = [details.firstName, details.lastName].filter(Boolean).join(" ").trim();
  return {
    ...initialCheckoutForm,
    fullName: fullName || initialCheckoutForm.fullName,
    email: details.email || initialCheckoutForm.email,
    phone: details.mobile || initialCheckoutForm.phone
  };
};

const initialCheckoutForm = {
  fullName: "",
  email: "",
  phone: "",
  isAdult: false,
  acceptedWaiver: false,
  paymentMethod: "card",
  cardName: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  discountCode: "",
  signature: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCheckoutForm = (form, cartItems) => {
  const errors = {};
  const onlyDigits = (value) => value.replace(/\D/g, "");
  const month = Number(form.expiryMonth);

  if (cartItems.length === 0) {
    errors.cart = "Your cart is empty.";
  }

  if (!form.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!emailPattern.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (onlyDigits(form.phone).length < 7) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!form.isAdult) {
    errors.isAdult = "Confirm that you are 18 years of age or older.";
  }

  if (!form.acceptedWaiver) {
    errors.acceptedWaiver = "Agree to the liability waiver.";
  }

  if (!form.cardName.trim()) {
    errors.cardName = "Name on card is required.";
  }

  if (onlyDigits(form.cardNumber).length < 12) {
    errors.cardNumber = "Enter a valid card number.";
  }

  if (!/^\d{1,2}$/.test(form.expiryMonth) || month < 1 || month > 12) {
    errors.expiryMonth = "Enter a valid month.";
  }

  if (!/^\d{2}$/.test(form.expiryYear)) {
    errors.expiryYear = "Enter a valid year.";
  }

  if (!/^\d{3,4}$/.test(form.cvv)) {
    errors.cvv = "Enter a valid CVV.";
  }

  if (!form.signature.trim()) {
    errors.signature = "Signature is required.";
  }

  return errors;
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-[14px] text-[#7d987f]">
    <ArrowCircle as="span" direction="right" size="checkout" strokeWidth={2.3} tone="pink" />
    <h2 className="font-sans text-[20px] font-light uppercase leading-none tracking-[0] md:text-[20px]">{children}</h2>
  </div>
);

const CartLine = ({ item, onRemove }) => (
  <div className="grid min-h-[257px] grid-cols-[1fr_110px] gap-8 border-b border-[#e7e7e7] pb-[39px] pt-[31px] text-[#154527] md:grid-cols-[1fr_136px]">
    <div>
      <h3 className="text-[20px] font-light uppercase leading-none tracking-[0]">{item.title}</h3>
      <p className="mt-[7px] text-[14px] font-light leading-none tracking-[0] text-[#547257]">{item.subtitle}</p>
      {item.benefits.length > 0 ? (
        <ul className="mt-[34px] list-disc pl-[17px] text-[10px] font-light leading-[14px] tracking-[0] text-[#547257] md:text-[11px] md:leading-[16px]">
          {item.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      ) : null}
    </div>
    <div className="flex flex-col items-end">
      <p className="text-[13px] font-light uppercase leading-none tracking-[0] text-[#d4d4d4]">Price</p>
      <p className="mt-[9px] text-[15px] font-normal leading-none tracking-[0] text-[#154527]">{item.cartPrice}</p>
      <button type="button" aria-label={`Remove ${item.title}`} onClick={() => onRemove(item.id)} className="mt-auto text-[#b9b9b9] transition hover:text-[#154527]">
        <Trash2 size={16} strokeWidth={1.8} />
      </button>
    </div>
  </div>
);

const CartDetails = ({ error, items, total, onRemoveItem }) => (
  <section>
    <h1 className="text-[30px] font-light uppercase leading-none tracking-[0] text-[#154527] md:text-[32px]">Your Cart</h1>
    <div className="mt-[32px]">
      <SectionLabel>Selected Membership &amp; Package</SectionLabel>
    </div>

    <div className="mt-[20px]">
      {items.length > 0 ? (
        items.map((item) => <CartLine key={item.id} item={item} onRemove={onRemoveItem} />)
      ) : (
        <p className="border-b border-[#e7e7e7] py-[60px] text-[15px] font-normal text-[#547257]">Your cart is empty.</p>
      )}
      <div className="grid grid-cols-[1fr_136px] pt-[24px] text-[15px] font-normal uppercase leading-none tracking-[0] text-[#154527]">
        <p className="justify-self-end pr-[68px]">Total</p>
        <p className="justify-self-end">${total}</p>
      </div>
      <FieldError message={error} />
    </div>
  </section>
);

const FieldError = ({ message }) => (message ? <p className="mt-[6px] text-[10px] font-light leading-[13px] text-[#e43d2d]">{message}</p> : null);

const CheckoutInput = ({ error, label, name, onBlur, onChange, placeholder, value }) => (
  <label className="block font-sans text-[12px] font-light leading-none tracking-[0] text-[#154527] md:text-[12px]">
    {label}
    <input
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(event) => onChange(name, event.target.value)}
      className={`mt-[12px] h-[44px] w-full rounded-[6px] border bg-[#f7f7f7] px-[18px] font-sans text-[12px] font-light text-[#154527] outline-none placeholder:text-[#d2d2d2] md:h-[40px] md:text-[12px] ${
        error ? "border-[#e43d2d]" : "border-transparent"
      }`}
      placeholder={placeholder}
    />
    <FieldError message={error} />
  </label>
);

const CheckboxLine = ({ checked, children, error, name, onBlur, onChange }) => (
  <div>
    <label className="flex cursor-pointer items-center gap-[12px] text-[12px] font-light leading-[18px] tracking-[0] text-[#547257] md:text-[12px]">
      <input type="checkbox" checked={checked} onBlur={() => onBlur(name)} onChange={(event) => onChange(name, event.target.checked)} className="sr-only" />
      <span className={`flex h-[16px] w-[16px] items-center justify-center rounded-full border bg-[#FCEFA7] ${error ? "border-[#e43d2d]" : "border-[#FCEFA7]"}`}>
        {checked ? <span className="h-[6px] w-[6px] rounded-full bg-[#154527]" /> : null}
      </span>
      <span>{children}</span>
    </label>
    <FieldError message={error} />
  </div>
);

const ContactDetails = ({ errors, form, onBlur, onChange }) => {
  return (
    <section className="mt-[118px]">
      <SectionLabel>Contact Details</SectionLabel>
      <div className="mt-[28px] grid gap-[19px]">
        <CheckoutInput error={errors.fullName} label="Full Name" name="fullName" onBlur={onBlur} onChange={onChange} placeholder="Enter your full name" value={form.fullName} />
        <CheckoutInput error={errors.email} label="Email Address" name="email" onBlur={onBlur} onChange={onChange} placeholder="Enter email address" value={form.email} />
        <CheckoutInput error={errors.phone} label="Phone Number" name="phone" onBlur={onBlur} onChange={onChange} placeholder="+1  Enter your phone number" value={form.phone} />
      </div>
      <div className="mt-[33px] grid gap-[23px]">
        <CheckboxLine checked={form.isAdult} error={errors.isAdult} name="isAdult" onBlur={onBlur} onChange={onChange}>
          I confirm that I am 18 years of age or older
        </CheckboxLine>
        <CheckboxLine checked={form.acceptedWaiver} error={errors.acceptedWaiver} name="acceptedWaiver" onBlur={onBlur} onChange={onChange}>
          I have read and agree to the&nbsp;
          <a href="#waiver" className="font-light uppercase underline">
            Epic Padel Inc. Liability Waiver and Release Agreement
          </a>
        </CheckboxLine>
      </div>
    </section>
  );
};

const PaymentField = ({ error, name, onBlur, onChange, placeholder, value }) => (
  <>
    <input
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(event) => onChange(name, event.target.value)}
      className={`h-[44px] w-full rounded-[6px] border bg-[#f7f7f7] px-[18px] font-sans text-[12px] font-light text-[#154527] outline-none placeholder:text-[#d2d2d2] md:h-[40px] md:text-[12px] ${
        error ? "border-[#e43d2d]" : "border-transparent"
      }`}
      placeholder={placeholder}
    />
    <FieldError message={error} />
  </>
);

const PaymentTab = ({ active = false, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-[44px] items-center justify-center rounded-[5px] border bg-[#f7f7f7] font-sans text-[12px] font-light leading-none tracking-[0] text-[#154527] transition hover:border-[#154527] md:h-[58px] md:text-[12px] ${
      active ? "border-[#154527]" : "border-transparent"
    }`}
  >
    {children}
  </button>
);

const PaymentDetails = ({ errors, form, onBlur, onChange }) => {
  return (
    <section className="mt-[61px]">
      <SectionLabel>Payment Details</SectionLabel>
      <div className="mt-[30px] grid gap-[19px]">
        <div className="grid gap-[18px] md:grid-cols-3">
          <PaymentTab active={form.paymentMethod === "card"} onClick={() => onChange("paymentMethod", "card")}>
            <span className="mr-auto pl-[15px]">Card</span>
            <span className="mr-[13px] inline-flex items-center gap-[5px]">
              <span className="text-[9px] font-bold text-[#183f91]">VISA</span>
              <span className="h-[14px] w-[14px] rounded-full bg-[#e8232f]" />
              <span className="-ml-[8px] h-[14px] w-[14px] rounded-full bg-[#f4a81d]/90" />
            </span>
          </PaymentTab>
          <PaymentTab active={form.paymentMethod === "apple-pay"} onClick={() => onChange("paymentMethod", "apple-pay")}>
            <img src={`${ASSET_PATH}apple-pay.svg`} alt="Apple Pay" className="h-[14px] w-[30px] object-contain" />
          </PaymentTab>
          <PaymentTab active={form.paymentMethod === "wallet"} onClick={() => onChange("paymentMethod", "wallet")}>
            <span className="mr-[6px] pl-[15px] whitespace-nowrap">Use Wallet Balance</span>
            <span className="mr-auto text-[#d3d3d3]">$2,000</span>
            <Wallet className="mr-[12px]" size={17} strokeWidth={1.6} />
          </PaymentTab>
        </div>
        <CheckoutInput error={errors.cardName} label="Name on Card" name="cardName" onBlur={onBlur} onChange={onChange} placeholder="As shown on card" value={form.cardName} />
        <CheckoutInput error={errors.cardNumber} label="Card Number" name="cardNumber" onBlur={onBlur} onChange={onChange} placeholder="0000 0000 0000 0000" value={form.cardNumber} />
        <div className="grid gap-[18px] md:grid-cols-3">
          <label className="block font-sans text-[12px] font-light leading-none tracking-[0] text-[#154527] md:col-span-2 md:text-[12px]">
            Expiry
            <div className="mt-[12px] grid grid-cols-2 gap-[18px]">
              <PaymentField error={errors.expiryMonth} name="expiryMonth" onBlur={onBlur} onChange={onChange} placeholder="MM" value={form.expiryMonth} />
              <PaymentField error={errors.expiryYear} name="expiryYear" onBlur={onBlur} onChange={onChange} placeholder="YY" value={form.expiryYear} />
            </div>
          </label>
          <label className="block font-sans text-[12px] font-light leading-none tracking-[0] text-[#154527] md:text-[12px]">
            CVV
            <div className="mt-[12px]">
              <PaymentField error={errors.cvv} name="cvv" onBlur={onBlur} onChange={onChange} placeholder="CVV" value={form.cvv} />
            </div>
          </label>
        </div>
      </div>
    </section>
  );
};

const SummaryCard = ({ form, items, onChange, onConfirm, total }) => {
  const summaryRows = [
    [`Subtotal ~ ${items.length} ${items.length === 1 ? "item" : "items"}`, formatCurrency(total)],
    ["Shipping", "N/A"],
    ["Duties", "00.00"],
    ["Taxes", "00.00"]
  ];

  return (
    <aside className="rounded-[55px] bg-[#D9D9D933] px-[52px] pb-[54px] pt-[60px] text-[#154527] md:min-h-[642px]">
      <h2 className="text-[32px] font-light uppercase leading-none tracking-[0]">Order Summary</h2>
      <div className="mt-[55px] grid gap-[25px]">
        {items.map((item) => (
          <div key={item.title} className="grid grid-cols-[1fr_35px_72px] gap-6 text-[12px] font-light leading-[15px] tracking-[0] text-[#547257] md:text-[12px]">
            <div>
              <p>{item.summaryTitle}</p>
              <p>{item.summarySubtitle}</p>
            </div>
            <p>x1</p>
            <p className="text-right">{formatCurrency(item.price)}</p>
          </div>
        ))}
      </div>
      <input
        value={form.discountCode}
        onChange={(event) => onChange("discountCode", event.target.value)}
        className="mt-[26px] h-[38px] w-full rounded-[6px] border-0 bg-white px-[17px] text-[12px] font-light outline-none placeholder:text-[#d7d7d7]"
        placeholder="Discount code or gift card"
      />
      <div className="mt-[137px] grid gap-[3px] text-[10px] font-light leading-[14px] tracking-[0] text-[#547257]">
        {summaryRows.map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-[27px] flex justify-between text-[12px] font-light leading-none text-[#154527]">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <div className="mt-[30px] border-t border-[#dedede] pt-[36px] text-center">
        <Link to="/join-epic" className="text-[10px] font-normal leading-none text-[#547257] transition hover:text-[#154527]">
          Explore more memberships
        </Link>
        <ConfirmButton className="mt-[24px]" onClick={onConfirm} />
      </div>
    </aside>
  );
};

const WaiverCard = ({ error, form, onChange, onConfirm }) => {
  return (
    <aside id="waiver" className="rounded-[55px] bg-[#D9D9D933] px-[52px] pb-[44px] pt-[58px] text-[#154527] md:min-h-[647px]">
      <h2 className="max-w-[360px] text-[20px] font-light uppercase leading-[29px] tracking-[0]">Epic Padel Inc. Liability Waiver and Release Agreement</h2>
      <div className="mt-[31px] grid gap-[23px] text-[12px] font-light leading-[16px] tracking-[0] text-[#547257]">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a
          galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
      <label className="mt-[28px] block text-[13px] font-medium leading-none text-[#154527]">
        Signature<span className="text-[#e43d2d]">*</span>
        <div className="relative mt-[11px]">
          <input
            value={form.signature}
            onChange={(event) => onChange("signature", event.target.value)}
            className={`h-[57px] w-full rounded-[6px] border bg-white px-[18px] pr-[42px] outline-none ${error ? "border-[#e43d2d]" : "border-transparent"}`}
          />
          <button
            type="button"
            aria-label="Clear signature"
            onClick={() => onChange("signature", "")}
            className="absolute right-[9px] top-[8px] flex h-[24px] w-[24px] items-center justify-center text-[#d1d1d1] transition hover:text-[#154527]"
          >
            <Trash2 size={12} strokeWidth={1.7} />
          </button>
        </div>
        <FieldError message={error} />
      </label>
      <ConfirmButton className="mt-[31px]" onClick={onConfirm} />
    </aside>
  );
};

const ConfirmButton = ({ className = "", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-[40px] w-full rounded-full bg-[#154527] text-[12px] font-light uppercase leading-none tracking-[0] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] ${className}`}
  >
    Confirm Payment
  </button>
);

const MembershipCheckoutPage = () => {
  const [cartItems, setCartItems] = useState(getInitialCartItems);
  const [form, setForm] = useState(getInitialForm);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price, 0), [cartItems]);

  const handleFieldChange = (field, value) => {
    setForm((currentForm) => {
      const nextForm = { ...currentForm, [field]: value };

      if (Object.keys(errors).length > 0) {
        setErrors(validateCheckoutForm(nextForm, cartItems));
      }

      return nextForm;
    });
    setSubmitMessage("");
  };

  const handleFieldBlur = () => {
    setErrors(validateCheckoutForm(form, cartItems));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((currentItems) => {
      const nextItems = currentItems.filter((item) => item.id !== itemId);
      setErrors(validateCheckoutForm(form, nextItems));
      return nextItems;
    });
    setSubmitMessage("");
  };

  const handleConfirmPayment = () => {
    const nextErrors = validateCheckoutForm(form, cartItems);
    setErrors(nextErrors);
    setSubmitMessage(Object.keys(nextErrors).length > 0 ? "Please complete the required fields." : "Payment details are ready to submit.");
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#154527]">
      <F31Header navigation={mainNavigation} floating={false} />
      <section className="mx-auto grid max-w-[1440px] gap-[56px] px-4 pb-[90px] pt-[40px] md:grid-cols-[minmax(0,1fr)_470px] md:gap-[60px] md:px-[50px] md:pb-[158px] md:pt-[64px]">
        <div>
          <CartDetails error={errors.cart} items={cartItems} total={total} onRemoveItem={handleRemoveItem} />
          <ContactDetails errors={errors} form={form} onBlur={handleFieldBlur} onChange={handleFieldChange} />
          <PaymentDetails errors={errors} form={form} onBlur={handleFieldBlur} onChange={handleFieldChange} />
        </div>
        <div className="grid content-start gap-[50px] md:pt-[113px]">
          <SummaryCard form={form} items={cartItems} onChange={handleFieldChange} onConfirm={handleConfirmPayment} total={total} />
          <WaiverCard error={errors.signature} form={form} onChange={handleFieldChange} onConfirm={handleConfirmPayment} />
          {submitMessage ? <p className="text-center text-[12px] font-light text-[#154527]">{submitMessage}</p> : null}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default MembershipCheckoutPage;
