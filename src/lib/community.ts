// Sample forum content for the prototype. Every thread and reply here is
// made up to show how the community works; real ones will come from Supabase.

export const topics = [
  "Getting started",
  "Stocks and funds",
  "Credit and debt",
  "In the news",
] as const;

export type Topic = (typeof topics)[number];

export type Reply = {
  author: string;
  mentor?: boolean; // verified volunteer mentor
  posted: string;
  body: string;
  source?: string;
};

export type Thread = {
  id: string;
  kind: "Question" | "Tip";
  topic: Topic;
  title: string;
  body: string;
  author: string;
  posted: string;
  source?: string;
  replies: Reply[];
};

export const threads: Thread[] = [
  {
    id: "is-a-small-amount-worth-it",
    kind: "Question",
    topic: "Getting started",
    title: "Is it worth starting if I can only put in a small amount?",
    body: "I keep hearing you should start early, but I don't have much to spare each month. Does a small amount actually make a difference, or should I wait until I earn more?",
    author: "sunflower_22",
    posted: "2 hours ago",
    replies: [
      {
        author: "mentor_ana",
        mentor: true,
        posted: "1 hour ago",
        body: "It makes a difference, mostly because of time. Growth builds on earlier growth, so money that starts early has longer to do that. The first lesson has a chart comparing 10, 20 and 30 years of the same monthly amount.",
      },
      {
        author: "blue_kite",
        posted: "40 minutes ago",
        body: "What helped me was learning with a small amount first. I made my beginner mistakes when the stakes were low.",
      },
    ],
  },
  {
    id: "stock-vs-fund",
    kind: "Question",
    topic: "Stocks and funds",
    title: "What's the actual difference between a stock and a fund?",
    body: "A friend told me funds are safer than stocks. Is that true, and why?",
    author: "blue_kite",
    posted: "5 hours ago",
    replies: [
      {
        author: "mentor_ana",
        mentor: true,
        posted: "4 hours ago",
        body: "A stock is a piece of one company. A fund holds many stocks or bonds at once. Funds are usually less bumpy because one company having a bad year is only a small part of the whole. They can still lose value, though, especially when the whole market falls.",
      },
    ],
  },
  {
    id: "look-up-words-as-you-go",
    kind: "Tip",
    topic: "Getting started",
    title: "Look up one new word every time you hit one",
    body: "When a video or article uses a word I don't know, I pause and check the word guide before carrying on. After a couple of weeks most finance headlines stopped feeling like another language.",
    author: "maya_r",
    posted: "Yesterday",
    source: "Personal experience",
    replies: [],
  },
  {
    id: "does-checking-score-hurt",
    kind: "Question",
    topic: "Credit and debt",
    title: "Does checking my own credit score lower it?",
    body: "I read somewhere that every time your credit gets checked your score drops. Does that include me looking at it?",
    author: "jules.k",
    posted: "Yesterday",
    replies: [
      {
        author: "mentor_dee",
        mentor: true,
        posted: "Yesterday",
        body: "No. Checking your own score is called a soft inquiry and does not affect it. The checks that can lower a score a little are hard inquiries, which happen when you apply for a loan or credit card.",
        source: "Consumer Financial Protection Bureau",
      },
    ],
  },
  {
    id: "nvidia-news-index-fund",
    kind: "Question",
    topic: "In the news",
    title: "If I owned an index fund, would the Nvidia news hurt me?",
    body: "Everyone is talking about Nvidia's CEO leaving. If someone only owns a broad fund, how much does one company's bad week matter?",
    author: "sunflower_22",
    posted: "2 days ago",
    replies: [
      {
        author: "mentor_dee",
        mentor: true,
        posted: "2 days ago",
        body: "A broad fund would hold some Nvidia, so it would feel it a little. But the fund also holds hundreds of other companies, so one stock falling does not pull the whole fund down by the same amount. The News page has a full explanation of this story.",
      },
      {
        author: "maya_r",
        posted: "1 day ago",
        body: "This is the first time diversification clicked for me as a real thing and not only a vocabulary word.",
      },
    ],
  },
];

export const findThread = (id: string) => threads.find((t) => t.id === id);
