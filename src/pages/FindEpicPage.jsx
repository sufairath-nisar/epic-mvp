import PageHero from "../components/common/PageHero";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { locations, membershipPlans } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const FindEpicPage = () => {
  const location = locations[0];

  return (
    <main className="bg-[#FFFCF2] text-[#154527]">
      <PageHero image="home-location-2.png" title="find epic" subtitle={location.title} dark />
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1340px] gap-12 md:grid-cols-[0.7fr_1fr]">
          <h2 className="text-[70px] font-semibold leading-[0.95] tracking-[-0.06em] text-epic-pink">our<br />location</h2>
          <div>
            <p className="max-w-3xl text-[17px] leading-8">{location.description}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {location.stats.map((stat) => <div key={stat} className="rounded-full border border-[#154527] px-5 py-3 text-center text-xs font-bold uppercase">{stat}</div>)}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-[1340px] gap-6 md:grid-cols-2">
          <img src={`${ASSET_PATH}home-location-1.png`} alt="Charlotte courts" className="aspect-[1.3] w-full object-cover" />
          <img src={`${ASSET_PATH}home-location-brand.png`} alt="Epic club" className="aspect-[1.3] w-full object-cover" />
        </div>
      </section>
      <section className="bg-[#154527] px-8 py-20 text-[#fff4a8] md:px-12">
        <div className="mx-auto grid max-w-[1340px] gap-8 md:grid-cols-3">
          {membershipPlans.map((plan) => (
            <article key={plan.name} className="rounded-2xl bg-[#FFFCF2] p-8 text-[#154527]">
              {plan.badge && <span className="rounded-full bg-[#fff4a8] px-4 py-2 text-[11px] font-bold uppercase">{plan.badge}</span>}
              <h3 className="mt-6 text-3xl font-semibold lowercase">{plan.name}</h3>
              <p className="mt-2 text-sm">{plan.audience}</p>
              <p className="mt-8 text-4xl font-bold">{plan.price}<span className="text-sm font-medium"> /month</span></p>
              <Link to="/join-epic/membership" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#154527] py-3 text-xs font-bold uppercase text-[#fff4a8]">Select plan</Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default FindEpicPage;
