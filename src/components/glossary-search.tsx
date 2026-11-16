"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { glossary } from "@/lib/mock-data";
import { termSlug } from "@/lib/glossary";
import { LinkedDefinition } from "@/components/linked-definition";

const entries = [...glossary].sort((a,b) => a.term.localeCompare(b.term));

export function GlossarySearch() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const results = entries.filter(entry => `${entry.term} ${entry.meaning} ${entry.explanation} ${entry.example} ${entry.takeaway}`.toLowerCase().includes(search));
  return <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
    <aside><p className="eyebrow mb-4">A reference to return to</p><p className="text-sm leading-7 text-muted-foreground">Look up a term, then follow the linked words in its definition to connect the ideas.</p><Link href="/learn" className="mt-5 inline-block text-sm font-medium text-primary underline underline-offset-4">Back to the course</Link></aside>
    <section aria-label="Search the glossary">
      <label htmlFor="term-search" className="mb-3 block text-sm font-semibold">Find a financial term</label>
      <div className="flex items-center gap-3 rounded-xl border bg-card px-4"><Search size={20} aria-hidden className="shrink-0 text-muted-foreground"/><input id="term-search" type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Try ‘stock’, ‘interest’, or ‘borrowing’" className="min-w-0 flex-1 bg-transparent py-4 outline-none"/>{query && <button type="button" onClick={()=>setQuery("")} aria-label="Clear search" className="p-2"><X size={18}/></button>}</div>
      <p role="status" className="mt-4 text-xs text-muted-foreground">{results.length} {results.length === 1 ? "term" : "terms"}{search ? ` matching “${query.trim()}”` : " · A–Z"}</p>
      <dl className="mt-4 divide-y border-y">{results.map(entry=><div key={entry.term} className="py-6"><dt><Link href={`/glossary/${termSlug(entry.term)}`} className="group inline-flex items-center gap-3 font-display text-2xl font-semibold hover:text-primary">{entry.term}<ArrowUpRight size={16} className="text-muted-foreground" aria-hidden/></Link></dt><dd className="mt-2 max-w-2xl leading-7 text-muted-foreground"><LinkedDefinition text={entry.meaning} currentTerm={entry.term}/></dd><dd className="mt-3 max-w-2xl border-l-2 border-foreground/20 pl-4 text-sm leading-7 text-muted-foreground"><span className="font-semibold text-foreground">For example: </span><LinkedDefinition text={entry.example} currentTerm={entry.term}/></dd></div>)}</dl>
      {results.length===0 && <div className="py-12"><h2 className="text-xl font-semibold">No matching terms yet.</h2><p className="mt-2 text-muted-foreground">Try a shorter word or search for an idea in the definition.</p><button type="button" onClick={()=>setQuery("")} className="mt-5 text-sm font-semibold text-primary underline underline-offset-4">Browse all terms</button></div>}
    </section>
  </div>;
}
