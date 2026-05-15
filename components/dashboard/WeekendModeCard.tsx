// components/dashboard/WeekendModeCard.tsx

import { setWeekendMode } from "@/app/dashboard/actions";
import type {
    WeekendMode,
    WeekendModeVote,
} from "@/lib/data/weekendModes";

type WeekendModeCardProps = {
    episodeId: string;
    votes: WeekendModeVote[];
};

const modes: {
    key: WeekendMode;
    label: string;
    emoji: string;
    description: string;
}[] = [
    {
        key: "adventure",
        label: "Abenteuerlustig",
        emoji: "🗺️",
        description: "Raus aus dem Alltag. Kleine Missionen erlaubt.",
    },
    {
        key: "spontaneous",
        label: "Spontan",
        emoji: "🎲",
        description: "Wenig Plan, viel Gefühl. Mal schauen, was passiert.",
    },
    {
        key: "home",
        label: "Zuhause",
        emoji: "🏡",
        description: "Gemütlich, ruhig und nah beieinander.",
    },
];

function getColorClasses(color: string) {
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

    return colors[color as keyof typeof colors] ?? colors.green;
}

function getDotClassName(color: string) {
    const colors = {
        green: "bg-green-500",
        blue: "bg-blue-500",
        pink: "bg-pink-500",
        orange: "bg-orange-500",
        purple: "bg-purple-500",
        yellow: "bg-yellow-400",
        red: "bg-red-500",
        teal: "bg-teal-500",
    } as const;

    return colors[color as keyof typeof colors] ?? colors.green;
}

export function WeekendModeCard({ episodeId, votes }: WeekendModeCardProps) {
    return (
        <section className="rounded-[2rem] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-orange-500">
                Wochenend-Modus
            </p>

            <h2 className="mt-2 text-xl font-black text-stone-950">
                Wie ist euer Vibe?
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-600">
                Wählt pro Person, wie sich die nächste Episode anfühlen soll.
            </p>

            <div className="mt-5 space-y-3">
                {modes.map((mode) => {
                    const modeVotes = votes.filter(
                        (vote) => vote.mode === mode.key
                    );

                    return (
                        <form key={mode.key} action={setWeekendMode}>
                            <input
                                type="hidden"
                                name="episodeId"
                                value={episodeId}
                            />

                            <input
                                type="hidden"
                                name="mode"
                                value={mode.key}
                            />

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-orange-50/70 p-4 text-left ring-1 ring-orange-100 transition hover:bg-orange-50 active:scale-[0.99]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-base font-black text-stone-950">
                                            <span className="mr-2">
                                                {mode.emoji}
                                            </span>
                                            {mode.label}
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-stone-600">
                                            {mode.description}
                                        </p>
                                    </div>

                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-orange-500 ring-1 ring-orange-100">
                                        {modeVotes.length > 0 ? "✓" : ""}
                                    </span>
                                </div>

                                {modeVotes.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {modeVotes.map((vote) => (
                                            <span
                                                key={vote.id}
                                                className={[
                                                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1",
                                                    getColorClasses(
                                                        vote.profileColor
                                                    ),
                                                ].join(" ")}
                                            >
                                                {vote.avatarUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={vote.avatarUrl}
                                                        alt=""
                                                        className="h-5 w-5 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span
                                                        className={[
                                                            "h-2 w-2 rounded-full",
                                                            getDotClassName(
                                                                vote.profileColor
                                                            ),
                                                        ].join(" ")}
                                                    />
                                                )}

                                                {vote.displayName}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </button>
                        </form>
                    );
                })}
            </div>

            {votes.length === 0 && (
                <p className="mt-4 text-sm leading-6 text-stone-500">
                    Noch keine Auswahl getroffen.
                </p>
            )}
        </section>
    );
}