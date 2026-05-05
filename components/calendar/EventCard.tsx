// components/calendar/EventCard.tsx

import type { CalendarEvent } from "@/lib/data";

type EventCardProps = {
    event: CalendarEvent;
};

function formatEventDate(date: string) {
    return new Intl.DateTimeFormat("de-DE", {
        weekday: "short",
        day: "2-digit",
        month: "long",
    }).format(new Date(date));
}

function formatEventTime(date: string) {
    return new Intl.DateTimeFormat("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

function getCategoryLabel(category: string | null) {
    switch (category) {
        case "date":
            return "Date";
        case "travel":
            return "Fahrt";
        case "food":
            return "Essen";
        case "private":
            return "Privat";
        case "reminder":
            return "Hinweis";
        default:
            return "Termin";
    }
}

export function EventCard({ event }: EventCardProps) {
    return (
        <article className="rounded-[1.75rem] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                        {formatEventDate(event.startsAt)}
                    </p>

                    <h3 className="mt-2 text-lg font-black text-stone-950">
                        {event.title}
                    </h3>
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
          {getCategoryLabel(event.category)}
        </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-stone-700">
                {formatEventTime(event.startsAt)}
                {event.endsAt ? ` – ${formatEventTime(event.endsAt)}` : ""}
            </p>

            {event.description && (
                <p className="mt-2 text-sm leading-6 text-stone-600">
                    {event.description}
                </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
                {event.location && (
                    <span className="rounded-full bg-stone-100 px-3 py-1">
            📍 {event.location}
          </span>
                )}

                {event.createdBy && (
                    <span className="rounded-full bg-stone-100 px-3 py-1">
            Von {event.createdBy}
          </span>
                )}
            </div>
        </article>
    );
}