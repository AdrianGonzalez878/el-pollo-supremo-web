// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
