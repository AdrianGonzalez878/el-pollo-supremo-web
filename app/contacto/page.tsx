"use client";

import { FaFacebook, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function ContactPage() {
  return (
    <div className="bg-negro-el-pollo py-16 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        {/* Main title is static gold */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-dorado-el-pollo mb-4">Contacto</h1>
        <p className="text-white max-w-2xl mx-auto mb-10">
          ¿Interesado en una transmisión para tu torneo? ¿Quieres ser patrocinador? ¡Contáctanos!
        </p>

        <div className="max-w-4xl mx-auto bg-card-dark p-8 rounded-lg shadow-2xl">
          
          <div className="mb-8">
            <div className="title-container">
              <h2 className="text-2xl font-bold text-white mb-4 title">Información Directa</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-x-8 gap-y-4">
                {/* Links are now white with gold hover */}
                <a href="tel:+529531092560" className="flex items-center gap-2 text-lg contact-link">
                    <MdPhone />
                    +52 953 109 2560
                </a>
                <a href="mailto:ojeda.martinez09@gmail.com" className="flex items-center gap-2 text-lg contact-link">
                    <MdEmail />
                    ojeda.martinez09@gmail.com
                </a>
            </div>
          </div>

          <hr className="border-gray-700 my-8" />

          <div className="mb-10">
            <div className="title-container">
              <h2 className="text-2xl font-bold text-white mb-4 title">Síguenos en Redes</h2>
            </div>
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/ElPolloSumpremoTLAXIACO" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-blue-600 transition-transform hover:scale-110">
                <FaFacebook className="w-8 h-8" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-red-600 transition-transform hover:scale-110">
                <FaYoutube className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/el_pollo_supremo_/" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-pink-600 transition-transform hover:scale-110">
                <FaInstagram className="w-8 h-8" />
              </a>
              <a href="https://www.tiktok.com/@el.pollo.supremo" target="_blank" rel="noopener noreferrer" title="TikTok" className="text-white transition-transform hover:scale-110">
                <FaTiktok className="w-8 h-8" />
              </a>
            </div>
          </div>
          
          <hr className="border-gray-700 my-8" />

          <div>
            <div className="title-container">
              <h2 className="text-2xl font-bold text-white mb-4 title">Envíanos un Mensaje</h2>
            </div>
            {/* Form updated with new fields */}
            <form action="https://formspree.io/f/YOUR_UNIQUE_ID" method="POST" className="flex flex-col gap-4 text-left">
              <label htmlFor="name" className="text-dorado-el-pollo-claro">Nombre</label>
              <input 
                id="name"
                type="text" 
                name="name" 
                placeholder="Tu nombre completo" 
                required 
                className="bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-dorado-el-pollo" 
              />

              <label htmlFor="email" className="text-dorado-el-pollo-claro">Correo Electrónico</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                placeholder="Tu correo electrónico" 
                required 
                className="bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-dorado-el-pollo" 
              />

              <label htmlFor="subject" className="text-dorado-el-pollo-claro">Asunto</label>
              <input 
                id="subject"
                type="text" 
                name="subject" 
                placeholder="Asunto del mensaje" 
                className="bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-dorado-el-pollo" 
              />

              <label htmlFor="message" className="text-dorado-el-pollo-claro">Mensaje</label>
              <textarea 
                id="message"
                name="message" 
                rows={5} 
                placeholder="Escribe tu mensaje aquí..." 
                required 
                className="bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-dorado-el-pollo"
              ></textarea>
              <button type="submit" className="main-button font-bold py-3 px-8 rounded-full text-lg self-center mt-4">
                Enviar Mensaje
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}