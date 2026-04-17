// app/(site)/page.tsx
import { Hero } from "@/components/Hero";
import { UpcomingGames } from "@/components/UpcomingGames";
import { FeaturedVideos } from "@/components/FeaturedVideos";
import { Sponsors } from "@/components/Sponsors";
import { FeaturedTournament } from "@/components/FeaturedTournament";
import { StatsSection } from "@/components/StatsSection";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { fetchHomepageImages } from "@/lib/sanity/loaders";

/** Fallback if the Sanity revalidate webhook is not configured or fails (~2 min). */
export const revalidate = 120;

export default async function HomePage() {
  const { heroImageUrl, flyerImageUrl } = await fetchHomepageImages();

  return (
    <>
      <AnimateOnScroll>
        <Hero imageUrl={heroImageUrl} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <StatsSection />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FeaturedTournament imageUrl={flyerImageUrl} />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <UpcomingGames />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FeaturedVideos />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Sponsors />
      </AnimateOnScroll>
    </>
  );
}
