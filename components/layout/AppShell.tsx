// components/layout/AppShell.tsx

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/data/profiles";

type AppShellProps = {
    children: React.ReactNode;
};

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function getAvatarClasses(color: string) {
    const colors = {
        green: "bg-green-50 text-green-700 ring-green-200",
        blue: "bg-blue-50 text-blue-700 ring-blue-200",
        pink: "bg-pink-50 text-pink-700 ring-pink-200",
        orange: "bg-orange-50 text-orange-700 ring-orange-200",
        purple: "bg-purple-50 text-purple-700 ring-purple-200",
        yellow: "bg-yellow-50 text-yellow-700 ring-yellow-200",
        red: "bg-red-50 text-red-700 ring-red-200",
        teal: "bg-teal-50 text-teal-700 ring-teal-200",
    } as const;

    return colors[color as keyof typeof colors] ?? colors.orange;
}

async function getCurrentProfile() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return ensureProfile({
        supabase,
        user,
    });
}

export async function AppShell({ children }: AppShellProps) {
    const profile = await getCurrentProfile();

    return (
        <div className="min-h-dvh px-4 pb-[calc(env(safe-area-inset-bottom)+7.5rem)] pt-[calc(env(safe-area-inset-top)+1.25rem)]">
            <div className="mx-auto flex w-full max-w-md flex-col gap-5">
                <header className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                            AULSSP
                        </p>

                        <h1 className="mt-1 text-xl font-bold text-stone-950">
                            Unser Wochenend-System
                        </h1>
                    </div>

                    {profile ? (
                        <div
                            className={[
                                "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-black shadow-sm ring-2",
                                getAvatarClasses(profile.profileColor),
                            ].join(" ")}
                            title={profile.displayName}
                        >
                            {profile.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={profile.avatarUrl}
                                    alt={profile.displayName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                getInitials(profile.displayName)
                            )}
                        </div>
                    ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                            💛
                        </div>
                    )}
                </header>

                <main>{children}</main>
            </div>

            <BottomNavigation />
        </div>
    );
}