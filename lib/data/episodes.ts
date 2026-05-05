// lib/data/episodes.ts

import { supabase } from "@/lib/supabase/client";
import type { Episode, EpisodeStatus, Person } from "@/lib/data";

type EpisodeRow = {
    id: string;
    slug: string;
    title: string;
    start_date: string;
    end_date: string;
    location: string | null;
    planner: Person | null;
    driver: Person | null;
    status: EpisodeStatus;
    teaser: string | null;
    friday_plan: string | null;
    saturday_plan: string | null;
    sunday_plan: string | null;
    highlight: string | null;
    inside_joke: string | null;
    rating: number | null;
};

function mapEpisode(row: EpisodeRow): Episode {
    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        startDate: row.start_date,
        endDate: row.end_date,
        location: row.location,
        planner: row.planner,
        driver: row.driver,
        status: row.status,
        teaser: row.teaser,
        fridayPlan: row.friday_plan,
        saturdayPlan: row.saturday_plan,
        sundayPlan: row.sunday_plan,
        highlight: row.highlight,
        insideJoke: row.inside_joke,
        rating: row.rating,
    };
}

export async function getEpisodes() {
    const { data, error } = await supabase
        .from("episodes")
        .select(
            `
      id,
      slug,
      title,
      start_date,
      end_date,
      location,
      planner,
      driver,
      status,
      teaser,
      friday_plan,
      saturday_plan,
      sunday_plan,
      highlight,
      inside_joke,
      rating
    `
        )
        .order("start_date", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapEpisode(row as EpisodeRow));
}

export async function getNextEpisode() {
    const { data, error } = await supabase
        .from("episodes")
        .select(
            `
      id,
      slug,
      title,
      start_date,
      end_date,
      location,
      planner,
      driver,
      status,
      teaser,
      friday_plan,
      saturday_plan,
      sunday_plan,
      highlight,
      inside_joke,
      rating
    `
        )
        .neq("status", "done")
        .order("start_date", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapEpisode(data as EpisodeRow) : null;
}

export async function getPastEpisodes() {
    const { data, error } = await supabase
        .from("episodes")
        .select(
            `
      id,
      slug,
      title,
      start_date,
      end_date,
      location,
      planner,
      driver,
      status,
      teaser,
      friday_plan,
      saturday_plan,
      sunday_plan,
      highlight,
      inside_joke,
      rating
    `
        )
        .eq("status", "done")
        .order("start_date", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapEpisode(row as EpisodeRow));
}

export async function getEpisodeBySlug(slug: string) {
    const { data, error } = await supabase
        .from("episodes")
        .select(
            `
      id,
      slug,
      title,
      start_date,
      end_date,
      location,
      planner,
      driver,
      status,
      teaser,
      friday_plan,
      saturday_plan,
      sunday_plan,
      highlight,
      inside_joke,
      rating
    `
        )
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapEpisode(data as EpisodeRow) : null;
}

export async function getActiveEpisodes() {
    const { data, error } = await supabase
        .from("episodes")
        .select(
            `
      id,
      slug,
      title,
      start_date,
      end_date,
      location,
      planner,
      driver,
      status,
      teaser,
      friday_plan,
      saturday_plan,
      sunday_plan,
      highlight,
      inside_joke,
      rating
    `
        )
        .neq("status", "done")
        .order("start_date", { ascending: true });

    if (error) {
        throw new Error(error.message);
    }

    return (data ?? []).map((row) => mapEpisode(row as EpisodeRow));
}