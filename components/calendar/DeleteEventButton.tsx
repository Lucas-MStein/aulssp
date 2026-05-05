"use client";

import { deleteEvent } from "@/app/kalender/actions";

type DeleteEventButtonProps = {
    eventId: string;
    redirectTo?: string;
};

export function DeleteEventButton({
                                      eventId,
                                      redirectTo = "/kalender",
                                  }: DeleteEventButtonProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const confirmed = window.confirm(
            "Möchtest du diesen Termin wirklich löschen?"
        );

        if (!confirmed) {
            event.preventDefault();
        }
    }

    return (
        <form action={deleteEvent} onSubmit={handleSubmit} className="mt-4">
            <input type="hidden" name="eventId" value={eventId} />
            <input type="hidden" name="redirectTo" value={redirectTo} />

            <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
            >
                Termin löschen
            </button>
        </form>
    );
}