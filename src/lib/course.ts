import { additionalPractice } from "@/lib/additional-lessons";
import { lessons, type Lesson } from "@/lib/mock-data";

// The course is organised the way Khan Academy organises its courses:
// course -> units -> lessons, and every lesson is watch -> read -> practice.

export type Question = {
  question: string;
  options: string[];
  answer: number; // index into options
  hint: string;
  why: string; // shown after answering, right or wrong
};

export type Video = { id: string; title: string }; // YouTube id, Khan Academy

type Extras = { video?: Video; practice: Question[] };

const extras: Record<string, Extras> = {
  ...Object.fromEntries(Object.entries(additionalPractice).map(([slug, practice]) => [slug, { practice }])),
  "what-is-investing": {
    video: { id: "jhvCc5tKAno", title: "Saving and investing" },
    practice: [
      {
        question: "You want money for a school trip in three months. What fits best?",
        options: ["Saving it", "Investing it in stocks", "Either, it makes no difference"],
        answer: 0,
        hint: "Think about how soon you need the money, and whether it could be worth less on the day you need it.",
        why: "Money you need soon belongs in savings, where its value doesn't drop. Investments can fall in the short term.",
      },
      {
        question: "What is the main trade-off of investing compared with saving?",
        options: [
          "Investing is free and saving costs money",
          "Investing has a chance to grow more, but its value can also go down",
          "Investing is guaranteed to grow",
        ],
        answer: 1,
        hint: "Is anything about investing guaranteed?",
        why: "Over many years investments have the chance to grow more than savings, but nothing is guaranteed and values can fall.",
      },
      {
        question: "Why do people say time helps investors?",
        options: [
          "Prices only go up after ten years",
          "Growth can earn growth of its own, and there is more time to recover from drops",
          "Older investors get better prices",
        ],
        answer: 1,
        hint: "Look at how the growth part of the bar changes between 10 and 30 years.",
        why: "The longer money stays invested, the more time growth has to build on itself, and the more time there is to recover from bad stretches.",
      },
    ],
  },
  "stocks-bonds-funds": {
    video: { id: "rs1md3e4aYU", title: "Bonds vs. stocks" },
    practice: [
      {
        question: "You buy one share of a company's stock. What do you now have?",
        options: ["A loan to the company", "A small piece of ownership in the company", "A savings account"],
        answer: 1,
        hint: "A stock is also called a share. A share of what?",
        why: "A stock is a small piece of ownership. If the company becomes more valuable, your piece can too.",
      },
      {
        question: "A city borrows money from you and promises to pay it back with interest. What is that?",
        options: ["A stock", "A bond", "A fund"],
        answer: 1,
        hint: "Which one is a loan?",
        why: "A bond is a loan to a company or government, paid back with interest.",
      },
      {
        question: "Why do many beginners start with a fund instead of one stock?",
        options: [
          "Funds are guaranteed not to lose value",
          "One purchase spreads money across many investments",
          "Funds are only for experts",
        ],
        answer: 1,
        hint: "Think of a basket.",
        why: "A fund holds many stocks or bonds, so one purchase spreads your money out. It can still lose value, just usually less sharply than one company.",
      },
    ],
  },
  "risk-and-diversification": {
    video: { id: "7mo167ohvJw", title: "What is risk and return?" },
    practice: [
      {
        question: "A price that jumps up and down a lot is called…",
        options: ["Volatile", "Diversified", "Guaranteed"],
        answer: 0,
        hint: "It's in this lesson's word list.",
        why: "Volatility is how much and how quickly a price moves up and down.",
      },
      {
        question: "All your money is in one company and it has a terrible year. What would have softened the blow?",
        options: ["Checking the price more often", "Owning many different companies", "Selling the day before"],
        answer: 1,
        hint: "Compare the 1-company chart with the 30-company chart.",
        why: "Spreading money across many investments means one bad result is a small part of the whole. Nobody can reliably sell the day before.",
      },
      {
        question: "Does diversification remove all risk?",
        options: ["Yes, completely", "No. When the whole market falls, most investments fall with it", "Only for bonds"],
        answer: 1,
        hint: "Look at the 30-company chart. Was the line perfectly flat?",
        why: "Diversification smooths the ride but can't remove every dip. That is why time horizon matters too.",
      },
    ],
  },
  "credit-scores": {
    video: { id: "YoOsvcxLy40", title: "A tale of two credit scores" },
    practice: [
      {
        question: "What does a credit score tell a lender?",
        options: ["How much money you earn", "How reliably you have paid back money before", "How many bank accounts you have"],
        answer: 1,
        hint: "It's about your history with borrowed money.",
        why: "A credit score summarises how reliably you have repaid borrowed money in the past.",
      },
      {
        question: "Which habit helps a credit score the most?",
        options: ["Paying bills on time", "Never borrowing anything, ever", "Using all of your available credit"],
        answer: 0,
        hint: "One of these is the single biggest factor.",
        why: "Paying on time is one of the biggest factors. Using most of your available credit tends to lower a score.",
      },
      {
        question: "Why does a higher score matter?",
        options: ["It can mean lower interest rates on loans", "It raises your salary", "It guarantees any loan"],
        answer: 0,
        hint: "Think about the price of borrowing.",
        why: "Lenders usually offer lower interest rates to people with higher scores, which makes borrowing cheaper.",
      },
    ],
  },
  "understanding-debt": {
    video: { id: "MFCdA2vGVh4", title: "Debt" },
    practice: [
      {
        question: "You borrow $100. What do you usually pay back?",
        options: ["Exactly $100", "$100 plus interest", "Less than $100"],
        answer: 1,
        hint: "Borrowing has a price.",
        why: "You pay back what you borrowed plus interest, which is the cost of borrowing.",
      },
      {
        question: "You have two debts. Which should usually be paid off first?",
        options: ["The one with the higher interest rate", "The one with the lower interest rate", "It never matters"],
        answer: 0,
        hint: "Which one costs you more each month you keep it?",
        why: "The higher the rate, the more that debt costs you, so paying it down first usually saves the most.",
      },
      {
        question: "What does a higher interest rate mean for a borrower?",
        options: ["Borrowing costs more", "Borrowing costs less", "Nothing changes"],
        answer: 0,
        hint: "The rate is the yearly price of the loan.",
        why: "A higher rate means paying more for the same loan.",
      },
    ],
  },
};

