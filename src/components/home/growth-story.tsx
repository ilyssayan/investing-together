"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { dollars } from "@/lib/format";
import { EXAMPLE_RATE, futureValue } from "@/lib/mock-data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The story: $25 a month for 30 years at the example growth rate.
const MONTHLY = 25;
const YEARS = 30;
const W = 600;
const H = 320;

const putIn = (year: number) => MONTHLY * 12 * year;
const worth = (year: number) => futureValue(MONTHLY, year, EXAMPLE_RATE);
const MAX = worth(YEARS);
const x = (year: number) => (year / YEARS) * W;
const y = (value: number) => H - (value / MAX) * (H - 16);

const points = Array.from({ length: YEARS + 1 }, (_, year) => year);
const curve = points.map((yr) => `${x(yr).toFixed(1)},${y(worth(yr)).toFixed(1)}`);
const curvePath = `M${curve.join(" L")}`;
const areaPath = `${curvePath} L${W},${H} L0,${H} Z`;

// Each caption shows while the scroll is inside its range of years.
const steps = [
  {
    until: 4,
    title: "Start with $25 a month.",
    body: "About the price of a couple of lunches. Nothing dramatic happens at first, and that's normal.",
  },
  {
    until: 14,
    title: "Ten years in, it's quietly ahead.",
    body: `You've put in ${dollars(putIn(10))}. It could be worth about ${dollars(worth(10))}.`,
  },
  {
    until: 24,
    title: "By year twenty, growth is catching up to you.",
    body: `You've put in ${dollars(putIn(20))}. Growth could have added about ${dollars(worth(20) - putIn(20))} on top.`,
  },
  {
    until: YEARS,
    title: "At thirty years, time has done most of the work.",
    body: `${dollars(putIn(YEARS))} put in. About ${dollars(worth(YEARS))} to show for it.`,
  },
];

export function GrowthStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = <T extends Element>(name: string) =>
        el.querySelector<T>(`[data-part="${name}"]`)!;
      const captions = el.querySelectorAll<HTMLElement>("[data-step]");

      // Draw the whole scene for a given (fractional) year.
      const render = (year: number) => {
        q("clip").setAttribute("width", String(x(year)));
        q("dot").setAttribute("cx", String(x(year)));
        q("dot").setAttribute("cy", String(y(worth(year))));
        q("put-dot").setAttribute("cx", String(x(year)));
        q("put-dot").setAttribute("cy", String(y(putIn(year))));
        q("year").textContent = `Year ${Math.round(year)}`;
        q("worth").textContent = dollars(worth(year));
        q("put").textContent = dollars(putIn(year));
        const current = steps.findIndex((s) => year <= s.until);
        captions.forEach((c, i) => {
          c.dataset.active = String(i === current);
        });
      };

      const mm = gsap.matchMedia();
      // Only pin and scrub when the person hasn't asked for reduced motion.
      // Otherwise the section stays as rendered: the finished chart and all
      // four captions in a list.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.config({ ignoreMobileResize: true });
        el.dataset.animated = "true";
        const state = { year: 0 };
        render(0);

        gsap.to(state, {
          year: YEARS,
          ease: "none",
          onUpdate: () => render(state.year),
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        return () => {
          delete el.dataset.animated;
          render(YEARS);
          captions.forEach((c) => delete c.dataset.active);
        };
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="group/story bg-tint-sage/60"
      aria-label="How $25 a month could grow over 30 years"
    >
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center gap-8 px-6 pt-20 pb-10 lg:grid lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16">
        <div>
          {/* Animated: captions share one grid cell and cross-fade.
              Reduced motion: they simply stack as a list. */}
          <ol className="grid gap-8 group-data-[animated=true]/story:gap-0">
            {steps.map((step) => (
              <li
                key={step.title}
                data-step
                className="flex flex-col gap-3 transition-[opacity,translate] duration-500 group-data-[animated=true]/story:[grid-area:1/1] group-data-[animated=true]/story:translate-y-3 group-data-[animated=true]/story:opacity-0 group-data-[animated=true]/story:data-[active=true]:translate-y-0 group-data-[animated=true]/story:data-[active=true]:opacity-100"
              >
                <h2 className="text-3xl leading-tight font-bold sm:text-4xl">
                  {step.title}
                </h2>
                <p className="max-w-md text-base text-muted-foreground sm:text-lg">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4 tabular-nums">
            <p data-part="year" className="text-sm text-muted-foreground">
              Year {YEARS}
            </p>
            <p
              data-part="worth"
              className="text-4xl font-bold sm:text-5xl"
            >
              {dollars(MAX)}
            </p>
          </div>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full overflow-visible"
            role="img"
            aria-label={`Chart: putting in ${dollars(MONTHLY)} a month for ${YEARS} years adds up to ${dollars(putIn(YEARS))} and could grow to about ${dollars(MAX)}.`}
          >
            <defs>
              <clipPath id="story-clip">
                <rect data-part="clip" x="0" y="-20" width={W} height={H + 40} />
              </clipPath>
            </defs>
            <line x1="0" y1={H} x2={W} y2={H} stroke="currentColor" strokeOpacity="0.25" />
            <g clipPath="url(#story-clip)">
              <path d={areaPath} className="fill-success/10" />
              <path
                d={`M0,${H} L${W},${y(putIn(YEARS)).toFixed(1)}`}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.55"
                strokeWidth="2"
                strokeDasharray="5 6"
              />
              <path d={curvePath} fill="none" className="stroke-success" strokeWidth="3" />
            </g>
            <circle data-part="put-dot" cx={W} cy={y(putIn(YEARS))} r="4" fill="currentColor" />
            <circle data-part="dot" cx={W} cy={y(MAX)} r="6" className="fill-success" />
          </svg>

          <figcaption className="flex flex-col gap-2 text-sm">
            <div className="flex flex-wrap gap-x-6 gap-y-1 tabular-nums">
              <span className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-success" /> Could be worth
              </span>
              <span className="flex items-center gap-2">
                <span className="w-5 border-t-2 border-dashed border-current opacity-60" />
                You put in: <span data-part="put">{dollars(putIn(YEARS))}</span>
              </span>
            </div>
            <p className="text-muted-foreground">
              Example using {EXAMPLE_RATE * 100}% growth a year.
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
