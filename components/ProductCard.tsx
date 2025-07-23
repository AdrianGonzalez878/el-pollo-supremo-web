// components/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa'; // Importamos el ícono de WhatsApp

export interface Product {
  id: string;
  handle: string;
  title: string;
  price: string;
  imageUrl: string;
  sizes: string[];
}

export function ProductCard({ product }: { product: Product }) {
  // 1. Preparamos el mensaje para WhatsApp
  const message = `Hola, me interesa el producto: "${product.title}". ¿Podrían darme más información sobre las tallas y cómo comprar?`;
  // Codificamos el mensaje para que funcione en una URL
  const encodedMessage = encodeURIComponent(message);
  
  // 2. Construimos la URL de WhatsApp
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="bg-card-dark rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {/* La imagen y el título siguen siendo un enlace a una futura página de detalle */}
      <Link 
        href={`/producto/${product.handle}`} 
        className="block group"
      >
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/producto/${product.handle}`} className="group">
          <h3 className="text-lg font-bold text-white group-hover:text-dorado-el-pollo transition-colors">{product.title}</h3>
        </Link>
        <p className="mt-1 font-semibold text-dorado-el-pollo-claro">{`$${product.price} MXN`}</p>

        <div className="mt-4">
          <span className="text-xs font-semibold text-gray-400">TALLAS DISPONIBLES</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size) => (
              <span key={size} className="text-sm border border-gray-600 rounded-md px-2 py-1">
                {size}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex-grow"></div> 

        {/* 3. Reemplazamos el botón anterior por el de WhatsApp */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded-md text-md transition-transform hover:scale-105"
        >
          <FaWhatsapp className="w-5 h-5" />
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  );
}