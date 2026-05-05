// lib/data/ideas.ts

import { supabase } from "@/lib/supabase/client";
import type { DateIdea } from "@/lib/data";

type DateIdeaRow = {
    id: string;
    title: string;
    description: string;
    category: string;
    effort: DateIdea["effort"];
    cost: DateIdea["cost"];
    weather: DateIdea["weather"];
};

function mapDateIdea(row: DateIdeaRow): DateIdea {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category,
        effort: row.effort,
        cost: row.cost,
        weather: row.weather,
    };
}

export async function getDateIdeas() {
    const { data, error } = await supabase
        .from("date_ideas")
        .select(
            `
      id,
      title,
      description,
      category,
      effort,
      cost,
      weather
    `
        )
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapDateIdea(row as DateIdeaRow));
}