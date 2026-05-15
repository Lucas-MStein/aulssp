// app/profil/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const AVATAR_BUCKET = "avatars";
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const allowedColors = [
    "green",
    "blue",
    "pink",
    "orange",
    "purple",
    "yellow",
    "red",
    "teal",
];

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

function revalidateProfileUsage() {
    revalidatePath("/profil");
    revalidatePath("/profil/edit");
    revalidatePath("/dashboard");
    revalidatePath("/kalender");
}

export async function uploadProfileImage(formData: FormData) {
    const file = formData.get("avatar");

    if (!(file instanceof File) || file.size === 0) {
        redirect("/profil/edit?error=no-file");
    }

    if (!file.type.startsWith("image/")) {
        redirect("/profil/edit?error=invalid-file");
    }

    if (file.size > MAX_FILE_SIZE) {
        redirect("/profil/edit?error=file-too-large");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login");
    }

    const displayName = getDisplayName(user.email);

    const existingProfileColor =
        typeof user.user_metadata.profile_color === "string"
            ? user.user_metadata.profile_color
            : getFallbackColor(displayName);

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

    const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName,
        profile_color: existingProfileColor,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
    });

    if (profileError) {
        throw new Error(profileError.message);
    }

    const { error: updateError } = await supabase.auth.updateUser({
        data: {
            ...user.user_metadata,
            avatar_url: publicUrl,
            profile_color: existingProfileColor,
        },
    });

    if (updateError) {
        throw new Error(updateError.message);
    }

    revalidateProfileUsage();
    redirect("/profil/edit?updated=avatar");
}

export async function updateProfileColor(formData: FormData) {
    const color = String(formData.get("color") ?? "");

    if (!allowedColors.includes(color)) {
        throw new Error("Ungültige Farbe.");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login");
    }

    const displayName = getDisplayName(user.email);

    const existingAvatarUrl =
        typeof user.user_metadata.avatar_url === "string"
            ? user.user_metadata.avatar_url
            : null;

    const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: displayName,
        profile_color: color,
        avatar_url: existingAvatarUrl,
        updated_at: new Date().toISOString(),
    });

    if (profileError) {
        throw new Error(profileError.message);
    }

    const { error } = await supabase.auth.updateUser({
        data: {
            ...user.user_metadata,
            profile_color: color,
            avatar_url: existingAvatarUrl,
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidateProfileUsage();
    redirect("/profil/edit?updated=color");
}