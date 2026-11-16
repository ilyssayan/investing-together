import { RevealText } from "@/components/motion/reveal-text";

// Shared page frame: animated title, intro line, then the page's content.
export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-4">
        <RevealText
          segments={[title]}
          className="text-4xl leading-tight font-bold sm:text-5xl"
        />
        {intro && (
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{intro}</p>
        )}
      </div>
      {children}
    </main>
  );
}
