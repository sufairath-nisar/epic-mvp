import { useState } from "react";
import { Link } from "../../router/RouterProvider";

const defaultStyles = {
  section: "bg-white px-4 py-10 text-[#154527] md:px-[50px] md:pb-[60px] md:pt-[66px]",
  container: "mx-auto max-w-[1340px]",
  heading: "font-display text-[45px] font-bold leading-[0.95] tracking-[0] text-[#FAD7D3] md:text-[86px]",
  mobileCarousel: "-mr-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pr-4 md:hidden",
  mobileCardWrap: "w-[calc(100vw-80px)] min-w-[calc(100vw-80px)] snap-start",
  grid: "mt-[72px] hidden gap-5 md:grid md:grid-cols-3 md:gap-[26px]",
  card:
    "group relative flex min-h-[424px] flex-col overflow-hidden rounded-[18px] border-2 bg-white pt-[43px] text-[#154527] transition-colors duration-200 hover:border-[#FCEFA7] focus-within:border-[#FCEFA7]",
  inactiveCard: "border-[#ededed]",
  activeCard: "border-[#FCEFA7]",
  badge:
    "absolute left-[64px] top-[-1px] flex h-[24px] items-center rounded-b-[4px] bg-[#FCEFA7] px-[18px] text-[12px] font-normal leading-none text-[#154527] md:text-[16px]",
  dot: "h-[22px] w-[22px] rounded-full",
  top: "px-[34px] pb-[24px]",
  title: "mt-[20px] font-display text-[21px] font-bold lowercase leading-[1] tracking-[0] text-[#154527] md:text-[32px]",
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

const MembershipsSection = ({ plans, title = "our\nmemberships", styles = defaultStyles }) => {
  const [selectedPlan, setSelectedPlan] = useState("");

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

        <div className={styles.mobileCarousel}>
          {plans.map((plan) => (
            <div key={plan.name} className={styles.mobileCardWrap}>
              <MembershipCard
                plan={plan}
                styles={styles}
                isActive={selectedPlan === plan.name}
                onSelect={() => setSelectedPlan(plan.name)}
              />
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <MembershipCard
              key={plan.name}
              plan={plan}
              styles={styles}
              isActive={selectedPlan === plan.name}
              onSelect={() => setSelectedPlan(plan.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MembershipCard = ({ plan, styles, isActive, onSelect }) => {
  const isFeatured = Boolean(plan.badge);

  return (
    <article
      className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
      onClick={onSelect}
    >
      {plan.badge && <p className={styles.badge}>{plan.badge}</p>}

      <div className={styles.top}>
        <span className={`block ${styles.dot}`} style={{ backgroundColor: plan.highlight }} />
        <h3 className={styles.title}>{plan.name}</h3>
        <p className={styles.audience}>
          {plan.audience.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className={`${styles.detailPanel} ${(isFeatured || isActive) ? styles.detailPanelActive : ""}`}>
        <p className={styles.price}>
          {plan.price}
          <span className={styles.priceMeta}>{plan.period}</span>
        </p>
        <p className={`mt-[9px] ${styles.priceMeta}`}>{plan.billing}</p>

        <Link to={plan.href ?? "/join-epic/membership/checkout"} className={styles.button} onClick={onSelect}>
          Select plan
        </Link>

        <h4 className={styles.included}>What&apos;s included</h4>
        <ul className={styles.benefits}>
          {plan.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default MembershipsSection;
