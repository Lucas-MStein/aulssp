// components/calendar/EventForm.tsx

import { createEvent } from "@/app/kalender/actions";

type EventFormProps = {
    episodeId?: string;
    redirectTo?: string;
    title?: string;
    eyebrow?: string;
};

const inputClassName =
    "block min-h-[3.25rem] w-full max-w-full min-w-0 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100";

const labelClassName = "block text-sm font-semibold text-stone-700";

export function EventForm({
                              episodeId,
                              redirectTo = "/kalender",
                              title = "In den Kalender eintragen",
                              eyebrow = "Neuer Termin",
                          }: EventFormProps) {
    return (
        <section className="w-full max-w-full overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">{eyebrow}</p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                {title}
            </h2>

            <form action={createEvent} className="mt-6 w-full space-y-5">
                <input type="hidden" name="episodeId" value={episodeId ?? ""} />
                <input type="hidden" name="redirectTo" value={redirectTo} />

                <div className="w-full min-w-0">
                    <label htmlFor="title" className={labelClassName}>
                        Titel
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="z. B. Café-Test"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="date" className={labelClassName}>
                        Datum
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="startTime" className={labelClassName}>
                        Start
                    </label>
                    <input
                        id="startTime"
                        name="startTime"
                        type="time"
                        required
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="endTime" className={labelClassName}>
                        Ende optional
                    </label>
                    <input
                        id="endTime"
                        name="endTime"
                        type="time"
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="category" className={labelClassName}>
                        Kategorie
                    </label>

                    <div className="relative">
                        <select
                            id="category"
                            name="category"
                            defaultValue="date"
                            className={`${inputClassName} pr-12`}
                        >
                            <option value="date">Date</option>
                            <option value="travel">Fahrt</option>
                            <option value="food">Essen</option>
                            <option value="private">Privat</option>
                            <option value="reminder">Hinweis</option>
                            <option value="general">Allgemein</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-700">
              ˅
            </span>
                    </div>
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="location" className={labelClassName}>
                        Ort optional
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="z. B. Stuttgart"
                        className={inputClassName}
                    />
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="createdBy" className={labelClassName}>
                        Eingetragen von
                    </label>

                    <div className="relative">
                        <select
                            id="createdBy"
                            name="createdBy"
                            defaultValue="Lucas"
                            className={`${inputClassName} pr-12`}
                        >
                            <option value="Lucas">Lucas</option>
                            <option value="Alina">Alina</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-700">
              ˅
            </span>
                    </div>
                </div>

                <div className="w-full min-w-0">
                    <label htmlFor="description" className={labelClassName}>
                        Beschreibung optional
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Kleine Notiz zum Termin..."
                        className={`${inputClassName} min-h-28 resize-none`}
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                >
                    Termin speichern
                </button>
            </form>
        </section>
    );
}