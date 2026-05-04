// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AULSSP",
    template: "%s · AULSSP",
  },
  description: "Alina-Und-Lucas-Sehen-Sich-Planung",
  applicationName: "AULSSP",
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