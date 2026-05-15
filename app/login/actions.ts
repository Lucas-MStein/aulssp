// app/login/actions.ts

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/data/profiles";

export async function loginWithSupabase(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const next = String(formData.get("next") ?? "/dashboard");

    if (!email || !password) {
        redirect("/login?error=missing");
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        redirect("/login?error=invalid");
    }

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/login?error=invalid");
    }

    await ensureProfile({
        supabase,
        user,
    });

    if (next.startsWith("/") && !next.startsWith("//")) {
        redirect(next);
    }

    redirect("/dashboard");
}

export async function logout() {
    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect("/login");
}