import { Section } from "@/components/ui/section";

export function FormalSection() {
  return (
    <Section id="om-oss" theme="white">
      <h2 className="text-3xl font-bold">Formål.</h2>
      <p className="mt-4 text-lg text-gray-800">
        Alliansen skal være en felles bransjeorganisasjon for virksomheter som
        har sitt hovedvirke knyttet til konsulentvirksomhet innen
        informasjonsteknologi, digitalisering og tilhørende forretnings- og
        organisasjonsutvikling.
      </p>
      <ul className="mt-6 space-y-3 text-gray-800">
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
          <span>
            Fremme medlemmenes interesser som seriøse aktører innen
            digitalisering, innovasjon og omstilling.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
          <span>
            Arbeide for gode rammevilkår for konsulentbransjen, ansatte og
            kunder.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
          <span>
            Skape møteplasser for erfaringsutveksling, kunnskapsdeling og
            samarbeid.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
          <span>
            Drive informasjon, rådgivning og påvirkning overfor
            beslutningstakere, myndigheter og offentligheten.
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
          <span>Bidra til et bærekraftig og inkluderende arbeidsliv.</span>
        </li>
      </ul>
    </Section>
  );
}
