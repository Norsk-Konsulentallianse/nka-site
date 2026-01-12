import { Section } from "@/components/ui/section";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const dokumenter = [
  {
    title: "Veileder: Innleieregler",
    description:
      "Praktisk guide for konsulentselskaper om hvordan forholde seg til de nye innleiereglene.",
    filename: "innleieveileder.pdf",
    date: "2025-01-01",
  },
  // Legg til flere dokumenter her etter hvert
];

export function DokumenterSection() {
  return (
    <Section id="dokumenter" theme="white">
      <h2 className="text-3xl font-bold">Ressurser og dokumenter.</h2>
      <p className="mt-2 text-gray-600">
        Nyttige dokumenter og veiledere for medlemsbedrifter.
      </p>

      <div className="mt-10 space-y-4">
        {dokumenter.map((doc) => (
          <div
            key={doc.filename}
            className="flex flex-col gap-4 rounded-[20px] bg-[#f7f6f5] p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{doc.description}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Oppdatert:{" "}
                  {new Date(doc.date).toLocaleDateString("nb-NO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <Button asChild variant="pill-dark" size="sm">
              <a href={`/${doc.filename}`} download>
                <Download className="mr-2 h-4 w-4" />
                Last ned PDF
              </a>
            </Button>
          </div>
        ))}

        {dokumenter.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            Ingen dokumenter tilgjengelig enda.
          </p>
        )}
      </div>
    </Section>
  );
}
