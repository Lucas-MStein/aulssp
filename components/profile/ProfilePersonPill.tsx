// components/profile/ProfilePersonPill.tsx

type ProfilePersonPillProps = {
    name: string | null | undefined;
    suffix?: string;
    profiles: {
        id: string;
        display_name: string;
        profile_color: string;
        avatar_url: string | null;
    }[];
};

function getProfileColorClasses(color: string) {
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

function normalizeName(value: string | null | undefined) {
    return value?.trim().toLowerCase() ?? "";
}

export function ProfilePersonPill({
                                      name,
                                      suffix,
                                      profiles,
                                  }: ProfilePersonPillProps) {
    if (!name) {
        return <span>Noch offen</span>;
    }

    const profile =
        profiles.find(
            (profile) => normalizeName(profile.display_name) === normalizeName(name)
        ) ?? null;

    if (!profile) {
        return <span>{suffix ? `${name} ${suffix}` : name}</span>;
    }

    return (
        <span
            className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold leading-none ring-1 ${getProfileColorClasses(
                profile.profile_color
            )}`}
        >
            {profile.avatar_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={profile.avatar_url}
                    alt=""
                    className="h-4 w-4 shrink-0 rounded-full object-cover"
                />
            )}

            <span className="truncate">
                {profile.display_name}
                {suffix ? ` ${suffix}` : ""}
            </span>
        </span>
    );
}