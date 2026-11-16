import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { glossary, lessons } from "@/lib/mock-data";
import { definitionParts, termSlug } from "@/lib/glossary";
import { LinkedDefinition } from "@/components/linked-definition";

export function generateStaticParams() {
  return glossary.map(entry => ({ slug: termSlug(entry.term) }));
}

export default async function TermPage({ params }: { params: Promise<{slug: string}> }) {
  const { slug } = await params;
  const entry = glossary.find(term => termSlug(term.term) === slug);
  if (!entry) notFound();
  const related = [...new Set(definitionParts([entry.meaning, entry.explanation, entry.example, entry.takeaway].join(" "), entry.term).flatMap(part=>part.href ? [part.href] : []))];
  const usedIn = lessons.filter(lesson=>lesson.terms.includes(entry.term));
  return <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-6 py-12 sm:py-16">
    <Link href="/glossary" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft size={16}/>Search all terms</Link>
    <article className="mt-12"><p className="eyebrow">Investing, together / Glossary</p><h1 className="mt-4 text-4xl leading-tight font-bold sm:text-5xl">{entry.term}</h1><p className="mt-7 max-w-2xl text-xl leading-9 text-muted-foreground"><LinkedDefinition text={entry.meaning} currentTerm={entry.term}/></p>
    <section className="mt-10 max-w-2xl"><h2 className="text-2xl font-semibold">How it works</h2><p className="mt-3 leading-8 text-muted-foreground"><LinkedDefinition text={entry.explanation} currentTerm={entry.term}/></p></section>
    <section className="mt-8 rounded-2xl border bg-secondary/50 p-6 sm:p-8"><p className="eyebrow">A hypothetical example</p><p className="mt-3 max-w-2xl text-lg leading-8"><LinkedDefinition text={entry.example} currentTerm={entry.term}/></p></section>
    <section className="mt-8 max-w-2xl"><h2 className="text-2xl font-semibold">Keep in mind</h2><p className="mt-3 leading-8 text-muted-foreground"><LinkedDefinition text={entry.takeaway} currentTerm={entry.term}/></p></section>
    <p className="mt-8 text-sm text-muted-foreground">Read more: <a href={entry.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">{entry.source.title}</a></p>
    {related.length > 0 && <section className="mt-10 border-t pt-6"><h2 className="eyebrow mb-4">Connected terms</h2><ul className="flex flex-wrap gap-3">{related.map(href=><li key={href}><Link href={href} className="inline-flex items-center gap-3 rounded-lg border px-4 py-3 text-sm hover:bg-secondary">{glossary.find(term=>`/glossary/${termSlug(term.term)}`===href)?.term}<ArrowRight size={14}/></Link></li>)}</ul></section>}
    {usedIn.length > 0 && <section className="mt-10 border-t pt-6"><h2 className="eyebrow mb-4">Explore this idea in a lesson</h2><ul className="divide-y">{usedIn.map(lesson=><li key={lesson.slug}><Link href={`/learn/${lesson.slug}`} className="flex items-center justify-between gap-4 py-4 font-medium hover:text-primary">{lesson.title}<ArrowRight size={17}/></Link></li>)}</ul></section>}
    </article>
  </main>;
}
