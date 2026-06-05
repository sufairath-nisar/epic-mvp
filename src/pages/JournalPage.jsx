import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import AutoCarousel from "../components/common/AutoCarousel";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH, resolveAssetUrl } from "../constants/assets";
import { mainNavigation } from "../data/routes";
import { Link } from "../router/RouterProvider";
import { getBlogList } from "../api/blogApi";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" }
];

const filterOptions = [
  { value: "news", label: "News" },
  { value: "comparison", label: "Comparison" },
  { value: "guides", label: "Guides" }
];

const news = [
  {
    source: "Forbes",
    title: "Match Point: Meet the start-up hoping to win big in US Padel",
    excerpt: "Have you played padel yet? If not, it may not be long. Often described as a mix between squa...",
    image: "news-forbes.png",
    width: "w-[230px] md:w-[261px]",
    imageHeight: "h-[140px] md:h-[181px]"
  },
  {
    source: "SBJ",
    title: "Epic Padel raises $10M seed round to expand clubs in the U.S.",
    excerpt: "Virginia-based padel club operator Epic Padel has raised an oversubscribed $10M seed...",
    image: "news-sbj.png",
    width: "w-[230px] md:w-[252px]",
    imageHeight: "h-[210px] md:h-[419px]"
  },
  {
    source: "Athletech News",
    title: "Epic Padel secures $10M to spur US growth for popular racket sport",
    excerpt: "Padel, the fastest growing sport worldwide according to some estimates, with more than...",
    image: "news-athletech.png",
    width: "w-[330px] md:w-[521px]",
    imageHeight: "h-[170px] md:h-[272px]"
  },
  {
    source: "Axios Pro",
    title: "Pro Rata Premium: First look",
    excerpt: "A chicago-based crypto and stablecoin infrastructure provider, raised an $104M series...",
    image: "news-axios.png",
    width: "w-[230px] md:w-[252px]",
    imageHeight: "h-[215px] md:h-[341px]"
  }
];

const SectionHeading = ({ children, className = "" }) => (
  <h2 className={`font-display text-[46px] font-bold lowercase leading-[0.95] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[1.02] ${className}`}>{children}</h2>
);

