import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-dorado-el-pollo focus:text-negro-el-pollo focus:font-bold focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      <Navbar />
      <main id="contenido-principal" className="pt-34">{children}</main>
      <Footer />
    </>
  );
}
