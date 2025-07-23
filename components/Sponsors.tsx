// components/Sponsors.tsx
import Link from 'next/link';
import { SponsorsMarquee } from './SponsorsMarquee'; // Importamos el nuevo carrusel

const STRAPI_URL = 'http://localhost:1337';

interface Sponsor {
  id: number;
  nombre: string;
  logoUrl: string;
  numero_telefono?: number;
}

async function getSponsors(): Promise<Sponsor[]> {
  try {
    const endpoint = `${STRAPI_URL}/api/patrocinadors?populate=logo`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error('Failed to fetch sponsors');
    const jsonResponse = await res.json();
    const sponsorsData = jsonResponse.data.filter((sponsor: any) => sponsor);
    const formattedSponsors: Sponsor[] = sponsorsData.map((sponsor: any) => {
      const attributes = sponsor.attributes || sponsor;
      const logoUrl = attributes.logo?.data?.attributes?.url
        ? `${STRAPI_URL}${attributes.logo.data.attributes.url}`
        : (attributes.logo?.url ? `${STRAPI_URL}${attributes.logo.url}` : '/placeholder-logo.png');
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

export async function Sponsors() {
  const sponsors = await getSponsors();

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
        
        {/* Usamos el nuevo componente de carrusel */}
        <SponsorsMarquee sponsors={sponsors} />

        {/* Añadimos un botón de llamada a la acción */}
        <div className="text-center mt-12">
          <Link href="/contacto" className="main-button font-bold py-3 px-8 rounded-full text-lg">
            Conviértete en Patrocinador
          </Link>
        </div>
      </div>
    </section>
  );
}