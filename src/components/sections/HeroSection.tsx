import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/NKA_Hero_1920.jpg"
        alt="Konsulenter i møte"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Norsk Konsulentallianse
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
          er en <strong>ideell, non-profit bransjeorganisasjon</strong> for
          virksomheter innen konsulent- og rådgivningstjenester knyttet til
          digitalisering, informasjonsteknologi og tilhørende forretnings- og
          organisasjonsutvikling.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button asChild variant="pill" size="pill-lg">
            <a href="#meld-deg-inn">MELD DEG INN</a>
          </Button>
          <Button asChild variant="pill-outline" size="pill-lg">
            <Link href="/vedtekter">VEDTEKTER</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
