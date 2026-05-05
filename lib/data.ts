// lib/data.ts

export type Person = "Alina" | "Lucas";

export type EpisodeStatus = "planned" | "open" | "done";

export type Episode = {
    id: string;
    slug: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string | null;
    planner: Person | null;
    driver: Person | null;
    status: EpisodeStatus;
    teaser?: string | null;
    fridayPlan?: string | null;
    saturdayPlan?: string | null;
    sundayPlan?: string | null;
    highlight?: string | null;
    insideJoke?: string | null;
    rating?: number | null;
};

export type DateIdea = {
    id: string;
    title: string;
    description: string;
    category: string;
    effort: "niedrig" | "mittel" | "hoch" | null;
    cost: "€" | "€€" | "€€€" | null;
    weather: "egal" | "gut" | "drinnen" | null;
};

export type CalendarEvent = {
    id: string;
    title: string;
    description: string | null;
    startsAt: string;
    endsAt: string | null;
    location: string | null;
    category: string | null;
    visibility: string | null;
    createdBy: Person | null;
    episodeId: string | null;
};