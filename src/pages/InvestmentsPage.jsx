import PageHero from "../components/common/PageHero";
import SiteFooter from "../components/layout/SiteFooter";

const InvestmentsPage = () => {
  return (
    <main className="bg-white text-[#154527]">
      <PageHero title="our investments" subtitle="Ecosystem" />
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-3">
          {["Clubs", "Technology", "Community"].map((item) => (
            <article key={item} className="rounded-[28px] border border-[#154527]/20 bg-white p-8">
              <h2 className="text-3xl font-semibold">{item}</h2>
              <p className="mt-5 text-sm leading-6">Epic invests in connected club experiences that combine play, hospitality, retail, programming, and member growth.</p>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default InvestmentsPage;
