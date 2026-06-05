import AutoCarousel from "../components/common/AutoCarousel";
import F31Header from "../components/f31/F31Header";
import SiteFooter from "../components/layout/SiteFooter";
import { ASSET_PATH } from "../constants/assets";
import { blogs } from "../data/journal";
import { mainNavigation } from "../data/routes";
import { Link, useRouter } from "../router/RouterProvider";

// Article body content — shape is ready to be fed from the backend.
const article = {
  intro:
    "In recent years, the debate of padel vs tennis has gained momentum among racquet sport enthusiasts and newcomers alike. Both sports offer dynamic gameplay, fitness benefits, and social engagement. Yet, they differ in court design, equipment, rules, and play style. At Epic Padel, we believe in empowering players to make informed choices. This article presents an in-depth, professional comparison of padel and tennis, guiding you toward the sport that aligns with your goals and preferences.",
  sections: [
    {
      heading: "1. origins and evolution",
      blocks: [
        { type: "p", text: "Tennis traces its modern roots to late 19th century England, evolving from various lawn games into the standardized sport we know today. Governed by organizations like the International Tennis Federation (ITF), it boasts four Grand Slam tournaments and a global professional circuit." },
        { type: "p", text: "You can learn more about the sport's history and rules on the Tennis page." },
        { type: "p", text: "Padel, by contrast, originated in Mexico in 1969 and rapidly spread through Spain and Argentina before reaching international popularity. It combines elements of squash and tennis, played in an enclosed court with walls that keep the ball in play. For a detailed overview of padel's development, visit the Padel page." }
      ]
    },
    {
      heading: "2. court dimensions and layout",
      blocks: [
        { type: "p", lead: "Tennis Court:", text: "A standard singles court measures 23.77 m in length and 8.23 m in width, while a doubles court extends to 10.97 m wide. The surface can be grass, clay, hard, or carpet, each affecting ball speed and bounce." },
        { type: "p", lead: "Padel Court:", text: "Significantly smaller at 20 m long and 10 m wide, a padel court features glass or mesh walls on all sides. These walls introduce strategic angles and rebound plays absent in tennis. The enclosed environment accelerates rallies and emphasizes placement over power." },
        { type: "p", text: "The compact size of a padel court makes it easier to cover ground, while the larger tennis court demands extensive lateral and longitudinal movement." }
      ]
    },
    {
      heading: "3. equipment essentials",
      blocks: [
        { type: "p", lead: "Racquet Differences:", text: "Tennis racquets rely on string tension for power and spin, whereas padel racquets use a solid core and surface texture to control spin off the serve." },
        { type: "p", lead: "Ball Dynamics:", text: "The slight pressure variation in padel balls optimizes play within the enclosed court, sustaining longer rallies." }
      ]
    },
    {
      heading: "4. gameplay and rules",
      blocks: [
        { type: "p", text: "Tennis employs a familiar scoring system: love, 15, 30, 40, game, with advantages and tiebreakers at specific thresholds. Points are won by outplaying an opponent in rallies, serves, and volleys." },
        { type: "p", text: "Padel adopts tennis-style scoring but typically in doubles format, which is the standard competitive setup. Serves must be underhand and bounce once before contact, adding a tactical layer. Players can play the ball off any wall after it bounces, significantly expanding shot variety." },
        { type: "p", text: "Key distinctions in play style:" },
        {
          type: "list",
          items: [
            { lead: "Serve:", text: "Tennis allows powerful overhand serves; padel restricts to underhand, emphasizing consistency." },
            { lead: "Walls:", text: "Padel's rebound walls demand anticipation and spatial awareness, unlike tennis's open court." },
            { lead: "Rally Length:", text: "Padel rallies tend to be longer due to the court's enclosed nature and emphasis on placement." }
          ]
        }
      ]
    },
    {
      heading: "5. physical demand and fitness benefits",
      blocks: [
        { type: "p", text: "Both sports offer comprehensive cardiovascular, strength, and agility training. However, their physical profiles differ:" },
        {
          type: "list",
          items: [
            { lead: "Tennis", text: "requires explosive sprints, high-power strokes, and substantial court coverage—ideal for athletes seeking intense interval workouts and muscular endurance." },
            { lead: "Padel", text: "involves rapid reflexes, quick directional changes, and sustained rallies within a smaller space, fostering agility, core stability, and anaerobic conditioning." }
          ]
        },
        { type: "p", text: "Beginners may find padel less physically intimidating, while seasoned racket sport athletes can push fitness limits more dramatically in tennis." }
      ]
    }
  ],
  conclusion: [
    "The padel vs tennis debate ultimately hinges on personal preference, goals, and play style. Tennis delivers powerful strokes, extensive court coverage, and individual challenges, while padel offers a team-oriented, wall-enhanced game with faster rally potential. By evaluating court dimensions, equipment, physical demands, and community aspects, you can select the sport that aligns with your aspirations.",
    "At Epic Padel, we invite you to explore both worlds. Visit us at Epic Padel Location to experience our facilities firsthand and discover the benefits of our community. Ready to take the next step? Check out our membership page and join a network of passionate players committed to excellence.",
    "Embrace the future of racquet sports, whether on the tennis baseline or bouncing off padel walls, your epic journey starts here."
  ]
};

