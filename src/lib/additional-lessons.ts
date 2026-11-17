import type { Lesson } from "@/lib/mock-data";
import type { Question } from "@/lib/course";

const check = (question: string, options: string[], answer: number, hint: string, why: string): Question => ({ question, options, answer, hint, why });

export const additionalPractice: Record<string, Question[]> = {
  "compound-growth": [
    check("At a hypothetical 5% per year, what does $100 become after two years with annual compounding?", ["$110", "$110.25", "$125"], 1, "Year two starts with $105, not $100.", "$100 × 1.05 × 1.05 = $110.25. This assumes a fixed rate, no fees, and no deposits or withdrawals."),
    check("What makes growth compound?", ["Growth also earns growth", "Checking prices often", "Adding a fee each year"], 0, "Think about what happens to the first year's earnings.", "When earnings stay invested, later growth can apply to those earnings as well as the original money."),
    check("Does a calculator using 6% growth predict your actual return?", ["Yes, for every fund", "Only if you wait long enough", "No, it illustrates an assumption"], 2, "A constant rate is a model, not a promise.", "Investment returns vary. A smooth example cannot guarantee a future result."),
  ],
  "inflation-and-purchasing-power": [
    check("A basket of items rises from $20 to $21. What is the increase?", ["1%", "5%", "20%"], 1, "Divide the $1 increase by the original $20.", "$1 ÷ $20 = 0.05, or 5%. This basket is a hypothetical example, not an official inflation measure."),
    check("Your balance stays at $100 while prices rise. What changes?", ["It buys less", "It buys more", "Its purchasing power cannot change"], 0, "Compare dollars with what those dollars can buy.", "The dollar amount is unchanged, but higher prices mean it buys fewer goods and services."),
    check("Why might a personal experience differ from a national inflation report?", ["The report measures one person's shopping", "Everyone buys identical things", "Households buy different mixes of goods and services"], 2, "Housing, transport, and food take different shares of different budgets.", "A broad index represents a weighted basket. Your household's spending mix can differ."),
  ],
  "index-funds-and-fees": [
    check("What does an index fund generally try to do?", ["Track a selected market index", "Guarantee a positive return", "Pick next week's best stock"], 0, "An index is a benchmark for a group of investments.", "An index fund aims to track its chosen index. Fees and other factors can cause differences."),
    check("On an unchanged $1,000 balance, approximately what does a 0.5% annual expense ratio represent?", ["$50", "$5", "$500"], 1, "0.5% means 0.005.", "$1,000 × 0.005 = $5. Actual expenses depend on the fund's asset values over the year; other costs may also apply."),
    check("A fund tracks only one industry. What should you notice?", ["Its fund label removes risk", "It owns every industry", "It can still be concentrated"], 2, "Many holdings can still share the same risk.", "The index's scope matters. A narrow fund is not automatically broadly diversified."),
  ],
  "reading-financial-headlines": [
    check("A post says a stock will definitely double tomorrow. What is the strongest response?", ["Treat confidence as evidence", "Question the claim and check independent sources", "Assume popularity proves accuracy"], 1, "Can anyone guarantee tomorrow's market price?", "Certainty, urgency, and popularity are not evidence. Guaranteed-return claims are a warning sign."),
    check("A headline says prices rose 3%. What context do you need?", ["What was measured and over what period", "Only the headline's font size", "Nothing else"], 0, "A change needs a starting point and a time period.", "Check the measure, comparison period, source, and whether the figure is an estimate or a reported result."),
    check("What separates a forecast from a reported result?", ["Forecasts are always correct", "Results describe the future", "A forecast estimates what may happen"], 2, "Look for words such as 'expects' and 'projects'.", "A forecast depends on assumptions. A reported result describes what was measured and can sometimes be revised."),
  ],
};

