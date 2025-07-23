// app/page.tsx
import { Hero } from '@/components/Hero';
import { UpcomingGames } from '@/components/UpcomingGames';
import { FeaturedVideos } from '@/components/FeaturedVideos';
import { Sponsors } from '@/components/Sponsors';
import { FeaturedTournament } from '@/components/FeaturedTournament';
import { StatsSection } from '@/components/StatsSection';
import { AnimateOnScroll } from '@/components/AnimateOnScroll'; // 1. Importamos el componente de animación

const STRAPI_URL = 'http://localhost:1337';

async function getHomepageData() {
  try {
    const endpoint = `${STRAPI_URL}/api/homepage`;
    const params = '?populate[0]=hero_image&populate[1]=flyer_torneo';
    const res = await fetch(endpoint + params);
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

export default async function HomePage() {
  const homepageData = await getHomepageData();

  const heroImageUrl = homepageData?.data?.hero_image?.url
    ? `${STRAPI_URL}${homepageData.data.hero_image.url}`
    : '/placeholder-basketball.jpg';

  const flyerImageUrl = homepageData?.data?.flyer_torneo?.url
    ? `${STRAPI_URL}${homepageData.data.flyer_torneo.url}`
    : null;

  return (
    <>
    {/* 2. Envolvemos cada sección con AnimateOnScroll */}
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