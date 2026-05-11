// components/episodes/EpisodeCreateForm.tsx

import { createEpisode } from "@/app/episode/actions";

const inputClassName =
    "block min-h-[3.25rem] w-full max-w-full min-w-0 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100";

const labelClassName = "block text-sm font-semibold text-stone-700";

export function EpisodeCreateForm() {
    return (
        <section className="w-full max-w-full overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">Neue Episode</p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                Wochenende planen
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-600">
                Lege ein neues gemeinsames AULSSP-Wochenende an.
            </p>

            <form action={createEpisode} className="mt-6 w-full space-y-5">
                <div className="w-full min-w-0">
                    <label htmlFor="episode-title" className={labelClassName}>
                        Titel
                    </label>
                    <input
                        id="episode-title"
                        name="title"
                        type="text"
                        placeholder="z. B. Episode 03: Mission Sonntagsfrühstück"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-startDate" className={labelClassName}>
                        Startdatum
                    </label>
                    <input
                        id="episode-startDate"
                        name="startDate"
                        type="date"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-endDate" className={labelClassName}>
                        Enddatum
                    </label>
                    <input
                        id="episode-endDate"
                        name="endDate"
                        type="date"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-location" className={labelClassName}>
                        Ort
                    </label>

                    <div className="relative">
                        <select
                            id="episode-location"
                            name="location"
                            defaultValue=""
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
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-planner" className={labelClassName}>
                        Planner
                    </label>

                    <div className="relative">
                        <select
                            id="episode-planner"
                            name="planner"
                            defaultValue=""
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

                <div className="w-full min-w-0">
                    <label htmlFor="episode-driver" className={labelClassName}>
                        Fahrt
                    </label>

                    <div className="relative">
                        <select
                            id="episode-driver"
                            name="driver"
                            defaultValue=""
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

                <div className="w-full min-w-0">
                    <label htmlFor="episode-teaser" className={labelClassName}>
                        Hinweis / Teaser
                    </label>
                    <textarea
                        id="episode-teaser"
                        name="teaser"
                        rows={3}
                        placeholder="z. B. Bring bequeme Schuhe mit."
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-fridayPlan" className={labelClassName}>
                        Freitag
                    </label>
                    <textarea
                        id="episode-fridayPlan"
                        name="fridayPlan"
                        rows={3}
                        placeholder="Was ist grob am Freitag geplant?"
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-saturdayPlan" className={labelClassName}>
                        Samstag
                    </label>
                    <textarea
                        id="episode-saturdayPlan"
                        name="saturdayPlan"
                        rows={3}
                        placeholder="Was ist grob am Samstag geplant?"
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-sundayPlan" className={labelClassName}>
                        Sonntag
                    </label>
                    <textarea
                        id="episode-sundayPlan"
                        name="sundayPlan"
                        rows={3}
                        placeholder="Was ist grob am Sonntag geplant?"
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="episode-driveUrl" className={labelClassName}>
                        Google Drive Link optional
                    </label>
                    <input
                        id="episode-driveUrl"
                        name="driveUrl"
                        type="url"
                        placeholder="https://drive.google.com/..."
                        className={inputClassName}
                    />
                    <p className="mt-2 text-xs leading-5 text-stone-500">
                        Link zum Foto-Ordner. Kannst du auch später ergänzen.
                    </p>
                </div>

                <button
                    type="submit"
                    className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                >
                    Episode erstellen
                </button>
            </form>
        </section>
    );
}