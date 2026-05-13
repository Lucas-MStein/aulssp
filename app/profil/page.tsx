// app/profil/page.tsx

import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { logout } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/server";
import { ProfileImageUpload } from "@/components/profile/ProfileImageUpload";

const people = [
    {
        name: "Lucas",
        color: "Grün",
        className: "bg-green-50 text-green-700 ring-green-200",
        dotClassName: "bg-green-500",
    },
    {
        name: "Alina",
        color: "Blau",
        className: "bg-blue-50 text-blue-700 ring-blue-200",
        dotClassName: "bg-blue-500",
    },
];

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

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
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

    const displayName = getDisplayName(user.email);
    const initials = getInitials(displayName);

    const currentPerson = people.find((person) => person.name === displayName);

    const avatarUrl =
        typeof user.user_metadata.avatar_url === "string"
            ? user.user_metadata.avatar_url
            : null;

    return (
        <AppShell>
            <div className="space-y-5">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Profil
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Dein persönlicher Bereich für Account, Profilbild und
                        gemeinsame AULSSP-Einstellungen.
                    </p>
                </section>

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-3xl font-black text-orange-600 ring-4 ring-orange-50">
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

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-orange-500">
                                Eingeloggt als
                            </p>

                            <h3 className="mt-1 truncate text-3xl font-black text-stone-950">
                                {displayName}
                            </h3>

                            <p className="mt-2 break-all text-sm leading-6 text-stone-500">
                                {user.email}
                            </p>

                            {currentPerson && (
                                <div
                                    className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${currentPerson.className}`}
                                >
                                    <span
                                        className={`h-2 w-2 rounded-full ${currentPerson.dotClassName}`}
                                    />
                                    Farbe: {currentPerson.color}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 border-t border-orange-50 pt-5">
                        <ProfileImageUpload />
                    </div>
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

                <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-orange-500">
                        Demnächst
                    </p>

                    <h3 className="mt-2 text-xl font-black text-stone-950">
                        Persönlicher Wochenend-Modus
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Bald können Lucas und Alina ihren Modus pro Episode
                        auswählen. Eure Farben zeigen dann direkt, wer welchen
                        Vibe gewählt hat.
                    </p>

                    <div className="mt-5 grid gap-3">
                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-950">
                                🗺️ Abenteuerlustig
                            </p>
                            <p className="mt-1 text-sm text-stone-600">
                                Für Ausflüge, neue Orte und kleine Missionen.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-950">
                                🎲 Spontan
                            </p>
                            <p className="mt-1 text-sm text-stone-600">
                                Für Wochenenden ohne festen Plan, aber mit guter
                                Laune.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 p-4">
                            <p className="font-bold text-stone-950">
                                🏡 Zuhause
                            </p>
                            <p className="mt-1 text-sm text-stone-600">
                                Für gemütliche Tage, Filme, Essen und
                                Ausschlafen.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}