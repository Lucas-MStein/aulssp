// lib/data/weekendModes.ts

import { createClient } from "@/lib/supabase/server";

export type WeekendMode = "adventure" | "spontaneous" | "home";

export type WeekendModeVote = {
    id: string;
    episodeId: string;
    userId: string;
    displayName: string;
    profileColor: string;
    avatarUrl: string | null;
    mode: WeekendMode;
};

type WeekendModeVoteRow = {
    id: string;
    episode_id: string;
    user_id: string;
    display_name: string | null;
    profile_color: string | null;
    avatar_url: string | null;
    mode: WeekendMode;
    profiles:
        | {
              display_name: string | null;
              profile_color: string | null;
              avatar_url: string | null;
          }
        | {
              display_name: string | null;
              profile_color: string | null;
              avatar_url: string | null;
          }[]
        | null;
};

function getProfile(row: WeekendModeVoteRow) {
    if (Array.isArray(row.profiles)) {
        return row.profiles[0] ?? null;
    }

    return row.profiles;
}

function mapWeekendModeVote(row: WeekendModeVoteRow): WeekendModeVote {
    const profile = getProfile(row);

    return {
        id: row.id,
        episodeId: row.episode_id,
        userId: row.user_id,
        displayName: profile?.display_name ?? row.display_name ?? "AULSSP",
        profileColor: profile?.profile_color ?? row.profile_color ?? "green",
        avatarUrl: profile?.avatar_url ?? row.avatar_url ?? null,
        mode: row.mode,
    };
}

export async function getWeekendModeVotes(episodeId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("weekend_mode_votes")
        .select(
            `
            id,
            episode_id,
            user_id,
            display_name,
            profile_color,
            avatar_url,
            mode,
            profiles:profiles!weekend_mode_votes_user_id_fkey (
    display_name,
    profile_color,
    avatar_url
)
        `
        )
        .eq("episode_id", episodeId);

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) =>
        mapWeekendModeVote(row as WeekendModeVoteRow)
    );
}