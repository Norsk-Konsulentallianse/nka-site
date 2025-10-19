// src/app/vedtekter/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vedtekter – Norsk Konsulentallianse",
  description:
    "Vedtekter vedtatt ved stiftelse 9. september 2025. Ideell, non-profit bransjeorganisasjon for IT-konsulentvirksomheter.",
};

export default function VedtekterPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Vedtekter for Norsk Konsulentallianse</h1>
      <p className="mt-2 text-sm text-gray-600">Vedtatt ved stiftelse 9. september 2025.</p>

      <section className="prose prose-gray mt-8">
        <h2>§1 Navn</h2>
        <p>
          Organisasjonens navn er <strong>Norsk Konsulentallianse</strong> ("Alliansen").
        </p>

        <h2>§2 Organisasjonsform</h2>
        <p>
          Alliansen er en <strong>ideell, non-profit bransjeorganisasjon</strong>. Den har ikke økonomisk fortjeneste som
          formål. Eventuelle overskudd skal tilbakeføres til virksomheten og formålet.
        </p>

        <h2>§3 Formål</h2>
        <p>
          Alliansen skal være en felles bransjeorganisasjon for virksomheter som har sitt hovedvirke knyttet til
          konsulentvirksomhet innen informasjonsteknologi, digitalisering og tilhørende forretnings- og
          organisasjonsutvikling. Formålet er å:
        </p>
        <ol>
          <li>Fremme medlemmenes interesser som seriøse aktører innen digitalisering, innovasjon og omstilling.</li>
          <li>Arbeide for gode rammevilkår for konsulentbransjen, ansatte og kunder.</li>
          <li>Skape møteplasser for erfaringsutveksling, kunnskapsdeling og samarbeid.</li>
          <li>Drive informasjon, rådgivning og påvirkning overfor beslutningstakere, myndigheter og offentligheten.</li>
          <li>Bidra til et bærekraftig og inkluderende arbeidsliv, med gode forhold for ansatte i konsulentbransjen.</li>
        </ol>

        <h2>§4 Medlemskap</h2>
        <ul>
          <li>
            Medlemskap er åpent for virksomheter som har sitt hovedvirke innen konsulent- og rådgivningstjenester
            knyttet til digitalisering, informasjonsteknologi og tilhørende forretnings- og organisasjonsutvikling, samt
            virksomheter som tilrettelegger for slike tjenester.
          </li>
          <li>Medlemskapet er gyldig når kontingent er betalt.</li>
          <li>Styret kan avslå medlemskap dersom søker åpenbart bryter med Alliansens formål.</li>
          <li>
            Et medlemskap kan opphøre dersom medlemmet opptrer i strid med Alliansens formål eller på en måte som kan
            skade Alliansens omdømme. Vedtak om eksklusjon treffes av styret med 2/3 flertall. Medlemmet skal gis
            anledning til å uttale seg før vedtak fattes.
          </li>
          <li>Utmelding skjer skriftlig. Kontingent refunderes ikke.</li>
        </ul>

        <h2>§5 Kontingent</h2>
        <p>Medlemmene betaler en årlig medlemskontingent fastsatt av årsmøtet.</p>
        <p>
          <strong>Oppstartsåret 2025:</strong> kontingenten er fastsatt til <strong>5&nbsp;000 kroner</strong> i
          stiftelsesmøtet, og gjelder frem til første ordinære årsmøte.
        </p>

        <h2>§6 Organisasjon</h2>
        <p>Alliansens organer er:</p>
        <ol>
          <li>Årsmøtet (øverste myndighet)</li>
          <li>Styret</li>
          <li>Eventuelle fag- eller arbeidsutvalg oppnevnt av styret</li>
        </ol>

        <h2>§7 Årsmøtet</h2>
        <ul>
          <li>Avholdes én gang i året innen utgangen av mai.</li>
          <li>Innkalles med minst 4 ukers varsel.</li>
          <li>Hver medlemsbedrift har én stemme.</li>
          <li>Årsmøtet skal behandle: årsberetning, regnskap, kontingent, budsjett, valg av styre og valgkomité, innkomne forslag.</li>
        </ul>

        <h2>§8 Ekstraordinært årsmøte</h2>
        <p>Kan innkalles av styret eller når minst 1/3 av medlemmene krever det.</p>

        <h2>§9 Styret</h2>
        <ul>
          <li>Styret består av minst 3 medlemmer (leder, en eller flere nestledere, styremedlem) valgt av årsmøtet.</li>
          <li>Funksjonstid er 2 år. Gjenvalg er mulig.</li>
          <li>Styret fastsetter hvem av nestledere som fungerer som stedfortreder for leder dersom leder er fraværende.</li>
          <li>Styret kan fastsette ansvarsoppgaver for nestledere.</li>
          <li>Styret leder Alliansens virksomhet i samsvar med vedtektene og årsmøtets vedtak.</li>
        </ul>

        <h2>§10 Regnskap og revisjon</h2>
        <ul>
          <li>Alliansen skal føre regnskap i samsvar med gjeldende lovgivning.</li>
          <li>Revisor kan oppnevnes av årsmøtet dersom påkrevd eller ønskelig.</li>
        </ul>

        <h2>§11 Vedtektsendring</h2>
        <p>Vedtektene kan endres av årsmøtet med 2/3 flertall.</p>

        <h2>§12 Oppløsning</h2>
        <ul>
          <li>Ved oppløsning kreves 2/3 flertall på to påfølgende årsmøter.</li>
          <li>Eventuelle midler skal tilfalle formål i tråd med Alliansens virksomhet, bestemt av årsmøtet.</li>
        </ul>

        <hr />

        <h3>Stiftelsesprotokoll (utdrag)</h3>
        <ul>
          <li>
            <strong>Stiftet:</strong> 9. september 2025 (digitalt)
          </li>
          <li>
            <strong>Styre valgt ved stiftelse:</strong> Leder: Håvard Ellefsen (Coness AS). Nestledere: Steinar Hansen
            (JProfessionals AS) og Ranveig Marisei (Ework Group Norway AS).
          </li>
          <li>
            <strong>Kontingent 2025:</strong> 5&nbsp;000 kroner.
          </li>
        </ul>

        <p className="mt-6 text-sm text-gray-600">
          Har du spørsmål? <Link href="mailto:post@norskkonsulentallianse.no" className="underline">Kontakt oss</Link>.
        </p>
      </section>
    </main>
  );
}
