// components/calendar/EventCard.tsx

import type { CalendarEvent } from "@/lib/data";
import { DeleteEventButton } from "@/components/calendar/DeleteEventButton";

type EventCardProps = {
    event: CalendarEvent;
    redirectTo?: string;
};

function formatEventDate(date: string) {
    return new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "short",
        day: "2-digit",
        month: "long",
    }).format(new Date(date));
}

function formatEventTime(date: string) {
    return new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin",
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

function getCreatorName(event: CalendarEvent) {
    return event.createdByName ?? event.createdBy;
}

function getCreatorColorClasses(color: string | null) {
    switch (color) {
        case "green":
            return "bg-green-50 text-green-700 ring-green-200";
        case "blue":
            return "bg-blue-50 text-blue-700 ring-blue-200";
        case "pink":
            return "bg-pink-50 text-pink-700 ring-pink-200";
        case "orange":
            return "bg-orange-50 text-orange-700 ring-orange-200";
        case "purple":
            return "bg-purple-50 text-purple-700 ring-purple-200";
        case "yellow":
            return "bg-yellow-50 text-yellow-700 ring-yellow-200";
        case "red":
            return "bg-red-50 text-red-700 ring-red-200";
        case "teal":
            return "bg-teal-50 text-teal-700 ring-teal-200";
        default:
            return "bg-stone-100 text-stone-600 ring-stone-200";
    }
}

function getCreatorDotClassName(color: string | null) {
    switch (color) {
        case "green":
            return "bg-green-500";
        case "blue":
            return "bg-blue-500";
        case "pink":
            return "bg-pink-500";
        case "orange":
            return "bg-orange-500";
        case "purple":
            return "bg-purple-500";
        case "yellow":
            return "bg-yellow-400";
        case "red":
            return "bg-red-500";
        case "teal":
            return "bg-teal-500";
        default:
            return "bg-stone-400";
    }
}

export function EventCard({ event, redirectTo = "/kalender" }: EventCardProps) {
    const creatorName = getCreatorName(event);
    const creatorColorClasses = getCreatorColorClasses(event.createdByColor);
    const creatorDotClassName = getCreatorDotClassName(event.createdByColor);

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

                {creatorName && (
                    <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ${creatorColorClasses}`}
                    >
                        {event.createdByAvatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={event.createdByAvatarUrl}
                                alt=""
                                className="h-4 w-4 rounded-full object-cover"
                            />
                        ) : (
                            <span
                                className={`h-2 w-2 rounded-full ${creatorDotClassName}`}
                            />
                        )}
                        Von {creatorName}
                    </span>
                )}
            </div>

            <DeleteEventButton eventId={event.id} redirectTo={redirectTo} />
        </article>
    );
}