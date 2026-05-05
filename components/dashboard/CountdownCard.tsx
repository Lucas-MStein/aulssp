// components/dashboard/CountdownCard.tsx

import type { Episode } from "@/lib/data";
import { getDaysUntil } from "@/lib/dates";

type CountdownCardProps = {
    episode: Episode;
};

export function CountdownCard({ episode }: CountdownCardProps) {
    const daysUntil = getDaysUntil(episode.startDate);

    return (
        <section className="rounded-[2rem] bg-stone-950 p-5 text-white shadow-sm">
            <p className="text-sm font-medium text-orange-200">Noch</p>

            <div className="mt-2 flex items-end gap-2">
        <span className="text-6xl font-black tracking-tight">
          {Math.max(daysUntil, 0)}
        </span>
                <span className="pb-2 text-lg font-bold text-orange-100">Tage</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-stone-300">
                bis zur nächsten AULSSP-Episode.
            </p>
        </section>
    );
}