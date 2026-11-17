"use client";

import Image from "next/image";
import { useState } from "react";
import type { ArticleImage as ArticleImageData } from "@/lib/news-images";

export function ArticleImage({ image, featured = false }: { image: ArticleImageData | null; featured?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) return null;
  return <span className="mb-1 block overflow-hidden rounded-xl border border-current/10 bg-secondary">
    <span className={`relative block w-full overflow-hidden ${featured ? "aspect-[2/1] lg:aspect-[4/3]" : "aspect-[2/1]"}`}>
      <Image src={image.url} alt={image.alt} fill sizes={featured ? "(max-width: 1152px) 100vw, 480px" : "(max-width: 768px) 100vw, 400px"} className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none" onError={()=>setFailed(true)}/>
    </span>
    <span className="block px-3 py-1.5 text-[11px] text-muted-foreground">Article image via {image.publisher}</span>
  </span>;
}