const RelatedCard = ({ blog }) => (
  <Link to={`/our-journal/blog/${blog.slug}`} className="block w-[300px] shrink-0 md:w-[480px]">
    <img src={`${ASSET_PATH}${blog.image}`} alt={blog.title} className="aspect-[16/10] w-full object-cover" />
    <p className="mt-[14px] text-[12px] font-light leading-none tracking-[0] text-[#547257] md:mt-[16px]">{blog.date}</p>
    <h3 className="mt-[8px] text-[13px] font-normal uppercase leading-[1.4] tracking-[0] text-[#547257] md:mt-[3px] md:text-[14px]">{blog.title}</h3>
  </Link>
);

const Paragraph = ({ block }) => (
  <p>
    {block.lead ? <span className="font-normal text-[#154527]">{block.lead} </span> : null}
    {block.text}
  </p>
);

const ContentBlock = ({ block }) => {
  if (block.type === "list") {
    return (
      <ul className="ml-[16px] list-disc space-y-[8px] marker:text-[#154527]">
        {block.items.map((item, index) => (
          <li key={index}>
            {item.lead ? <span className="font-normal text-[#154527]">{item.lead} </span> : null}
            {item.text}
          </li>
        ))}
      </ul>
    );
  }

  return <Paragraph block={block} />;
};

const ArticleSection = ({ section }) => (
  <div className="break-inside-avoid">
    <h2 className="text-[13px] font-light lowercase tracking-[0] text-[#FAD7D3] md:text-[16px]">{section.heading}</h2>
    <div className="mt-[10px] space-y-[10px] text-[11px] font-light leading-[16px] tracking-[0] text-[#154527] md:mt-[14px] md:space-y-[12px] md:text-[14px] md:leading-[22px]">
      {section.blocks.map((block, index) => (
        <ContentBlock key={index} block={block} />
      ))}
    </div>
  </div>
);

const ArticlePage = () => {
  const { path } = useRouter();
  const slug = path.split("/")[3] || "";
  const current = blogs.find((blog) => blog.slug === slug) || blogs.find((blog) => blog.slug === "padel-tennis") || blogs[0];
  const related = blogs.filter((blog) => blog.slug !== current.slug);
  const { sections } = article;

  return (
    <main className="bg-white font-sans text-[#154527]">
      {/* Hero — image/title/date come from the selected blog */}
      <section className="relative">
        <img src={`${ASSET_PATH}${current.image}`} alt={current.title} className="h-[460px] w-full object-cover object-center md:h-[600px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <F31Header navigation={mainNavigation} />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-[24px] pb-[28px] md:px-[50px] md:pb-[50px]">
            <h1 className="max-w-[320px] font-display text-[28px] font-bold lowercase leading-[1.08] tracking-[0] text-[#FCEFA7] md:max-w-[780px] md:text-[54px] md:leading-[1.04]">
              {current.title}
            </h1>
            <p className="mt-[10px] text-[11px] font-light leading-none tracking-[0] text-white md:mt-[16px] md:text-[15px]">
              {current.date}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-[1040px] px-[24px] md:px-[40px]">
        <div className="mx-auto max-w-[840px] pt-[34px] text-center md:pt-[56px]">
          <p className="text-[12px] font-light leading-[18px] tracking-[0] text-[#154527] md:text-[15px] md:leading-[24px]">
            {article.intro}
          </p>
        </div>

        <div className="mt-[34px] grid grid-cols-2 gap-x-[20px] gap-y-[28px] md:mt-[56px] md:gap-x-[40px] md:gap-y-[44px]">
          <ArticleSection section={sections[0]} />
          <ArticleSection section={sections[1]} />
          <div className="col-span-2 aspect-[16/7] w-full bg-[#D9D9D9] md:aspect-[16/5]" />
          <ArticleSection section={sections[2]} />
          <ArticleSection section={sections[3]} />
          <ArticleSection section={sections[4]} />
        </div>

        <div className="mt-[40px] text-center md:mt-[64px]">
          <h2 className="text-[13px] font-light tracking-[0] text-[#FAD7D3] md:text-[16px]">Conclusion</h2>
          <div className="mx-auto mt-[14px] max-w-[760px] space-y-[12px] text-[11px] font-light leading-[16px] tracking-[0] text-[#154527] md:mt-[18px] md:text-[14px] md:leading-[22px]">
            {article.conclusion.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Related blogs */}
      <section className="mx-auto max-w-[1440px] px-[24px] pt-[64px] md:px-[50px] md:pt-[110px]">
        <h2 className="font-display text-[46px] font-bold lowercase leading-[0.95] tracking-[0] text-[#FAD7D3] md:text-[86px] md:leading-[1.02]">
          related blogs
        </h2>

        {/* Mobile: swipe / scroll */}
        <div className="no-scrollbar mt-[24px] flex gap-[16px] overflow-x-auto pb-[6px] md:hidden">
          {related.map((blog) => (
            <RelatedCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {/* Desktop: auto carousel */}
        <AutoCarousel
          items={related}
          getKey={(blog) => blog.slug}
          className="mt-[40px] hidden md:block"
          trackClassName="news-carousel-track items-start gap-[24px]"
          renderItem={(blog, key) => <RelatedCard key={key} blog={blog} />}
        />
      </section>

      <div className="mt-[70px] md:mt-[120px]">
        <SiteFooter />
      </div>
    </main>
  );
};

export default ArticlePage;
