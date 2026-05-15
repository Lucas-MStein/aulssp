// lib/data/profiles.ts

import type { SupabaseClient, User } from "@supabase/supabase-js";

function getDisplayName(email?: string) {
    if (!email) {
        return "AULSSP";
    }

    if (email.toLowerCase().includes("alina")) {
        return "Alina";
    }

    if (email.toLowerCase().includes("lucas")) {
        return "Lucas";
    }

    return email.split("@")[0];
}

function getFallbackColor(displayName: string) {
    if (displayName === "Alina") {
        return "blue";
    }

    return "green";
}

export async function ensureProfile({
                                        supabase,
                                        user,
                                    }: {
    supabase: SupabaseClient;
    user: User;
}) {
    const { data: existingProfile, error: selectError } = await supabase
        .from("profiles")
        .select("id, display_name, profile_color, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

    if (selectError) {
        throw new Error(selectError.message);
    }

    if (existingProfile) {
        return {
            id: existingProfile.id,
            displayName: existingProfile.display_name,
            profileColor: existingProfile.profile_color,
            avatarUrl: existingProfile.avatar_url,
        };
    }

    const displayName = getDisplayName(user.email);

    const profileColor =
        typeof user.user_metadata.profile_color === "string"
            ? user.user_metadata.profile_color
            : getFallbackColor(displayName);

    const avatarUrl =
        typeof user.user_metadata.avatar_url === "string"
            ? user.user_metadata.avatar_url
            : null;

    const { data: insertedProfile, error: insertError } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            display_name: displayName,
            profile_color: profileColor,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
        })
        .select("id, display_name, profile_color, avatar_url")
        .single();

    if (insertError) {
        throw new Error(insertError.message);
    }

    return {
        id: insertedProfile.id,
        displayName: insertedProfile.display_name,
        profileColor: insertedProfile.profile_color,
        avatarUrl: insertedProfile.avatar_url,
    };
}