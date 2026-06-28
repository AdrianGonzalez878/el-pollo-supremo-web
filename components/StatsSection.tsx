"use client";

import { useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";
import { FaTrophy, FaPlay, FaGlobe, FaEye } from "react-icons/fa";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <FaEye />,
    value: "34M+",
    label: "De Vistas en Facebook",
  },
  {
    icon: <FaTrophy />,
    value: "50+",
    label: "Torneos Transmitidos",
  },
  {
    icon: <FaPlay />,
    value: "500+",
    label: "Horas en Transmisión",
  },
  {
    icon: <FaGlobe />,
    value: "Único",
    label: "Oaxaqueño en Narrar Fuera del Estado",
  },
];

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Parse "34M+", "50+", "500+" → { number: 34, suffix: "M+" }
  const match = value.match(/^(\d+)(.*)$/);

  useEffect(() => {
    // No animation if: not in view, not a number, reduced motion, or ref not ready
    if (!inView || !match || !ref.current || prefersReducedMotion) return;

    const el = ref.current;
    const target = parseInt(match[1]);
    const suffix = match[2];

    let controls: { stop: () => void } | undefined;

    try {
      controls = animate(0, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          // Guard: element may have unmounted between frames (Safari)
          if (el.isConnected) {
            el.textContent = Math.round(latest) + suffix;
          }
        },
        onComplete() {
          // Ensure final value is always exact
          if (el.isConnected) {
            el.textContent = target + suffix;
          }
        },
      });
    } catch {
      // Fallback: just show the final value immediately
      if (el.isConnected) {
        el.textContent = value;
      }
    }

    return () => controls?.stop();
  }, [inView, match, prefersReducedMotion, value]);

  // Pure text (no leading number) — no animation
  if (!match) return <span ref={ref}>{value}</span>;

  // Start at "0 + suffix" while waiting for inView
  return <span ref={ref}>0{match[2]}</span>;
}

export function StatsSection() {
  return (
    <section className="bg-negro-el-pollo py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="section-heading section-heading--center text-3xl md:text-4xl font-bold text-white">
            Nuestros Números
          </h2>
          <p className="text-gray-400 mt-4 text-sm">El impacto del básquetbol oaxaqueño</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card-dark p-4 sm:p-6 text-center rounded-xl border border-gray-800 card-glow group"
            >
              <div
                className="text-dorado-el-pollo text-3xl mb-3 inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-dorado-el-pollo/10 group-hover:bg-dorado-el-pollo/20 transition-colors"
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                <CountUp value={stat.value} />
              </p>
              <p className="text-gray-400 mt-1.5 text-xs sm:text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
