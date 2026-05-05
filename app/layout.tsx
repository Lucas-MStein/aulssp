// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aulssp.de"),

  title: {
    default: "AULSSP",
    template: "%s · AULSSP",
  },

  description:
      "Alina-Und-Lucas-Sehen-Sich-Planung. Unser gemeinsamer Ort für Kalender, Vorfreude, Date-Ideen und Wochenend-Episoden.",

  applicationName: "AULSSP",

  openGraph: {
    title: "AULSSP",
    description:
        "Alina-Und-Lucas-Sehen-Sich-Planung. Unser gemeinsamer Ort für Kalender, Vorfreude, Date-Ideen und Wochenend-Episoden.",
    url: "https://aulssp.de",
    siteName: "AULSSP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AULSSP – Alina-Und-Lucas-Sehen-Sich-Planung",
      },
    ],
    locale: "de_DE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AULSSP",
    description:
        "Unser gemeinsamer Ort für Kalender, Vorfreude, Date-Ideen und Wochenend-Episoden.",
    images: ["/og-image.png"],
  },

  appleWebApp: {
    capable: true,
    title: "AULSSP",
    statusBarStyle: "default",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fb923c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="de">
      <body>{children}</body>
      </html>
  );
}