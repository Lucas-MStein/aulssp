// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
      <main className="flex min-h-dvh items-center justify-center px-4 py-10">
        <section className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
            💛
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
            Willkommen bei
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-stone-950">
            AULSSP
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-600">
            Alina-Und-Lucas-Sehen-Sich-Planung. Unser kleiner Ort für Kalender,
            Vorfreude, Date-Ideen und Wochenend-Episoden.
          </p>

          <Link
              href="/login"
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
          >
            Zur Planung
          </Link>
        </section>
      </main>
  );
}