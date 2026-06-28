// app/tienda/page.tsx
import { ProductCard } from "@/components/ProductCard";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";

const sampleProducts = [
  {
    id: "1",
    handle: "gorra-oficial",
    title: "Gorra Oficial El Pollo Supremo",
    price: "600.00",
    imageUrl: "/tienda-gorra.png",
    sizes: ["Unitalla"],
  },
  {
    id: "2",
    handle: "playera-edicion-torneo",
    title: "Playera Edición Torneo",
    price: "250.00",
    imageUrl: "/tienda-playera.png",
    sizes: ["CH", "M", "G", "XG"],
  },
  {
    id: "3",
    handle: "Jersey",
    title: "Jersey",
    price: "400.00",
    imageUrl: "/tienda-jersey.png",
    sizes: ["Oficial No. 7"],
  },
  {
    id: "4",
    handle: "sudadera-con-logo",
    title: "Sudadera del Pollo Supremo",
    price: "800.00",
    imageUrl: "/tienda-sudadera.png",
    sizes: ["CH", "M", "G"],
  },
];

export default function TiendaPage() {
  return (
    <div className="bg-negro-el-pollo text-white min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <AnimateOnScroll>
          <div className="text-center mb-14">
            <h1 className="section-heading section-heading--center text-4xl md:text-5xl font-extrabold text-dorado-el-pollo">
              Tienda Oficial
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Lleva el orgullo del básquetbol oaxaqueño a todas partes.
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {sampleProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </div>
  );
}
