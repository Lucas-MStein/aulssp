// app/dashboard/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { CountdownCard } from "@/components/dashboard/CountdownCard";
import { NextEpisodeCard } from "@/components/dashboard/NextEpisodeCard";
import { getNextEpisode } from "@/lib/data/episodes";
import { WeekendModeCard } from "@/components/dashboard/WeekendModeCard";
import { getWeekendModeVotes } from "@/lib/data/weekendModes";
import { createClient } from "@/lib/supabase/server";

type ProfileRow = {
    id: string;
    display_name: string;
    profile_color: string;
    avatar_url: string | null;
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const nextEpisode = await getNextEpisode();

    const supabase = await createClient();

    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name, profile_color, avatar_url");

    if (profilesError) {
        throw new Error(profilesError.message);
    }

    const profileRows = (profiles ?? []) as ProfileRow[];

    const weekendModeVotes = nextEpisode
        ? await getWeekendModeVotes(nextEpisode.id)
        : [];

    if (!nextEpisode) {
        return (
            <AppShell>
                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <h2 className="text-xl font-black text-stone-950">
                        Keine Episode geplant
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Zeit, die nächste AULSSP-Folge zu planen.
                    </p>
                </section>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="space-y-5">
                <CountdownCard episode={nextEpisode} />
                <NextEpisodeCard
                    episode={nextEpisode}
                    profiles={profileRows}
                />

                <WeekendModeCard episodeId={nextEpisode.id} votes={weekendModeVotes} />
            </div>
        </AppShell>
    );
}