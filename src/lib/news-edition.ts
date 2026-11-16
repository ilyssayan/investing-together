// A hand-checked edition of "News, explained".
//
// These events were written on November 15, 2026 from the CNBC articles
// linked under each one. The site shows this edition whenever live
// explanations are off (no ANTHROPIC_API_KEY) or unavailable, so the page
// always has real, sourced stories. To publish a new edition, replace the
// events below and update EDITION_DATE.

export type NewsSource = {
  title: string;
  publisher: string;
  url: string;
  published: string; // ISO date
};

export type NewsEvent = {
  slug: string;
  title: string;
  dek: string; // one or two sentences shown on the list page
  updated: string; // ISO date
  whatHappened: string[]; // paragraphs
  whyTheMarketCares: string;
  whatItMeansForYou: string;
  goodToKnow: string[]; // short takeaways
  terms: { term: string; meaning: string }[];
  lesson: string | null; // slug of the related lesson
  sources: NewsSource[];
};

export const EDITION_DATE = "2026-11-15";

const cnbc = (title: string, path: string, published: string): NewsSource => ({
  title,
  publisher: "CNBC",
  url: `https://www.cnbc.com/${path}`,
  published,
});

export const edition: NewsEvent[] = [
  {
    slug: "nvidia-ceo-jensen-huang-steps-down",
    title: "Nvidia's famous CEO stepped down, and the whole market noticed",
    dek: "Jensen Huang resigned on November 12. Nvidia is so big that its troubles reach people who never chose to buy its stock.",
    updated: "2026-11-15",
    whatHappened: [
      "Jensen Huang, the founder who led the chip company Nvidia, resigned as president, CEO and board member on Thursday, November 12. Nvidia's announcement did not give a reason. CNBC reports that it followed allegations about his personal relationships, including one with an executive at Megaspeed, a company suspected of smuggling restricted Nvidia chips to China. Nvidia's board has an independent investigation under way.",
      "Colette Kress, Nvidia's finance chief for 13 years, is running the company for now as interim CEO. Two large investors have publicly asked the board to take its time choosing a permanent leader, and lawmakers in Congress have called Huang to testify.",
      "Nvidia's shares fell 4% the day the news came out and kept sliding, ending the week at $162.85 after the stock's longest losing streak since 2012. Other chip makers rose: AMD gained close to 13% for the week, and the Nasdaq index had its best week since August.",
    ],
    whyTheMarketCares:
      "Nvidia makes chips that the AI industry depends on, and it is one of the largest companies in the stock market. When the person who built it leaves suddenly, investors rethink how much they trust its future, and some move their money to competitors. That is why Nvidia fell while its rivals rose in the same week.",
    whatItMeansForYou:
      "If you ever own a broad fund, like an S&P 500 fund or a retirement fund, you will probably own a little Nvidia without picking it. That is fine. A fund holds hundreds of companies, so a drop in one stock does not pull the fund down by the same amount. In a CNBC poll of 30 financial advisers, none were selling their Nvidia shares. Their main advice was to check how much of your money sits in one company and not to react to headlines.",
    goodToKnow: [
      "A company's stock can fall because of its leadership, even when its products have not changed.",
      "Spreading money across many companies is what protected most investors this week.",
      "Nvidia reports its latest quarterly results on Tuesday, November 17, which will show how the business itself is doing.",
    ],
    terms: [
      { term: "CEO", meaning: "Chief executive officer, the person in charge of running a company." },
      { term: "Interim", meaning: "Temporary. An interim CEO fills in until a permanent one is chosen." },
      { term: "Fund", meaning: "A basket of many investments you can buy all at once." },
      { term: "Index", meaning: "A list of stocks used to measure how a part of the market is doing, like the Nasdaq or the S&P 500." },
    ],
    lesson: "risk-and-diversification",
    sources: [
      cnbc("Nvidia is done with Jensen Huang. The fallout in Washington is just beginning", "2026/11/13/nvidia-jensen-huang-washington-congress.html", "2026-11-13"),
      cnbc("Nvidia board urged to consider 'potential return of Jensen Huang' by two major investors", "2026/11/14/nvidia-investors-jensen-huang-return-board-letter.html", "2026-11-14"),
      cnbc("After Jensen Huang's exit, what top financial advisors are doing with Nvidia", "2026/11/13/nvidia-stock-advisors-jensen-huang-exit-exclusive-poll.html", "2026-11-13"),
      cnbc("How Nvidia turmoil and a Democratic Congress could reshape the AI trade", "2026/11/14/nvidia-ai-trade-data-centers-congress.html", "2026-11-14"),
    ],
  },
  {
    slug: "tech-stocks-fell-15-percent",
    title: "Tech stocks dropped about 15% this autumn. Is that a crash?",
    dek: "It was a sharp fall, and it has a name. Here is how to tell a normal dip from something bigger.",
    updated: "2026-11-15",
    whatHappened: [
      "The Nasdaq-100, an index of about 100 large companies that is heavy on technology, fell roughly 15% from its high before starting to bounce back, according to a CNBC chart analysis published on November 13. The slide began in late October.",
      "That article looks at price charts and does not name one cause. Other CNBC reporting this month describes investors as nervous about rising inflation, a likely interest rate increase, and whether the huge spending on AI will pay off. Last week the Nasdaq had its best week since August.",
    ],
    whyTheMarketCares:
      "Tech companies make up a large share of the stock market, so when they fall together, most investors feel it. Falls like this are common enough to have names. A drop of 10% or more from a recent high is called a correction. A drop of 20% or more is called a bear market. \"Crash\" is not an official term; people use it for falls that are very large and very fast.",
    whatItMeansForYou:
      "Seeing your money shrink by 15% would feel awful, and that feeling is exactly when people make their worst decisions. History helps here. The same CNBC analysis notes that the Nasdaq-100 recovered quickly after big drops in 2018, 2020 and April 2025, but in 2022 it fell nearly 36% over about ten months. So recoveries are common, not guaranteed, and nobody knows the timing. That is why money you need soon does not belong in stocks, and money you won't need for many years can wait out a fall.",
    goodToKnow: [
      "A 10% fall is a correction. A 20% fall is a bear market. Both have happened many times.",
      "Past recoveries do not promise future ones, and they can take months or years.",
      "How long until you need the money matters more than what the market did this month.",
    ],
    terms: [
      { term: "Index", meaning: "A list of stocks used to measure how a part of the market is doing." },
      { term: "Correction", meaning: "A fall of 10% or more from a recent high." },
      { term: "Bear market", meaning: "A fall of 20% or more from a recent high." },
      { term: "Volatility", meaning: "How much and how quickly prices move up and down." },
    ],
    lesson: "risk-and-diversification",
    sources: [
      cnbc("Is a bottom in for the Nasdaq-100? Charts to watch", "2026/11/13/is-a-bottom-in-for-the-nasdaq-100-charts-to-watch.html", "2026-11-13"),
      cnbc("How Nvidia turmoil and a Democratic Congress could reshape the AI trade", "2026/11/14/nvidia-ai-trade-data-centers-congress.html", "2026-11-14"),
      cnbc("Consumer prices rose 0.4% in October, more than expected, complicating Fed's inflation fight", "2026/11/10/cpi-inflation-report-october-2026.html", "2026-11-10"),
    ],
  },
  {
    slug: "inflation-up-interest-rates-next",
    title: "Prices are rising faster again, and interest rates may go up next",
    dek: "Consumer prices rose more than expected in October. Investors now expect the Federal Reserve to raise interest rates in December.",
    updated: "2026-11-15",
    whatHappened: [
      "Consumer prices rose 0.4% in October, more than economists expected, with energy, food and housing costs all going up. Wholesale prices, which are what businesses pay, were 6.5% higher than a year earlier. That is the fastest yearly pace since November 2022.",
      "The Federal Reserve, the central bank of the United States, kept its main interest rate at 3.75% to 4% at its October meeting. It meets again on December 8 and 9. According to CNBC, traders now fully expect it to raise the rate by a quarter of a percentage point.",
    ],
    whyTheMarketCares:
      "The Fed raises interest rates to slow rising prices. Higher rates make borrowing more expensive for families, companies and the government. Companies that borrow to grow can end up earning less, and savings accounts and bonds start paying more, so some investors move money out of stocks. Stocks fell and bond yields jumped right after the consumer price report.",
    whatItMeansForYou:
      "Higher rates cut both ways. If you are saving, savings accounts tend to pay more interest. If you are borrowing, credit cards and loans cost more. Rising prices also mean each dollar buys a little less over time, which is one reason people invest for long-term goals instead of keeping everything in cash.",
    goodToKnow: [
      "Inflation means prices rising over time. The Fed aims for about 2% a year, and inflation has been above that for roughly five and a half years.",
      "The Fed's next decision comes on December 9.",
      "A higher interest rate helps savers and costs borrowers.",
    ],
    terms: [
      { term: "Inflation", meaning: "Prices rising over time, so the same money buys less." },
      { term: "Federal Reserve", meaning: "The central bank of the United States. People call it the Fed. It sets a key interest rate." },
      { term: "Interest rate", meaning: "The yearly cost of borrowing money, shown as a percentage." },
      { term: "Bond yield", meaning: "The yearly return an investor earns from a bond." },
    ],
    lesson: "understanding-debt",
    sources: [
      cnbc("Consumer prices rose 0.4% in October, more than expected, complicating Fed's inflation fight", "2026/11/10/cpi-inflation-report-october-2026.html", "2026-11-10"),
      cnbc("Wholesale prices rose 0.3% in October, putting annual rate at 6.5%, the highest in nearly four years", "2026/11/13/ppi-inflation-report-october-2026.html", "2026-11-13"),
      cnbc("Here are five key takeaways from the Fed rate decision and Warsh news conference", "2026/10/28/fed-rate-decision-warsh-takeaways.html", "2026-10-28"),
    ],
  },
  {
    slug: "midterm-elections-and-the-economy",
    title: "Democrats won Congress. What changes for the economy?",
    dek: "Probably less than the headlines suggest, economists say. But one argument coming next year is worth understanding now.",
    updated: "2026-11-15",
    whatHappened: [
      "In the November 3 midterm elections, Democrats won control of both the House and the Senate. They take over in January. President Trump still controls many policies directly.",
      "Economists quoted by CNBC expect only small changes to the economy's direction. They say the biggest forces, which are high prices, heavy government spending and the AI boom, stay the same whichever party runs Congress.",
    ],
    whyTheMarketCares:
      "Markets care less about which party wins and more about uncertainty. One source of it is the debt ceiling, the legal limit on how much the U.S. government can borrow, currently $41.1 trillion. The government is expected to reach that limit around the middle of 2027, and Congress has to agree to raise it. Analysts expect a tense negotiation and warn that a long standoff could unsettle both the stock and bond markets, though most expect it to end in a compromise.",
    whatItMeansForYou:
      "Elections feel enormous in the moment, but they are one of many things that move markets, and nobody can reliably predict how stocks will react to politics. That is why long-term investors do not buy or sell based on who won. The useful skill is understanding what a headline means, not trading on it.",
    goodToKnow: [
      "The new Congress starts in January 2027.",
      "The debt ceiling is a limit on government borrowing that Congress must vote to raise.",
      "Political news causes short-term swings far more often than long-term change.",
    ],
    terms: [
      { term: "Midterm elections", meaning: "Elections for Congress held halfway through a president's four-year term." },
      { term: "Debt ceiling", meaning: "The legal limit on how much the U.S. government is allowed to borrow." },
      { term: "Bond", meaning: "A loan you give to a company or government. They pay you back with interest." },
    ],
    lesson: "what-is-investing",
    sources: [
      cnbc("Here's what the Democratic election rout could mean for the U.S. economy", "2026/11/05/emocratic-midterm-economy.html", "2026-11-05"),
      cnbc("Analysis: The Democrats have one chance to extract concessions from Trump. Markets will hate it", "2026/11/04/democrats-trump-debt-ceiling-fight.html", "2026-11-04"),
    ],
  },
];
