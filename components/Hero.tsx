import Image from 'next/image';
import Link from 'next/link';

interface Props {
  imageUrl: string;
}

export function Hero({ imageUrl }: Props) {
  return (
    <section className="relative h-[80vh] min-h-[540px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src={imageUrl}
        alt="Partido de básquetbol en una cancha de Oaxaca"
        fill
        className="object-cover -z-10"
        priority
      />
      {/* Layered gradient overlay for depth */}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-black via-black/60 to-black/30" />

      <div className="z-10 p-6 max-w-3xl mx-auto flex flex-col items-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          EL BÁSQUETBOL<br />
          <span className="text-dorado-el-pollo">DE OAXACA</span>
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          La casa oficial de las transmisiones, torneos y leyendas de nuestras canchas.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/calendario"
            className="btn-gold py-3 px-8 rounded-full text-base font-bold shadow-lg shadow-dorado-el-pollo/20"
          >
            Ver Próximas Merces
          </Link>
          <Link
            href="/tienda"
            className="hero-button py-3 px-8 rounded-full text-base font-bold"
          >
            Tienda Oficial
          </Link>
        </div>
      </div>

    </section>
  );
}
