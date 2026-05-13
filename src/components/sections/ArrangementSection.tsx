import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";

const PAAMELDING_URL =
  "https://oneva.digitalexpertalliance.com/apps/forms/s/ZbiDxsGN4nBRt2LAgGSESWEi";

const program = [
  {
    tid: "16:00",
    tekst: "Velkommen ved Håvard Ellefsen, leder Norsk Konsulentallianse",
  },
  {
    tid: "16:10",
    tekst:
      "Steinar Hansen (JPro, nestleder NKA) — Egne erfaringer med AI og tanker om konsekvenser for JPro",
  },
  {
    tid: "16:30",
    tekst:
      "Stephan Brostrøm (odins.ai) — What I got wrong about AI coding, and the guardrails that made it work",
  },
  {
    tid: "16:50",
    tekst:
      "Øystein Bjering (Appfarm) — Vibe coding: hvorfor så mange løsninger aldri når produksjon, og hvordan ta ut hastighetsgevinsten uten å miste kontrollen",
  },
  { tid: "17:10", tekst: "Pause" },
  {
    tid: "17:20",
    tekst: "Paneldebatt, ledet av Kari Bjørkelund (AdviseTech)",
  },
  { tid: "18:00", tekst: "Mingling og lett servering" },
  { tid: "18:30", tekst: "Slutt" },
];

const innledere = [
  {
    navn: "Steinar Hansen",
    rolle: "Daglig leder JPro AS, nestleder NKA",
    bio: "Daglig leder i konsulentselskapet JPro AS og nestleder i Norsk Konsulentallianse. 25+ års erfaring fra IT-bransjen.",
  },
  {
    navn: "Stephan Brostrøm",
    rolle: "Co-founder odins.ai",
    bio: "Co-founder av odins.ai, en marketing investment platform der 99 % av koden i dag er AI-skrevet. 20+ års erfaring i tech.",
  },
  {
    navn: "Øystein Bjering",
    rolle: "Appfarm",
    bio: "Ansvarlig for Appfarms internasjonale partnernettverk, utdannet ved NTNU med 15+ års erfaring fra no-code, ledelse og IT-prosjektering. Appfarm er en norsk plattform for produksjonsklare webapplikasjoner uten kode (kunder bl.a. Skanska, ABB, Tide).",
  },
];

const panel = [
  {
    navn: "Kari Engensbakken Bjørkelund",
    rolle: "Leder paneldebatten · Senior rådgiver, AdviseTech AS",
    bio: "Ansvar for AI som forretning i AdviseTech. Teknolog med lang erfaring med å lede utviklerteam som utvikler og forvalter langsiktige, sikre og stabile løsninger i samfunnskritiske og regulerte bransjer som farmasi og finans.",
  },
];

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Trenger vi IT-konsulenter når AI skriver koden?",
  startDate: "2026-05-20T16:00:00+02:00",
  endDate: "2026-05-20T18:30:00+02:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "SMB Norge",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Apotekergata 10",
      addressLocality: "Oslo",
      postalCode: "0180",
      addressCountry: "NO",
    },
  },
  description:
    "Tre innledere som har bygget produkter med AI-assistert utvikling deler erfaringer og tanker om hva som er i ferd med å skje i konsulentbransjen. Etterfulgt av paneldebatt, mingling og lett servering.",
  organizer: {
    "@type": "Organization",
    name: "Norsk Konsulentallianse",
    url: "https://norskkonsulentallianse.no",
  },
  performer: [
    { "@type": "Person", name: "Steinar Hansen" },
    { "@type": "Person", name: "Stephan Brostrøm" },
    { "@type": "Person", name: "Øystein Bjering" },
    { "@type": "Person", name: "Kari Engensbakken Bjørkelund" },
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NOK",
    availability: "https://schema.org/InStock",
    url: PAAMELDING_URL,
    validFrom: "2026-04-22T00:00:00+02:00",
  },
};

export function ArrangementSection() {
  return (
    <Section id="arrangement" theme="bright-inverse">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-bold">Arrangement.</h2>
        <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Kommer snart
        </span>
      </div>

      <div className="mt-8 overflow-hidden rounded-[20px] bg-white shadow-sm">
        {/* Hero header */}
        <div className="bg-gray-900 p-6 text-white sm:p-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Onsdag 20. mai 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              kl. 16:00–18:30
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              SMB Norge, Apotekergata 10, Oslo
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
            Trenger vi IT-konsulenter når AI skriver koden?
          </h3>

          <p className="mt-4 max-w-3xl text-gray-200">
            For den som leder et konsulentselskap er spørsmålet ikke{" "}
            <em>om</em> AI-assistert utvikling endrer forretningsmodellen — men{" "}
            <em>når</em>, og <em>hvor mye</em>. Hvis kundene dine merker det før
            deg, har du et problem.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button asChild variant="pill" size="pill">
              <a href={PAAMELDING_URL} target="_blank" rel="noreferrer">
                Meld deg på
                <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <span className="text-sm text-gray-300">
              Gratis · Åpent for alle i IT-bransjen
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-gray-200 p-6 sm:p-10">
          <h4 className="text-lg font-semibold">Om arrangementet</h4>
          <p className="mt-3 text-gray-800">
            Norsk Konsulentallianse er bransjeorganisasjon for
            IT-konsulentselskaper.
          </p>
          <p className="mt-3 text-gray-800">
            Vi har invitert tre innledere som faktisk har bygget produkter med
            AI-assistert utvikling. De deler erfaringer og tanker om hva som er
            i ferd med å skje.
          </p>
          <p className="mt-3 text-gray-800">
            Etter innleggene: paneldebatt, mingling og lett servering.
            Konsulentselskaper som kjenner seg igjen i problemstillingene
            oppfordres til å bli kjent med Norsk Konsulentallianse.
          </p>
        </div>

        {/* Program + Innledere */}
        <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-2">
          {/* Program */}
          <div>
            <h4 className="text-lg font-semibold">Program</h4>
            <ol className="mt-4 space-y-3">
              {program.map((p) => (
                <li key={p.tid} className="flex gap-4">
                  <span className="w-14 flex-shrink-0 font-mono text-sm font-semibold text-gray-900">
                    {p.tid}
                  </span>
                  <span className="text-sm text-gray-800">{p.tekst}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Innledere + Paneldebatt */}
          <div>
            <h4 className="text-lg font-semibold">Innledere</h4>
            <ul className="mt-4 space-y-5">
              {innledere.map((i) => (
                <li key={i.navn}>
                  <p className="font-semibold text-gray-900">{i.navn}</p>
                  <p className="text-sm text-gray-600">{i.rolle}</p>
                  <p className="mt-1 text-sm text-gray-700">{i.bio}</p>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-lg font-semibold">Paneldebatt</h4>
            <ul className="mt-4 space-y-5">
              {panel.map((p) => (
                <li key={p.navn}>
                  <p className="font-semibold text-gray-900">{p.navn}</p>
                  <p className="text-sm text-gray-600">{p.rolle}</p>
                  <p className="mt-1 text-sm text-gray-700">{p.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-gray-200 bg-[#f7f6f5] p-6 text-center sm:p-8">
          <p className="text-sm text-gray-700">Sikre deg plass:</p>
          <Button asChild variant="pill-dark" size="pill" className="mt-3">
            <a href={PAAMELDING_URL} target="_blank" rel="noreferrer">
              Meld deg på arrangementet
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}