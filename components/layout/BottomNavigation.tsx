// components/layout/BottomNavigation.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
    {
        label: "Home",
        href: "/dashboard",
        icon: "🏠",
    },
    {
        label: "Kalender",
        href: "/kalender",
        icon: "📅",
    },
    {
        label: "Planen",
        href: "/planen",
        icon: "➕",
    },
    {
        label: "Archiv",
        href: "/archiv",
        icon: "📖",
    },
    {
        label: "Profil",
        href: "/profil",
        icon: "👤",
    },
];

export function BottomNavigation() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 box-border border-t border-orange-100 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-12px_30px_rgba(120,53,15,0.08)] backdrop-blur">
            <div className="mx-auto grid w-full max-w-md grid-cols-5 gap-1">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center text-xs font-medium transition",
                                isActive
                                    ? "bg-orange-500 text-white shadow-sm"
                                    : "text-stone-500 hover:bg-orange-50 hover:text-orange-600",
                            ].join(" ")}
                        >
                            <span className="text-lg leading-none">
                                {item.icon}
                            </span>

                            <span className="max-w-full truncate">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}