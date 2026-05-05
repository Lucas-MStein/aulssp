// lib/dates.ts

export function formatDateRange(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatter = new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const sameMonth = start.getMonth() === end.getMonth();
    const sameYear = start.getFullYear() === end.getFullYear();

    if (sameMonth && sameYear) {
        const monthYear = new Intl.DateTimeFormat("de-DE", {
            month: "long",
            year: "numeric",
        }).format(start);

        return `${start.getDate()}.–${end.getDate()}. ${monthYear}`;
    }

    return `${formatter.format(start)} – ${formatter.format(end)}`;
}

export function getDaysUntil(date: string) {
    const today = new Date();
    const target = new Date(date);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const difference = target.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
}