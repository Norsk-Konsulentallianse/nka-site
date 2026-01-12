// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { FormalSection } from "@/components/sections/FormalSection";
import { MedlemskapSection } from "@/components/sections/MedlemskapSection";
import { MedlemmerSection } from "@/components/sections/MedlemmerSection";
import { PresseSection } from "@/components/sections/PresseSection";
import { MedlemsfordelerSection } from "@/components/sections/MedlemsfordelerSection";
import { DokumenterSection } from "@/components/sections/DokumenterSection";
import { OrganisasjonSection } from "@/components/sections/OrganisasjonSection";
import { KontaktSection } from "@/components/sections/KontaktSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FormalSection />
      <MedlemskapSection />
      <MedlemmerSection />
      <PresseSection />
      <MedlemsfordelerSection />
      <DokumenterSection />
      <OrganisasjonSection />
      <KontaktSection />
    </main>
  );
}
