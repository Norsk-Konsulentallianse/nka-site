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
import { getMembers, getPressItems } from "@/lib/data";

// Revalidate page every 5 minutes
export const revalidate = 300;

export default async function HomePage() {
  // Fetch data server-side in parallel
  const [members, pressItems] = await Promise.all([
    getMembers(),
    getPressItems(),
  ]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FormalSection />
      <MedlemskapSection />
      <MedlemmerSection members={members} />
      <PresseSection items={pressItems} />
      <MedlemsfordelerSection />
      <DokumenterSection />
      <OrganisasjonSection />
      <KontaktSection />
    </main>
  );
}
