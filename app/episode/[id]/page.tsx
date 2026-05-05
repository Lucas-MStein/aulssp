// app/episode/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { getEpisodeById } from "@/lib/data";
import { formatDateRange } from "@/lib/dates";

type EpisodeDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EpisodeDetailPage({
                                                    params,
                                                }: EpisodeDetailPageProps) {
    const { id } = await params;
    const episode = getEpisodeById(id);

    if (!episode) {
        notFound();
    }

    return (
        <AppShell>
            <div className="space-y-5">
                <Link
                    href="/kalender"
                    className="inline-flex text-sm font-semibold text-orange-600"
                >
                    ← Zurück zum Kalender
                </Link>

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        Episode
                    </p>

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
                                {episode.location}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-3">
                            <p className="text-xs text-stone-500">Fahrt</p>
                            <p className="font-semibold text-stone-900">
                                {episode.driver} fährt
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-3">
                            <p className="text-xs text-stone-500">Planner</p>
                            <p className="font-semibold text-stone-900">
                                {episode.planner}
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

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-black text-stone-950">
                        Wochenendplan
                    </h3>

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

                {(episode.highlight || episode.insideJoke || episode.rating) && (
                    <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                        <h3 className="text-lg font-black text-stone-950">
                            Erinnerung
                        </h3>

                        <div className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                            {episode.highlight && (
                                <p>
                  <span className="font-bold text-stone-900">
                    Highlight:
                  </span>{" "}
                                    {episode.highlight}
                                </p>
                            )}

                            {episode.insideJoke && (
                                <p>
                  <span className="font-bold text-stone-900">
                    Insider:
                  </span>{" "}
                                    {episode.insideJoke}
                                </p>
                            )}

                            {episode.rating && (
                                <p>
                  <span className="font-bold text-stone-900">
                    Bewertung:
                  </span>{" "}
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