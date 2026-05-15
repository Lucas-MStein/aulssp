// components/calendar/CalendarMonth.tsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CalendarEvent, Episode } from "@/lib/data";
import { DeleteEventButton } from "@/components/calendar/DeleteEventButton";

type CalendarMonthProps = {
    events: CalendarEvent[];
    episodes: Episode[];
};

type CalendarDay = {
    date: Date;
    isCurrentMonth: boolean;
};

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function startOfDay(date: Date) {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

function formatBerlinDateKey(date: Date) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

function isSameDay(firstDate: Date, secondDate: Date) {
    return formatBerlinDateKey(firstDate) === formatBerlinDateKey(secondDate);
}

function isDateInRange(date: Date, startDate: string, endDate: string) {
    const day = startOfDay(date).getTime();
    const start = startOfDay(new Date(startDate)).getTime();
    const end = startOfDay(new Date(endDate)).getTime();

    return day >= start && day <= end;
}

function getCalendarDays(monthDate: Date): CalendarDay[] {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInMonth = lastDayOfMonth.getDate();

    const days: CalendarDay[] = [];

    for (let index = firstWeekday; index > 0; index--) {
        const date = new Date(year, month, 1 - index);

        days.push({
            date,
            isCurrentMonth: false,
        });
    }

    for (let day = 1; day <= daysInMonth; day++) {
        days.push({
            date: new Date(year, month, day),
            isCurrentMonth: true,
        });
    }

    while (days.length % 7 !== 0) {
        const lastDate = days[days.length - 1].date;
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + 1);

        days.push({
            date: nextDate,
            isCurrentMonth: false,
        });
    }

    return days;
}

function getEventsForDay(events: CalendarEvent[], date: Date) {
    return events.filter((event) => isSameDay(new Date(event.startsAt), date));
}

function getEpisodesForDay(episodes: Episode[], date: Date) {
    return episodes.filter((episode) =>
        isDateInRange(date, episode.startDate, episode.endDate)
    );
}

function formatMonthTitle(date: Date) {
    return new Intl.DateTimeFormat("de-DE", {
        month: "long",
        year: "numeric",
    }).format(date);
}

function formatSelectedDate(date: Date) {
    return new Intl.DateTimeFormat("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
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
            return "bg-orange-500";
    }
}

function getFirstEventColor(events: CalendarEvent[]) {
    return events[0]?.createdByColor ?? null;
}

function getUniqueEventCreators(events: CalendarEvent[]) {
    const creators = events
        .map((event) => ({
            name: getCreatorName(event),
            color: event.createdByColor,
            avatarUrl: event.createdByAvatarUrl,
        }))
        .filter((creator) => Boolean(creator.name));

    const uniqueCreators = new Map<string, (typeof creators)[number]>();

    creators.forEach((creator) => {
        const key = `${creator.name}-${creator.color ?? "fallback"}`;

        if (!uniqueCreators.has(key)) {
            uniqueCreators.set(key, creator);
        }
    });

    return Array.from(uniqueCreators.values());
}

function getStatusLabel(status: Episode["status"]) {
    switch (status) {
        case "done":
            return "Erlebt";
        case "open":
            return "Offen";
        default:
            return "Geplant";
    }
}

