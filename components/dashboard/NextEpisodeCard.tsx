// components/dashboard/NextEpisodeCard.tsx

import Link from "next/link";
import type { Episode } from "@/lib/data";
import { formatDateRange } from "@/lib/dates";

type NextEpisodeCardProps = {
    episode: Episode;
};

export function NextEpisodeCard({ episode }: NextEpisodeCardProps) {
    return (
        <Link
            href={`/episode/${episode.slug}`}
            className="group block rounded-[2rem] bg-white p-5 shadow-sm transition active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-md"
            aria-label={`Episode ${episode.title} öffnen`}
        >
            <p className="text-sm font-semibold text-orange-500">Nächste Episode</p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-950">
                {episode.title}
            </h2>

            <p className="mt-3 text-sm text-stone-500">
                {formatDateRange(episode.startDate, episode.endDate)}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs text-stone-500">Ort</p>
                    <p className="font-semibold text-stone-900">
                        {episode.location ?? "Noch offen"}
                    </p>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs text-stone-500">Fahrt</p>
                    <p className="font-semibold text-stone-900">
                        {episode.driver ? `${episode.driver} fährt` : "Noch offen"}
                    </p>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs text-stone-500">Planner</p>
                    <p className="font-semibold text-stone-900">
                        {episode.planner ?? "Noch offen"}
                    </p>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs text-stone-500">Status</p>
                    <p className="font-semibold text-stone-900">
                        {episode.status === "done"
                            ? "Erlebt"
                            : episode.status === "open"
                                ? "Offen"
                                : "Geplant"}
                    </p>
                </div>
            </div>

            {episode.teaser && (
                <div className="mt-5 rounded-2xl bg-pink-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-500">
                        Hinweis
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">
                        {episode.teaser}
                    </p>
                </div>
            )}

            <div className="mt-5 flex items-center justify-between border-t border-orange-50 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                    Episode öffnen
                </p>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-lg font-black text-white shadow-sm transition group-hover:translate-x-0.5">
          →
        </span>
            </div>
        </Link>
    );
}