export type CourseLesson = Lesson & Extras;

const bySlug = (slug: string): CourseLesson => {
  const lesson = lessons.find((l) => l.slug === slug)!;
  return { ...lesson, ...extras[slug] };
};

export const units = [
  {
    title: "Investing basics",
    description: "What investing is, what you can invest in, and how risk works.",
    lessons: ["what-is-investing", "stocks-bonds-funds", "risk-and-diversification"].map(bySlug),
  },
  {
    title: "Credit and debt",
    description: "How borrowing works and how lenders decide to trust you.",
    lessons: ["credit-scores", "understanding-debt"].map(bySlug),
  },
  {
    title: "Growth and buying power",
    description: "Understand compounding, inflation, and what fund costs mean.",
    lessons: ["compound-growth", "inflation-and-purchasing-power", "index-funds-and-fees"].map(bySlug),
  },
  {
    title: "Making sense of financial news",
    description: "Read critically, question predictions, and spot pressure tactics.",
    lessons: ["reading-financial-headlines"].map(bySlug),
  },
];

export const courseLessons = units.flatMap((unit) => unit.lessons);

export const findCourseLesson = (slug: string) =>
  courseLessons.find((lesson) => lesson.slug === slug);

// Mastery levels, earned from the best practice score on a lesson.
export const levels = ["Not started", "Attempted", "Familiar", "Proficient", "Mastered"] as const;
export const levelFor = (best: number | undefined, total: number) =>
  best === undefined ? 0 : best === 0 ? 1 : best >= total ? 4 : best >= total - 1 ? 3 : 2;
