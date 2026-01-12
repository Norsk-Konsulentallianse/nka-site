import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const fordeler = [
  {
    title: "Juridisk rådgivning",
    description: "Tilgang til juridisk bistand i arbeidsrettslige spørsmål og kontraktsforhold.",
  },
  {
    title: "Kurs og kompetanse",
    description: "Rabatterte kurs og webinarer innen ledelse, økonomi og forretningsutvikling.",
  },
  {
    title: "Forsikringsavtaler",
    description: "Gunstige forsikringsordninger tilpasset små og mellomstore bedrifter.",
  },
  {
    title: "Nettverksarrangementer",
    description: "Delta på faglige møteplasser og nettverkssamlinger med andre medlemsbedrifter.",
  },
  {
    title: "Innkjøpsavtaler",
    description: "Tilgang til fordelaktige innkjøpsavtaler på tjenester og produkter.",
  },
  {
    title: "Politisk påvirkning",
    description: "SMB Norge arbeider for bedre rammevilkår for små og mellomstore bedrifter.",
  },
];

export function MedlemsfordelerSection() {
  return (
    <Section id="fordeler" theme="bright-inverse">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold">Medlemsfordeler.</h2>
        <p className="mt-4 text-lg text-gray-700">
          Som assosiert medlem i{" "}
          <a
            href="https://www.televastra.no/smb-norge"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline hover:text-gray-900"
          >
            SMB Norge
          </a>{" "}
          får våre medlemsbedrifter tilgang til en rekke fordeler og tjenester.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fordeler.map((fordel) => (
          <div
            key={fordel.title}
            className="rounded-[20px] bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {fordel.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{fordel.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Button asChild variant="pill-dark">
          <a
            href="https://www.smbnorge.no/medlemsfordeler"
            target="_blank"
            rel="noreferrer"
          >
            Se alle fordeler hos SMB Norge
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
