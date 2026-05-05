// components/calendar/EventForm.tsx

import { createEvent } from "@/app/kalender/actions";

const inputClassName =
    "mt-2 min-h-[3.25rem] w-full min-w-0 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100";

const labelClassName = "text-sm font-semibold text-stone-700";

export function EventForm() {
    return (
        <section className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">Neuer Termin</p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                In den Kalender eintragen
            </h2>

            <form action={createEvent} className="mt-6 space-y-5">
                <div>
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="min-w-0">
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

                    <div className="min-w-0">
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
                </div>

                <div>
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

                <div>
                    <label htmlFor="category" className={labelClassName}>
                        Kategorie
                    </label>
                    <select
                        id="category"
                        name="category"
                        defaultValue="date"
                        className={inputClassName}
                    >
                        <option value="date">Date</option>
                        <option value="travel">Fahrt</option>
                        <option value="food">Essen</option>
                        <option value="private">Privat</option>
                        <option value="reminder">Hinweis</option>
                        <option value="general">Allgemein</option>
                    </select>
                </div>

                <div>
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

                <div>
                    <label htmlFor="createdBy" className={labelClassName}>
                        Eingetragen von
                    </label>
                    <select
                        id="createdBy"
                        name="createdBy"
                        defaultValue="Lucas"
                        className={inputClassName}
                    >
                        <option value="Lucas">Lucas</option>
                        <option value="Alina">Alina</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className={labelClassName}>
                        Beschreibung optional
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Kleine Notiz zum Termin..."
                        className={`${inputClassName} resize-none`}
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