import {
  Hero,
  MarqueeStrip,
  CategoryRail,
  FitRail,
  DropFeature,
  Bestsellers,
  EditorialBanner,
  Transparency,
  Community,
  LookbookTeaser,
  JournalTeaser,
  StoreStrip,
  NewsletterBlock,
} from "@/components/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <CategoryRail />
      <FitRail />
      <DropFeature />
      <Bestsellers />
      <EditorialBanner />
      <Transparency />
      <Community />
      <LookbookTeaser />
      <JournalTeaser />
      <StoreStrip />
      <NewsletterBlock />
    </>
  );
}
