import PageHero from "../components/common/PageHero";
import SiteFooter from "../components/layout/SiteFooter";
import { articles } from "../data/siteContent";

const ArticlePage = () => {
  const article = articles[0];

  return (
    <main className="bg-[#FFFCF2] text-[#154527]">
      <PageHero image={article.image} title={article.title} subtitle={`${article.category} · ${article.date}`} />
      <article className="mx-auto max-w-3xl px-8 py-24 text-[18px] leading-9">
        <p>{article.excerpt}</p>
        <p className="mt-8">Epic is designed as a complete rhythm: arrive, play, recover, shop, work, and connect. The best clubs feel effortless because every detail has been considered, from the first booking flow to the last conversation after a match.</p>
        <p className="mt-8">That is the standard we use across every market: build locally, operate thoughtfully, and keep the member experience at the center.</p>
      </article>
      <SiteFooter />
    </main>
  );
};

export default ArticlePage;
