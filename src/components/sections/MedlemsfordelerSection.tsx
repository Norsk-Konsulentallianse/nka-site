"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown } from "lucide-react";

const fordeler = [
  {
    title: "Juridisk rådgivning",
    description: "Tilgang til juridisk bistand i arbeidsrettslige spørsmål og kontraktsforhold.",
    details: "Få svar på spørsmål om arbeidskontrakter, oppsigelser, permitteringer og andre juridiske problemstillinger. SMB Norge har avtale med erfarne advokater som kjenner utfordringene små og mellomstore bedrifter møter.",
    url: "https://www.smbnorge.no/medlemsfordeler/radgivning",
  },
  {
    title: "Kurs og kompetanse",
    description: "Rabatterte kurs og webinarer innen ledelse, økonomi og forretningsutvikling.",
    details: "Bred kurskatalog med alt fra regnskapsforståelse og HMS til lederutvikling og digital markedsføring. Kursene holdes både fysisk og digitalt.",
    url: "https://www.smbnorge.no/kurs",
  },
  {
    title: "Forsikringsavtaler",
    description: "Gunstige forsikringsordninger tilpasset små og mellomstore bedrifter.",
    details: "Kollektive avtaler gir bedre priser på yrkesskadeforsikring, ansvarsforsikring, helseforsikring og andre relevante dekninger for din bedrift.",
    url: "https://www.smbnorge.no/medlemsfordeler/forsikring",
  },
  {
    title: "Nettverksarrangementer",
    description: "Delta på faglige møteplasser og nettverkssamlinger med andre medlemsbedrifter.",
    details: "Møt andre bedriftsledere, del erfaringer og bygg relasjoner. SMB Norge arrangerer regionale samlinger, frokostmøter og årlige konferanser.",
    url: "https://www.smbnorge.no/arrangementer",
  },
  {
    title: "Innkjøpsavtaler",
    description: "Tilgang til fordelaktige innkjøpsavtaler på tjenester og produkter.",
    details: "Spar penger på alt fra kontorrekvisita og telefonitjenester til drivstoff og hotellopphold. Avtalene er fremforhandlet for å gi medlemmene best mulig pris.",
    url: "https://www.smbnorge.no/medlemsfordeler/innkjopsavtaler",
  },
  {
    title: "Politisk påvirkning",
    description: "SMB Norge arbeider for bedre rammevilkår for små og mellomstore bedrifter.",
    details: "Din stemme blir hørt! SMB Norge jobber aktivt mot Stortinget og regjeringen for å påvirke skattepolitikk, arbeidsmiljølov og andre saker som påvirker din hverdag som bedriftseier.",
    url: "https://www.smbnorge.no/politikk",
  },
];

export function MedlemsfordelerSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Section id="fordeler" theme="bright-inverse">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold">Medlemsfordeler.</h2>
        <p className="mt-4 text-lg text-gray-700">
          Som assosiert medlem i{" "}
          <a
            href="https://www.smbnorge.no"
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
        {fordeler.map((fordel, index) => (
          <button
            key={fordel.title}
            onClick={() => toggleExpand(index)}
            className={`rounded-[20px] bg-white p-6 shadow-sm text-left transition-all hover:shadow-md ${
              expandedIndex === index ? "ring-2 ring-gray-900" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {fordel.title}
              </h3>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">{fordel.description}</p>
            {expandedIndex === index && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-700">
                  {fordel.details}
                </p>
                <a
                  href={fordel.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-flex items-center text-sm font-medium text-gray-900 underline hover:text-gray-700"
                >
                  Les mer hos SMB Norge
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
          </button>
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
