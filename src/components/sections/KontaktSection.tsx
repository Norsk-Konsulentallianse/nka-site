import Link from "next/link";

export function KontaktSection() {
  return (
    <section id="kontakt" className="bg-[#f7f6f5] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Kontakt.</h2>
        <p className="mt-4 text-lg text-gray-800">
          Spørsmål om medlemskap eller samarbeid?
        </p>
        <a
          href="mailto:post@norskkonsulentallianse.no"
          className="mt-4 inline-block text-lg font-medium text-gray-900 underline hover:text-gray-700"
        >
          post@norskkonsulentallianse.no
        </a>
        <p className="mt-8 text-gray-700">
          <Link href="/vedtekter" className="underline hover:text-gray-900">
            Les vedtektene
          </Link>{" "}
          for informasjon om regnskap/revisjon, vedtektsendringer og oppløsning.
        </p>
      </div>
    </section>
  );
}
