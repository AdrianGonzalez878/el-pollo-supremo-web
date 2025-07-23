"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/calendario", label: "Calendario" },
    { href: "/videoteca", label: "Videoteca" },
    { href: "/tienda", label: "Tienda Oficial" },
    { href: "/patrocinadores", label: "Patrocinadores" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <header 
        className={`bg-negro-el-pollo/80 backdrop-blur-sm shadow-md w-full fixed top-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo de El Pollo Supremo"
              width={150}
              height={40}
              priority
              className="w-28 md:w-32 h-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link font-semibold">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Animated Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white z-50 focus:outline-none w-7 h-7 flex flex-col justify-center items-center"
              aria-label="Abrir menú"
            >
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white my-1 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </nav>
      </header>
      
      {/* Full-screen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-negro-el-pollo transition-opacity duration-300 ease-in-out md:hidden
                   ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                // --- CORRECTED CLASS HERE ---
                // We use our reliable '.nav-link' class from globals.css
                className="text-3xl font-bold nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}