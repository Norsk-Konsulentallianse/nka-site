import { Section } from "@/components/ui/section";
import { MembersCarousel } from "@/components/MembersCarousel";

export function MedlemmerSection() {
  return (
    <Section id="medlemmer" theme="white" className="overflow-hidden">
      <h2 className="text-3xl font-bold">Medlemmer.</h2>
      <p className="mt-2 text-gray-600">
        Offentlig oversikt – synkronisert via innmeldingssystemet.
      </p>
      <div className="mt-8">
        <MembersCarousel />
      </div>
    </Section>
  );
}
