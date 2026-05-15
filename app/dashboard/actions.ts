// app/dashboard/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/data/profiles";
import type { WeekendMode } from "@/lib/data/weekendModes";

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

    const profile = await ensureProfile({
        supabase,
        user,
    });

    const { error } = await supabase.from("weekend_mode_votes").upsert(
        {
            episode_id: episodeId,
            user_id: user.id,
            display_name: profile.displayName,
            profile_color: profile.profileColor,
            avatar_url: profile.avatarUrl,
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