// app/dashboard/page.tsx
import { AppShell } from "@/components/layout/AppShell";

export default function DashboardPage() {
    return (
        <AppShell>
            <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-orange-500">
                    Nächste Episode
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
                    Mission Sonntagsfrühstück
                </h2>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                    Noch ist alles Platzhalter — aber das Grundlayout steht.
                </p>
            </section>
        </AppShell>
    );
}