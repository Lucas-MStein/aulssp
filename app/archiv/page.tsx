// app/archiv/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { getPastEpisodes } from "@/lib/data";

export default function ArchivPage() {
    const pastEpisodes = getPastEpisodes();

    return (
        <AppShell>
            <div className="space-y-4">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Episodenarchiv
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Hier sammelt ihr eure gemeinsamen Wochenenden, Highlights und
                        Insider.
                    </p>
                </section>

                {pastEpisodes.length === 0 ? (
                    <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                        <p className="text-sm text-stone-600">
                            Noch keine abgeschlossene Episode.
                        </p>
                    </section>
                ) : (
                    <div className="space-y-3">
                        {pastEpisodes.map((episode) => (
                            <EpisodeCard key={episode.id} episode={episode} />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}