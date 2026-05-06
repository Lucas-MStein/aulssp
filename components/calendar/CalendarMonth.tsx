// components/calendar/CalendarMonth.tsx

import type { CalendarEvent, Episode } from "@/lib/data";

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

function isSameDay(firstDate: Date, secondDate: Date) {
    return startOfDay(firstDate).getTime() === startOfDay(secondDate).getTime();
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

function hasEventOnDay(events: CalendarEvent[], date: Date) {
    return events.some((event) => isSameDay(new Date(event.startsAt), date));
}

function hasEpisodeOnDay(episodes: Episode[], date: Date) {
    return episodes.some((episode) =>
        isDateInRange(date, episode.startDate, episode.endDate)
    );
}

function formatMonthTitle(date: Date) {
    return new Intl.DateTimeFormat("de-DE", {
        month: "long",
        year: "numeric",
    }).format(date);
}

export function CalendarMonth({ events, episodes }: CalendarMonthProps) {
    const today = new Date();
    const monthDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const days = getCalendarDays(monthDate);

    return (
        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-orange-500">
                        Monatsübersicht
                    </p>

                    <h2 className="mt-1 text-2xl font-black tracking-tight text-stone-950">
                        {formatMonthTitle(monthDate)}
                    </h2>
                </div>

                <div className="rounded-2xl bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600">
                    Heute
                </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-1 text-center">
                {weekDays.map((weekDay) => (
                    <div
                        key={weekDay}
                        className="py-2 text-xs font-bold uppercase tracking-wide text-stone-400"
                    >
                        {weekDay}
                    </div>
                ))}

                {days.map((calendarDay) => {
                    const hasEvent = hasEventOnDay(events, calendarDay.date);
                    const hasEpisode = hasEpisodeOnDay(episodes, calendarDay.date);
                    const isToday = isSameDay(calendarDay.date, today);

                    return (
                        <div
                            key={calendarDay.date.toISOString()}
                            className={[
                                "relative flex aspect-square items-center justify-center rounded-2xl text-sm font-bold transition",
                                calendarDay.isCurrentMonth
                                    ? "text-stone-900"
                                    : "text-stone-300",
                                hasEpisode ? "bg-pink-50 text-pink-700" : "",
                                hasEvent ? "bg-orange-50" : "",
                                isToday ? "ring-2 ring-stone-950" : "",
                            ].join(" ")}
                        >
                            <span>{calendarDay.date.getDate()}</span>

                            {(hasEvent || hasEpisode) && (
                                <div className="absolute bottom-1.5 flex items-center justify-center gap-1">
                                    {hasEvent && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                    )}

                                    {hasEpisode && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Termin
        </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-pink-500" />
          Episode
        </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1">
          <span className="h-2 w-2 rounded-full border-2 border-stone-950" />
          Heute
        </span>
            </div>
        </section>
    );
}