// app/login/page.tsx
import { loginWithPin } from "@/app/login/actions";

type LoginPageProps = {
    searchParams?: Promise<{
        error?: string;
    }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = await searchParams;
    const hasError = params?.error === "wrong-pin";

    return (
        <main className="flex min-h-dvh items-center justify-center px-4 py-10">
            <section className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
                    💛
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
                    AULSSP
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-stone-950">
                    Unser Code?
                </h1>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                    Gib den geheimen AULSSP-Code ein, um zur Planung zu kommen.
                </p>

                <form action={loginWithPin} className="mt-8 space-y-4">
                    <div className="text-left">
                        <label
                            htmlFor="pin"
                            className="text-sm font-semibold text-stone-700"
                        >
                            Code
                        </label>

                        <input
                            id="pin"
                            name="pin"
                            type="password"
                            autoComplete="off"
                            placeholder="z. B. 150KM"
                            className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-center text-lg font-bold tracking-[0.2em] text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            required
                        />
                    </div>

                    {hasError && (
                        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            Der Code stimmt leider nicht.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                    >
                        Einloggen
                    </button>
                </form>
            </section>
        </main>
    );
}