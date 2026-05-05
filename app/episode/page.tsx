// app/episode/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { getNextEpisode } from "@/lib/data/episodes";
import { formatDateRange } from "@/lib/dates";

export default async function EpisodePage() {
    const episode = await getNextEpisode();

    if (!episode) {
        return (
            <AppShell>
                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <h2 className="text-xl font-black text-stone-950">
                        Keine nächste Episode
                    </h2>
                </section>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <div className="space-y-5">
                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        Nächste Episode
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                        {episode.title}
                    </h2>

                    <p className="mt-2 text-sm text-stone-500">
                        {formatDateRange(episode.startDate, episode.endDate)}
                    </p>
                </section>

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-black text-stone-950">Wochenendplan</h3>

                    <div className="mt-4 space-y-3">
                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-900">Freitag</p>
                            <p className="mt-1 text-sm leading-6 text-stone-600">
                                {episode.fridayPlan ?? "Noch offen."}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-900">Samstag</p>
                            <p className="mt-1 text-sm leading-6 text-stone-600">
                                {episode.saturdayPlan ?? "Noch offen."}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-900">Sonntag</p>
                            <p className="mt-1 text-sm leading-6 text-stone-600">
                                {episode.sundayPlan ?? "Noch offen."}
                            </p>
                        </div>
                    </div>
                </section>

                {episode.teaser && (
                    <section className="rounded-[2rem] bg-pink-50 p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-500">
                            Hinweis
                        </p>
                        <p className="mt-2 text-sm leading-6 text-stone-700">
                            {episode.teaser}
                        </p>
                    </section>
                )}
            </div>
        </AppShell>
    );
}