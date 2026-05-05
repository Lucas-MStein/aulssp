// lib/auth.ts
import { cookies } from "next/headers";
import { AULSSP_AUTH_COOKIE } from "@/lib/auth-constants";

export async function isAuthenticated() {
    const cookieStore = await cookies();

    return cookieStore.get(AULSSP_AUTH_COOKIE)?.value === "true";
}