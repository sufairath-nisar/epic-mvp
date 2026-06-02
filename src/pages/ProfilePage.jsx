import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import { Link } from "../router/RouterProvider";

const ProfilePage = ({ state = "login" }) => {
  const isEdit = state === "edit" || state === "new";

  return (
    <main className="min-h-screen bg-[#FFFCF2] text-[#154527]">
      <section className="relative px-8 pb-24 pt-32 md:px-12">
        <SiteHeader />
        <div className="mx-auto max-w-xl rounded-[28px] bg-white p-8 shadow-sm">
          <h1 className="text-6xl font-semibold tracking-[-0.06em] text-epic-pink">{isEdit ? "profile" : "log in"}</h1>
          <form className="mt-10 grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <input className="rounded-full border border-[#154527] px-5 py-3 outline-none" placeholder="Email address" />
            {isEdit && <input className="rounded-full border border-[#154527] px-5 py-3 outline-none" placeholder="Full name" />}
            <input className="rounded-full border border-[#154527] px-5 py-3 outline-none" placeholder="Password" type="password" />
            <Link to={isEdit ? "/profile/save" : "/profile/new"} className="mt-4 inline-flex justify-center rounded-full bg-[#154527] py-4 text-xs font-bold uppercase text-[#fff4a8]">
              {isEdit ? "Save profile" : "Continue"}
            </Link>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default ProfilePage;
