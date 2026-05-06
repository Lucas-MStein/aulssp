// app/planen/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { PlanningTabs } from "@/components/planning/PlanningTabs";

type PlanenPageProps = {
    searchParams?: Promise<{
        created?: string;
        deleted?: string;
    }>;
};

export default async function PlanenPage({ searchParams }: PlanenPageProps) {
    const params = await searchParams;

    const showCreatedMessage = params?.created === "1";
    const showDeletedMessage = params?.deleted === "1";

    return (
        <AppShell>
            <div className="space-y-5">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Planen
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Lege einzelne Termine an oder plane direkt eine neue
                        AULSSP-Episode.
                    </p>
                </section>

                {showCreatedMessage && (
                    <section className="rounded-[1.5rem] bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 shadow-sm">
                        Termin gespeichert.
                    </section>
                )}

                {showDeletedMessage && (
                    <section className="rounded-[1.5rem] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 shadow-sm">
                        Termin gelöscht.
                    </section>
                )}

                <PlanningTabs />
            </div>
        </AppShell>
    );
}