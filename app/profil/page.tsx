// app/profil/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { logout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/data/profiles";


function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function getColorConfig(color: string) {
    const colors = {
        green: {
            label: "Grün",
            dotClassName: "bg-green-500",
            badgeClassName: "bg-green-50 text-green-700 ring-green-200",
        },
        blue: {
            label: "Blau",
            dotClassName: "bg-blue-500",
            badgeClassName: "bg-blue-50 text-blue-700 ring-blue-200",
        },
        pink: {
            label: "Pink",
            dotClassName: "bg-pink-500",
            badgeClassName: "bg-pink-50 text-pink-700 ring-pink-200",
        },
        orange: {
            label: "Orange",
            dotClassName: "bg-orange-500",
            badgeClassName: "bg-orange-50 text-orange-700 ring-orange-200",
        },
        purple: {
            label: "Lila",
            dotClassName: "bg-purple-500",
            badgeClassName: "bg-purple-50 text-purple-700 ring-purple-200",
        },
        yellow: {
            label: "Gelb",
            dotClassName: "bg-yellow-400",
            badgeClassName: "bg-yellow-50 text-yellow-700 ring-yellow-200",
        },
        red: {
            label: "Rot",
            dotClassName: "bg-red-500",
            badgeClassName: "bg-red-50 text-red-700 ring-red-200",
        },
        teal: {
            label: "Türkis",
            dotClassName: "bg-teal-500",
            badgeClassName: "bg-teal-50 text-teal-700 ring-teal-200",
        },
    } as const;

    return colors[color as keyof typeof colors] ?? colors.green;
}

export default async function ProfilPage() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    const profile = await ensureProfile({
        supabase,
        user,
    });

    const displayName = profile.displayName;
    const initials = getInitials(displayName);
    const avatarUrl = profile.avatarUrl;
    const profileColor = profile.profileColor;
    const colorConfig = getColorConfig(profileColor);

    return (
        <AppShell>
            <div className="w-full min-w-0 max-w-full space-y-5 overflow-x-hidden">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Profil
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Dein persönlicher AULSSP-Bereich.
                    </p>
                </section>

                <section className="w-full min-w-0 overflow-hidden rounded-[2rem] bg-white p-5 text-center shadow-sm">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-3xl font-black text-orange-600 ring-4 ring-orange-50">
                        {avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={avatarUrl}
                                alt="Profilbild"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            initials
                        )}
                    </div>

                    <p className="mt-5 text-sm font-semibold text-orange-500">
                        Eingeloggt als
                    </p>

                    <h3 className="mt-1 text-3xl font-black text-stone-950">
                        {displayName}
                    </h3>

                    <p className="mt-2 break-all text-sm leading-6 text-stone-500">
                        {user.email}
                    </p>

                    <div
                        className={`mx-auto mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${colorConfig.badgeClassName}`}
                    >
                        <span
                            className={`h-2 w-2 rounded-full ${colorConfig.dotClassName}`}
                        />
                        Profilfarbe: {colorConfig.label}
                    </div>

                    <Link
                        href="/profil/edit"
                        className="mt-6 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                    >
                        Profil bearbeiten
                    </Link>
                </section>

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        Account
                    </p>

                    <h3 className="mt-2 text-xl font-black text-stone-950">
                        Sitzung
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Wenn du dich abmeldest, brauchst du beim nächsten Öffnen
                        wieder deine E-Mail und dein Passwort.
                    </p>

                    <form action={logout} className="mt-5">
                        <button
                            type="submit"
                            className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-stone-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-stone-800"
                        >
                            Abmelden
                        </button>
                    </form>
                </section>
            </div>
        </AppShell>
    );
}