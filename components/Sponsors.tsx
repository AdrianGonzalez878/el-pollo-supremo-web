// components/Sponsors.tsx
import Link from "next/link";
import { SponsorsMarquee } from "./SponsorsMarquee";
import { fetchPatrocinadores } from "@/lib/sanity/loaders";

export async function Sponsors() {
  const sponsors = await fetchPatrocinadores();

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 title-container">
          <h2 className="text-3xl md:text-4xl font-bold text-white title">
            Nuestros Patrocinadores
          </h2>
          <p className="text-white mt-2 subtitle">
            Gracias a quienes hacen posible estas transmisiones.
          </p>
        </div>

        <SponsorsMarquee sponsors={sponsors} />

        <div className="text-center mt-12">
          <Link
            href="/contacto"
            className="main-button font-bold py-3 px-8 rounded-full text-lg"
          >
            Conviértete en Patrocinador
          </Link>
        </div>
      </div>
    </section>
  );
}
