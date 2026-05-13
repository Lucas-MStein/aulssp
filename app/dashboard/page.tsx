// app/dashboard/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { CountdownCard } from "@/components/dashboard/CountdownCard";
import { NextEpisodeCard } from "@/components/dashboard/NextEpisodeCard";
import { getNextEpisode } from "@/lib/data/episodes";
import { WeekendModeCard } from "@/components/dashboard/WeekendModeCard";
import { getWeekendModeVotes } from "@/lib/data/weekendModes";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const nextEpisode = await getNextEpisode();

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

                <NextEpisodeCard episode={nextEpisode} />

                <WeekendModeCard episodeId={nextEpisode.id} votes={weekendModeVotes} />
            </div>
        </AppShell>
    );
}