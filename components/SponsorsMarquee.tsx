"use client";

import Image from 'next/image';
import Link from 'next/link';
import Marquee from "react-fast-marquee";

interface Sponsor {
  id: number;
  nombre: string;
  logoUrl: string;
  numero_telefono?: number;
}

export function SponsorsMarquee({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <Marquee
      pauseOnHover={true}
      gradient={true}
      gradientColor="#111111" // El color de tu fondo oscuro
      gradientWidth={100}
    >
      {sponsors.map((sponsor) => {
        const linkHref = sponsor.numero_telefono ? `tel:${sponsor.numero_telefono}` : '#';

        return (
          <Link
            key={sponsor.id}
            href={linkHref}
            target={sponsor.numero_telefono ? '_self' : '_blank'}
            rel="noopener noreferrer"
            // --- MARGEN REDUCIDO AQUÍ ---
            // mx-4 reduce el espacio horizontal al mínimo
            className="opacity-70 transition-opacity duration-300 hover:opacity-100 mx-4 flex items-center justify-center"
          >
            {/* --- TAMAÑO AUMENTADO AQUÍ --- */}
            <div className="relative h-32 w-56"> 
              <Image
                src={sponsor.logoUrl}
                alt={`Logo de ${sponsor.nombre}`}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        );
      })}
    </Marquee>
  );
}