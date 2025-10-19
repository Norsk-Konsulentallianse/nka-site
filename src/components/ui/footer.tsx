export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Norsk Konsulentallianse — ideell forening. 
            Vedtekter vedtatt 9. september 2025.
          </p>
          <p>
            <a href="/vedtekter" className="underline">Vedtekter</a>
            <span className="mx-2">·</span>
            <a href="mailto:post@norskkonsulentallianse.no" className="underline">Kontakt</a>
          </p>
        </div>
        <p className="mt-1 text-xs">
          Organisasjonsnummer publiseres når registrering i Brønnøysundregistrene er fullført.
        </p>
      </div>
    </footer>
  );
}