export const additionalLessons: Lesson[] = [
  {
    slug: "compound-growth", title: "Compound growth, step by step", topic: "Investing", minutes: 5,
    summary: "See how earnings can earn more, using an example you can calculate yourself.",
    parts: [
      { heading: "Growth on growth", body: "Compounding happens when earnings stay in an account or investment and can generate further earnings. Simple interest applies only to the original amount; compound interest also includes earlier interest." },
      { heading: "Try the numbers", body: "Imagine $100 earning a fixed 5% each year, calculated annually. After one year: $100 + $5 = $105. After two: $105 + $5.25 = $110.25. The extra 25 cents comes from earning interest on the first year's $5. This hypothetical example excludes fees and taxes." },
      { heading: "Time is an input, not a guarantee", body: "More time gives compounding more opportunities to work. But investments do not earn the same positive rate every year. Losses, costs, and withdrawals also affect the outcome. A calculator is useful for comparing assumptions, not predicting a balance." },
    ], terms: ["Interest", "Interest rate"], check: additionalPractice["compound-growth"][0],
    sources: [{title: "Investor.gov · Compound interest calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"}],
  },
  {
    slug: "inflation-and-purchasing-power", title: "Inflation and what your money buys", topic: "Investing", minutes: 5,
    summary: "Understand the difference between having more dollars and being able to buy more.",
    parts: [
      { heading: "A price level, not just one price", body: "Inflation is a rise in the general price level over time. One item becoming more expensive does not tell the whole story. Inflation measures typically follow a basket of goods and services, with different weights for different categories." },
      { heading: "A $20 example", body: "Imagine your usual basket costs $20 this year and $21 next year. That is a 5% increase: $1 divided by $20. If your money stays at $20, you can no longer buy that same basket. Its purchasing power has fallen. These are made-up prices, not current inflation data." },
      { heading: "Compare money with buying power", body: "A rising account balance does not necessarily mean you can buy more. If a balance grows 2% while the relevant prices grow 4%, it has not kept pace. That does not make saving pointless: access and stability also matter for money needed soon." },
    ], terms: ["Interest rate", "Asset allocation"], check: additionalPractice["inflation-and-purchasing-power"][0],
    sources: [{title: "Federal Reserve · What is inflation?", url: "https://www.federalreserve.gov/faqs/economy_14419.htm"}],
  },
  {
    slug: "index-funds-and-fees", title: "Index funds: look inside the basket", topic: "Investing", minutes: 6,
    summary: "Learn what an index fund tracks, why its holdings matter, and how to read a fee.",
    parts: [
      { heading: "Start with the index", body: "A market index follows a defined group of investments. An index fund aims to track an index rather than select investments to beat it. Some indexes cover broad markets; others cover a single industry. An index fund can be structured as a mutual fund or an exchange-traded fund (ETF)." },
      { heading: "Count the costs", body: "An expense ratio expresses annual fund operating expenses as a percentage of assets. At a hypothetical 0.5%, an unchanged $1,000 balance represents roughly $5 a year. Costs are reflected in fund returns rather than necessarily appearing as a separate bill. Other costs can apply." },
      { heading: "Read before comparing", body: "Check what the fund holds, its objective, risks, and costs. A narrow index can leave a fund concentrated even if it holds many investments. Lower fees do not guarantee better results, and an index fund can lose value when its holdings fall." },
    ], terms: ["Fund", "Diversification", "Stock", "Bond"], check: additionalPractice["index-funds-and-fees"][0],
    sources: [{title: "Investor.gov · Index funds", url: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-4"}],
  },
  {
    slug: "reading-financial-headlines", title: "Read a headline without the panic", topic: "Investing", minutes: 5,
    summary: "Separate facts, forecasts, and pressure tactics before deciding what a story means.",
    parts: [
      { heading: "Ask four questions", body: "Who published it? When? What actually happened? What evidence supports it? Follow the original source when possible, and check whether a number describes one company, an index, or a wider economy." },
      { heading: "Spot the missing context", body: "Consider the fictional headline 'Market jumps 3%.' Which market? Over one day or one month? Compared with what starting point? The headline is incomplete until those questions are answered. 'Analysts expect a jump' is different: it is a forecast, not a measured result." },
      { heading: "Notice the pressure", body: "A stranger promising guaranteed profits or urging you to act immediately is giving you a reason to pause. A large following or group-chat endorsement is not proof of expertise. Independently verify identities and claims; do not share account access or send money because a message sounds confident." },
    ], terms: ["Volatility", "Stock", "Diversification"], check: additionalPractice["reading-financial-headlines"][0],
    sources: [{title: "Investor.gov · Social media and stock tip scams", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/social-media-stock-scams"}],
  },
];
