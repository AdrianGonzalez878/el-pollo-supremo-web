import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-negro-el-pollo mt-16 border-t border-dorado-el-pollo/10">
      <div className="container mx-auto px-6 py-12">
        
        {/* Sección principal de 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="mb-4">
              <Image
                src="/logo.png" // Asegúrate que la ruta a tu logo sea correcta
                alt="Logo de El Pollo Supremo"
                width={150}
                height={40}
                className="w-36 h-auto"
              />
            </Link>
            {/* Usamos el texto que ya tenías */}
            <p className="text-sm text-gray-400">
              Un proyecto de la comunidad para la comunidad de básquetbol de Oaxaca.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="font-bold text-white mb-4">Navegación</h3>
            <ul className="space-y-2">
              <li><Link href="/calendario" className="text-gray-400 hover:text-dorado-el-pollo transition-colors">Calendario</Link></li>
              <li><Link href="/videoteca" className="text-gray-400 hover:text-dorado-el-pollo transition-colors">Videoteca</Link></li>
              <li><Link href="/tienda" className="text-gray-400 hover:text-dorado-el-pollo transition-colors">Tienda</Link></li>
            </ul>
          </div>

          {/* Columna 3: Más Enlaces */}
          <div>
            <h3 className="font-bold text-white mb-4">Más</h3>
            <ul className="space-y-2">
              <li><Link href="/patrocinadores" className="text-gray-400 hover:text-dorado-el-pollo transition-colors">Patrocinadores</Link></li>
              <li><Link href="/contacto" className="text-gray-400 hover:text-dorado-el-pollo transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 4: Redes Sociales (con tus enlaces y colores) */}
          <div>
            <h3 className="font-bold text-white mb-4">Redes Sociales</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://www.facebook.com/ElPolloSumpremoTLAXIACO?mibextid=wwXIfr&rdid=Czg3iVU9raN3lte5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AvNYMnNvQ%2F%3Fmibextid%3DwwXIfr#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-transform hover:scale-110">
                <FaFacebook className="w-6 h-6 text-blue-600" />
              </a>
              <a href="https://www.youtube.com/@pollosupremotlaxiaco" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="transition-transform hover:scale-110">
                <FaYoutube className="w-6 h-6 text-red-600" />
              </a>
              <a href="https://www.instagram.com/el_pollo_supremo_/?fbclid=IwY2xjawLfwudleHRuA2FlbQIxMABicmlkETFNcjhTWFVzUnR0d1d3eTJJAR4bZ_j1WerC4c2nLxwr410NMt7O0elJ0V4jK4K0WexCNKbCaiuRODgS__G9dg_aem_DPhhaQWQ9IO3s0E_5LA4Gw#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform hover:scale-110">
                <FaInstagram className="w-6 h-6 text-pink-600" />
              </a>
              <a href="https://www.tiktok.com/@el.pollo.supremo?fbclid=IwY2xjawLfwihleHRuA2FlbQIxMABicmlkETFzOXZpMUhLQ3JxSnZXc1B2AR6PCALDdEMY7A47VvCLClhc1AZM08PheBNV619hvL9RE6GeKHmGEsAJAn6JnQ_aem_goqynyFfxxaUz74frvh0qA" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-transform hover:scale-110">
                {/* Cambiado a blanco para que sea visible en fondo negro */}
                <FaTiktok className="w-6 h-6 text-white" /> 
              </a>
            </div>
          </div>
        </div>

        {/* Barra de copyright inferior (con tus clases para el hover) */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm footer-container">
          <p className="footer-text cursor-pointer">
            &copy; {currentYear} El Pollo Supremo. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}