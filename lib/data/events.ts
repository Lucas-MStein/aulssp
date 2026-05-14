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
    created_by_user_id: string | null;
    created_by_name: string | null;
    created_by_color: string | null;
    created_by_avatar_url: string | null;
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
        createdByUserId: row.created_by_user_id,
        createdByName: row.created_by_name,
        createdByColor: row.created_by_color,
        createdByAvatarUrl: row.created_by_avatar_url,
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
      created_by_user_id,
      created_by_name,
      created_by_color,
      created_by_avatar_url,
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
      created_by_user_id,
      created_by_name,
      created_by_color,
      created_by_avatar_url,
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

export async function getEventsByEpisodeId(episodeId: string) {
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
      created_by_user_id,
      created_by_name,
      created_by_color,
      created_by_avatar_url,
      episode_id
    `
        )
        .eq("episode_id", episodeId)
        .order("starts_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapCalendarEvent(row as CalendarEventRow));
}