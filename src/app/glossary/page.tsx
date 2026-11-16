import { PageShell } from "@/components/page-shell";
import { GlossarySearch } from "@/components/glossary-search";

export default function GlossaryPage() {
  return <PageShell title="Glossary" intro="Understand the words. Connect the ideas."><GlossarySearch/></PageShell>;
}
