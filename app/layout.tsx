// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Pollo Supremo - El Básquetbol de Oaxaca",
  description:
    "Transmisiones en vivo, torneos y toda la información del básquetbol oaxaqueño.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-negro-el-pollo text-dorado-el-pollo-claro`}>
        {/* Ensure animated elements are visible if JS is disabled or very slow */}
        <noscript>
          <style>{`[style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <MotionProvider>
          {children}
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
