// app/archiv/page.tsx

import { AppShell } from "@/components/layout/AppShell";
import { EpisodeCard } from "@/components/episodes/EpisodeCard";
import { getPastEpisodes } from "@/lib/data/episodes";
import { createClient } from "@/lib/supabase/server";

type ProfileRow = {
    id: string;
    display_name: string;
    profile_color: string;
    avatar_url: string | null;
};

export default async function ArchivPage() {
    const pastEpisodes = await getPastEpisodes();

    const supabase = await createClient();

    const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, display_name, profile_color, avatar_url");

    if (profilesError) {
        throw new Error(profilesError.message);
    }

    const profileRows = (profiles ?? []) as ProfileRow[];

    return (
        <AppShell>
            <div className="space-y-4">
                <section>
                    <h2 className="text-2xl font-black tracking-tight text-stone-950">
                        Episodenarchiv
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-stone-600">
                        Hier sammelt ihr eure gemeinsamen Wochenenden, Highlights und
                        Insider.
                    </p>
                </section>

                {pastEpisodes.length === 0 ? (
                    <section className="rounded-[2rem] bg-white p-5 shadow-sm">
                        <p className="text-sm text-stone-600">
                            Noch keine abgeschlossene Episode.
                        </p>
                    </section>
                ) : (
                    <div className="space-y-3">
                        {pastEpisodes.map((episode) => (
                            <EpisodeCard
                                key={episode.id}
                                episode={episode}
                                profiles={profileRows}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}