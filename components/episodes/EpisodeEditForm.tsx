// components/episodes/EpisodeEditForm.tsx

import type { Episode } from "@/lib/data";
import { updateEpisode } from "@/app/episode/actions";

type EpisodeEditFormProps = {
    episode: Episode;
};

const inputClassName =
    "block min-h-[3.25rem] w-full max-w-full min-w-0 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100";

const labelClassName = "block text-sm font-semibold text-stone-700";

export function EpisodeEditForm({ episode }: EpisodeEditFormProps) {
    return (
        <section className="w-full max-w-full overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">
                Episode bearbeiten
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                {episode.title}
            </h2>

            <form action={updateEpisode} className="mt-6 w-full space-y-5">
                <input type="hidden" name="id" value={episode.id} />
                <input type="hidden" name="slug" value={episode.slug} />

                <div>
                    <label htmlFor="title" className={labelClassName}>
                        Titel
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        defaultValue={episode.title}
                        className={inputClassName}
                    />
                </div>

                <div>
                    <label htmlFor="startDate" className={labelClassName}>
                        Startdatum
                    </label>
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        required
                        defaultValue={episode.startDate}
                        className={inputClassName}
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className={labelClassName}>
                        Enddatum
                    </label>
                    <input
                        id="endDate"
                        name="endDate"
                        type="date"
                        required
                        defaultValue={episode.endDate}
                        className={inputClassName}
                    />
                </div>

                <div>
                    <label htmlFor="location" className={labelClassName}>
                        Ort
                    </label>

                    <div className="relative">
                        <select
                            id="location"
                            name="location"
                            defaultValue={
                                episode.location === "Hemsbach" ||
                                episode.location === "Calw" ||
                                episode.location === "Mosbach"
                                    ? episode.location
                                    : ""
                            }
                            className={`${inputClassName} pr-12`}
                        >
                            <option value="">Noch offen</option>
                            <option value="Hemsbach">Hemsbach</option>
                            <option value="Calw">Calw</option>
                            <option value="Mosbach">Mosbach</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-700">
      ˅
    </span>
                    </div>

                    {episode.location &&
                        episode.location !== "Hemsbach" &&
                        episode.location !== "Calw" &&
                        episode.location !== "Mosbach" && (
                            <p className="mt-2 text-xs leading-5 text-stone-500">
                                Aktueller alter Wert: {episode.location}. Bitte einen neuen Ort
                                auswählen, wenn du diese Episode speicherst.
                            </p>
                        )}
                </div>

                <div>
                    <label htmlFor="planner" className={labelClassName}>
                        Planner
                    </label>

                    <div className="relative">
                        <select
                            id="planner"
                            name="planner"
                            defaultValue={episode.planner ?? ""}
                            className={`${inputClassName} pr-12`}
                        >
                            <option value="">Noch offen</option>
                            <option value="Alina">Alina</option>
                            <option value="Lucas">Lucas</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-700">
              ˅
            </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="driver" className={labelClassName}>
                        Fahrt
                    </label>

                    <div className="relative">
                        <select
                            id="driver"
                            name="driver"
                            defaultValue={episode.driver ?? ""}
                            className={`${inputClassName} pr-12`}
                        >
                            <option value="">Noch offen</option>
                            <option value="Alina">Alina fährt</option>
                            <option value="Lucas">Lucas fährt</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-700">
              ˅
            </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className={labelClassName}>
                        Status
                    </label>

                    <div className="relative">
                        <select
                            id="status"
                            name="status"
                            defaultValue={episode.status}
                            className={`${inputClassName} pr-12`}
                        >
                            <option value="planned">Geplant</option>
                            <option value="open">Offen</option>
                            <option value="done">Erlebt</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-700">
              ˅
            </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="teaser" className={labelClassName}>
                        Hinweis / Teaser
                    </label>
                    <textarea
                        id="teaser"
                        name="teaser"
                        rows={3}
                        placeholder="z. B. Bring bequeme Schuhe mit."
                        defaultValue={episode.teaser ?? ""}
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div>
                    <label htmlFor="fridayPlan" className={labelClassName}>
                        Freitag
                    </label>
                    <textarea
                        id="fridayPlan"
                        name="fridayPlan"
                        rows={3}
                        defaultValue={episode.fridayPlan ?? ""}
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div>
                    <label htmlFor="saturdayPlan" className={labelClassName}>
                        Samstag
                    </label>
                    <textarea
                        id="saturdayPlan"
                        name="saturdayPlan"
                        rows={3}
                        defaultValue={episode.saturdayPlan ?? ""}
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div>
                    <label htmlFor="sundayPlan" className={labelClassName}>
                        Sonntag
                    </label>
                    <textarea
                        id="sundayPlan"
                        name="sundayPlan"
                        rows={3}
                        defaultValue={episode.sundayPlan ?? ""}
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div>
                    <label htmlFor="highlight" className={labelClassName}>
                        Highlight
                    </label>
                    <textarea
                        id="highlight"
                        name="highlight"
                        rows={3}
                        defaultValue={episode.highlight ?? ""}
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div>
                    <label htmlFor="insideJoke" className={labelClassName}>
                        Insider
                    </label>
                    <textarea
                        id="insideJoke"
                        name="insideJoke"
                        rows={3}
                        defaultValue={episode.insideJoke ?? ""}
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div>
                    <label htmlFor="rating" className={labelClassName}>
                        Bewertung
                    </label>
                    <input
                        id="rating"
                        name="rating"
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        placeholder="z. B. 9"
                        defaultValue={episode.rating ?? ""}
                        className={inputClassName}
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                >
                    Episode speichern
                </button>
            </form>
        </section>
    );
}