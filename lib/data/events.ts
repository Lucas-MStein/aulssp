// lib/data/events.ts

import { supabase } from "@/lib/supabase/client";
import type { CalendarEvent, Person } from "@/lib/data";

type CalendarEventRow = {
    id: string;
    title: string;
    description: string | null;
    starts_at: string;
    ends_at: string | null;
    location: string | null;
    category: string | null;
    visibility: string | null;
    created_by: Person | null;
    episode_id: string | null;
};

function mapCalendarEvent(row: CalendarEventRow): CalendarEvent {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        location: row.location,
        category: row.category,
        visibility: row.visibility,
        createdBy: row.created_by,
        episodeId: row.episode_id,
    };
}

export async function getEvents() {
    const { data, error } = await supabase
        .from("events")
        .select(
            `
      id,
      title,
      description,
      starts_at,
      ends_at,
      location,
      category,
      visibility,
      created_by,
      episode_id
    `
        )
        .order("starts_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapCalendarEvent(row as CalendarEventRow));
}

export async function getUpcomingEvents() {
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from("events")
        .select(
            `
      id,
      title,
      description,
      starts_at,
      ends_at,
      location,
      category,
      visibility,
      created_by,
      episode_id
    `
        )
        .gte("starts_at", now)
        .order("starts_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapCalendarEvent(row as CalendarEventRow));
}