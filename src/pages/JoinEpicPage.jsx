import PageHero from "../components/common/PageHero";
import SiteFooter from "../components/layout/SiteFooter";
import { membershipPlans } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const JoinEpicPage = () => {
  return (
    <main className="bg-[#FFFCF2] text-[#154527]">
      <PageHero title="join epic" subtitle="Memberships and club access" />
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1340px] gap-8 md:grid-cols-3">
          {membershipPlans.map((plan) => (
            <article key={plan.name} className="rounded-[28px] border border-[#154527]/20 bg-white p-8">
              {plan.badge && <span className="rounded-full bg-[#fff4a8] px-4 py-2 text-[11px] font-bold uppercase">{plan.badge}</span>}
              <h2 className="mt-6 text-4xl font-semibold lowercase tracking-[-0.04em]">{plan.name}</h2>
              <p className="mt-2 min-h-10 text-sm">{plan.audience}</p>
              <p className="mt-8 text-4xl font-bold">{plan.price}<span className="text-sm font-medium"> /month</span></p>
              <p className="mt-1 text-xs">{plan.note}</p>
              <ul className="mt-8 space-y-2 text-sm">{plan.benefits.map((benefit) => <li key={benefit}>• {benefit}</li>)}</ul>
              <Link to="/join-epic/membership" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#154527] py-3 text-xs font-bold uppercase text-[#fff4a8]">Select plan</Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default JoinEpicPage;
