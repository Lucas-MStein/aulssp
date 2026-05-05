// components/ideas/IdeaRoulette.tsx

"use client";

import { useState } from "react";
import type { DateIdea } from "@/lib/data";

type IdeaRouletteProps = {
    ideas: DateIdea[];
};

export function IdeaRoulette({ ideas }: IdeaRouletteProps) {
    const [selectedIdea, setSelectedIdea] = useState<DateIdea | null>(null);

    function drawIdea() {
        if (ideas.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * ideas.length);
        setSelectedIdea(ideas[randomIndex]);
    }

    return (
        <section className="rounded-[2rem] bg-stone-950 p-5 text-white shadow-sm">
            <p className="text-sm font-medium text-orange-200">
                Spontane Mission
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight">
                Idee ziehen
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-300">
                Keine Lust zu diskutieren? Lass AULSSP entscheiden, was ihr machen
                könntet.
            </p>

            <button
                type="button"
                onClick={drawIdea}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
            >
                Zufällige Date-Idee ziehen
            </button>

            {selectedIdea && (
                <div className="mt-5 rounded-[1.5rem] bg-white p-4 text-stone-900">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
                        Eure Mission
                    </p>

                    <h3 className="mt-2 text-lg font-black">{selectedIdea.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        {selectedIdea.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-stone-500">
            <span className="rounded-full bg-orange-50 px-3 py-1">
              {selectedIdea.category}
            </span>
                        <span className="rounded-full bg-orange-50 px-3 py-1">
              Aufwand: {selectedIdea.effort}
            </span>
                        <span className="rounded-full bg-orange-50 px-3 py-1">
              Kosten: {selectedIdea.cost}
            </span>
                    </div>
                </div>
            )}
        </section>
    );
}