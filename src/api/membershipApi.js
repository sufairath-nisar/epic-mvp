import { apiGet } from "./apiClient";

// Membership packages: /v3/membership/packages/public/packages
// One source feeds both the Find Epic "our memberships" cards and the
// Join Epic membership step, so the mapped shape carries fields for both:
//   Cards (MembershipsSection): name, price, period, billing, audience, benefits, highlight, badge, href
//   Plan rows (JoinMembership):  id, title, price

// Local accent colours used for the card dot (the API has no colour field).
const HIGHLIGHTS = ["#FCEFA7", "#FAD7D3", "#154527"];

// Shown wherever the API has no content for a field.
const NOT_UPLOADED = "Not uploaded yet";

// benefit_details comes back as an HTML string; turn it into clean text lines.
function htmlToLines(html) {
  if (!html) return [];
  return html
    .replace(/<\/(p|div|li|ul|ol|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function findPrice(pkg, frequency) {
  const prices = pkg.package_prices ?? [];
  return prices.find((p) => p.frequency === frequency && p.section === "Individual") ?? prices.find((p) => p.frequency === frequency) ?? null;
}

const formatAmount = (amount) => `$${Number(amount)}`;

export function mapPackage(pkg, index = 0) {
  const monthly = findPrice(pkg, "M");
  const yearly = findPrice(pkg, "Y");
  const hasOneTime = pkg.one_time_price != null && pkg.one_time_price !== "";
  const baseAmount = monthly?.amount ?? (hasOneTime ? Number(pkg.one_time_price) : null);
  const benefitLines = htmlToLines(pkg.benefit_details);

  const hasName = Boolean(pkg.name);
  const hasPrice = baseAmount != null;
  const hasDescription = Boolean(pkg.description);
  const hasBenefits = benefitLines.length > 0;
  // "Complete" = the main card content is all present (name, price,
  // description, benefits). Used to surface fully-populated cards first.
  const isComplete = hasName && hasPrice && hasDescription && hasBenefits;

  // Every text field falls back to "Not uploaded yet" when the API has no value.
  return {
    id: pkg.id,
    name: pkg.name || NOT_UPLOADED,
    title: pkg.name || NOT_UPLOADED,
    isDefault: Boolean(pkg.is_default),
    isComplete,
    amount: hasPrice ? Number(baseAmount) : 0,
    price: hasPrice ? formatAmount(baseAmount) : NOT_UPLOADED,
    period: monthly ? "/month" : "",
    billing: yearly ? `or ${formatAmount(yearly.amount)} billed annually` : NOT_UPLOADED,
    // Keep the subtitle two lines: real description on line 1, filler on line 2.
    audience: [hasDescription ? pkg.description : NOT_UPLOADED, NOT_UPLOADED],
    // Show at most 5 benefit lines; fall back to a single "Not uploaded yet" line.
    benefits: hasBenefits ? benefitLines.slice(0, 5) : [NOT_UPLOADED],
    highlight: HIGHLIGHTS[index % HIGHLIGHTS.length],
    badge: null,
    href: "/join-epic/membership/checkout"
  };
}

export async function getMembershipPackages() {
  const response = await apiGet("/v3/membership/packages/public/packages");
  const rows = Array.isArray(response?.data) ? response.data : [];

  const filtered = rows.filter((pkg) => pkg.is_active && !pkg.is_corporate);
  // Default package first, keep the API order otherwise.
  filtered.sort((a, b) => Number(b.is_default) - Number(a.is_default));

  return filtered.map(mapPackage);
}
