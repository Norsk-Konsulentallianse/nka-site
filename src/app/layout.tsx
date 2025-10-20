// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/ui/footer"; // juster sti om nødvendig

export const metadata: Metadata = {
  title: "Norsk Konsulentallianse – Ideell bransjeorganisasjon",
  description:
    "Ideell, non-profit bransjeorganisasjon for virksomheter innen IT-konsulenttjenester og digitalisering. Vedtekter vedtatt 9. september 2025.",
  openGraph: {
    title: "Norsk Konsulentallianse",
    description:
      "Ideell, non-profit bransjeorganisasjon for virksomheter innen IT-konsulenttjenester og digitalisering.",
    url: "https://norskkonsulentallianse.no",
    siteName: "Norsk Konsulentallianse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Norsk Konsulentallianse",
    description:
      "Ideell, non-profit bransjeorganisasjon for virksomheter innen IT-konsulenttjenester og digitalisering.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className="scroll-smooth">
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
