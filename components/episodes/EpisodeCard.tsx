// components/episodes/EpisodeCard.tsx

import Link from "next/link";
import type { Episode } from "@/lib/data";
import { formatDateRange } from "@/lib/dates";
import { ProfilePersonPill } from "@/components/profile/ProfilePersonPill";

type ProfileRow = {
    id: string;
    display_name: string;
    profile_color: string;
    avatar_url: string | null;
};

type EpisodeCardProps = {
    episode: Episode;
    profiles?: ProfileRow[];
};

export function EpisodeCard({ episode, profiles = [] }: EpisodeCardProps) {
    return (
        <Link
            href={`/episode/${episode.slug}`}
            className="group block rounded-[1.75rem] bg-white p-5 shadow-sm transition active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-md"
            aria-label={`Episode ${episode.title} öffnen`}
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

                <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
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
                    <p className="font-semibold text-stone-900">
                        {episode.location ?? "Noch offen"}
                    </p>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs leading-none text-stone-500">
                        Planner
                    </p>

                    <div className="mt-2 font-semibold text-stone-900">
                        <ProfilePersonPill
                            name={episode.planner}
                            profiles={profiles}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-orange-50 pt-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                        Antippen für Details
                    </p>

                    {episode.driveUrl && (
                        <p className="mt-1 text-xs font-bold text-orange-500">
                            📸 Fotos vorhanden
                        </p>
                    )}
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-lg font-black text-white shadow-sm transition group-hover:translate-x-0.5">
    →
  </span>
            </div>
        </Link>
    );
}