// app/ideen/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { IdeaRoulette } from "@/app/ideen/components/IdeaRoulette";
import { dateIdeas } from "@/lib/data";

export default function IdeenPage() {
    return (
        <AppShell>
            <div className="space-y-5">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Date-Ideen
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Kleine Missionen, spontane Pläne und Ideen für müde oder
                        abenteuerliche Wochenenden.
                    </p>
                </section>

                <IdeaRoulette ideas={dateIdeas} />

                <section className="space-y-3">
                    {dateIdeas.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </section>
            </div>
        </AppShell>
    );
}