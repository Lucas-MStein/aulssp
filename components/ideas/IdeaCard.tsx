// components/ideas/IdeaCard.tsx

import type { DateIdea } from "@/lib/data";

type IdeaCardProps = {
    idea: DateIdea;
};

export function IdeaCard({ idea }: IdeaCardProps) {
    return (
        <article className="rounded-[1.75rem] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                        {idea.category}
                    </p>
                    <h3 className="mt-2 text-lg font-black text-stone-950">
                        {idea.title}
                    </h3>
                </div>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
          {idea.cost}
        </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-stone-600">
                {idea.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
        <span className="rounded-full bg-stone-100 px-3 py-1">
          Aufwand: {idea.effort}
        </span>
                <span className="rounded-full bg-stone-100 px-3 py-1">
          Wetter: {idea.weather}
        </span>
            </div>
        </article>
    );
}