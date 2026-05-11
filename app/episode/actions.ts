// app/episode/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

function createEpisodeSlug(startDate: string) {
    const randomSuffix = Math.random().toString(36).slice(2, 6);
    return `episode-${startDate}-${randomSuffix}`;
}

export async function createEpisode(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const startDate = String(formData.get("startDate") ?? "");
    const endDate = String(formData.get("endDate") ?? "");
    const location = String(formData.get("location") ?? "").trim();
    const planner = String(formData.get("planner") ?? "");
    const driver = String(formData.get("driver") ?? "");

    const teaser = String(formData.get("teaser") ?? "").trim();
    const fridayPlan = String(formData.get("fridayPlan") ?? "").trim();
    const saturdayPlan = String(formData.get("saturdayPlan") ?? "").trim();
    const sundayPlan = String(formData.get("sundayPlan") ?? "").trim();
    const driveUrl = String(formData.get("driveUrl") ?? "").trim();

    if (!title || !startDate || !endDate) {
        throw new Error("Titel, Startdatum und Enddatum sind Pflichtfelder.");
    }

    const slug = createEpisodeSlug(startDate);

    const { data, error } = await supabase
        .from("episodes")
        .insert({
            slug,
            title,
            start_date: startDate,
            end_date: endDate,
            location: location || null,
            planner: planner || null,
            driver: driver || null,
            status: "planned",
            teaser: teaser || null,
            friday_plan: fridayPlan || null,
            saturday_plan: saturdayPlan || null,
            sunday_plan: sundayPlan || null,
            driveUrl: driveUrl || null,
        })
        .select("slug")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    revalidatePath("/kalender");
    revalidatePath("/archiv");
    revalidatePath("/episode");
    revalidatePath("/planen");

    redirect(`/episode/${data.slug}?created=1`);
}

export async function updateEpisode(formData: FormData) {
    const id = String(formData.get("id") ?? "");
    const slug = String(formData.get("slug") ?? "");

    const title = String(formData.get("title") ?? "").trim();
    const startDate = String(formData.get("startDate") ?? "");
    const endDate = String(formData.get("endDate") ?? "");
    const location = String(formData.get("location") ?? "").trim();
    const planner = String(formData.get("planner") ?? "");
    const driver = String(formData.get("driver") ?? "");
    const status = String(formData.get("status") ?? "planned");

    const teaser = String(formData.get("teaser") ?? "").trim();
    const fridayPlan = String(formData.get("fridayPlan") ?? "").trim();
    const saturdayPlan = String(formData.get("saturdayPlan") ?? "").trim();
    const sundayPlan = String(formData.get("sundayPlan") ?? "").trim();
    const highlight = String(formData.get("highlight") ?? "").trim();
    const insideJoke = String(formData.get("insideJoke") ?? "").trim();
    const ratingRaw = String(formData.get("rating") ?? "").trim();
    const driveUrl = String(formData.get("driveUrl") ?? "").trim();

    if (!id || !slug) {
        throw new Error("Episode konnte nicht eindeutig gefunden werden.");
    }

    if (!title || !startDate || !endDate) {
        throw new Error("Titel, Startdatum und Enddatum sind Pflichtfelder.");
    }

    const rating =
        ratingRaw.length > 0 ? Number.parseFloat(ratingRaw.replace(",", ".")) : null;

    const { error } = await supabase
        .from("episodes")
        .update({
            title,
            start_date: startDate,
            end_date: endDate,
            location: location || null,
            planner: planner || null,
            driver: driver || null,
            status,
            teaser: teaser || null,
            friday_plan: fridayPlan || null,
            saturday_plan: saturdayPlan || null,
            sunday_plan: sundayPlan || null,
            highlight: highlight || null,
            inside_joke: insideJoke || null,
            rating,
            drive_url: driveUrl || null,
        })
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/dashboard");
    revalidatePath("/kalender");
    revalidatePath("/archiv");
    revalidatePath("/episode");
    revalidatePath(`/episode/${slug}`);
    revalidatePath(`/episode/${slug}/edit`);

    redirect(`/episode/${slug}?updated=1`);
}