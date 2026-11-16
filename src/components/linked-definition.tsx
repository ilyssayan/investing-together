import Link from "next/link";
import { definitionParts } from "@/lib/glossary";

export function LinkedDefinition({ text, currentTerm }: { text: string; currentTerm?: string }) {
  return <>{definitionParts(text, currentTerm).map((part, index) => part.href
    ? <Link key={index} href={part.href} className="font-medium text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary">{part.text}</Link>
    : <span key={index}>{part.text}</span>)}</>;
}
