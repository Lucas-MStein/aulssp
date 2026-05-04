// app/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AULSSP_AUTH_COOKIE } from "@/lib/auth";

export async function loginWithPin(formData: FormData) {
    const pin = formData.get("pin");

    if (pin !== process.env.AULSSP_PIN) {
        redirect("/login?error=wrong-pin");
    }

    const cookieStore = await cookies();

    cookieStore.set(AULSSP_AUTH_COOKIE, "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });

    redirect("/dashboard");
}