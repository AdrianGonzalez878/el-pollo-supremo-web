"use client";

import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from 'next/image';

interface Props {
  imageUrl?: string | null;
}

export function FeaturedTournament({ imageUrl }: Props) {
  const [open, setOpen] = useState(false);

  if (!imageUrl) {
    return null;
  }

  return (
    <>
      <section className="bg-card-dark py-12">
        <div className="container mx-auto px-6">
          {/* Using the custom CSS classes for the hover effect */}
          <div className="text-center mb-10 title-container">
            <h2 className="text-3xl md:text-4xl font-bold text-white title">
              Próximo Gran Torneo
            </h2>
            <p className="text-white mt-2 subtitle">
              ¡Haz clic en la imagen para ver los detalles!
            </p>
          </div>

          <div 
            onClick={() => setOpen(true)}
            className="w-full max-w-4xl mx-auto block group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
          >
            <Image
              src={imageUrl}
              alt="Flyer del próximo torneo de básquetbol"
              width={1080}
              height={1350}
              className="w-full h-auto rounded-lg shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-dorado-el-pollo/20"
            />
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: imageUrl }]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
      />
    </>
  );
}