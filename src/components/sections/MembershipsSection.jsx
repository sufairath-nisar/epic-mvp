import { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "../../router/RouterProvider";
import { saveSelectedMembership } from "../../utils/membershipFlow";

// Renders text on a single line, trimmed to only the WHOLE words that fit (no
// ellipsis, never a split word). Re-measures on resize and after fonts load.
const ClampWords = ({ text, className, as: Tag = "h3" }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !text) return undefined;

    const fit = () => {
      const words = text.split(/\s+/).filter(Boolean);
      el.textContent = text;
      // Skip when hidden/unlaid-out or single word — keep the full text.
      if (el.clientWidth === 0 || words.length <= 1) {
        setDisplay(text);
        return;
      }
      let count = words.length;
      while (count > 1 && el.scrollWidth > el.clientWidth) {
        count -= 1;
        el.textContent = words.slice(0, count).join(" ");
      }
      setDisplay(el.textContent);
    };

    fit();
    if (document.fonts?.ready) document.fonts.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {display}
    </Tag>
  );
};

const defaultStyles = {
  section: "bg-white px-4 py-10 text-[#154527] md:px-[50px] md:pb-[60px] md:pt-[66px]",
  container: "mx-auto max-w-[1340px]",
  heading: "font-display text-[45px] font-bold leading-[0.95] tracking-[0] text-[#FAD7D3] md:text-[86px]",
  mobileCarousel: "-mr-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pr-4 md:hidden",
  mobileCardWrap: "w-[calc(100vw-80px)] min-w-[calc(100vw-80px)] snap-start",
  desktopCarousel: "mt-[72px] hidden snap-x snap-mandatory gap-[26px] overflow-x-auto pb-4 md:flex",
  desktopCardWrap: "w-[calc((100%-52px)/3)] min-w-[340px] shrink-0 snap-start",
  card: "group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[18px] border-2 bg-white pt-[43px] text-[#154527] transition-colors duration-200 hover:border-[#FCEFA7] focus-within:border-[#FCEFA7]",
  inactiveCard: "border-[#ededed]",
  activeCard: "border-[#FCEFA7]",
  badge: "absolute left-[64px] top-[-1px] flex h-[24px] items-center rounded-b-[4px] bg-[#FCEFA7] px-[18px] text-[12px] font-normal leading-none text-[#154527] md:text-[16px]",
  dot: "h-[22px] w-[22px] rounded-full",
  top: "px-[34px] pb-[24px]",
  title: "mt-[20px] overflow-hidden whitespace-nowrap font-display text-[21px] font-bold lowercase leading-[1] tracking-[0] text-[#154527] md:text-[32px]",
  audience: "mt-[3px] text-[14px] font-normal leading-[16px] tracking-[0] text-[#547257] md:text-[20px] md:leading-[22px]",
  detailPanel: "flex flex-1 flex-col rounded-t-[20px] bg-[#f4f4f4] px-[34px] pb-[24px] pt-[25px] transition-colors duration-200 group-hover:bg-[#FFFCF2] group-focus-within:bg-[#FFFCF2]",
  detailPanelActive: "bg-[#FFFCF2]",
  price: "text-[22px] font-normal leading-none tracking-[0] text-[#154527] md:text-[32px]",
  priceMeta: "text-[11px] font-normal leading-none tracking-[0] text-[#547257] md:text-[16px]",
  button:
    "mt-[20px] flex h-[32px] w-full items-center justify-center rounded-[5px] bg-[#154527] text-[10px] font-normal uppercase leading-none tracking-[0] text-[#FCEFA7] transition hover:bg-[#FCEFA7] hover:text-[#154527] md:text-[16px]",
  included: "mt-[28px] text-[12px] font-medium leading-none tracking-[0] text-[#154527] md:text-[16px]",
  benefits: "mt-[16px] list-disc pl-[14px] text-[9px] font-normal leading-[12px] tracking-[0] text-[#547257] md:text-[12px] md:leading-[15px]"
};

const planKey = (plan) => plan.id ?? plan.name;

const MembershipsSection = ({ plans, title = "our\nmemberships", styles = defaultStyles }) => {
  const { navigate } = useRouter();
  const [selectedPlan, setSelectedPlan] = useState("");

  // Save the chosen plan and go to checkout so it shows the plan's details.
  const selectPlan = (plan) => {
    setSelectedPlan(planKey(plan));
    saveSelectedMembership(plan);
    navigate(plan.href ?? "/join-epic/membership/checkout");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {title.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Mobile: existing swipe scroll */}
        <div className={styles.mobileCarousel}>
          {plans.map((plan) => (
            <div key={planKey(plan)} className={styles.mobileCardWrap}>
              <MembershipCard plan={plan} styles={styles} isActive={selectedPlan === planKey(plan)} onSelect={() => setSelectedPlan(planKey(plan))} onSelectPlan={() => selectPlan(plan)} />
            </div>
          ))}
        </div>

        {/* Desktop: horizontal scroll carousel (handles many plans) */}
        <div className={styles.desktopCarousel}>
          {plans.map((plan) => (
            <div key={planKey(plan)} className={styles.desktopCardWrap}>
              <MembershipCard plan={plan} styles={styles} isActive={selectedPlan === planKey(plan)} onSelect={() => setSelectedPlan(planKey(plan))} onSelectPlan={() => selectPlan(plan)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MembershipCard = ({ plan, styles, isActive, onSelect, onSelectPlan }) => {
  const isFeatured = Boolean(plan.badge);

  return (
    <article className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`} onClick={onSelect}>
      {plan.badge && <p className={styles.badge}>{plan.badge}</p>}

      <div className={styles.top}>
        <span className={`block ${styles.dot} bg-[#154527] transition-colors group-hover:!bg-[#FCEFA7] group-focus-within:!bg-[#FCEFA7] ${isActive ? "!bg-[#FCEFA7]" : ""}`} />
        <ClampWords text={plan.name} className={styles.title} />
        <p className={styles.audience}>
          {plan.audience.map((line, index) => (
            <ClampWords key={index} as="span" text={line} className="block overflow-hidden whitespace-nowrap" />
          ))}
        </p>
      </div>

      <div className={`${styles.detailPanel} ${isFeatured || isActive ? styles.detailPanelActive : ""}`}>
        <p className={styles.price}>
          {plan.price}
          <span className={styles.priceMeta}>{plan.period}</span>
        </p>
        <p className={`mt-[9px] ${styles.priceMeta}`}>{plan.billing}</p>

        <button type="button" className={styles.button} onClick={onSelectPlan}>
          Select plan
        </button>

        <h4 className={styles.included}>What&apos;s included</h4>
        <ul className={styles.benefits}>
          {plan.benefits.map((benefit, index) => (
            <li key={`${benefit}-${index}`}>{benefit}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default MembershipsSection;
