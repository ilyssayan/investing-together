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
];

export function LessonIcon({ index, className = "size-12", shades }: { index: number; className?: string; shades?: Shades }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      {shapes(shades ?? referenceIcon)[index % 5]}
    </svg>
  );
}
