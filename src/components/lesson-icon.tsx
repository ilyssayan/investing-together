import { BookOpen } from "lucide-react";
import { referenceIcon } from "@/lib/palette";

// Shapes distinguish lessons; color does not encode their order.
type Shades = { solid: string; mid: string; tint: string };

const shapes = ({ solid: DARK, mid: MID, tint: LIGHT }: Shades) => [
  // Rising blocks: growth
  <>
    <rect x="6" y="30" width="12" height="12" rx="2" fill={LIGHT} />
    <rect x="18" y="20" width="12" height="22" rx="2" fill={MID} />
    <rect x="30" y="8" width="12" height="34" rx="2" fill={DARK} />
  </>,
  // Three different shapes: stocks, bonds, funds
  <>
    <circle cx="15" cy="15" r="9" fill={MID} />
    <rect x="26" y="6" width="16" height="16" rx="3" fill={DARK} />
    <path d="M8 42 L24 26 L40 42 Z" fill={LIGHT} />
  </>,
  // Many small dots around one: spreading out
  <>
    <circle cx="24" cy="24" r="8" fill={DARK} />
    <circle cx="9" cy="12" r="4" fill={MID} />
    <circle cx="39" cy="12" r="4" fill={LIGHT} />
    <circle cx="9" cy="37" r="4" fill={LIGHT} />
    <circle cx="39" cy="37" r="4" fill={MID} />
  </>,
  // A dial: credit score
  <>
    <path d="M6 34 A18 18 0 0 1 42 34" fill="none" stroke={LIGHT} strokeWidth="7" strokeLinecap="round" />
    <path d="M6 34 A18 18 0 0 1 30 17" fill="none" stroke={DARK} strokeWidth="7" strokeLinecap="round" />
    <circle cx="24" cy="34" r="4" fill={MID} />
  </>,
  // A whole and the slice owed: debt and interest
  <>
    <circle cx="24" cy="24" r="17" fill={LIGHT} />
    <path d="M24 24 L24 7 A17 17 0 0 1 40 30 Z" fill={DARK} />
  </>,
  // Compound growth: a curve building on itself.
  <>
    <path d="M7 7v34h35" fill="none" stroke={MID} strokeWidth="3" strokeLinecap="round" />
    <path d="M10 35c17 0 22-8 27-25" fill="none" stroke={DARK} strokeWidth="4" strokeLinecap="round" />
    <circle cx="37" cy="10" r="5" fill={LIGHT} stroke={DARK} strokeWidth="2" />
  </>,
  // Inflation: a price tag and an upward price arrow.
  <>
    <path d="M6 18L18 6h13v13L18 32 6 20Z" fill={LIGHT} stroke={MID} strokeWidth="2" />
    <circle cx="24" cy="12" r="2.5" fill={DARK} />
    <path d="M35 40V22m-6 6 6-6 6 6" fill="none" stroke={DARK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  // Index funds: a collection inside a single frame.
  <>
    <rect x="5" y="7" width="38" height="34" rx="5" fill="none" stroke={DARK} strokeWidth="3" />
    <path d="M5 17h38" stroke={DARK} strokeWidth="3" />
    <rect x="11" y="23" width="7" height="11" rx="2" fill={MID} />
    <rect x="21" y="23" width="7" height="11" rx="2" fill={LIGHT} />
    <rect x="31" y="23" width="6" height="11" rx="2" fill={DARK} />
  </>,
  // Reading headlines: a news page with a magnifying glass.
  <>
    <rect x="6" y="5" width="29" height="36" rx="3" fill={LIGHT} />
    <path d="M12 13h17M12 20h12M12 27h7" stroke={MID} strokeWidth="3" strokeLinecap="round" />
    <circle cx="31" cy="29" r="8" fill="none" stroke={DARK} strokeWidth="3" />
    <path d="m37 35 6 7" stroke={DARK} strokeWidth="3" strokeLinecap="round" />
  </>,
];

// Explicit semantic mapping: reordering or adding lessons never cycles icons.
const iconByLesson: Record<string, number> = {
  "what-is-investing": 0,
  "stocks-bonds-funds": 1,
  "risk-and-diversification": 2,
  "credit-scores": 3,
  "understanding-debt": 4,
  "compound-growth": 5,
  "inflation-and-purchasing-power": 6,
  "index-funds-and-fees": 7,
  "reading-financial-headlines": 8,
};

export function LessonIcon({ slug, className = "size-12", shades }: { slug: string; className?: string; shades?: Shades }) {
  const icon = iconByLesson[slug];
  if (icon === undefined) return <BookOpen className={className} aria-hidden />;
  return <svg viewBox="0 0 48 48" aria-hidden className={className}>{shapes(shades ?? referenceIcon)[icon]}</svg>;
}
