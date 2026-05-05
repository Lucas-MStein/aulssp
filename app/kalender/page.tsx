// app/kalender/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { EventCard } from "@/components/calendar/EventCard";
import { EventForm } from "@/components/calendar/EventForm";
import { getEpisodes } from "@/lib/data/episodes";
import { getEvents } from "@/lib/data/events";

export default async function KalenderPage() {
    const [episodes, events] = await Promise.all([getEpisodes(), getEvents()]);

    return (
        <AppShell>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Kalender
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Alle AULSSP-Wochenenden und Termine auf einen Blick.
                    </p>
                </section>

                <EventForm />

                <section className="space-y-3">
                    <div>
                        <p className="text-sm font-semibold text-orange-500">
                            Einzelne Termine
                        </p>
                        <h3 className="mt-1 text-xl font-black text-stone-950">
                            Agenda
                        </h3>
                    </div>

                    {events.length === 0 ? (
                        <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                            <p className="text-sm text-stone-600">
                                Noch keine einzelnen Termine eingetragen.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="space-y-3">
                    <div>
                        <p className="text-sm font-semibold text-orange-500">
                            AULSSP-Episoden
                        </p>
                        <h3 className="mt-1 text-xl font-black text-stone-950">
                            Wochenenden
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {episodes.map((episode) => (
                            <EpisodeCard key={episode.id} episode={episode} />
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}