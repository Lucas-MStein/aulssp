// app/kalender/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { CalendarMonth } from "@/components/calendar/CalendarMonth";
import { getActiveEpisodes } from "@/lib/data/episodes";
import { getEvents } from "@/lib/data/events";

type KalenderPageProps = {
    searchParams?: Promise<{
        created?: string;
        deleted?: string;
        locked?: string;
    }>;
};

export default async function KalenderPage({
                                               searchParams,
                                           }: KalenderPageProps) {
    const params = await searchParams;

    const [episodes, events] = await Promise.all([
        getActiveEpisodes(),
        getEvents(),
    ]);

    const showCreatedMessage = params?.created === "1";
    const showDeletedMessage = params?.deleted === "1";
    const showLockedMessage = params?.locked === "1";

    return (
        <AppShell>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Kalender
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Monatsübersicht mit Terminen und AULSSP-Episoden.
                    </p>
                </section>

                {showCreatedMessage && (
                    <section className="rounded-[1.5rem] bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm">
                        Termin gespeichert.
                    </section>
                )}

                {showDeletedMessage && (
                    <section className="rounded-[1.5rem] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm">
                        Termin gelöscht.
                    </section>
                )}

                {showLockedMessage && (
                    <section className="rounded-[1.5rem] bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-800 shadow-sm">
                        Diese Episode ist bereits abgeschlossen. Neue Programmpunkte können
                        nicht mehr hinzugefügt werden.
                    </section>
                )}

                <CalendarMonth events={events} episodes={episodes} />
            </div>
        </AppShell>
    );
}