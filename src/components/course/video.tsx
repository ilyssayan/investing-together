"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { Video } from "@/lib/course";

// Shows a thumbnail first and only loads the YouTube player when pressed.
// That keeps the page fast and stops YouTube tracking people who never play.
export function LessonVideo({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-primary">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`Play video: ${video.title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="absolute top-1/2 left-1/2 flex size-20 -translate-1/2 items-center justify-center rounded-full bg-card text-primary shadow-lg transition-transform duration-300 ease-out group-hover:scale-110">
              <Play className="size-8 translate-x-0.5 fill-current" />
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}
