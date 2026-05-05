// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://aulssp.de",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
    ];
}