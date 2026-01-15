import { Section } from "@/components/ui/section";
import { MembersCarousel } from "@/components/MembersCarousel";
import type { Member } from "@/lib/data";

interface MedlemmerSectionProps {
  members: Member[];
}

export function MedlemmerSection({ members }: MedlemmerSectionProps) {
  return (
    <Section id="medlemmer" theme="white" className="overflow-hidden">
      <h2 className="text-3xl font-bold">Medlemmer.</h2>
      <p className="mt-2 text-gray-600">
        Offentlig oversikt – synkronisert via innmeldingssystemet.
      </p>
      <div className="mt-8">
        {members.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Ingen medlemmer publisert enda.
          </p>
        ) : (
          <MembersCarousel members={members} />
        )}
      </div>
    </Section>
  );
}
