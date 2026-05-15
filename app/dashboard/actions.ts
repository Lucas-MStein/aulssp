// app/dashboard/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { WeekendMode } from "@/lib/data/weekendModes";

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

export async function setWeekendMode(formData: FormData) {
    const episodeId = String(formData.get("episodeId") ?? "");
    const mode = String(formData.get("mode") ?? "") as WeekendMode;

    const allowedModes: WeekendMode[] = ["adventure", "spontaneous", "home"];

    if (!episodeId) {
        throw new Error("Episode fehlt.");
    }

    if (!allowedModes.includes(mode)) {
        throw new Error("Ungültiger Modus.");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("Du bist nicht eingeloggt.");
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

    const { error } = await supabase.from("weekend_mode_votes").upsert(
        {
            episode_id: episodeId,
            user_id: user.id,
            display_name: displayName,
            profile_color: profileColor,
            avatar_url: avatarUrl,
            mode,
            updated_at: new Date().toISOString(),
        },
        {
            onConflict: "episode_id,user_id",
        }
    );

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}