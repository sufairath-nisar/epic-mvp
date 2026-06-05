import { useEffect, useState } from "react";
import AutoCarousel from "../components/common/AutoCarousel";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH, resolveAssetUrl } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { Link, useRouter } from "../router/RouterProvider";
import { getBlogContent } from "../api/blogApi";

const FALLBACK_HERO_IMAGE = `${ASSET_PATH}journal-new-era.png`;

const RelatedCard = ({ blog }) => (
  <Link to={`/our-journal/blog/${encodeURIComponent(blog.slug)}`} className="block w-[300px] shrink-0 md:w-[480px]">
    <img src={resolveAssetUrl(blog.image)} alt={blog.title} loading="lazy" className="aspect-[16/10] w-full object-cover" />
    <p className="mt-[14px] text-[12px] font-light leading-none tracking-[0] text-[#547257] md:mt-[16px]">{blog.date}</p>
    <h3 className="mt-[8px] text-[13px] font-normal uppercase leading-[1.4] tracking-[0] text-[#547257] md:mt-[3px] md:text-[14px]">{blog.title}</h3>
  </Link>
);

const ArticleShell = ({ children }) => (
  <main className="min-h-screen bg-white font-sans text-[#154527]">
    <F31Header navigation={mainNavigation} floating={false} />
    {children}
    <SiteFooter />
  </main>
);

const ArticlePage = () => {
  const { path } = useRouter();
  // Slugs can contain spaces, so the path segment is URL-encoded — decode it.
  const slug = decodeURIComponent(path.split("/")[3] || "");
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");

    getBlogContent(slug)
      .then((data) => {
        if (mounted) {
          setPost(data);
          setStatus("ready");
        }
      })
      .catch((error) => {
        console.error("Failed to load blog article from API:", error);
        if (mounted) setStatus("error");
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <ArticleShell>
        <div className="flex min-h-[50vh] items-center justify-center text-[13px] font-light tracking-[0] text-[#547257]">Loading article...</div>
      </ArticleShell>
    );
  }

  if (status === "error" || !post) {
    return (
      <ArticleShell>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-[16px] px-6 text-center">
          <p className="text-[14px] font-light tracking-[0] text-[#547257]">Sorry, we couldn&apos;t load this article.</p>
          <Link to="/our-journal" className="text-[12px] font-normal uppercase tracking-[0.12em] text-[#FAD7D3]">
            Back to journal
          </Link>
        </div>
      </ArticleShell>
    );
  }

  const heroImage = post.image ? resolveAssetUrl(post.image) : FALLBACK_HERO_IMAGE;

  return (
    <main className="bg-white font-sans text-[#154527]">
      {/* Hero — image/title/date from the blog */}
      <section className="relative">
        <img src={heroImage} alt={post.title} className="h-[460px] w-full object-cover object-center md:h-[600px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <F31Header navigation={mainNavigation} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-[24px] pb-[28px] md:px-[50px] md:pb-[50px]">
            <h1 className="max-w-[320px] font-display text-[28px] font-bold lowercase leading-[1.08] tracking-[0] text-[#FCEFA7] md:max-w-[780px] md:text-[54px] md:leading-[1.04]">{post.title}</h1>
            <p className="mt-[10px] text-[11px] font-light leading-none tracking-[0] text-white md:mt-[16px] md:text-[15px]">{post.date}</p>
          </div>
        </div>
      </section>

      {/* Body — HTML content from the CMS */}
      <section className="mx-auto max-w-[1040px] px-[24px] pt-[34px] md:px-[40px] md:pt-[56px]">
        <div
          className="blog-content text-[12px] font-light leading-[18px] tracking-[0] text-[#154527] md:text-[15px] md:leading-[24px]"
          // Content is authored HTML from the trusted CMS backend.
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </section>

      {/* Related blogs */}
      {post.related.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-[24px] pt-[64px] md:px-[50px] md:pt-[110px]">
          <h2 className="font-display text-[46px] font-bold lowercase leading-[0.95] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[1.02]">related blogs</h2>

          {/* Mobile: swipe / scroll */}
          <div className="no-scrollbar mt-[24px] flex gap-[16px] overflow-x-auto pb-[6px] md:hidden">
            {post.related.map((blog) => (
              <RelatedCard key={blog.slug} blog={blog} />
            ))}
          </div>

          {/* Desktop: auto-scroll marquee only when there are enough items.
              With few related blogs, render a static row so the carousel doesn't
              duplicate a single blog (it loops by repeating its items). */}
          {post.related.length > 2 ? (
            <AutoCarousel
              items={post.related}
              getKey={(blog) => blog.slug}
              className="mt-[40px] hidden md:block"
              trackClassName="news-carousel-track items-start gap-[24px]"
              renderItem={(blog, key) => <RelatedCard key={key} blog={blog} />}
            />
          ) : (
            <div className="mt-[40px] hidden gap-[24px] md:flex">
              {post.related.map((blog) => (
                <RelatedCard key={blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </section>
      ) : null}

      <div className="mt-[70px] md:mt-[120px]">
        <SiteFooter />
      </div>
    </main>
  );
};

export default ArticlePage;
