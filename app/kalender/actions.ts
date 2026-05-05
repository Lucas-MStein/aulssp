// app/kalender/actions.ts

"use server";

import { revalidatePath } from "next/cache";
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

    if (!title || !date || !startTime) {
        throw new Error("Titel, Datum und Startzeit sind Pflichtfelder.");
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
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/kalender");
}