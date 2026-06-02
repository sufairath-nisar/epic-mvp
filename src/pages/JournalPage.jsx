import PageHero from "../components/common/PageHero";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { articles } from "../data/siteContent";
import { Link } from "../router/RouterProvider";

const JournalPage = () => {
  return (
    <main className="bg-[#FFFCF2] text-[#154527]">
      <PageHero image="home-billboard.png" title="our journal" subtitle="Stories from Epic" />
      <section className="px-8 py-24 md:px-12">
        <div className="mx-auto grid max-w-[1340px] gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} to={`/our-journal/blog?article=${article.slug}`} className="group">
              <img src={`${ASSET_PATH}${article.image}`} alt={article.title} className="aspect-[0.9] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              <p className="mt-6 text-xs font-bold uppercase text-[#154527]/60">{article.category} · {article.date}</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em]">{article.title}</h2>
              <p className="mt-4 text-sm leading-6">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
};

export default JournalPage;
