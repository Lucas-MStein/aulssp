// app/profil/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const AVATAR_BUCKET = "avatars";

export async function uploadProfileImage(formData: FormData) {
    const file = formData.get("avatar");

    if (!(file instanceof File)) {
        throw new Error("Keine Datei ausgewählt.");
    }

    if (file.size === 0) {
        throw new Error("Keine Datei ausgewählt.");
    }

    if (!file.type.startsWith("image/")) {
        throw new Error("Bitte wähle ein Bild aus.");
    }

    const maxFileSize = 2 * 1024 * 1024;

    if (file.size > maxFileSize) {
        throw new Error("Das Bild darf maximal 2 MB groß sein.");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("Du bist nicht eingeloggt.");
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${user.id}/avatar.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(filePath, file, {
            upsert: true,
            contentType: file.type,
        });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

    const { error: updateError } = await supabase.auth.updateUser({
        data: {
            avatar_url: publicUrl,
        },
    });

    if (updateError) {
        throw new Error(updateError.message);
    }

    revalidatePath("/profil");
}

export async function updateProfileColor(formData: FormData) {
    const color = String(formData.get("color") ?? "");

    const allowedColors = [
        "green",
        "blue",
        "pink",
        "orange",
        "purple",
        "yellow",
    ];

    if (!allowedColors.includes(color)) {
        throw new Error("Ungültige Farbe.");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("Du bist nicht eingeloggt.");
    }

    const { error } = await supabase.auth.updateUser({
        data: {
            ...user.user_metadata,
            profile_color: color,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/profil");
}