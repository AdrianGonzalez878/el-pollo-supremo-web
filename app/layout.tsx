// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; // Importa el Navbar
import { Footer } from "@/components/Footer"; // Importa el Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Pollo Supremo - El Básquetbol de Oaxaca",
  description: "Transmisiones en vivo, torneos y toda la información del básquetbol oaxaqueño.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-negro-el-pollo text-dorado-el-pollo-claro`}>
        <Navbar /> {/* Navbar aparecerá en la parte superior de todas las páginas */}
        <main className="pt-34">{children}</main> {/* Aquí se renderizará el contenido de cada página */}
        <Footer /> {/* Footer aparecerá en la parte inferior */}
      </body>
    </html>
  );
}