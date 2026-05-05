// lib/data.ts

export type Person = "Alina" | "Lucas";

export type EpisodeStatus = "planned" | "open" | "done";

export type Episode = {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    planner: Person;
    driver: Person;
    status: EpisodeStatus;
    teaser?: string;
    fridayPlan?: string;
    saturdayPlan?: string;
    sundayPlan?: string;
    highlight?: string;
    insideJoke?: string;
    rating?: number;
};

export type DateIdea = {
    id: string;
    title: string;
    description: string;
    category: string;
    effort: "niedrig" | "mittel" | "hoch";
    cost: "€" | "€€" | "€€€";
    weather: "egal" | "gut" | "drinnen";
};

export const episodes: Episode[] = [
    {
        id: "episode-01",
        title: "Die Rückkehr der Snacktasche",
        startDate: "2026-05-15",
        endDate: "2026-05-17",
        location: "bei Alina",
        planner: "Lucas",
        driver: "Lucas",
        status: "planned",
        teaser: "Bring bequeme Schuhe mit. Mehr wird noch nicht verraten.",
        fridayPlan: "Ankommen, Abendessen und gemütlich ins Wochenende starten.",
        saturdayPlan:
            "Kleine Unternehmung, gutes Essen und vielleicht eine Überraschung.",
        sundayPlan: "Frühstück, Spaziergang und nächste Episode grob planen.",
    },
    {
        id: "episode-02",
        title: "Lazy Sunday Extended Cut",
        startDate: "2026-05-29",
        endDate: "2026-05-31",
        location: "bei Lucas",
        planner: "Alina",
        driver: "Alina",
        status: "open",
        teaser: "Noch offen — perfekte Gelegenheit für einen Joker.",
    },
    {
        id: "episode-00",
        title: "Pilotfolge: Operation Pfannkuchen",
        startDate: "2026-05-01",
        endDate: "2026-05-03",
        location: "bei Alina",
        planner: "Alina",
        driver: "Lucas",
        status: "done",
        highlight: "Frühstück um 12:30 Uhr und ein sehr ambitionierter Teig.",
        insideJoke: "Der Teig ist nicht flüssig, der ist ambitioniert.",
        rating: 9,
    },
];

export const dateIdeas: DateIdea[] = [
    {
        id: "idea-01",
        title: "Snack-Jury-Abend",
        description:
            "Kauft drei Snacks, die ihr beide noch nie probiert habt, und bewertet sie wie eine viel zu ernste Jury.",
        category: "Zuhause",
        effort: "niedrig",
        cost: "€",
        weather: "egal",
    },
    {
        id: "idea-02",
        title: "Spaziergang ohne Ziel",
        description:
            "Geht los und entscheidet an jeder Kreuzung abwechselnd, in welche Richtung ihr geht.",
        category: "Draußen",
        effort: "niedrig",
        cost: "€",
        weather: "gut",
    },
    {
        id: "idea-03",
        title: "Café-Test",
        description:
            "Sucht ein Café aus, in dem ihr beide noch nie wart, und bewertet Kuchen, Kaffee und Atmosphäre.",
        category: "Essen",
        effort: "mittel",
        cost: "€€",
        weather: "egal",
    },
    {
        id: "idea-04",
        title: "Filmabend mit Motto",
        description:
            "Wählt ein Motto aus, sucht einen passenden Film und macht Snacks, die dazu passen.",
        category: "Zuhause",
        effort: "niedrig",
        cost: "€",
        weather: "drinnen",
    },
    {
        id: "idea-05",
        title: "Mini-Roadtrip",
        description:
            "Fahrt zu einem Ort in der Mitte, den keiner von euch richtig kennt.",
        category: "Abenteuer",
        effort: "hoch",
        cost: "€€€",
        weather: "gut",
    },
];

export function getNextEpisode() {
    return episodes
        .filter((episode) => episode.status !== "done")
        .sort(
            (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )[0];
}

export function getPastEpisodes() {
    return episodes.filter((episode) => episode.status === "done");
}

export function getEpisodeById(id: string) {
    return episodes.find((episode) => episode.id === id);
}