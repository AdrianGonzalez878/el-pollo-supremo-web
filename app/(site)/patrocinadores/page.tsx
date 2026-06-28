import Link from "next/link";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { fetchPatrocinadores } from "@/lib/sanity/loaders";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

export const revalidate = 120;

export default async function PatrocinadoresPage() {
  const sponsors = await fetchPatrocinadores();

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h1 className="section-heading section-heading--center text-4xl sm:text-5xl font-extrabold text-dorado-el-pollo">
              Nuestros Patrocinadores
            </h1>
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
              Un agradecimiento especial a las marcas y personas que apoyan el básquetbol en Oaxaca.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Sponsors grid */}
        {sponsors.length > 0 ? (
          <StaggerGrid className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sponsors.map((sponsor) => (
              <StaggerItem key={sponsor.id}>
                <div className="bg-card-dark rounded-xl border border-gray-800 shadow-lg text-center p-6 md:p-8 flex flex-col items-center justify-between h-full card-glow">
                  <div className="w-full">
                    <div className="relative w-36 h-20 md:w-48 md:h-24 mx-auto mb-5">
                      <Image
                        src={sponsor.logoUrl}
                        alt={`Logo de ${sponsor.nombre}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">{sponsor.nombre}</h2>
                  </div>
                  {sponsor.numero_telefono && (
                    <a
                      href={`tel:${sponsor.numero_telefono}`}
                      className="flex items-center justify-center gap-2 mt-6 btn-gold py-2 px-6 rounded-full text-sm"
                    >
                      <FaPhone aria-hidden="true" />
                      Contactar
                    </a>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        ) : (
          <AnimateOnScroll delay={0.1}>
            <div className="text-center">
              <p className="text-gray-400 mb-4">No hay patrocinadores para mostrar.</p>
              <p className="text-sm text-dorado-el-pollo-claro">
                Crea documentos &quot;Patrocinador&quot; en Sanity Studio o revisa
                NEXT_PUBLIC_SANITY_PROJECT_ID en tu entorno.
              </p>
            </div>
          </AnimateOnScroll>
        )}

        {/* CTA Banner */}
        <AnimateOnScroll delay={0.1}>
          <div className="mt-20 bg-card-dark rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
                <span className="inline-block text-xs font-bold tracking-widest text-dorado-el-pollo uppercase mb-3">
                  Únete a la familia
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  ¿Quieres ser parte de{" "}
                  <span className="text-dorado-el-pollo">la familia?</span>
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Expón tu marca ante miles de aficionados al básquetbol en todo el
                  estado y apoya el deporte local. ¡Contáctanos para conocer nuestros
                  paquetes de patrocinio!
                </p>
                <div className="mt-auto">
                  <Link
                    href="/contacto"
                    className="btn-gold py-3 px-8 rounded-full text-base font-bold inline-block shadow-lg shadow-dorado-el-pollo/20"
                  >
                    Conviértete en Patrocinador
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[280px] md:min-h-full overflow-hidden">
                <Image
                  src="/become-sponsor-placeholder.jpg"
                  alt="Aficionados al básquetbol de El Pollo Supremo"
                  fill
                  className="object-contain object-center scale-90"
                  priority
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>

      </div>
    </div>
  );
}
