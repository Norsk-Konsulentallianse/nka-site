// src/app/page.tsx
import Link from "next/link";
import dynamic from "next/dynamic";

const MembersList = dynamic(() => import("@/components/MembersList"), { ssr: false });

export default function HomePage() {
  // Konfigurerbar påmeldingslenke (sett i Vercel: NEXT_PUBLIC_SIGNUP_URL)
  const signupUrl =
    process.env.NEXT_PUBLIC_SIGNUP_URL ??
    "mailto:post@norskkonsulentallianse.no?subject=Medlemskap%20Norsk%20Konsulentallianse";

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
            Stiftet 9. september 2025
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Norsk Konsulentallianse
          </h1>
          <p className="mt-3 text-lg text-gray-800">
            Norsk Konsulentallianse er en <strong>ideell, non-profit bransjeorganisasjon</strong> for virksomheter
            innen konsulent- og rådgivningstjenester knyttet til digitalisering, informasjonsteknologi og
            tilhørende forretnings- og organisasjonsutvikling.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={signupUrl}
              className="rounded-lg border border-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white"
            >
              Meld deg inn
            </a>
            <Link href="/vedtekter" className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
              Vedtekter
            </Link>
          </div>
        </div>
      </section>

      {/* FORMÅL – vedtekter §3 */}
      <section id="om-oss" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Formål</h2>
          <p className="mt-3 text-gray-800">
            Alliansen skal være en felles bransjeorganisasjon for virksomheter som har sitt hovedvirke knyttet til
            konsulentvirksomhet innen informasjonsteknologi, digitalisering og tilhørende forretnings- og
            organisasjonsutvikling.
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-800 space-y-2">
            <li>Fremme medlemmenes interesser som seriøse aktører innen digitalisering, innovasjon og omstilling</li>
            <li>Arbeide for gode rammevilkår for konsulentbransjen, ansatte og kunder</li>
            <li>Skape møteplasser for erfaringsutveksling, kunnskapsdeling og samarbeid</li>
            <li>Drive informasjon, rådgivning og påvirkning overfor beslutningstakere, myndigheter og offentligheten</li>
            <li>Bidra til et bærekraftig og inkluderende arbeidsliv</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">Jf. vedtektene §3.</p>
        </div>
      </section>

      {/* MEDLEMSKAP – vedtekter §4–5 */}
      <section id="medlemskap" className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Medlemskap</h2>
          <div className="mt-3 space-y-3 text-gray-800">
            <p>
              Medlemskap er åpent for virksomheter som har sitt hovedvirke innen konsulent- og rådgivningstjenester
              knyttet til digitalisering, informasjonsteknologi og tilhørende forretnings- og organisasjonsutvikling,
              samt virksomheter som tilrettelegger for slike tjenester. Medlemskapet er gyldig når kontingenten er
              betalt. Styret kan avslå medlemskap dersom søker åpenbart bryter med Alliansens formål.
            </p>
            <p>
              Årsmøtet fastsetter kontingenten årlig. <strong>For oppstartsåret 2025 er kontingenten satt til 5&nbsp;000 kroner</strong>,
              vedtatt i stiftelsesmøtet 9. september 2025. Kontingenten gjelder frem til første ordinære årsmøte.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="border px-3 py-2 text-left">Kategori</th>
                  <th className="border px-3 py-2 text-left">Kontingent 2025</th>
                  <th className="border px-3 py-2 text-left">Merknad</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="border px-3 py-2">Alle virksomheter</td>
                  <td className="border px-3 py-2">5&nbsp;000 NOK</td>
                  <td className="border px-3 py-2">Fastsettes av årsmøtet for kommende år</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <a
              href={signupUrl}
              className="rounded-lg border border-gray-900 px-4 py-2 text-sm font-semibold hover:bg-gray-900 hover:text-white"
            >
              Meld deg inn
            </a>
            <span className="ml-3 text-xs text-gray-600">
              {process.env.NEXT_PUBLIC_SIGNUP_URL
                ? "Åpner påmeldingsskjema."
                : "Midlertidig mailto-lenke – sett NEXT_PUBLIC_SIGNUP_URL for skjema."}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray-600">Jf. vedtektene §4–5.</p>
        </div>
      </section>

      {/* MEDLEMSLISTE – klientkomponent (henter /api/members eller publisert CSV) */}
      <section id="medlemmer" className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Medlemmer</h2>
          <p className="mt-2 text-sm text-gray-600">Offentlig oversikt – synkronisert fra Google Sheets.</p>
          <div className="mt-4">
            <MembersList />
          </div>
        </div>
      </section>

      {/* ORGANISASJON – vedtekter §6–9 */}
      <section id="organisasjon" className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Organisasjon</h2>
          <div className="mt-3 text-gray-800 space-y-3">
            <p>
              Alliansens organer er: (1) Årsmøtet – øverste myndighet, (2) Styret, og (3) eventuelle fag- eller
              arbeidsutvalg oppnevnt av styret. Årsmøtet avholdes én gang i året innen utgangen av mai, og innkalles
              med minst 4 ukers varsel. Hver medlemsbedrift har én stemme.
            </p>
            <p>
              Årsmøtet behandler årsberetning, regnskap, fastsettelse av kontingent, budsjett, valg av styre og
              valgkomité, samt innkomne forslag. Styret leder Alliansens virksomhet i samsvar med vedtektene og
              årsmøtets vedtak.
            </p>
            <p className="text-sm text-gray-600">Jf. vedtektene §6–9.</p>
          </div>

          <div className="mt-6 rounded-lg border p-4">
            <h3 className="font-semibold">Styre valgt ved stiftelse</h3>
            <ul className="mt-2 list-disc pl-6 text-gray-800 space-y-1">
              <li>
                <strong>Leder:</strong> Håvard Ellefsen (Coness AS)
              </li>
              <li>
                <strong>Nestleder:</strong> Steinar Hansen (JProfessionals AS)
              </li>
              <li>
                <strong>Nestleder:</strong> Ranveig Marisei (Ework Group Norway AS)
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Vedtatt i stiftelsesmøtet 9. september 2025. Ekstraordinært årsmøte kan innkalles av styret eller når
              minst 1/3 av medlemmene krever det.
            </p>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p className="mt-3 text-gray-800">Spørsmål om medlemskap eller samarbeid?</p>
          <a href="mailto:post@norskkonsulentallianse.no" className="mt-2 inline-block text-blue-700 hover:underline">
            post@norskkonsulentallianse.no
          </a>
          <p className="mt-6 text-sm text-gray-600">
            <Link href="/vedtekter" className="underline">
              Les vedtektene
            </Link>{" "}
            for informasjon om regnskap/revisjon, vedtektsendringer og oppløsning.
          </p>
        </div>
      </section>
    </main>
  );
}
