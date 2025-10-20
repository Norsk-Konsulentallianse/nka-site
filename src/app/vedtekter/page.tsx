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
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vedtekter for Norsk Konsulentallianse</h1>
        <p className="mt-2 text-sm text-gray-600">Vedtatt ved stiftelse 9. september 2025.</p>
      </header>

      {/* Layout: TOC + innhold */}
      <div className="grid gap-8 md:grid-cols-12">
        {/* TOC – sticky på desktop */}
        <aside className="md:col-span-4 lg:col-span-3 md:block">
          <nav
            aria-label="Innhold"
            className="rounded-lg border bg-white/70 p-4 md:sticky md:top-24 md:max-h-[70vh] md:overflow-auto"
          >
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">Innhold</h2>
            <ol className="space-y-1 text-sm leading-6">
              <li><a className="hover:underline" href="#s1">§1 Navn</a></li>
              <li><a className="hover:underline" href="#s2">§2 Organisasjonsform</a></li>
              <li><a className="hover:underline" href="#s3">§3 Formål</a></li>
              <li><a className="hover:underline" href="#s4">§4 Medlemskap</a></li>
              <li><a className="hover:underline" href="#s5">§5 Kontingent</a></li>
              <li><a className="hover:underline" href="#s6">§6 Organisasjon</a></li>
              <li><a className="hover:underline" href="#s7">§7 Årsmøtet</a></li>
              <li><a className="hover:underline" href="#s8">§8 Ekstraordinært årsmøte</a></li>
              <li><a className="hover:underline" href="#s9">§9 Styret</a></li>
              <li><a className="hover:underline" href="#s10">§10 Regnskap og revisjon</a></li>
              <li><a className="hover:underline" href="#s11">§11 Vedtektsendring</a></li>
              <li><a className="hover:underline" href="#s12">§12 Oppløsning</a></li>
              <li><a className="hover:underline" href="#stift">Stiftelsesprotokoll (utdrag)</a></li>
              <li><a className="hover:underline" href="#kontakt">Kontakt</a></li>
            </ol>
          </nav>
        </aside>

        {/* Innhold */}
        <article className="md:col-span-8 lg:col-span-9">
          {/* Prose: bredere, luftigere linjeavstand og bedre avsnittsmellomrom */}
          <section className="prose prose-gray max-w-none leading-relaxed prose-h2:scroll-mt-28 prose-h3:scroll-mt-28">
            {/* Tips: ‘open’ på første to paragrafene for å gi “åpen” start, resten sammenleggbar */}
            <details id="s1" open className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §1 Navn
              </summary>
              <div className="mt-3">
                <p>
                  Organisasjonens navn er <strong>Norsk Konsulentallianse</strong> (&quot;Alliansen&quot;).
                </p>
              </div>
            </details>

            <details id="s2" open className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §2 Organisasjonsform
              </summary>
              <div className="mt-3">
                <p>
                  Alliansen er en <strong>ideell, non-profit bransjeorganisasjon</strong>. Den har ikke økonomisk fortjeneste som formål.
                  Eventuelle overskudd skal tilbakeføres til virksomheten og formålet.
                </p>
              </div>
            </details>

            <details id="s3" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §3 Formål
              </summary>
              <div className="mt-3">
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
              </div>
            </details>

            <details id="s4" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §4 Medlemskap
              </summary>
              <div className="mt-3">
                <ul className="list-disc pl-5">
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
              </div>
            </details>

            <details id="s5" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §5 Kontingent
              </summary>
              <div className="mt-3">
                <p>Medlemmene betaler en årlig medlemskontingent fastsatt av årsmøtet.</p>
                <p>
                  <strong>Oppstartsåret 2025:</strong> kontingenten er fastsatt til <strong>5&nbsp;000 kroner</strong> i
                  stiftelsesmøtet, og gjelder frem til første ordinære årsmøte.
                </p>
              </div>
            </details>

            <details id="s6" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §6 Organisasjon
              </summary>
              <div className="mt-3">
                <p>Alliansens organer er:</p>
                <ol className="list-decimal pl-5">
                  <li>Årsmøtet (øverste myndighet)</li>
                  <li>Styret</li>
                  <li>Eventuelle fag- eller arbeidsutvalg oppnevnt av styret</li>
                </ol>
              </div>
            </details>

            <details id="s7" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §7 Årsmøtet
              </summary>
              <div className="mt-3">
                <ul className="list-disc pl-5">
                  <li>Avholdes én gang i året innen utgangen av mai.</li>
                  <li>Innkalles med minst 4 ukers varsel.</li>
                  <li>Hver medlemsbedrift har én stemme.</li>
                  <li>
                    Årsmøtet skal behandle: årsberetning, regnskap, kontingent, budsjett, valg av styre og valgkomité, innkomne
                    forslag.
                  </li>
                </ul>
              </div>
            </details>

            <details id="s8" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §8 Ekstraordinært årsmøte
              </summary>
              <div className="mt-3">
                <p>Kan innkalles av styret eller når minst 1/3 av medlemmene krever det.</p>
              </div>
            </details>

            <details id="s9" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §9 Styret
              </summary>
              <div className="mt-3">
                <ul className="list-disc pl-5">
                  <li>Styret består av minst 3 medlemmer (leder, en eller flere nestledere, styremedlem) valgt av årsmøtet.</li>
                  <li>Funksjonstid er 2 år. Gjenvalg er mulig.</li>
                  <li>Styret fastsetter hvem av nestledere som fungerer som stedfortreder for leder dersom leder er fraværende.</li>
                  <li>Styret kan fastsette ansvarsoppgaver for nestledere.</li>
                  <li>Styret leder Alliansens virksomhet i samsvar med vedtektene og årsmøtets vedtak.</li>
                </ul>
              </div>
            </details>

            <details id="s10" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §10 Regnskap og revisjon
              </summary>
              <div className="mt-3">
                <ul className="list-disc pl-5">
                  <li>Alliansen skal føre regnskap i samsvar med gjeldende lovgivning.</li>
                  <li>Revisor kan oppnevnes av årsmøtet dersom påkrevd eller ønskelig.</li>
                </ul>
              </div>
            </details>

            <details id="s11" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §11 Vedtektsendring
              </summary>
              <div className="mt-3">
                <p>Vedtektene kan endres av årsmøtet med 2/3 flertall.</p>
              </div>
            </details>

            <details id="s12" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                §12 Oppløsning
              </summary>
              <div className="mt-3">
                <ul className="list-disc pl-5">
                  <li>Ved oppløsning kreves 2/3 flertall på to påfølgende årsmøter.</li>
                  <li>Eventuelle midler skal tilfalle formål i tråd med Alliansens virksomhet, bestemt av årsmøtet.</li>
                </ul>
              </div>
            </details>

            <hr className="my-6" />

            <details id="stift" className="group rounded-lg border bg-white/70 p-4">
              <summary className="cursor-pointer select-none text-lg font-semibold">
                Stiftelsesprotokoll (utdrag)
              </summary>
              <div className="mt-3">
                <ul className="list-disc pl-5">
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
              </div>
            </details>

            <p id="kontakt" className="mt-6 text-sm text-gray-600">
              Har du spørsmål?{" "}
              <Link href="mailto:post@norskkonsulentallianse.no" className="underline">
                Kontakt oss
              </Link>
              .
            </p>

            <div className="mt-6">
              <a href="#" className="text-xs underline text-gray-600">Til toppen</a>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
