import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import { programs } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const BookingPage = ({ mode = "default" }) => {
  const isCheckout = mode === "checkout";
  const isConfirmation = mode === "confirmation";

  return (
    <main className="min-h-screen bg-[#FFFCF2] text-[#154527]">
      <section className="relative px-8 pb-24 pt-32 md:px-12">
        <SiteHeader />
        <div className="mx-auto max-w-[1100px]">
          <h1 className="text-7xl font-semibold leading-none tracking-[-0.06em] text-epic-pink">
            {isConfirmation ? "booking confirmed" : isCheckout ? "checkout" : "book your next epic experience"}
          </h1>
          {!isCheckout && !isConfirmation && (
            <>
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {["Tennis", "Padel", "Pickleball"].map((sport) => <button key={sport} className="rounded-full border border-[#154527] py-3 text-xs font-bold uppercase">{sport}</button>)}
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {programs.map((program) => (
                  <article key={program.title} className="rounded-[28px] bg-[#fff2a8] p-8">
                    <span className="rounded-full bg-[#154527] px-5 py-2 text-xs font-bold text-[#fff4a8]">{program.tag}</span>
                    <h2 className="mt-10 text-3xl font-semibold uppercase">{program.title}</h2>
                    <p className="mt-1 text-xl">{program.price}</p>
                    <ul className="mt-8 space-y-2 text-sm">{program.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    <Link to="/booking/checkout" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#154527] py-3 text-xs font-bold uppercase text-[#fff4a8]">Enroll now</Link>
                  </article>
                ))}
              </div>
            </>
          )}
          {isCheckout && <Checkout />}
          {isConfirmation && <Confirmation />}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

const Checkout = () => {
  return (
    <form className="mt-12 grid gap-5 rounded-[28px] bg-white p-8" onSubmit={(event) => event.preventDefault()}>
      {["Full name", "Email address", "Card number"].map((label) => <input key={label} placeholder={label} className="rounded-full border border-[#154527] bg-transparent px-5 py-3 outline-none" />)}
      <Link to="/booking/confirmation" className="mt-4 inline-flex justify-center rounded-full bg-[#154527] py-4 text-xs font-bold uppercase text-[#fff4a8]">Pay and confirm</Link>
    </form>
  );
};

const Confirmation = () => {
  return (
    <div className="mt-12 rounded-[28px] bg-[#fff2a8] p-10">
      <p className="text-xl">Your Epic booking is confirmed. A confirmation has been sent to your email.</p>
      <Link to="/" className="mt-8 inline-flex rounded-full bg-[#154527] px-10 py-3 text-xs font-bold uppercase text-[#fff4a8]">Back home</Link>
    </div>
  );
};

export default BookingPage;