export function CalendarMonth({ events, episodes }: CalendarMonthProps) {
    const today = useMemo(() => new Date(), []);

    const [monthDate, setMonthDate] = useState(
        () => new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const [selectedDate, setSelectedDate] = useState<Date>(() => today);

    const days = useMemo(() => getCalendarDays(monthDate), [monthDate]);

    const selectedEvents = useMemo(
        () => getEventsForDay(events, selectedDate),
        [events, selectedDate]
    );

    const selectedEpisodes = useMemo(
        () => getEpisodesForDay(episodes, selectedDate),
        [episodes, selectedDate]
    );

    const eventCreators = useMemo(
        () => getUniqueEventCreators(events),
        [events]
    );

    function goToPreviousMonth() {
        setMonthDate((current) => {
            const next = new Date(current);
            next.setMonth(current.getMonth() - 1);
            return next;
        });
    }

    function goToNextMonth() {
        setMonthDate((current) => {
            const next = new Date(current);
            next.setMonth(current.getMonth() + 1);
            return next;
        });
    }

    function goToToday() {
        const now = new Date();

        setMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
        setSelectedDate(now);
    }

    return (
        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
            <div>
                <p className="text-sm font-semibold text-orange-500">
                    Monatsübersicht
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-stone-950">
                    {formatMonthTitle(monthDate)}
                </h2>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_1.25fr_1fr] gap-2">
                <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="rounded-2xl bg-stone-100 px-3 py-3 text-lg font-black text-stone-700 transition active:scale-95"
                    aria-label="Vorheriger Monat"
                >
                    ←
                </button>

                <button
                    type="button"
                    onClick={goToToday}
                    className="rounded-2xl bg-orange-500 px-3 py-3 text-sm font-bold text-white shadow-sm transition active:scale-95"
                >
                    Heute
                </button>

                <button
                    type="button"
                    onClick={goToNextMonth}
                    className="rounded-2xl bg-stone-100 px-3 py-3 text-lg font-black text-stone-700 transition active:scale-95"
                    aria-label="Nächster Monat"
                >
                    →
                </button>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1 text-center">
                {weekDays.map((weekDay) => (
                    <div
                        key={weekDay}
                        className="py-2 text-[0.7rem] font-bold uppercase tracking-wide text-stone-400"
                    >
                        {weekDay}
                    </div>
                ))}

                {days.map((calendarDay) => {
                    const dayEvents = getEventsForDay(events, calendarDay.date);
                    const dayEpisodes = getEpisodesForDay(episodes, calendarDay.date);

                    const hasEvent = dayEvents.length > 0;
                    const hasEpisode = dayEpisodes.length > 0;
                    const isToday = isSameDay(calendarDay.date, today);
                    const isSelected = isSameDay(calendarDay.date, selectedDate);

                    return (
                        <button
                            key={calendarDay.date.toISOString()}
                            type="button"
                            onClick={() => setSelectedDate(calendarDay.date)}
                            className={[
                                "relative flex aspect-square items-center justify-center rounded-2xl text-sm font-bold transition active:scale-95",
                                calendarDay.isCurrentMonth
                                    ? "text-stone-900"
                                    : "text-stone-300",
                                hasEpisode ? "bg-stone-100 text-stone-800" : "",
                                hasEvent ? "bg-orange-50 text-orange-700" : "",
                                isSelected
                                    ? "bg-white text-stone-950 shadow-sm ring-2 ring-orange-500"
                                    : "",
                            ].join(" ")}
                            aria-label={formatSelectedDate(calendarDay.date)}
                        >
                            <span>{calendarDay.date.getDate()}</span>

                            {isToday && (
                                <span
                                    className={[
                                        "absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full",
                                        isSelected ? "bg-orange-600" : "bg-orange-500",
                                    ].join(" ")}
                                />
                            )}

                            {(hasEvent || hasEpisode) && (
                                <div className="absolute bottom-1.5 flex items-center justify-center gap-1">
                                    {hasEvent && (
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${getCreatorDotClassName(
                                                getFirstEventColor(dayEvents)
                                            )}`}
                                        />
                                    )}

                                    {hasEpisode && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-stone-700" />
                                    )}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
                {eventCreators.length > 0 ? (
                    eventCreators.map((creator) => (
                        <span
                            key={`${creator.name}-${creator.color ?? "fallback"}`}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ${getCreatorColorClasses(
                                creator.color
                            )}`}
                        >
                            {creator.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={creator.avatarUrl}
                                    alt=""
                                    className="h-4 w-4 rounded-full object-cover"
                                />
                            ) : (
                                <span
                                    className={`h-2 w-2 rounded-full ${getCreatorDotClassName(
                                        creator.color
                                    )}`}
                                />
                            )}

                            {creator.name}
                        </span>
                    ))
                ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-orange-700 ring-1 ring-orange-200">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        Termin
                    </span>
                )}

                <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-stone-700 ring-1 ring-stone-200">
                    <span className="h-2 w-2 rounded-full bg-stone-700" />
                    Episode
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-orange-700 ring-1 ring-orange-200">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    Heute
                </span>
            </div>

            <section className="mt-6 rounded-[1.5rem] bg-orange-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                    Ausgewählter Tag
                </p>

                <h3 className="mt-1 text-lg font-black text-stone-950">
                    {formatSelectedDate(selectedDate)}
                </h3>

                {selectedEvents.length === 0 && selectedEpisodes.length === 0 ? (
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                        An diesem Tag ist noch nichts eingetragen.
                    </p>
                ) : (
                    <div className="mt-4 space-y-3">
                        {selectedEvents.map((event) => {
                            const creatorName = getCreatorName(event);
                            const creatorColorClasses = getCreatorColorClasses(
                                event.createdByColor
                            );
                            const creatorDotClassName = getCreatorDotClassName(
                                event.createdByColor
                            );

                            return (
                            <div
                                key={event.id}
                                className="rounded-2xl bg-white p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">
                                            {formatEventTime(event.startsAt)}
                                            {event.endsAt ? ` – ${formatEventTime(event.endsAt)}` : ""}
                                        </p>

                                        <p className="mt-1 text-sm font-black text-stone-950">
                                            {event.title}
                                        </p>
                                    </div>

                                    <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
        {getCategoryLabel(event.category)}
      </span>
                                </div>

                                {event.description && (
                                    <p className="mt-3 text-sm leading-6 text-stone-600">
                                        {event.description}
                                    </p>
                                )}

                                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
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

                                <DeleteEventButton eventId={event.id} redirectTo="/kalender" />
                            </div>
                            );
                        })}

                        {selectedEpisodes.map((episode) => (
                            <Link
                                key={episode.id}
                                href={`/episode/${episode.slug}`}
                                className="block rounded-2xl bg-white p-4 shadow-sm transition active:scale-[0.99]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                                            AULSSP-Episode
                                        </p>

                                        <p className="mt-1 text-sm font-black text-stone-950">
                                            {episode.title}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">
                    {getStatusLabel(episode.status)}
                  </span>
                                </div>

                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-400">
                                    Episode öffnen →
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </section>
    );
}