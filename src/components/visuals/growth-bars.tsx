import { dollars } from "@/lib/format";
import { EXAMPLE_RATE, futureValue } from "@/lib/mock-data";

// One question, answered without any controls: if you put in the same $25 a
// month, how much of the final amount is your money and how much is growth,
// after 10, 20 and 30 years? Three bars on one shared scale.
const MONTHLY = 25;
const rows = [10, 20, 30].map((years) => {
  const putIn = MONTHLY * 12 * years;
  const total = futureValue(MONTHLY, years, EXAMPLE_RATE);
  return { years, putIn, growth: total - putIn, total };
});
const MAX = rows[rows.length - 1].total;

export function GrowthBars() {
  return (
    <figure className="flex flex-col gap-6 rounded-xl border bg-card p-6 sm:p-8">
      <figcaption className="flex flex-col gap-1">
        <span className="text-lg font-semibold">
          {dollars(MONTHLY)} a month, left to grow
        </span>
        <span className="text-muted-foreground">
          The amount you put in grows steadily. The growth on top speeds up the
          longer you leave it.
        </span>
      </figcaption>

      <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm" aria-hidden>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-chart-1" /> Money you put in
        </li>
        <li className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-chart-2" /> Growth
        </li>
      </ul>

      <div className="flex flex-col gap-5">
        {rows.map((row) => (
          <div key={row.years} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium">After {row.years} years</span>
              <span className="text-xl font-semibold tabular-nums">
                {dollars(row.total)}
              </span>
            </div>
            {/* Bar length is the total; the two parts sit end to end. */}
            <div
              className="flex h-7 gap-0.5"
              style={{ width: `${(row.total / MAX) * 100}%` }}
              role="img"
              aria-label={`After ${row.years} years: ${dollars(row.putIn)} put in plus ${dollars(row.growth)} of growth makes ${dollars(row.total)}`}
            >
              <div
                className="rounded-l-sm bg-chart-1"
                style={{ width: `${(row.putIn / row.total) * 100}%` }}
                title={`Money you put in: ${dollars(row.putIn)}`}
              />
              <div
                className="flex-1 rounded-r-sm bg-chart-2"
                title={`Growth: ${dollars(row.growth)}`}
              />
            </div>
            <p className="text-sm text-muted-foreground tabular-nums">
              {dollars(row.putIn)} put in + {dollars(row.growth)} growth
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Example using {EXAMPLE_RATE * 100}% growth a year.
      </p>
    </figure>
  );
}
