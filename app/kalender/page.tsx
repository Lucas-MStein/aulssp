// app/kalender/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { getEpisodes } from "@/lib/data/episodes";

export default async function KalenderPage() {
    const episodes = await getEpisodes();

    return (
        <AppShell>
            <div className="space-y-4">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Kalender
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Alle geplanten AULSSP-Wochenenden auf einen Blick.
                    </p>
                </section>

                <div className="space-y-3">
                    {episodes.map((episode) => (
                        <EpisodeCard key={episode.id} episode={episode} />
                    ))}
                </div>
            </div>
        </AppShell>
    );
}