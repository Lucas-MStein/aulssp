// lib/data/events.ts

import { createClient } from "@/lib/supabase/server";
import type { CalendarEvent, Person } from "@/lib/data";

type EventProfile = {
    id: string;
    display_name: string | null;
    profile_color: string | null;
    avatar_url: string | null;
};

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

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

const eventSelect = `
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
`;

function mapCalendarEvent(
    row: CalendarEventRow,
    profile: EventProfile | null
): CalendarEvent {
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
        createdByName: profile?.display_name ?? row.created_by_name,
        createdByColor: profile?.profile_color ?? row.created_by_color,
        createdByAvatarUrl: profile?.avatar_url ?? row.created_by_avatar_url,
        episodeId: row.episode_id,
    };
}

async function getProfilesForEvents(
    rows: CalendarEventRow[],
    supabase: SupabaseServerClient
) {
    const userIds = Array.from(
        new Set(
            rows
                .map((row) => row.created_by_user_id)
                .filter((id): id is string => Boolean(id))
        )
    );

    if (userIds.length === 0) {
        return new Map<string, EventProfile>();
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, profile_color, avatar_url")
        .in("id", userIds);

    if (error) {
        throw new Error(error.message);
    }

    return new Map(
        (data ?? []).map((profile) => [
            profile.id,
            profile as EventProfile,
        ])
    );
}

async function mapEventsWithProfiles(
    rows: CalendarEventRow[],
    supabase: SupabaseServerClient
) {
    const profilesById = await getProfilesForEvents(rows, supabase);

    return rows.map((row) =>
        mapCalendarEvent(
            row,
            row.created_by_user_id
                ? profilesById.get(row.created_by_user_id) ?? null
                : null
        )
    );
}

export async function getEvents() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select(eventSelect)
        .order("starts_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return mapEventsWithProfiles((data ?? []) as CalendarEventRow[], supabase);
}

export async function getUpcomingEvents() {
    const supabase = await createClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
        .from("events")
        .select(eventSelect)
        .gte("starts_at", now)
        .order("starts_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return mapEventsWithProfiles((data ?? []) as CalendarEventRow[], supabase);
}

export async function getEventsByEpisodeId(episodeId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select(eventSelect)
        .eq("episode_id", episodeId)
        .order("starts_at", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return mapEventsWithProfiles((data ?? []) as CalendarEventRow[], supabase);
}