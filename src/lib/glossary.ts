import { glossary } from "@/lib/mock-data";

export const termSlug = (term: string) => term.toLowerCase().replace(/\s+/g, "-");

// Match longer terms first, so “interest rate” stays one link.
const aliases = glossary.flatMap(entry => [
  { text: entry.term, term: entry.term },
  ...(["Stock", "Bond", "Fund", "Brokerage account"].includes(entry.term)
    ? [{ text: `${entry.term}s`, term: entry.term }] : []),
]).sort((a, b) => b.text.length - a.text.length);
const pattern = new RegExp(`\\b(${aliases.map(a => a.text).join("|")})\\b`, "gi");

export function definitionParts(text: string, currentTerm?: string) {
  return text.split(pattern).map(part => {
    const match = aliases.find(a => a.text.toLowerCase() === part.toLowerCase());
    return { text: part, href: match && match.term !== currentTerm ? `/glossary/${termSlug(match.term)}` : undefined };
  });
}
