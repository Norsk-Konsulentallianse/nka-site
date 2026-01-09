import Image from "next/image";
import { Section } from "@/components/ui/section";

const boardMembers = [
  {
    name: "Håvard Ellefsen",
    role: "Leder",
    company: "Coness AS",
    image: "/Håvard Ellefsen.png",
  },
  {
    name: "Steinar Hansen",
    role: "Nestleder",
    company: "JPro AS",
    image: "/Steinar Hansen.jpeg",
  },
  {
    name: "Ranveig Marisei",
    role: "Nestleder",
    company: "Ework Group Norway AS",
    image: "/Ranveig Marisei.jpeg",
  },
];

export function OrganisasjonSection() {
  return (
    <Section id="organisasjon" theme="white">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Description */}
        <div>
          <h2 className="text-3xl font-bold">Organisasjon.</h2>
          <div className="mt-4 space-y-4 text-gray-800">
            <p>
              Alliansens organer er: (1) Årsmøtet – øverste myndighet, (2)
              Styret, og (3) eventuelle fag- eller arbeidsutvalg oppnevnt av
              styret. Årsmøtet avholdes én gang i året innen utgangen av mai, og
              innkalles med minst 4 ukers varsel. Hver medlemsbedrift har én
              stemme.
            </p>
            <p>
              Årsmøtet behandler årsberetning, regnskap, fastsettelse av
              kontingent, budsjett, valg av styre og valgkomité, samt innkomne
              forslag. Styret leder Alliansens virksomhet i samsvar med
              vedtektene og årsmøtets vedtak.
            </p>
            <p className="text-sm text-gray-600">Jf. vedtektene §6–9.</p>
          </div>
        </div>

        {/* Right: Board Members */}
        <div>
          <h3 className="text-xl font-bold">Styre valgt ved stiftelse.</h3>
          <div className="mt-8 flex flex-wrap justify-center gap-8 lg:justify-start">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                {/* Circular Photo */}
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Pill Badge */}
                <div className="mt-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900">
                  <strong>{member.name}</strong> ({member.company})
                  <br />
                  <span className="font-bold">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
