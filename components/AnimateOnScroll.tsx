// components/AnimateOnScroll.tsx
"use client";

import { motion } from 'framer-motion';
import React from 'react';

// Este componente 'envuelve' a otros componentes para animarlos
export function AnimateOnScroll({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Estado inicial: invisible y 20px más abajo
      initial={{ opacity: 0, y: 20 }}
      // Estado final: visible y en su posición original
      whileInView={{ opacity: 1, y: 0 }}
      // Configuración para que la animación se dispare al entrar en la pantalla
      viewport={{ once: true, amount: 0.2 }} // se anima una vez, cuando el 20% es visible
      // Duración y tipo de la transición
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}