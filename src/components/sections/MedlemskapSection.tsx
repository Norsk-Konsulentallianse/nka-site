import Image from "next/image";
import SignupForm from "@/components/SignupForm";

export function MedlemskapSection() {
  return (
    <section id="meld-deg-inn" className="bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-white">Medlemskap.</h2>
          <p className="mt-4 text-lg text-gray-300">
            Medlemskap er åpent for virksomheter som har sitt hovedvirke innen
            konsulent- og rådgivningstjenester knyttet til digitalisering,
            informasjonsteknologi og tilhørende forretnings- og
            organisasjonsutvikling, samt virksomheter som tilrettelegger for
            slike tjenester. Medlemskapet er gyldig når kontingenten er betalt.
          </p>
          <p className="mt-2 text-sm text-gray-400">Jf. vedtektene §4.</p>
        </div>

        {/* Two Cards Grid */}
        <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-2 pb-32 sm:pb-40 lg:pb-48">
          {/* Card 1: Hvorfor bli medlem */}
          <div className="rounded-[20px] bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold">Hvorfor bli medlem?</h3>
            <ul className="mt-4 space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  Felles stemme i politiske prosesser og offentlige anskaffelser
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  Faglige møteplasser og erfaringsutveksling på tvers av miljøer
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  Tilgang til standarder, maler og kontrakter som reduserer
                  friksjon
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  Profilering i medlemsoversikt og mulighet til å bidra i
                  arbeids- og fagutvalg
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Kontingent og fakturering */}
          <div className="rounded-[20px] bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold">Kontingent og fakturering</h3>
            <p className="mt-4 text-gray-800">
              Årsmøtet fastsetter kontingenten årlig.{" "}
              <strong>
                For oppstartsåret 2025 er kontingenten satt til 5&nbsp;000
                kroner
              </strong>
              , vedtatt i stiftelsesmøtet 9. september 2025. Kontingenten
              gjelder frem til første ordinære årsmøte.
            </p>
            <ul className="mt-4 space-y-2 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  <strong>Kategori:</strong> Alle virksomheter
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  <strong>Kontingent 2025:</strong> 5&nbsp;000 NOK
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gray-900" />
                <span>
                  <strong>Merknad:</strong> Kontingent for kommende år fastsettes
                  av årsmøtet
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Faktura sendes etter opptak/bekreftelse. Kontingent refunderes
              ikke ved utmelding (jf. vedtektene §4).
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Image - overlapping with cards above */}
      <div className="relative -mt-24 sm:-mt-32 lg:-mt-40 h-64 sm:h-80 lg:h-96 w-full">
        <Image
          src="/NKA_Bilde2_1920.jpg"
          alt="Kontormiljø"
          fill
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        {/* Signup Section */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Instructions */}
          <div>
            <h2 className="text-3xl font-bold text-white">Slik melder du deg inn.</h2>
            <ol className="mt-6 space-y-4 text-gray-300">
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-900">
                  1
                </span>
                <span className="pt-1">
                  Fyll ut skjemaet under med navn, e-post og selskapsnavn.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-900">
                  2
                </span>
                <span className="pt-1">
                  Bekreft samtykke til behandling av opplysningene for å
                  administrere medlemskapet.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-900">
                  3
                </span>
                <span className="pt-1">
                  Du får bekreftelse når innmeldingen er registrert; faktura
                  utsendes for kontingent.
                </span>
              </li>
            </ol>
          </div>

          {/* Right: Signup Form Card */}
          <div className="rounded-[20px] bg-white p-6 sm:p-8">
            <SignupForm />
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-10 max-w-xl">
          <h4 className="font-semibold text-white">Personvern</h4>
          <p className="mt-2 text-sm text-gray-300">
            Opplysninger brukes kun til medlemsadministrasjon (innmelding,
            fakturering, medlemsoversikt) og lagres i tråd med gjeldende
            regelverk. Du kan be om innsyn/sletting ved å kontakte oss.
          </p>
          <p className="mt-2 text-sm text-gray-400">Jf. vedtektene §4–5.</p>
        </div>
      </div>
    </section>
  );
}
