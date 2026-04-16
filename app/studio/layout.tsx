import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS | El Pollo Supremo",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
