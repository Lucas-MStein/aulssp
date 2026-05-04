// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "AULSSP",
        short_name: "AULSSP",
        description: "Alina-Und-Lucas-Sehen-Sich-Planung",
        start_url: "/dashboard",
        scope: "/",
        display: "standalone",
        background_color: "#fff7ed",
        theme_color: "#fb923c",
        orientation: "portrait",
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/icons/maskable-icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}