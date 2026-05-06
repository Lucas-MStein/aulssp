// app/kalender/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export async function createEvent(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const startTime = String(formData.get("startTime") ?? "");
    const endTime = String(formData.get("endTime") ?? "");
    const location = String(formData.get("location") ?? "").trim();
    const category = String(formData.get("category") ?? "general");
    const createdBy = String(formData.get("createdBy") ?? "Lucas");
    const episodeId = String(formData.get("episodeId") ?? "").trim();
    const redirectTo = String(formData.get("redirectTo") ?? "/kalender");

    if (!title || !date || !startTime) {
        throw new Error("Titel, Datum und Startzeit sind Pflichtfelder.");
    }

    if (episodeId) {
        const { data: episode, error: episodeError } = await supabase
            .from("episodes")
            .select("status")
            .eq("id", episodeId)
            .maybeSingle();

        if (episodeError) {
            throw new Error(episodeError.message);
        }

        if (episode?.status === "done") {
            if (redirectTo.startsWith("/episode/")) {
                redirect(`${redirectTo}?locked=1`);
            }

            redirect("/kalender?locked=1");
        }
    }

    const startsAt = new Date(`${date}T${startTime}:00`).toISOString();

    const endsAt = endTime
        ? new Date(`${date}T${endTime}:00`).toISOString()
        : null;

    const { error } = await supabase.from("events").insert({
        title,
        description: description || null,
        starts_at: startsAt,
        ends_at: endsAt,
        location: location || null,
        category,
        visibility: "shared",
        created_by: createdBy,
        episode_id: episodeId || null,
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/kalender");
    revalidatePath("/planen");

    if (redirectTo.startsWith("/episode/")) {
        revalidatePath(redirectTo);
        redirect(`${redirectTo}?created=1`);
    }

    if (redirectTo === "/planen") {
        redirect("/planen?created=1");
    }

    redirect("/kalender?created=1");
}

export async function deleteEvent(formData: FormData) {
    const eventId = String(formData.get("eventId") ?? "");
    const redirectTo = String(formData.get("redirectTo") ?? "/kalender");

    if (!eventId) {
        throw new Error("Termin-ID fehlt.");
    }

    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/kalender");
    revalidatePath("/planen");

    if (redirectTo.startsWith("/episode/")) {
        revalidatePath(redirectTo);
        redirect(`${redirectTo}?deleted=1`);
    }

    if (redirectTo === "/planen") {
        redirect("/planen?deleted=1");
    }

    redirect("/kalender?deleted=1");
}