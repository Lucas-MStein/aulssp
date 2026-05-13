// app/kalender/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

function createGermanDateTime(date: string, time: string) {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

    const berlinParts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Berlin",
        timeZoneName: "shortOffset",
    }).formatToParts(utcDate);

    const offsetPart = berlinParts.find((part) => part.type === "timeZoneName");
    const rawOffset = offsetPart?.value.replace("GMT", "") || "+1";

    const match = rawOffset.match(/^([+-])(\d{1,2})(?::(\d{2}))?$/);

    if (!match) {
        return `${date}T${time}:00+01:00`;
    }

    const [, sign, hourPart, minutePart = "00"] = match;
    const paddedHour = hourPart.padStart(2, "0");

    return `${date}T${time}:00${sign}${paddedHour}:${minutePart}`;
}

export async function createEvent(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const date = String(formData.get("date") ?? "");
    const startTime = String(formData.get("startTime") ?? "");
    const endTime = String(formData.get("endTime") ?? "");
    const location = String(formData.get("location") ?? "").trim();
    const category = String(formData.get("category") ?? "general");
    const episodeId = String(formData.get("episodeId") ?? "").trim();
    const redirectTo = String(formData.get("redirectTo") ?? "/kalender");

    if (!title || !date || !startTime) {
        throw new Error("Titel, Datum und Startzeit sind Pflichtfelder.");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login");
    }

    const createdBy = getDisplayName(user.email);

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

    const startsAt = createGermanDateTime(date, startTime);

    const endsAt = endTime ? createGermanDateTime(date, endTime) : null;

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

    const supabase = await createClient();

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