// app/episode/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { EventCard } from "@/components/calendar/EventCard";
import { EventForm } from "@/components/calendar/EventForm";
import { getEpisodeBySlug } from "@/lib/data/episodes";
import { getEventsByEpisodeId } from "@/lib/data/events";
import { formatDateRange } from "@/lib/dates";

type EpisodeDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams?: Promise<{
        created?: string;
        deleted?: string;
        updated?: string;
        locked?: string;
    }>;
};

export default async function EpisodeDetailPage({
                                                    params,
                                                    searchParams,
                                                }: EpisodeDetailPageProps) {
    const { id } = await params;
    const feedbackParams = await searchParams;

    const episode = await getEpisodeBySlug(id);

    if (!episode) {
        notFound();
    }

    const episodeEvents = await getEventsByEpisodeId(episode.id);

    const showCreatedMessage = feedbackParams?.created === "1";
    const showDeletedMessage = feedbackParams?.deleted === "1";
    const showUpdatedMessage = feedbackParams?.updated === "1";
    const showLockedMessage = feedbackParams?.locked === "1";

    const episodePath = `/episode/${episode.slug}`;
    const isDone = episode.status === "done";
    const shouldShowProgramPoints = !isDone || episodeEvents.length > 0;

    return (
        <AppShell>
            <div className="space-y-5">
                <Link
                    href="/kalender"
                    className="inline-flex text-sm font-semibold text-orange-600"
                >
                    ← Zurück zum Kalender
                </Link>

                <Link
                    href={`/episode/${episode.slug}/edit`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-orange-600 shadow-sm transition hover:bg-orange-50"
                >
                    Episode bearbeiten
                </Link>

                {showCreatedMessage && (
                    <section className="rounded-[1.5rem] bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm">
                        Programmpunkt gespeichert.
                    </section>
                )}

                {showDeletedMessage && (
                    <section className="rounded-[1.5rem] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm">
                        Programmpunkt gelöscht.
                    </section>
                )}

                {showUpdatedMessage && (
                    <section className="rounded-[1.5rem] bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm">
                        Episode gespeichert.
                    </section>
                )}

                {showLockedMessage && (
                    <section className="rounded-[1.5rem] bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-800 shadow-sm">
                        Diese Episode ist bereits abgeschlossen. Neue Programmpunkte können
                        nicht mehr hinzugefügt werden.
                    </section>
                )}

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">Episode</p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                        {episode.title}
                    </h2>

                    <p className="mt-2 text-sm text-stone-500">
                        {formatDateRange(episode.startDate, episode.endDate)}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl bg-orange-50 p-3">
                            <p className="text-xs text-stone-500">Ort</p>
                            <p className="font-semibold text-stone-900">
                                {episode.location ?? "Noch offen"}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-3">
                            <p className="text-xs text-stone-500">Fahrt</p>
                            <p className="font-semibold text-stone-900">
                                {episode.driver ? `${episode.driver} fährt` : "Noch offen"}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-3">
                            <p className="text-xs text-stone-500">Planner</p>
                            <p className="font-semibold text-stone-900">
                                {episode.planner ?? "Noch offen"}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-3">
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

                {shouldShowProgramPoints && (
                    <section className="space-y-3">
                        <div>
                            <p className="text-sm font-semibold text-orange-500">
                                Programmpunkte
                            </p>
                            <h3 className="mt-1 text-xl font-black text-stone-950">
                                Ablauf dieser Episode
                            </h3>
                        </div>

                        {episodeEvents.length === 0 ? (
                            <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                                <p className="text-sm text-stone-600">
                                    Für diese Episode sind noch keine Programmpunkte eingetragen.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {episodeEvents.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        redirectTo={episodePath}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {!isDone && (
                    <EventForm
                        episodeId={episode.id}
                        redirectTo={episodePath}
                        eyebrow="Neuer Programmpunkt"
                        title="Zur Episode hinzufügen"
                    />
                )}

                {(episode.highlight || episode.insideJoke || episode.rating) && (
                    <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-black text-stone-950">Erinnerung</h3>

                        <div className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                            {episode.highlight && (
                                <p>
                                    <span className="font-bold text-stone-900">Highlight:</span>{" "}
                                    {episode.highlight}
                                </p>
                            )}

                            {episode.insideJoke && (
                                <p>
                                    <span className="font-bold text-stone-900">Insider:</span>{" "}
                                    {episode.insideJoke}
                                </p>
                            )}

                            {episode.rating && (
                                <p>
                                    <span className="font-bold text-stone-900">Bewertung:</span>{" "}
                                    {episode.rating}/10
                                </p>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </AppShell>
    );
}