// app/episode/[id]/edit/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { EpisodeEditForm } from "@/components/episodes/EpisodeEditForm";
import { getEpisodeBySlug } from "@/lib/data/episodes";

type EpisodeEditPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EpisodeEditPage({ params }: EpisodeEditPageProps) {
    const { id } = await params;
    const episode = await getEpisodeBySlug(id);

    if (!episode) {
        notFound();
    }

    return (
        <AppShell>
            <div className="space-y-5">
                <Link
                    href={`/episode/${episode.slug}`}
                    className="inline-flex text-sm font-semibold text-orange-600"
                >
                    ← Zurück zur Episode
                </Link>

                <EpisodeEditForm episode={episode} />
            </div>
        </AppShell>
    );
}