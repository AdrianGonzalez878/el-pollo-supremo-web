import { FaTrophy, FaPlay, FaGlobe, FaEye } from 'react-icons/fa';

// Updated stats array with your new data
const stats = [
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

export function StatsSection() {
  return (
    <section className="bg-negro-el-pollo py-16">
      <div className="container mx-auto px-6">
        {/* Added 'title-container' for the hover effect */}
        <div className="text-center mb-12 title-container">
          <h2 className="text-3xl md:text-4xl font-bold text-white title">Nuestros Números</h2>
          <p className="text-white mt-2 subtitle">El impacto del básquetbol oaxaqueño</p>
        </div>

        {/* Responsive grid for the stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card-dark p-6 text-center rounded-lg border border-gray-800"
            >
              <div className="text-dorado-el-pollo text-4xl mb-4 inline-block">
                {stat.icon}
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 mt-1 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}