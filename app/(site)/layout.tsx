import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-34">{children}</main>
      <Footer />
    </>
  );
}
