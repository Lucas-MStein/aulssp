// components/planning/PlanningTabs.tsx

"use client";

import { useState } from "react";
import { EventForm } from "@/components/calendar/EventForm";
import { EpisodeCreateForm } from "@/components/episodes/EpisodeCreateForm";

type PlanningTab = "event" | "episode";

export function PlanningTabs() {
    const [activeTab, setActiveTab] = useState<PlanningTab>("event");

    return (
        <div className="space-y-5">
            <section className="grid grid-cols-2 gap-2 rounded-[1.75rem] bg-white p-2 shadow-sm">
                <button
                    type="button"
                    onClick={() => setActiveTab("event")}
                    className={[
                        "rounded-2xl px-4 py-3 text-sm font-bold transition",
                        activeTab === "event"
                            ? "bg-orange-500 text-white shadow-sm"
                            : "bg-orange-50 text-orange-700",
                    ].join(" ")}
                >
                    Termin
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("episode")}
                    className={[
                        "rounded-2xl px-4 py-3 text-sm font-bold transition",
                        activeTab === "episode"
                            ? "bg-orange-500 text-white shadow-sm"
                            : "bg-orange-50 text-orange-700",
                    ].join(" ")}
                >
                    Episode
                </button>
            </section>

            {activeTab === "event" ? (
                <EventForm
                    redirectTo="/planen"
                    eyebrow="Neuer Termin"
                    title="Termin hinzufügen"
                />
            ) : (
                <EpisodeCreateForm />
            )}
        </div>
    );
}