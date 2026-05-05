// app/dashboard/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { CountdownCard } from "@/components/dashboard/CountdownCard";
import { NextEpisodeCard } from "@/components/dashboard/NextEpisodeCard";
import { getNextEpisode } from "@/lib/data";

export default function DashboardPage() {
    const nextEpisode = getNextEpisode();

    if (!nextEpisode) {
        return (
            <AppShell>
                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <h2 className="text-xl font-black text-stone-950">
                        Keine Episode geplant
                    </h2>
                    <p className="mt-2 text-sm text-stone-600">
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

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        Wochenend-Modus
                    </p>
                    <h2 className="mt-2 text-xl font-black text-stone-950">
                        Vorfreude aktiviert
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Diese Woche zählt nur eins: weniger Orga-Stress, mehr gemeinsame
                        Zeit.
                    </p>
                </section>
            </div>
        </AppShell>
    );
}