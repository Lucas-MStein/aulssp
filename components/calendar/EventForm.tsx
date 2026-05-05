// components/calendar/EventForm.tsx

import { createEvent } from "@/app/kalender/actions";

export function EventForm() {
    return (
        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">Neuer Termin</p>

            <h2 className="mt-2 text-xl font-black tracking-tight text-stone-950">
                In den Kalender eintragen
            </h2>

            <form action={createEvent} className="mt-5 space-y-4">
                <div>
                    <label
                        htmlFor="title"
                        className="text-sm font-semibold text-stone-700"
                    >
                        Titel
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="z. B. Café-Test"
                        required
                        className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label
                            htmlFor="date"
                            className="text-sm font-semibold text-stone-700"
                        >
                            Datum
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            required
                            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="startTime"
                            className="text-sm font-semibold text-stone-700"
                        >
                            Start
                        </label>
                        <input
                            id="startTime"
                            name="startTime"
                            type="time"
                            required
                            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="endTime"
                        className="text-sm font-semibold text-stone-700"
                    >
                        Ende optional
                    </label>
                    <input
                        id="endTime"
                        name="endTime"
                        type="time"
                        className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="text-sm font-semibold text-stone-700"
                    >
                        Kategorie
                    </label>
                    <select
                        id="category"
                        name="category"
                        defaultValue="date"
                        className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
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
                    <label
                        htmlFor="location"
                        className="text-sm font-semibold text-stone-700"
                    >
                        Ort optional
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="z. B. Stuttgart"
                        className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="createdBy"
                        className="text-sm font-semibold text-stone-700"
                    >
                        Eingetragen von
                    </label>
                    <select
                        id="createdBy"
                        name="createdBy"
                        defaultValue="Lucas"
                        className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    >
                        <option value="Lucas">Lucas</option>
                        <option value="Alina">Alina</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="text-sm font-semibold text-stone-700"
                    >
                        Beschreibung optional
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Kleine Notiz zum Termin..."
                        className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                >
                    Termin speichern
                </button>
            </form>
        </section>
    );
}