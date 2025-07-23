"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaPhone } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface Sponsor {
  id: number;
  nombre: string;
  logoUrl: string;
  numero_telefono?: number;
}

async function getAllSponsors(): Promise<Sponsor[]> {
  try {
    const endpoint = `${STRAPI_URL}/api/patrocinadors?populate=logo`;
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      console.error("Error response from Strapi:", res.status, res.statusText);
      throw new Error('Failed to fetch sponsors');
    }

    const jsonResponse = await res.json();
    const sponsorsData = jsonResponse.data || [];

    const formattedSponsors: Sponsor[] = sponsorsData.map((sponsor: any) => {
      const attributes = sponsor.attributes;
      const logoData = attributes.logo?.data?.attributes;
      const logoUrl = logoData?.url
        ? `${STRAPI_URL}${logoData.url}`
        : '/placeholder-logo.png';

      return {
        id: sponsor.id,
        nombre: attributes.nombre,
        logoUrl: logoUrl,
        numero_telefono: attributes.numero_telefono,
      };
    });
    return formattedSponsors;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}

export default function PatrocinadoresPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllSponsors().then(data => {
      setSponsors(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-negro-el-pollo text-white min-h-screen flex items-center justify-center">
        <p className="text-xl text-dorado-el-pollo-claro">Cargando patrocinadores...</p>
      </div>
    );
  }

  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dorado-el-pollo">
            Nuestros Patrocinadores
          </h1>
          <p className="text-dorado-el-pollo-claro mt-3 max-w-2xl mx-auto">
            Un agradecimiento especial a las marcas y personas que apoyan el básquetbol en Oaxaca.
          </p>
        </div>

        {sponsors.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="bg-card-dark rounded-lg shadow-lg text-center p-6 md:p-8 flex flex-col items-center justify-between">
                <div className="w-full">
                  <div className="relative w-36 h-20 md:w-48 md:h-24 mx-auto mb-4">
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
                    className="flex items-center justify-center gap-2 mt-6 font-bold py-2 px-6 rounded-full text-md main-button"
                  >
                    <FaPhone />
                    Contactar
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No hay patrocinadores para mostrar.</p>
        )}
        
        <div className="mt-20 bg-card-dark rounded-lg shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-dorado-el-pollo mb-4">
                ¿Quieres ser parte de la familia?
              </h2>
              <p className="text-dorado-el-pollo-claro mb-8">
                Expón tu marca ante miles de aficionados al básquetbol en todo el estado y apoya el deporte local. ¡Contáctanos para conocer nuestros paquetes de patrocinio!
              </p>
              <div className="mt-auto">
                <Link href="/contacto" className="main-button font-bold py-3 px-8 rounded-full text-lg inline-block">
                  Conviértete en Patrocinador
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] md:min-h-full">
              <Image
                src="/become-sponsor-placeholder.jpg"
                alt="Aficionados al básquetbol de El Pollo Supremo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}