export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] border-t border-gray-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              Norsk
              <br />
              Konsulentallianse
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <a href="/vedtekter" className="hover:underline">
              Vedtekter
            </a>
            <span className="mx-2">·</span>
            <a
              href="mailto:post@norskkonsulentallianse.no"
              className="hover:underline"
            >
              Kontakt
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Norsk Konsulentallianse — ideell
          forening. Vedtekter vedtatt 9. september 2025.
        </p>
      </div>
    </footer>
  );
}