const Dropdown = ({ label, value, options, onSelect, className = "" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-[34px] w-full items-center justify-between gap-[18px] rounded-full bg-[#D9D9D933] px-[20px] text-[12px] font-light lowercase tracking-[0] text-[#a0a0a0] transition hover:bg-[#D9D9D94d]"
      >
        <span className={value ? "text-[#154527]" : ""}>{value || label}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-full overflow-hidden rounded-[16px] bg-white py-[6px] shadow-[0_8px_24px_rgba(21,69,39,0.14)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
              className="block w-full px-[20px] py-[9px] text-left text-[12px] font-light lowercase tracking-[0] text-[#154527] transition hover:bg-[#D9D9D933]"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

// Mobile: a single pill that opens a grouped Sort + Filter menu.
const MobileFilters = ({ sortValue, filterValue, onSort, onFilter, onClear }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const optionClass = (active) =>
    `block w-full px-[20px] py-[10px] text-left text-[12px] lowercase tracking-[0] transition hover:bg-[#D9D9D933] ${active ? "font-normal text-[#154527]" : "font-light text-[#547257]"}`;

  const headingClass = "px-[20px] pb-[4px] pt-[12px] text-[10px] font-normal uppercase tracking-[0.12em] text-[#a0a0a0]";

  return (
    <div ref={ref} className="relative w-full md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-[34px] w-full items-center justify-between gap-[18px] rounded-full bg-[#D9D9D933] px-[20px] text-[12px] font-light lowercase tracking-[0] text-[#a0a0a0] transition hover:bg-[#D9D9D94d]"
      >
        <span>filter by</span>
        <ChevronDown size={14} strokeWidth={1.5} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-full overflow-hidden rounded-[16px] bg-white py-[4px] shadow-[0_8px_24px_rgba(21,69,39,0.14)]">
          <p className={headingClass}>Sort by</p>
          {sortOptions.map((option) => (
            <button key={option.value} type="button" onClick={() => onSort(option.value)} className={optionClass(sortValue === option.value)}>
              {option.label}
            </button>
          ))}
          <p className={headingClass}>Filter by</p>
          {filterOptions.map((option) => (
            <button key={option.value} type="button" onClick={() => onFilter(option.value)} className={optionClass(filterValue === option.value)}>
              {option.label}
            </button>
          ))}
          <div className="mt-[6px] border-t border-[#ececec]" />
          <button
            type="button"
            onClick={() => {
              onClear();
              setOpen(false);
            }}
            className="block w-full px-[20px] py-[11px] text-left text-[12px] font-light lowercase tracking-[0] text-[#547257] transition hover:bg-[#D9D9D933]"
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  );
};

const NewsCard = ({ item }) => (
  <article className={`shrink-0 ${item.width}`}>
    <img src={`${ASSET_PATH}${item.image}`} alt={item.title} className={`w-full object-cover ${item.imageHeight}`} />
    <p className="mt-[12px] text-[11px] font-light leading-none tracking-[0] text-[#154527] md:text-[14px]">{item.source}</p>
    <h4 className="mt-[6px] text-[12px] font-normal leading-[1.35] tracking-[0] text-[#154527] md:mt-[3px] md:text-[14px]">{item.title}</h4>
    <p className="mt-[8px] text-[11px] font-light leading-[1.45] tracking-[0] text-[#547257] md:mt-[17px] md:text-[14px]">{item.excerpt}</p>
  </article>
);

const JournalPage = () => {
  // Auto-switch all blog cards between image and details together.
  const [flipped, setFlipped] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  // API content only — start empty and fill once the request resolves (no local
  // blogs shown first). `loaded` guards the empty-state message during loading.
  const [blogList, setBlogList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setFlipped((current) => !current), 2500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let mounted = true;
    getBlogList()
      .then((list) => {
        if (mounted) setBlogList(list);
      })
      .catch((error) => console.error("Failed to load blogs from API:", error))
      .finally(() => {
        if (mounted) setLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const sortLabel = sortOptions.find((option) => option.value === sortValue)?.label;
  const filterLabel = filterOptions.find((option) => option.value === filterValue)?.label;

  const visibleBlogs = blogList
    .filter((blog) => !filterValue || blog.category === filterValue)
    .sort((a, b) => {
      if (!sortValue) return 0;
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortValue === "oldest" ? diff : -diff;
    });

  const resetFilters = () => {
    setSortValue(null);
    setFilterValue(null);
  };

  return (
    <main className="bg-white font-sans text-[#154527]">
      <F31Header navigation={mainNavigation} floating={false} />

      {/* our blogs */}
      <section className="mx-auto max-w-[1440px] px-[24px] pt-[34px] md:px-[50px] md:pt-0 md:pb-[20px]">
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-[20px]">
          <SectionHeading>
            our
            <br className="hidden md:block" /> blogs
          </SectionHeading>

          <div className="mt-[18px] md:mt-[50px]">
            <p className="text-[12px] font-light leading-[16px] tracking-[0] text-[#547257] md:text-[14px] md:leading-[20px]">Insights, tips, and stories from the world of epic.</p>
            <div className="mt-[18px] md:mt-[42px]">
              {/* Mobile: single combined dropdown */}
              <MobileFilters sortValue={sortValue} filterValue={filterValue} onSort={setSortValue} onFilter={setFilterValue} onClear={resetFilters} />

              {/* Desktop: three separate dropdowns */}
              <div className="hidden md:flex md:gap-[18px]">
                <Dropdown label="sort by" value={sortLabel} options={sortOptions} onSelect={setSortValue} className="flex-1" />
                <Dropdown label="filter by" value={filterLabel} options={filterOptions} onSelect={setFilterValue} className="flex-1" />
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex h-[34px] flex-1 items-center justify-between gap-[18px] rounded-full bg-[#D9D9D933] px-[20px] text-[12px] font-light lowercase tracking-[0] text-[#a0a0a0] transition hover:bg-[#D9D9D94d]"
                >
                  filters off
                  <ChevronDown size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* blog grid */}
      <section className="mx-auto max-w-[1440px] px-[32px] pt-[26px] md:px-[50px] md:pt-[44px]">
        <div className="grid gap-x-[20px] gap-y-[32px] md:grid-cols-2 md:gap-y-[48px] md:gap-x-[30px]">
          {visibleBlogs.map((blog) => (
            <Link key={blog.slug} to={`/our-journal/blog/${encodeURIComponent(blog.slug)}`} className="group block">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={resolveAssetUrl(blog.image)}
                  alt={blog.title}
                  className={`h-full w-full object-cover transition-opacity duration-1000 group-hover:opacity-0 ${flipped ? "opacity-0" : "opacity-100"}`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-[#D9D9D933] px-[40px] text-center transition-opacity duration-1000 group-hover:opacity-100 ${flipped ? "opacity-100" : "opacity-0"}`}
                >
                  <p className="line-clamp-3 text-[13px] font-normal leading-[19px] tracking-[0] text-[#154527] md:text-[14px] md:leading-[20px]">{blog.description}</p>
                  <span className="mt-[24px] text-[12px] font-normal uppercase tracking-[0.12em] text-[#FAD7D3] md:mt-[28px]">Read more</span>
                </div>
              </div>
              <p className="mt-[14px] text-[12px] font-light leading-none tracking-[0] text-[#547257] md:mt-[16px]">{blog.date}</p>
              <h3 className="mt-[8px] text-[13px] font-normal uppercase leading-[1.4] tracking-[0] text-[#547257] md:text-[14px] md:mt-[3px]">{blog.title}</h3>
            </Link>
          ))}
        </div>
        {loaded && visibleBlogs.length === 0 ? <p className="py-[40px] text-center text-[13px] font-light tracking-[0] text-[#547257]">No blogs match the selected filter.</p> : null}
      </section>

      {/* epic in the news */}
      <section className="mx-auto max-w-[1440px] px-[24px] pt-[60px] md:px-[50px] md:pt-[75px]">
        <SectionHeading>
          epic
          <br /> in the news
        </SectionHeading>

        {/* Mobile: swipe / scroll */}
        <div className="no-scrollbar mt-[24px] flex items-start gap-[16px] overflow-x-auto pb-[6px] md:hidden">
          {news.map((item) => (
            <NewsCard key={item.source} item={item} />
          ))}
        </div>

        {/* Desktop: auto carousel */}
        <AutoCarousel
          items={news}
          getKey={(item) => item.source}
          className="mt-[35px] hidden md:block"
          trackClassName="news-carousel-track items-start gap-[24px]"
          renderItem={(item, key) => <NewsCard key={key} item={item} />}
        />
      </section>

      <div className="mt-[70px] md:mt-[60px]">
        <SiteFooter />
      </div>
    </main>
  );
};

export default JournalPage;
