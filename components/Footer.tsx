import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

const navLinks = [
  { href: "/calendario", label: "Calendario" },
  { href: "/videoteca", label: "Videoteca" },
  { href: "/tienda", label: "Tienda" },
  { href: "/patrocinadores", label: "Patrocinadores" },
  { href: "/contacto", label: "Contacto" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/ElPolloSumpremoTLAXIACO",
    icon: FaFacebook,
    label: "Facebook",
    color: "text-blue-400",
  },
  {
    href: "https://www.youtube.com/@pollosupremotlaxiaco",
    icon: FaYoutube,
    label: "YouTube",
    color: "text-red-400",
  },
  {
    href: "https://www.instagram.com/el_pollo_supremo_/",
    icon: FaInstagram,
    label: "Instagram",
    color: "text-pink-400",
  },
  {
    href: "https://www.tiktok.com/@el.pollo.supremo",
    icon: FaTiktok,
    label: "TikTok",
    color: "text-white",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-dorado-el-pollo/20 bg-gradient-to-b from-negro-el-pollo via-[#0a0a0a] to-black">
      <div className="container mx-auto px-6 py-12 max-w-6xl">

        {/* Main grid: 3 zones */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-8 items-start">

          {/* Zone 1 — Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="mb-4 inline-block rounded-lg ring-1 ring-transparent hover:ring-dorado-el-pollo/30 transition-[box-shadow]"
            >
              <Image
                src="/logo.png"
                alt="Logo de El Pollo Supremo"
                width={150}
                height={40}
                className="w-32 h-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              La casa oficial del básquetbol oaxaqueño. Transmisiones, torneos y la comunidad que lo hace grande.
            </p>
          </div>

          {/* Zone 2 — Navigation (centered) */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs font-bold tracking-[0.18em] text-dorado-el-pollo uppercase mb-5">
              Páginas
            </h3>
            {/* 2-column grid on mobile, single column on md */}
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-10 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-dorado-el-pollo transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone 3 — Social */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-xs font-bold tracking-[0.18em] text-dorado-el-pollo uppercase mb-5">
              Síguenos
            </h3>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all group"
                >
                  <Icon className={`w-4 h-4 ${color}`} aria-hidden="true" />
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>
            &copy; {currentYear} El Pollo Supremo. Todos los derechos reservados.
          </p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://argaweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-dorado-el-pollo transition-colors font-medium underline underline-offset-4 decoration-dorado-el-pollo/25 hover:decoration-dorado-el-pollo/60"
            >
              argaweb.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
