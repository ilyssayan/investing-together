// Three small charts on the same scale, side by side: the same three years
// with money in 1 company, spread over 5, and spread over 30. No controls;
// the comparison is the point.

// --- Simulated data -------------------------------------------------------
// Made-up monthly prices for 30 pretend companies over 3 years, generated
// from a fixed seed so everyone sees the same charts. Not real market data.

const COMPANIES = 30;
const MONTHS = 36;
const W = 240;
const H = 150;

function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seed chosen so the first company has a clearly bumpy ride.
const rand = seeded(366);
// Roughly bell-shaped random number centred on 0.
const noise = () => rand() + rand() + rand() + rand() - 2;

// Every company shares some market movement and adds a lot of its own.
const market = Array.from({ length: MONTHS }, () => noise() * 0.06);
const companies = Array.from({ length: COMPANIES }, () => {
  let price = 100;
  return [
    100,
    ...market.map((m) => (price *= 1 + 0.006 + m + noise() * 0.14)),
  ];
});

// Value over time of money split evenly across the first n companies.
const portfolio = (n: number) =>
  companies[0].map(
    (_, month) => companies.slice(0, n).reduce((sum, c) => sum + c[month], 0) / n,
  );

// Biggest fall from a high point to a later low point, as a fraction.
const biggestDrop = (series: number[]) => {
  let peak = series[0];
  let worst = 0;
  for (const v of series) {
    peak = Math.max(peak, v);
    worst = Math.max(worst, (peak - v) / peak);
  }
  return worst;
};

const panels = [1, 5, 30].map((count) => {
  const series = portfolio(count);
  return { count, series, drop: biggestDrop(series) };
});

const all = panels.flatMap((p) => p.series);
const LOW = Math.min(...all);
const HIGH = Math.max(...all);
const px = (month: number) => (month / MONTHS) * W;
const py = (value: number) => H - ((value - LOW) / (HIGH - LOW)) * H;
const pathFor = (series: number[]) =>
  "M" + series.map((v, m) => `${px(m).toFixed(1)},${py(v).toFixed(1)}`).join(" L");

export function DiversificationPanels() {
  return (
    <figure className="flex flex-col gap-6 rounded-xl border bg-card p-6 sm:p-8">
      <figcaption className="flex flex-col gap-1">
        <span className="text-lg font-semibold">
          The same three years, spread across more companies
        </span>
        <span className="text-muted-foreground">
          Each chart shows how your money&apos;s value moves. The dashed line is
          where you started.
        </span>
      </figcaption>

      <div className="grid gap-6 sm:grid-cols-3">
        {panels.map((panel) => (
          <div key={panel.count} className="flex flex-col gap-2">
            <p className="font-medium">
              {panel.count} {panel.count === 1 ? "company" : "companies"}
            </p>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full overflow-visible"
              role="img"
              aria-label={`Simulated value over three years with money in ${panel.count} ${panel.count === 1 ? "company" : "companies"}. Biggest drop ${Math.round(panel.drop * 100)} percent.`}
            >
              <line
                x1="0"
                x2={W}
                y1={py(100)}
                y2={py(100)}
                className="stroke-foreground/30"
                strokeDasharray="4 5"
              />
              <path
                d={pathFor(panel.series)}
                fill="none"
                className="stroke-chart-1"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-muted-foreground">
              Biggest drop{" "}
              <span className="text-xl font-semibold text-foreground tabular-nums">
                −{Math.round(panel.drop * 100)}%
              </span>
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Simulated example. Spreading out smooths the ride, but it can&apos;t remove every dip: when
        the whole market falls, most companies fall with it.
      </p>
    </figure>
  );
}
