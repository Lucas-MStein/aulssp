// app/wir/page.tsx

import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/data/profiles";

type ProfileRow = {
    id: string;
    display_name: string;
    profile_color: string;
    avatar_url: string | null;
    updated_at: string;
};

type EventStatsRow = {
    id: string;
    created_by_user_id: string | null;
};

type EpisodeStatsRow = {
    id: string;
    planner: string | null;
};

type WeekendVoteStatsRow = {
    id: string;
    user_id: string | null;
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

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

function getProfileColorLabel(color: string) {
    const colors = {
        green: "Grün",
        blue: "Blau",
        pink: "Pink",
        orange: "Orange",
        purple: "Lila",
        yellow: "Gelb",
        red: "Rot",
        teal: "Türkis",
    } as const;

    return colors[color as keyof typeof colors] ?? "Orange";
}

function normalizeName(value: string | null | undefined) {
    return value?.trim().toLowerCase() ?? "";
}

export default async function WirPage() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    await ensureProfile({
        supabase,
        user,
    });

    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name, profile_color, avatar_url, updated_at")
        .order("display_name", { ascending: true });

    if (profilesError) {
        throw new Error(profilesError.message);
    }

    const [
        { data: events, error: eventsError },
        { data: episodes, error: episodesError },
        { data: weekendVotes, error: weekendVotesError },
    ] = await Promise.all([
        supabase.from("events").select("id, created_by_user_id"),
        supabase.from("episodes").select("id, planner"),
        supabase.from("weekend_mode_votes").select("id, user_id"),
    ]);

    if (eventsError) {
        throw new Error(eventsError.message);
    }

    if (episodesError) {
        throw new Error(episodesError.message);
    }

    if (weekendVotesError) {
        throw new Error(weekendVotesError.message);
    }

    const profileRows = (profiles ?? []) as ProfileRow[];
    const activeProfileCount = profileRows.length;
    const profileNames = profileRows
        .map((profile) => profile.display_name)
        .join(" & ");

    const eventRows = (events ?? []) as EventStatsRow[];
    const episodeRows = (episodes ?? []) as EpisodeStatsRow[];
    const weekendVoteRows = (weekendVotes ?? []) as WeekendVoteStatsRow[];

    const statsByProfileId = new Map(
        profileRows.map((profile) => {
            const createdEvents = eventRows.filter(
                (event) => event.created_by_user_id === profile.id
            ).length;

            const plannedEpisodes = episodeRows.filter(
                (episode) =>
                    normalizeName(episode.planner) ===
                    normalizeName(profile.display_name)
            ).length;

            const weekendModeVotes = weekendVoteRows.filter(
                (vote) => vote.user_id === profile.id
            ).length;

            return [
                profile.id,
                {
                    createdEvents,
                    plannedEpisodes,
                    weekendModeVotes,
                },
            ];
        })
    );

    return (
        <AppShell>
            <div className="space-y-5">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Wir
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Euer gemeinsamer AULSSP-Bereich mit allen Profilen und persönlichen Farben.
                    </p>
                </section>

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        AULSSP-Team
                    </p>

                    <h3 className="mt-2 text-xl font-black text-stone-950">
                        Wer ist dabei?
                    </h3>

                    <div className="mt-5 space-y-3">
                        {profileRows.map((profile) => {
                            const isCurrentUser = profile.id === user.id;
                            const stats = statsByProfileId.get(profile.id);

                            return (
                                <div
                                    key={profile.id}
                                    className="rounded-2xl bg-orange-50/60 p-4 ring-1 ring-orange-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={[
                                                "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-black ring-2",
                                                getProfileColorClasses(
                                                    profile.profile_color
                                                ),
                                            ].join(" ")}
                                        >
                                            {profile.avatar_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={profile.avatar_url}
                                                    alt={profile.display_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                getInitials(profile.display_name)
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="truncate text-lg font-black text-stone-950">
                                                    {profile.display_name}
                                                </p>

                                                {isCurrentUser && (
                                                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-orange-600 ring-1 ring-orange-100">
                                                        Du
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 text-sm text-stone-500">
                                                Profilfarbe:{" "}
                                                {getProfileColorLabel(
                                                    profile.profile_color
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        <div className="rounded-xl bg-white px-2 py-2 text-center ring-1 ring-orange-100">
                                            <p className="text-sm font-black text-stone-950">
                                                {stats?.createdEvents ?? 0}
                                            </p>
                                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                                                Termine
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-white px-2 py-2 text-center ring-1 ring-orange-100">
                                            <p className="text-sm font-black text-stone-950">
                                                {stats?.plannedEpisodes ?? 0}
                                            </p>
                                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                                                Episoden
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-white px-2 py-2 text-center ring-1 ring-orange-100">
                                            <p className="text-sm font-black text-stone-950">
                                                {stats?.weekendModeVotes ?? 0}
                                            </p>
                                            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                                                Votes
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        Profile werden verwendet in
                    </p>

                    <h3 className="mt-2 text-xl font-black text-stone-950">
                        Wo eure Farben auftauchen
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                            <p className="text-lg">📅</p>
                            <p className="mt-2 text-sm font-black text-stone-950">
                                Kalender
                            </p>
                            <p className="mt-1 text-xs leading-5 text-stone-500">
                                Legende und Terminpunkte nutzen eure Profilfarben.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                            <p className="text-lg">🎲</p>
                            <p className="mt-2 text-sm font-black text-stone-950">
                                Wochenend-Modus
                            </p>
                            <p className="mt-1 text-xs leading-5 text-stone-500">
                                Votes zeigen Avatar, Name und aktuelle Farbe.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                            <p className="text-lg">👤</p>
                            <p className="mt-2 text-sm font-black text-stone-950">
                                App-Kopf
                            </p>
                            <p className="mt-1 text-xs leading-5 text-stone-500">
                                Dein Avatar oben rechts führt direkt zum Profil.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
                            <p className="text-lg">🧡</p>
                            <p className="mt-2 text-sm font-black text-stone-950">
                                Gemeinsame Ansicht
                            </p>
                            <p className="mt-1 text-xs leading-5 text-stone-500">
                                Hier seht ihr alle aktiven Profile auf einen Blick.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}
