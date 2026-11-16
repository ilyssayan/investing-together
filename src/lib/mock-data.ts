// Sample content for the prototype. Everything here is placeholder data that
// will later come from Supabase (lessons, posts) or a real news source.

export type Term = {
  term: string;
  meaning: string;
  explanation: string;
  example: string;
  takeaway: string;
  source: { title: string; url: string };
};

// Original educational explanations. Examples are hypothetical, not current rates or recommendations.
const investor = "https://www.investor.gov/introduction-investing/";
export const glossary: Term[] = [
  {
    term: "Stock",
    meaning: "A small ownership stake in a company. One unit of that ownership is called a share.",
    explanation: "Buying a stock makes you a part-owner, rather than someone lending the company money. You may benefit if its share price rises or it distributes some profits to shareholders. The price can also fall, and those payments are not guaranteed.",
    example: "Imagine buying two shares of a fictional company for $10 each. You spend $20. If each share later sells for $12, the shares are worth $24. If each falls to $7, they are worth $14. These amounts leave out fees and taxes.",
    takeaway: "A familiar or successful company does not automatically make its stock a safe investment.",
    source: { title: "Investor.gov · Stocks", url: investor + "investing-basics/investment-products/stocks" },
  },
  {
    term: "Bond",
    meaning: "A way for a company or government to borrow money from investors, with agreed terms for repayment and usually interest.",
    explanation: "With a stock, you own part of a company. With a bond, you are lending money. The borrower generally agrees to repay the original amount on a set date and make interest payments. It can fail to pay, and the price of a bond can change before that date.",
    example: "Imagine a $100 bond that pays a fixed 4% each year and is due in three years. If the borrower makes every payment, you receive $4 each year and your $100 back at the end. Selling earlier could mean receiving more or less than $100.",
    takeaway: "A promise to repay is not a guarantee. Bonds have risks, too.",
    source: { title: "Investor.gov · Bonds", url: investor + "investing-basics/investment-products/bonds-or-fixed-income-products/bonds" },
  },
  {
    term: "Fund",
    meaning: "An investment that pools money from many people to buy a collection of stocks, bonds, or other assets.",
    explanation: "Instead of choosing every investment yourself, you buy a share of the fund. Your results depend on the investments it holds and the fees it charges. Mutual funds and exchange-traded funds (ETFs) are common examples.",
    example: "Imagine a fund that holds shares in 100 companies. Owning a share of the fund gives you a stake in that collection, rather than just one company. If it only holds technology companies, though, it is still concentrated in one industry.",
    takeaway: "A fund can make diversification easier, but its name alone does not tell you how spread out or risky it is.",
    source: { title: "Investor.gov · Mutual funds and ETFs", url: investor + "general-resources/news-alerts/alerts-bulletins/characteristics-mutual-funds-exchange-traded-funds" },
  },
  {
    term: "Diversification",
    meaning: "Spreading investments across different companies, industries, or types of assets so one problem has less influence on the whole.",
    explanation: "Investments do not all respond to the same events in the same way. Diversification reduces dependence on any single one. It works best when the investments differ in meaningful ways, rather than just having different names.",
    example: "Imagine putting $100 into one company's stock. A problem at that company affects the whole investment. Spreading it among companies in several industries reduces that dependence, although many or all of them could still fall together.",
    takeaway: "Diversification can reduce some risks; it cannot prevent every loss.",
    source: { title: "Investor.gov · Asset allocation and diversification", url: investor + "getting-started/asset-allocation" },
  },
  {
    term: "Asset allocation",
    meaning: "How an investment portfolio is divided among broad categories such as stocks, bonds, and cash.",
    explanation: "Asset allocation describes the overall mix. Diversification also looks at what is inside each category. The mix affects potential growth and losses; an appropriate mix depends on the goal, the time available, and how much risk someone can afford and accept.",
    example: "A fictional $100 portfolio has $50 in a stock fund, $30 in a bond fund, and $20 in cash. Its allocation is 50% stocks, 30% bonds, and 20% cash. This illustrates the term; it is not a suggested mix.",
    takeaway: "Choosing an overall mix is different from choosing individual investments within it.",
    source: { title: "Investor.gov · Asset allocation and diversification", url: investor + "getting-started/asset-allocation" },
  },
  {
    term: "Interest",
    meaning: "Money paid for the use of borrowed money. It can be a cost to a borrower or income to a saver or lender.",
    explanation: "Interest is the dollar amount paid or earned; the interest rate is the percentage used to calculate it. If earned interest stays in an account and also earns interest, that is compounding.",
    example: "Imagine leaving $100 in an account for one year at a fixed 5% annual rate, with interest calculated once at year end. You earn $5 and finish with $105, assuming no fees, withdrawals, or added deposits.",
    takeaway: "Interest can work in either direction: money earned on savings or money owed on borrowing.",
    source: { title: "Investor.gov · Compound interest calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  },
  {
    term: "Interest rate",
    meaning: "The percentage used to calculate interest over a stated period, often a year.",
    explanation: "The same percentage can mean interest earned on savings or interest charged on debt. The total also depends on time, changes in the balance, and how often interest is calculated. A loan's annual percentage rate (APR) can include certain fees as well as interest.",
    example: "For a simple illustration, borrowing $100 for a full year at 5% costs $5 in interest; at 10%, it costs $10. This assumes the balance stays at $100, there are no fees, and interest does not itself earn interest.",
    takeaway: "A rate needs a time period and context. A monthly percentage is not the same as a yearly one.",
    source: { title: "CFPB · Interest rates and APR", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/" },
  },
  {
    term: "Credit score",
    meaning: "A number calculated from information in a credit report to estimate how likely someone is to repay borrowed money on time.",
    explanation: "Lenders may use it when deciding whether to lend and what interest rate to offer. Payment history and how much available credit someone uses can affect it. Different scoring models and reports can produce different scores for the same person.",
    example: "Imagine two people apply for the same loan. Their credit histories lead to different scores, which may contribute to different interest rate offers. The lender also considers other information, so a score alone does not determine the outcome.",
    takeaway: "A credit score measures aspects of borrowing history. It is not a measure of someone's worth, income, or overall financial knowledge.",
    source: { title: "CFPB · What is a credit score?", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-score-en-315/" },
  },
  {
    term: "Volatility",
    meaning: "How much an investment's price fluctuates over a period of time. Larger swings mean higher volatility.",
    explanation: "Volatility includes moves up as well as down. It describes price variation, rather than predicting the next move. A volatile investment can be difficult to rely on for money needed soon, and low volatility does not mean an investment has no other risks.",
    example: "Imagine one stock moves from $10 to $14 to $8 over a week, while another moves from $10 to $10.20 to $9.90. The first has much larger swings relative to its starting price. This illustrates volatility without calculating a formal measure.",
    takeaway: "Price swings describe uncertainty, not a promise of higher returns.",
    source: { title: "Moneysmart · Share market volatility", url: "https://moneysmart.gov.au/shares/what-is-share-market-volatility" },
  },
  {
    term: "Brokerage account",
    meaning: "An account with a brokerage firm that lets someone buy, hold, and sell investments such as stocks, bonds, and funds.",
    explanation: "The account is the place investments are held; it is not an investment itself. In a cash account, purchases must be paid for in full. A margin account allows borrowing from the firm and adds costs and risks.",
    example: "Imagine adding $50 to a cash brokerage account, then buying $30 of a fund. The account holds the fund investment and $20 of uninvested cash, ignoring fees. Adding money and buying an investment are two separate steps.",
    takeaway: "Opening an account does not automatically invest the money, and investment values can fall.",
    source: { title: "Investor.gov · Brokerage accounts", url: investor + "investing-basics/investment-accounts/brokerage-accounts" },
  },
];

export type Lesson = {
  slug: string;
  title: string;
  topic: "Investing" | "Credit and debt";
  minutes: number;
  summary: string;
  parts: { heading: string; body: string }[];
  terms: string[]; // glossary terms used in this lesson
  check: { question: string; options: string[]; answer: number };
};

export const lessons: Lesson[] = [
  {
    slug: "what-is-investing",
    title: "What is investing?",
    topic: "Investing",
    minutes: 4,
    summary: "How investing is different from saving, and why people do it.",
    parts: [
      {
        heading: "Saving vs. investing",
        body: "Saving means keeping money somewhere safe so it is there when you need it. Investing means using money to buy something, like a stock or a fund, that you hope will be worth more later.",
      },
      {
        heading: "Why people invest",
        body: "Over many years, investments have the chance to grow more than money sitting in a savings account. The trade-off is that their value can also go down, especially in the short term.",
      },
      {
        heading: "You don't need a lot to start",
        body: "Many accounts let you begin with a few dollars. Starting small is a normal way to learn.",
      },
    ],
    terms: ["Stock", "Fund", "Interest"],
    check: {
      question: "What is the main difference between saving and investing?",
      options: [
        "Saving is only for adults",
        "Investing can grow more, but its value can also go down",
        "Investing is always safer than saving",
      ],
      answer: 1,
    },
  },
  {
    slug: "stocks-bonds-funds",
    title: "Stocks, bonds, and funds",
    topic: "Investing",
    minutes: 5,
    summary: "The three building blocks most beginners hear about first.",
    parts: [
      {
        heading: "Stocks",
        body: "Buying a stock means owning a small piece of a company. If the company does well, your piece can become more valuable.",
      },
      {
        heading: "Bonds",
        body: "A bond is a loan you give to a company or government. They agree to pay you back with interest. Bonds usually move up and down less than stocks.",
      },
      {
        heading: "Funds",
        body: "A fund holds many stocks or bonds at once. Buying one share of a fund spreads your money across everything inside it.",
      },
    ],
    terms: ["Stock", "Bond", "Fund"],
    check: {
      question: "Which one is a basket of many investments?",
      options: ["A stock", "A bond", "A fund"],
      answer: 2,
    },
  },
  {
    slug: "risk-and-diversification",
    title: "Risk and diversification",
    topic: "Investing",
    minutes: 5,
    summary: "Why prices move, and how spreading money out helps.",
    parts: [
      {
        heading: "What risk means",
        body: "Risk is the chance that an investment ends up worth less than you paid. Prices that swing a lot are called volatile.",
      },
      {
        heading: "Don't put everything in one place",
        body: "If all your money is in one company and it struggles, you feel all of it. Spreading money across many investments softens the effect of any single one.",
      },
      {
        heading: "Time matters",
        body: "Money you won't need for many years has more time to recover from drops. That is part of why people talk about asset allocation changing with age.",
      },
    ],
    terms: ["Diversification", "Volatility", "Asset allocation"],
    check: {
      question: "What does diversification do?",
      options: [
        "Guarantees you will make money",
        "Spreads your money so one bad result hurts less",
        "Makes prices stop moving",
      ],
      answer: 1,
    },
  },
  {
    slug: "credit-scores",
    title: "Credit scores, explained",
    topic: "Credit and debt",
    minutes: 4,
    summary: "What a credit score is and what affects it.",
    parts: [
      {
        heading: "What it is",
        body: "A credit score is a number lenders use to judge how likely you are to pay back borrowed money.",
      },
      {
        heading: "What affects it",
        body: "Paying bills on time and not using too much of your available credit are two of the biggest factors.",
      },
      {
        heading: "Why it matters",
        body: "A higher score can make it easier to rent an apartment or get a loan, and can mean paying a lower interest rate.",
      },
    ],
    terms: ["Credit score", "Interest rate"],
    check: {
      question: "Which habit helps your credit score most?",
      options: [
        "Paying bills on time",
        "Checking your score every day",
        "Never having any account",
      ],
      answer: 0,
    },
  },
  {
    slug: "understanding-debt",
    title: "Understanding debt",
    topic: "Credit and debt",
    minutes: 4,
    summary: "How borrowing works and what interest really costs.",
    parts: [
      {
        heading: "Borrowing has a price",
        body: "When you borrow money, you pay back the amount you borrowed plus interest. The higher the interest rate, the more it costs.",
      },
      {
        heading: "Not all debt is the same",
        body: "A loan with a low rate is very different from a credit card balance with a high rate. Knowing the rate tells you which debt to pay off first.",
      },
    ],
    terms: ["Interest", "Interest rate"],
    check: {
      question: "What does a higher interest rate mean for a borrower?",
      options: [
        "Borrowing costs more",
        "Borrowing costs less",
        "Nothing changes",
      ],
      answer: 0,
    },
  },
];

export type NewsItem = {
  id: string;
  headline: string;
  date: string;
  whatHappened: string;
  why: string;
  whatItMeans: string;
  source: string;
  terms: string[];
};

// Made-up example stories that show the format. Replace with real, sourced news.
export const news: NewsItem[] = [
  {
    id: "tech-swing",
    headline: "Example: Tech stocks swing after election results",
    date: "Sample story",
    whatHappened:
      "Prices of many technology company stocks moved sharply up and down over a few days.",
    why: "Elections can change which laws and taxes investors expect, so they buy and sell quickly while they work out what the result means.",
    whatItMeans:
      "Short-term swings are normal. If you invest for many years, a few rough days matter much less than they feel in the moment.",
    source: "Placeholder: link to the original article goes here",
    terms: ["Volatility", "Stock"],
  },
  {
    id: "rates-hold",
    headline: "Example: Central bank keeps interest rates the same",
    date: "Sample story",
    whatHappened:
      "The central bank decided not to raise or lower its main interest rate.",
    why: "It sets rates to keep prices and jobs steady. Holding still usually means it wants to wait for more information.",
    whatItMeans:
      "Rates on savings accounts, credit cards, and loans tend to follow. No change means those probably stay about where they are.",
    source: "Placeholder: link to the original article goes here",
    terms: ["Interest rate", "Interest"],
  },
  {
    id: "one-company",
    headline: "Example: A large company's stock drops after news about its CEO",
    date: "Sample story",
    whatHappened:
      "One well-known company's stock price fell after headlines about its leader.",
    why: "Investors react to anything that might change how a company is run, even before they know the full story.",
    whatItMeans:
      "This is why diversification matters: if you own a fund with many companies, one company's bad week is a small part of the whole.",
    source: "Placeholder: link to the original article goes here",
    terms: ["Diversification", "Fund"],
  },
];

// Example yearly growth rate used only to illustrate the comparison.
export const EXAMPLE_RATE = 0.06;

export function futureValue(monthly: number, years: number, rate: number) {
  const r = rate / 12;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

export function findTerm(term: string) {
  return glossary.find((g) => g.term === term);
}
