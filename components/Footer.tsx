import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

const sectionTitle =
  "text-xs font-bold tracking-[0.18em] text-dorado-el-pollo uppercase mb-4";

const footerLink =
  "text-gray-400 hover:text-dorado-el-pollo transition-colors text-sm inline-flex items-center gap-1";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-dorado-el-pollo/20 bg-gradient-to-b from-negro-el-pollo via-[#0a0a0a] to-black">
      <div className="container mx-auto px-6 py-14 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="mb-4 inline-block rounded-lg ring-1 ring-transparent hover:ring-dorado-el-pollo/30 transition-[box-shadow]">
              <Image
                src="/logo.png"
                alt="Logo de El Pollo Supremo"
                width={150}
                height={40}
                className="w-36 h-auto"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Un proyecto de la comunidad para la comunidad de básquetbol de Oaxaca.
            </p>
          </div>

          <div>
            <h3 className={sectionTitle}>Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calendario" className={footerLink}>
                  Calendario
                </Link>
              </li>
              <li>
                <Link href="/videoteca" className={footerLink}>
                  Videoteca
                </Link>
              </li>
              <li>
                <Link href="/tienda" className={footerLink}>
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={sectionTitle}>Más</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/patrocinadores" className={footerLink}>
                  Patrocinadores
                </Link>
              </li>
              <li>
                <Link href="/contacto" className={footerLink}>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className={sectionTitle}>Redes sociales</h3>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <a
                href="https://www.facebook.com/ElPolloSumpremoTLAXIACO?mibextid=wwXIfr&rdid=Czg3iVU9raN3lte5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AvNYMnNvQ%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full p-2.5 bg-white/5 text-blue-500 hover:bg-white/10 hover:scale-105 transition-all"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@pollosupremotlaxiaco"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-full p-2.5 bg-white/5 text-red-500 hover:bg-white/10 hover:scale-105 transition-all"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/el_pollo_supremo_/?fbclid=IwY2xjawLfwudleHRuA2FlbQIxMABicmlkETFNcjhTWFVzUnR0d1d3eTJJAR4bZ_j1WerC4c2nLxwr410NMt7O0elJ0V4jK4K0WexCNKbCaiuRODgS__G9dg_aem_DPhhaQWQ9IO3s0E_5LA4Gw#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full p-2.5 bg-white/5 text-pink-500 hover:bg-white/10 hover:scale-105 transition-all"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@el.pollo.supremo?fbclid=IwY2xjawLfwihleHRuA2FlbQIxMABicmlkETFzOXZpMUhLQ3JxSnZXc1B2AR6PCALDdEMY7A47VvCLClhc1AZM08PheBNV619hvL9RE6GeKHmGEsAJAn6JnQ_aem_goqynyFfxxaUz74frvh0qA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="rounded-full p-2.5 bg-white/5 text-white hover:bg-white/10 hover:scale-105 transition-all"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-6 text-center sm:text-left text-sm text-gray-400">
            <p className="shrink-0">
              &copy; {currentYear} El Pollo Supremo. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 shrink-0">
              Desarrollado por{" "}
              <a
                href="https://adriangonzdev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dorado-el-pollo transition-colors font-medium underline underline-offset-4 decoration-dorado-el-pollo/25 hover:decoration-dorado-el-pollo/60"
              >
                adriangonzdev.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
