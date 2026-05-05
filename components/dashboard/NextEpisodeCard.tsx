// components/dashboard/NextEpisodeCard.tsx

import type { Episode } from "@/lib/data";
import { formatDateRange } from "@/lib/dates";

type NextEpisodeCardProps = {
    episode: Episode;
};

export function NextEpisodeCard({ episode }: NextEpisodeCardProps) {
    return (
        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">Nächste Episode</p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                {episode.title}
            </h2>

            <p className="mt-2 text-sm text-stone-500">
                {formatDateRange(episode.startDate, episode.endDate)}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-orange-50 p-3">
                    <p className="text-xs text-stone-500">Ort</p>
                    <p className="font-semibold text-stone-900">{episode.location}</p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-3">
                    <p className="text-xs text-stone-500">Fahrt</p>
                    <p className="font-semibold text-stone-900">{episode.driver} fährt</p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-3">
                    <p className="text-xs text-stone-500">Planner</p>
                    <p className="font-semibold text-stone-900">{episode.planner}</p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-3">
                    <p className="text-xs text-stone-500">Status</p>
                    <p className="font-semibold text-stone-900">
                        {episode.status === "planned" ? "Geplant" : "Offen"}
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
        </section>
    );
}