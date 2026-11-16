// The forum's ground rules, shown beside every community page.
const rules = [
  ["Never share your own numbers", "Use a made-up example instead of your real income, savings or debts."],
  ["Say where a tip came from", "Add a source so others can check it."],
  ["No buy or sell advice", "Explain how things work. Don't tell people what to do with their money."],
  ["Be kind", "Every question was new to someone once."],
];

export function Rules() {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      <section className="rounded-xl border bg-card p-6">
        <h2 className="eyebrow mb-4">Ground rules</h2>
        <ol className="flex flex-col gap-4">
          {rules.map(([title, text], i) => (
            <li key={title} className="flex gap-3">
              <span className="font-semibold text-muted-foreground tabular-nums">{i + 1}</span>
              <span>
                <span className="block font-medium">{title}</span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}
