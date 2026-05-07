// components/dashboard/CountdownCard.tsx

"use client";

import { useMemo } from "react";
import type { Episode } from "@/lib/data";

type CountdownCardProps = {
    episode: Episode;
};

function getDaysUntil(date: string) {
    const now = new Date();
    const target = new Date(`${date}T00:00:00`);

    const nowStart = new Date(now);
    nowStart.setHours(0, 0, 0, 0);

    const targetStart = new Date(target);
    targetStart.setHours(0, 0, 0, 0);

    const difference = targetStart.getTime() - nowStart.getTime();

    return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

export function CountdownCard({ episode }: CountdownCardProps) {
    const daysUntil = useMemo(
        () => getDaysUntil(episode.startDate),
        [episode.startDate]
    );

    const label = daysUntil === 1 ? "Tag" : "Tage";

    return (
        <section className="rounded-[2rem] bg-stone-950 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold text-orange-200">Noch</p>

            <div className="mt-4 flex items-end gap-3">
        <span className="text-7xl font-black leading-none tracking-tight">
          {daysUntil}
        </span>

                <span className="pb-2 text-2xl font-black">{label}</span>
            </div>

            <p className="mt-5 text-sm leading-6 text-stone-300">
                bis zur nächsten AULSSP-Episode.
            </p>
        </section>
    );
}