import Image from 'next/image';
import Link from 'next/link';

interface Props {
  imageUrl: string;
}

export function Hero({ imageUrl }: Props) {
  return (
    <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
      <Image
        src={imageUrl}
        alt="Partido de básquetbol en una cancha de Oaxaca"
        fill
        className="object-cover -z-10 brightness-50"
        priority
      />

      <div className="z-10 p-4 title-container">
        <h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white title" 
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
        >
          EL BÁSQUETBOL DE OAXACA
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
          La casa oficial de las transmisiones, torneos y leyendas de nuestras canchas.
        </p>
        
        {/* 1. Contenedor de botones actualizado a Flexbox */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Botón principal (sin cambios) */}
          <Link 
            href="/calendario" 
            className="font-bold py-3 px-8 rounded-full text-lg hero-button"
          >
            Ver Próximas Merces
          </Link>

          {/* 2. Nuevo botón para la tienda */}
          <Link 
            href="/tienda" 
            className="bg-dorado-el-pollo text-negro-el-pollo font-bold py-3 px-8 rounded-full text-black 
                       transition-all duration-300
                       hover:bg-dorado-el-pollo-claro hover:shadow-lg hover:scale-105"
          >
            Tienda Oficial
          </Link>

        </div>
      </div>
    </section>
  );
}