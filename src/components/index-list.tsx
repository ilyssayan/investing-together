import Link from "next/link";

export type IndexItem = {
  href: string;
  title: string;
  description: string;
  meta?: string;
};

// Numbered editorial list of links, used for lessons and the home page
// sections. Hover is CSS only: the row tints, the title nudges right, and
// the arrow slides in.
export function IndexList({ items }: { items: IndexItem[] }) {
  return (
    <ol className="border-t">
      {items.map((item, i) => (
        <li key={item.href} className="border-b">
          <Link
            href={item.href}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 px-2 py-6 transition-colors duration-300 hover:bg-muted/70 sm:grid-cols-[4rem_1fr_auto] sm:px-4"
          >
            <span className="font-display text-sm text-muted-foreground tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
              <span className="font-display font-semibold text-2xl leading-snug sm:text-3xl">
                {item.title}
              </span>
              <span className="max-w-xl text-muted-foreground">
                {item.description}
              </span>
            </span>
            <span className="flex items-baseline gap-4 text-sm text-muted-foreground">
              {item.meta && <span className="hidden sm:inline">{item.meta}</span>}
              <span
                aria-hidden
                className="-translate-x-2 text-foreground opacity-0 transition-[opacity,translate] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
