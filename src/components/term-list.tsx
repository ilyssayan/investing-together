import Link from "next/link";
import { termSlug } from "@/lib/glossary";
import { LinkedDefinition } from "@/components/linked-definition";
import { findTerm } from "@/lib/mock-data";

// Plain-language definitions for the financial terms used on a page.
export function TermList({ terms }: { terms: string[] }) {
  return (
    <dl className="flex flex-col gap-2 rounded-lg bg-muted p-4 text-sm">
      {terms.map((term) => (
        <div key={term}>
          <dt className="inline font-medium"><Link href={`/glossary/${termSlug(term)}`} className="underline underline-offset-4">{term}</Link>: </dt>
          <dd className="inline text-muted-foreground">
            <LinkedDefinition text={findTerm(term)?.meaning ?? ""} currentTerm={term}/>
          </dd>
        </div>
      ))}
    </dl>
  );
}
