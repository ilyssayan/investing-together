export const dollars = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

// Shared easing for entrances: fast start, long soft landing.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
