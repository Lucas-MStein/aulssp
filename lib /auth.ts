// lib/auth.ts
import { cookies } from "next/headers";

export const AULSSP_AUTH_COOKIE = "aulssp_auth";

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get(AULSSP_AUTH_COOKIE)?.value === "true";
}