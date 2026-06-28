"use client";

import Image from 'next/image';
import Link from 'next/link';
import Marquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";

interface Sponsor {
  id: string;
  nombre: string;
  logoUrl: string;
  numero_telefono?: number;
}

export function SponsorsMarquee({ sponsors }: { sponsors: Sponsor[] }) {
  const prefersReducedMotion = useReducedMotion();

  const logoItem = (sponsor: Sponsor) => (
    <div className="relative h-32 w-56">
      <Image
        src={sponsor.logoUrl}
        alt={`Logo de ${sponsor.nombre}`}
        fill
        className="object-contain"
      />
    </div>
  );

  return (
    <Marquee
      pauseOnHover={true}
      play={!prefersReducedMotion}
      gradient={true}
      gradientColor="#111111"
      gradientWidth={100}
      aria-label="Patrocinadores"
    >
      {sponsors.map((sponsor) =>
        sponsor.numero_telefono ? (
          <Link
            key={sponsor.id}
            href={`tel:${sponsor.numero_telefono}`}
            aria-label={`Llamar a ${sponsor.nombre}`}
            className="opacity-70 transition-opacity duration-300 hover:opacity-100 mx-4 flex items-center justify-center"
          >
            {logoItem(sponsor)}
          </Link>
        ) : (
          <div
            key={sponsor.id}
            aria-label={sponsor.nombre}
            className="opacity-70 mx-4 flex items-center justify-center"
          >
            {logoItem(sponsor)}
          </div>
        )
      )}
    </Marquee>
  );
}