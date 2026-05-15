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
    display_name: string;
    profile_color: string;
    avatar_url: string | null;
    mode: WeekendMode;
};

function mapWeekendModeVote(row: WeekendModeVoteRow): WeekendModeVote {
    return {
        id: row.id,
        episodeId: row.episode_id,
        userId: row.user_id,
        displayName: row.display_name,
        profileColor: row.profile_color,
        avatarUrl: row.avatar_url,
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
            mode
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