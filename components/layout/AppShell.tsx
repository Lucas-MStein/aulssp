// components/layout/AppShell.tsx

import { BottomNavigation } from "@/components/layout/BottomNavigation";

type AppShellProps = {
    children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="min-h-dvh px-4 pb-[calc(env(safe-area-inset-bottom)+7.5rem)] pt-[calc(env(safe-area-inset-top)+1.25rem)]">
            <div className="mx-auto flex w-full max-w-md flex-col gap-5">
                <header className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                            AULSSP
                        </p>
                        <h1 className="mt-1 text-xl font-bold text-stone-950">
                            Unser Wochenend-System
                        </h1>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                        💛
                    </div>
                </header>

                <main>{children}</main>
            </div>

            <BottomNavigation />
        </div>
    );
}