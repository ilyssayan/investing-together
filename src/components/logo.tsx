// The brand mark is the comma from "Investing, together." — the small pause
// that joins the two words.
export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <circle cx="16.5" cy="13.5" r="5.2" className="fill-white" />
      <path
        d="M21.6 14.6c.1 5.3-2.9 9.2-7.9 10.6l-.7-1.9c2.4-1 3.9-2.7 4.3-5.2z"
        className="fill-white"
      />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-lg font-bold tracking-tight">
      Investing<span className="text-brand">,</span> together
    </span>
  );
}
