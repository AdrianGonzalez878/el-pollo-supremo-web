"use client";

import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

const socialLinks = [
  {
    href: "https://www.facebook.com/ElPolloSumpremoTLAXIACO",
    icon: FaFacebook,
    label: "Facebook",
    color: "text-blue-400 hover:bg-blue-500/10",
  },
  {
    href: "https://www.youtube.com/@pollosupremotlaxiaco",
    icon: FaYoutube,
    label: "YouTube",
    color: "text-red-400 hover:bg-red-500/10",
  },
  {
    href: "https://www.instagram.com/el_pollo_supremo_/",
    icon: FaInstagram,
    label: "Instagram",
    color: "text-pink-400 hover:bg-pink-500/10",
  },
  {
    href: "https://www.tiktok.com/@el.pollo.supremo",
    icon: FaTiktok,
    label: "TikTok",
    color: "text-white hover:bg-white/10",
  },
];

const inputClass =
  "w-full bg-negro-el-pollo text-white placeholder-gray-600 p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-dorado-el-pollo focus:border-transparent transition-all";

export default function ContactPage() {
  return (
    <div className="bg-negro-el-pollo py-16 min-h-screen">
      <div className="container mx-auto px-6">

        {/* Header */}
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <h1 className="section-heading section-heading--center text-4xl md:text-5xl font-extrabold text-dorado-el-pollo">
              Contacto
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mt-5 leading-relaxed">
              ¿Interesado en una transmisión para tu torneo? ¿Quieres ser patrocinador? ¡Contáctanos!
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto space-y-6">

          {/* Direct contact + Social */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimateOnScroll direction="left" delay={0.1}>
              <div className="bg-card-dark rounded-2xl border border-gray-800 p-8 h-full">
                <h2 className="text-xl font-bold text-white mb-6 section-heading">Información Directa</h2>
                <div className="flex flex-col gap-4">
                  <a
                    href="tel:+529531092560"
                    className="flex items-center gap-3 text-gray-300 hover:text-dorado-el-pollo transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-dorado-el-pollo/10 group-hover:bg-dorado-el-pollo/20 transition-colors">
                      <MdPhone className="w-5 h-5 text-dorado-el-pollo" aria-hidden="true" />
                    </span>
                    <span className="font-medium">+52 953 109 2560</span>
                  </a>
                  <a
                    href="mailto:ojeda.martinez09@gmail.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-dorado-el-pollo transition-colors group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-dorado-el-pollo/10 group-hover:bg-dorado-el-pollo/20 transition-colors">
                      <MdEmail className="w-5 h-5 text-dorado-el-pollo" aria-hidden="true" />
                    </span>
                    <span className="font-medium break-all">ojeda.martinez09@gmail.com</span>
                  </a>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right" delay={0.1}>
              <div className="bg-card-dark rounded-2xl border border-gray-800 p-8 h-full">
                <h2 className="text-xl font-bold text-white mb-6 section-heading">Síguenos en Redes</h2>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(({ href, icon: Icon, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-700 ${color} transition-all`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span className="text-sm font-medium text-white">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Contact form */}
          <AnimateOnScroll delay={0.2}>
            <div className="bg-card-dark rounded-2xl border border-gray-800 p-8">
              <h2 className="text-xl font-bold text-white mb-8 section-heading">Envíanos un Mensaje</h2>
              <form
                action="https://formspree.io/f/YOUR_UNIQUE_ID"
                method="POST"
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Tu nombre completo"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="tu@correo.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Asunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="¿En qué podemos ayudarte?"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="btn-gold py-3 px-10 rounded-full text-base font-bold shadow-lg shadow-dorado-el-pollo/20"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </form>
            </div>
          </AnimateOnScroll>

        </div>
      </div>
    </div>
  );
}
