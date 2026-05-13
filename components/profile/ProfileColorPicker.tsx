// components/profile/ProfileColorPicker.tsx

import { updateProfileColor } from "@/app/profil/actions";

const colors = [
    {
        key: "green",
        label: "Grün",
        dotClassName: "bg-green-500",
        ringClassName: "ring-green-500",
    },
    {
        key: "blue",
        label: "Blau",
        dotClassName: "bg-blue-500",
        ringClassName: "ring-blue-500",
    },
    {
        key: "pink",
        label: "Pink",
        dotClassName: "bg-pink-500",
        ringClassName: "ring-pink-500",
    },
    {
        key: "orange",
        label: "Orange",
        dotClassName: "bg-orange-500",
        ringClassName: "ring-orange-500",
    },
    {
        key: "purple",
        label: "Lila",
        dotClassName: "bg-purple-500",
        ringClassName: "ring-purple-500",
    },
    {
        key: "yellow",
        label: "Gelb",
        dotClassName: "bg-yellow-400",
        ringClassName: "ring-yellow-400",
    },
];

type ProfileColorPickerProps = {
    selectedColor: string;
};

export function ProfileColorPicker({ selectedColor }: ProfileColorPickerProps) {
    const selectedColorLabel =
        colors.find((color) => color.key === selectedColor)?.label ?? "Grün";

    return (
        <div className="mt-5 border-t border-orange-50 pt-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-bold text-stone-950">
                        Profilfarbe
                    </p>

                    <p className="mt-1 text-sm leading-6 text-stone-600">
                        Aktuell: {selectedColorLabel}
                    </p>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                    {colors.map((color) => {
                        const isSelected = color.key === selectedColor;

                        return (
                            <form key={color.key} action={updateProfileColor}>
                                <input
                                    type="hidden"
                                    name="color"
                                    value={color.key}
                                />

                                <button
                                    type="submit"
                                    aria-label={`Profilfarbe ${color.label} wählen`}
                                    title={color.label}
                                    className={[
                                        "flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-2 transition active:scale-95",
                                        isSelected
                                            ? color.ringClassName
                                            : "ring-orange-100 hover:ring-orange-200",
                                    ].join(" ")}
                                >
                                    <span
                                        className={`h-5 w-5 rounded-full ${color.dotClassName}`}
                                    />

                                    {isSelected && (
                                        <span className="absolute text-xs font-black text-white">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            </form>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}