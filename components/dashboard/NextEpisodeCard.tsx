// components/dashboard/NextEpisodeCard.tsx

import Link from "next/link";
import type { Episode } from "@/lib/data";
import { formatDateRange } from "@/lib/dates";

type ProfileRow = {
    id: string;
    display_name: string;
    profile_color: string;
    avatar_url: string | null;
};

type NextEpisodeCardProps = {
    episode: Episode;
    profiles?: ProfileRow[];
};

function getProfileColorClasses(color: string) {
    const colors = {
        green: "bg-green-50 text-green-700 ring-green-200",
        blue: "bg-blue-50 text-blue-700 ring-blue-200",
        pink: "bg-pink-50 text-pink-700 ring-pink-200",
        orange: "bg-orange-50 text-orange-700 ring-orange-200",
        purple: "bg-purple-50 text-purple-700 ring-purple-200",
        yellow: "bg-yellow-50 text-yellow-700 ring-yellow-200",
        red: "bg-red-50 text-red-700 ring-red-200",
        teal: "bg-teal-50 text-teal-700 ring-teal-200",
    } as const;

    return colors[color as keyof typeof colors] ?? colors.orange;
}

function normalizeName(value: string | null | undefined) {
    return value?.trim().toLowerCase() ?? "";
}

function getProfileByName(
    profiles: ProfileRow[],
    name: string | null | undefined
) {
    const normalizedName = normalizeName(name);

    if (!normalizedName) {
        return null;
    }

    return (
        profiles.find(
            (profile) => normalizeName(profile.display_name) === normalizedName
        ) ?? null
    );
}

function ProfilePersonPill({
    name,
    suffix,
    profiles,
}: {
    name: string | null | undefined;
    suffix?: string;
    profiles: ProfileRow[];
}) {
    if (!name) {
        return <>{"Noch offen"}</>;
    }

    const profile = getProfileByName(profiles, name);

    if (!profile) {
        return <>{suffix ? `${name} ${suffix}` : name}</>;
    }

    return (
        <span
            className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold leading-none ring-1 ${getProfileColorClasses(
                profile.profile_color
            )}`}
        >
            {profile.avatar_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={profile.avatar_url}
                    alt=""
                    className="h-4 w-4 shrink-0 rounded-full object-cover"
                />
            )}

            <span className="truncate">
                {profile.display_name}
                {suffix ? ` ${suffix}` : ""}
            </span>
        </span>
    );
}

export function NextEpisodeCard({
    episode,
    profiles = [],
}: NextEpisodeCardProps) {
    return (
        <Link
            href={`/episode/${episode.slug}?from=dashboard`}
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
                    <p className="text-xs leading-none text-stone-500">Fahrt</p>
                    <div className="mt-2 font-semibold text-stone-900">
                        <ProfilePersonPill
                            name={episode.driver}
                            profiles={profiles}
                        />
                    </div>
                </div>

                <div className="rounded-2xl bg-orange-50/70 p-3">
                    <p className="text-xs leading-none text-stone-500">Planner</p>
                    <div className="mt-2 font-semibold text-stone-900">
                        <ProfilePersonPill
                            name={episode.planner}
                            profiles={profiles}
                        />
                    </div>
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