// app/profil/edit/page.tsx

import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/server";
import { updateProfileColor, uploadProfileImage } from "@/app/profil/actions";

const colors = [
    {
        key: "green",
        label: "Grün",
        dotClassName: "bg-green-500",
        ringClassName: "ring-green-500",
    },
    {
        key: "blue",
        label: "Blau",
        dotClassName: "bg-blue-500",
        ringClassName: "ring-blue-500",
    },
    {
        key: "pink",
        label: "Pink",
        dotClassName: "bg-pink-500",
        ringClassName: "ring-pink-500",
    },
    {
        key: "orange",
        label: "Orange",
        dotClassName: "bg-orange-500",
        ringClassName: "ring-orange-500",
    },
    {
        key: "purple",
        label: "Lila",
        dotClassName: "bg-purple-500",
        ringClassName: "ring-purple-500",
    },
    {
        key: "yellow",
        label: "Gelb",
        dotClassName: "bg-yellow-400",
        ringClassName: "ring-yellow-400",
    },
    {
        key: "red",
        label: "Rot",
        dotClassName: "bg-red-500",
        ringClassName: "ring-red-500",
    },
    {
        key: "teal",
        label: "Türkis",
        dotClassName: "bg-teal-500",
        ringClassName: "ring-teal-500",
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

function getProfileColor(userMetadataColor: unknown, displayName: string) {
    if (typeof userMetadataColor === "string") {
        return userMetadataColor;
    }

    return displayName === "Alina" ? "blue" : "green";
}

export default async function ProfilEditPage() {
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

    const avatarUrl =
        typeof user.user_metadata.avatar_url === "string"
            ? user.user_metadata.avatar_url
            : null;

    const profileColor = getProfileColor(
        user.user_metadata.profile_color,
        displayName
    );

    const selectedColorLabel =
        colors.find((color) => color.key === profileColor)?.label ?? "Grün";

    return (
        <AppShell>
            <div className="w-full min-w-0 max-w-full space-y-5">
                <section className="w-full min-w-0 max-w-full">
                    <Link
                        href="/profil"
                        className="inline-flex text-sm font-bold text-orange-500"
                    >
                        ← Zurück zum Profil
                    </Link>

                    <h2 className="mt-4 text-2xl font-black tracking-tight text-stone-950">
                        Profil bearbeiten
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Passe dein Profilbild und deine persönliche Farbe an.
                    </p>
                </section>

                <section className="w-full min-w-0 max-w-full rounded-[2rem] bg-white p-5 shadow-sm">
                    <div className="flex w-full min-w-0 items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-xl font-black text-orange-600 ring-4 ring-orange-50">
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

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-orange-500">
                                Profil von
                            </p>

                            <h3 className="truncate text-2xl font-black text-stone-950">
                                {displayName}
                            </h3>

                            <p className="mt-1 break-all text-xs leading-5 text-stone-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 border-t border-orange-50 pt-5">
                        <p className="text-sm font-bold text-stone-950">
                            Profilfarbe
                        </p>

                        <p className="mt-1 text-sm text-stone-500">
                            Aktuell: {selectedColorLabel}
                        </p>

                        <div className="mt-4 grid w-full grid-cols-4 gap-2">
                            {colors.map((color) => {
                                const isSelected = color.key === profileColor;

                                return (
                                    <form
                                        key={color.key}
                                        action={updateProfileColor}
                                        className="min-w-0"
                                    >
                                        <input
                                            type="hidden"
                                            name="color"
                                            value={color.key}
                                        />

                                        <button
                                            type="submit"
                                            aria-label={`Profilfarbe ${color.label} wählen`}
                                            title={color.label}
                                            className={[
                                                "relative flex h-11 w-full min-w-0 items-center justify-center rounded-2xl bg-white ring-2 transition active:scale-[0.98]",
                                                isSelected
                                                    ? color.ringClassName
                                                    : "ring-orange-100 hover:ring-orange-200",
                                            ].join(" ")}
                                        >
                                            <span
                                                className={`h-5 w-5 rounded-full ${color.dotClassName}`}
                                            />

                                            {isSelected && (
                                                <span className="absolute text-[10px] font-black text-white">
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    </form>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-5 border-t border-orange-50 pt-5">
                        <form
                            action={uploadProfileImage}
                            className="w-full min-w-0 space-y-3"
                        >
                            <div>
                                <p className="text-sm font-bold text-stone-950">
                                    Profilbild
                                </p>

                                <p className="mt-1 text-sm leading-6 text-stone-500">
                                    Wähle ein neues Bild für dein Profil.
                                </p>
                            </div>

                            <label
                                htmlFor="avatar"
                                className="flex min-h-[3rem] w-full min-w-0 cursor-pointer items-center justify-center rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600 ring-1 ring-orange-100 transition hover:bg-orange-100"
                            >
                                Bild auswählen
                            </label>

                            <input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/*"
                                required
                                className="sr-only"
                            />

                            <button
                                type="submit"
                                className="inline-flex min-h-[3rem] w-full min-w-0 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                            >
                                Speichern
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}