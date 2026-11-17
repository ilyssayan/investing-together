import { cacheLife } from "next/cache";
import snapshots from "@/lib/news-image-snapshots.json";
import type { NewsEvent, NewsSource } from "@/lib/news-edition";

export type ArticleImage = { url: string; alt: string; publisher: string; articleUrl: string };

const decode = (value: string) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const allowedImage = (value: string) => {
  try {
    const url = new URL(decode(value));
    return url.protocol === "https:" && ["image.cnbcfm.com", "dims.apnews.com", "assets.apnews.com", "iea.imgix.net", "nrf.com", "cdn.nrf.com", "www.nrf.com"].includes(url.hostname) ? url.href : null;
  } catch { return null; }
};

// Read only public preview metadata, never article bodies or paywalled content.
export function parseArticleImage(html: string): { url: string; alt: string } | null {
  const metadata = new Map<string, string>();
  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = new Map([...tag[0].matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map(match => [match[1].toLowerCase(), decode(match[3])]));
    const key = attributes.get("property") ?? attributes.get("name");
    if (key && attributes.get("content")) metadata.set(key.toLowerCase(), attributes.get("content")!);
  }
  const url = allowedImage(metadata.get("og:image") ?? metadata.get("twitter:image") ?? "");
  return url ? { url, alt: metadata.get("og:image:alt") ?? metadata.get("twitter:image:alt") ?? "" } : null;
}

async function sourceImage(source: NewsSource): Promise<ArticleImage | null> {
  try {
    const url = new URL(source.url);
    // Fetch public preview metadata only from this edition’s known publishers.
    if (url.protocol !== "https:" || !["www.cnbc.com", "apnews.com", "www.iea.org", "cdn.nrf.com", "nrf.com", "www.nrf.com"].includes(url.hostname)) return null;
    const response = await fetch(url, { signal: AbortSignal.timeout(4000), redirect: "error" });
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return null;
    const image = parseArticleImage(await response.text());
    return image ? { ...image, publisher: source.publisher, articleUrl: source.url } : null;
  } catch { return null; }
}

export async function getPublisherArticleImage(sources: NewsSource[]): Promise<ArticleImage | null> {
  "use cache";
  cacheLife({ stale: 3600, revalidate: 86400, expire: 172800 });
  const images = await Promise.all(sources.slice(0, 2).map(sourceImage));
  return images.find(Boolean) ?? null;
}

export async function withArticleImages(events: NewsEvent[]) {
  return Promise.all(events.map(async event => {
    const saved = snapshots[event.slug as keyof typeof snapshots];
    const image = saved
      ? { ...saved, articleUrl: event.sources.find(source => source.publisher === saved.publisher)?.url ?? event.sources[0].url }
      : await getPublisherArticleImage(event.sources);
    return { ...event, image };
  }));
}
