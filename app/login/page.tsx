// app/login/page.tsx

import { loginWithSupabase } from "@/app/login/actions";

type LoginPageProps = {
    searchParams?: Promise<{
        error?: string;
        next?: string;
    }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = await searchParams;

    const hasError = params?.error === "invalid";
    const hasMissingError = params?.error === "missing";
    const next = params?.next ?? "/dashboard";

    return (
        <main className="flex min-h-dvh items-center justify-center px-4 py-10">
            <section className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                    💛
                </div>

                <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
                    AULSSP Login
                </p>

                <h1 className="mt-2 text-center text-3xl font-black tracking-tight text-stone-950">
                    Willkommen zurück
                </h1>

                <p className="mt-3 text-center text-sm leading-6 text-stone-600">
                    Melde dich mit deinem AULSSP-Account an.
                </p>

                {(hasError || hasMissingError) && (
                    <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        {hasMissingError
                            ? "Bitte E-Mail und Passwort eingeben."
                            : "Login fehlgeschlagen. Prüfe E-Mail und Passwort."}
                    </div>
                )}

                <form action={loginWithSupabase} className="mt-6 space-y-4">
                    <input type="hidden" name="next" value={next} />

                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold text-stone-700"
                        >
                            E-Mail
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="mt-2 min-h-[3.25rem] w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-stone-700"
                        >
                            Passwort
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="mt-2 min-h-[3.25rem] w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-base outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                    >
                        Einloggen
                    </button>
                </form>
            </section>
        </main>
    );
}