// components/episodes/EpisodeCard.tsx

import Link from "next/link";
import type { Episode } from "@/lib/data";
import { formatDateRange } from "@/lib/dates";

type EpisodeCardProps = {
    episode: Episode;
};

export function EpisodeCard({ episode }: EpisodeCardProps) {
    return (
        <Link
            href={`/episode/${episode.slug}`}
            className="block rounded-[1.75rem] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                        {formatDateRange(episode.startDate, episode.endDate)}
                    </p>

                    <h2 className="mt-2 text-lg font-black tracking-tight text-stone-950">
                        {episode.title}
                    </h2>
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
          {episode.status === "done"
              ? "Erlebt"
              : episode.status === "open"
                  ? "Offen"
                  : "Geplant"}
        </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs text-stone-500">Ort</p>
                    <p className="font-semibold text-stone-900">{episode.location}</p>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs text-stone-500">Planner</p>
                    <p className="font-semibold text-stone-900">{episode.planner}</p>
                </div>
            </div>
        </Link>
    );
}