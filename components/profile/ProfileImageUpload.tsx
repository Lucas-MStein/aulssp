// components/profile/ProfileImageUpload.tsx

import { uploadProfileImage } from "@/app/profil/actions";

export function ProfileImageUpload() {
    return (
        <form action={uploadProfileImage} className="mt-5 space-y-3">
            <div>
                <p className="text-sm font-bold text-stone-950">
                    Profilbild ändern
                </p>

                <p className="mt-1 text-sm leading-6 text-stone-600">
                    Wähle ein neues Bild für dein Profil.
                </p>
            </div>

            <label
                htmlFor="avatar"
                className="flex min-h-[3.25rem] cursor-pointer items-center justify-center rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-600 ring-1 ring-orange-100 transition hover:bg-orange-100"
            >
                Bild auswählen
            </label>

            <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                required
                className="sr-only"
            />

            <button
                type="submit"
                className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
            >
                Profilbild speichern
            </button>
        </form>
    );
}