// app/episode/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { getEpisodeBySlug } from "@/lib/data/episodes";
import { formatDateRange } from "@/lib/dates";

type EpisodeDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
    searchParams?: Promise<{
        updated?: string;
        from?: string;
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

    const showUpdatedMessage = feedbackParams?.updated === "1";

    const isDone = episode.status === "done";

    const cameFromDashboard = feedbackParams?.from === "dashboard";

    const backHref = cameFromDashboard
        ? "/dashboard"
        : isDone
            ? "/archiv"
            : "/kalender";

    const backLabel = cameFromDashboard
        ? "zum Dashboard"
        : isDone
            ? "zum Archiv"
            : "zum Kalender";

    return (
        <AppShell>
            <div className="space-y-5">
                <Link
                    href={backHref}
                    className="inline-flex text-sm font-semibold text-orange-600"
                >
                    ← Zurück {backLabel}
                </Link>

                <Link
                    href={`/episode/${episode.slug}/edit`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-orange-600 shadow-sm transition hover:bg-orange-50"
                >
                    Episode bearbeiten
                </Link>

                {showUpdatedMessage && (
                    <section className="rounded-[1.5rem] bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm">
                        Episode gespeichert.
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

                {episode.driveUrl && (
                    <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-orange-500">Fotos</p>

                        <h3 className="mt-2 text-xl font-black text-stone-950">
                            Erinnerungen im Drive
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-stone-600">
                            Hier findest du die Bilder und Videos zu dieser Episode.
                        </p>

                        <a
                            href={episode.driveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                        >
                            📸 Fotos im Drive ansehen
                        </a>
                    </section>
                )}

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-black text-stone-950">Wochenendplan</h3>

                    <div className="mt-4 space-y-3">
                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-900">Freitag</p>
                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-stone-600">
                                {episode.fridayPlan ?? "Noch offen."}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-900">Samstag</p>
                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-stone-600">
                                {episode.saturdayPlan ?? "Noch offen."}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-900">Sonntag</p>
                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-stone-600">
                                {episode.sundayPlan ?? "Noch offen."}
                            </p>
                        </div>
                    </div>
                </section>

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