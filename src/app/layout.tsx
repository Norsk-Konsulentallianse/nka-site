// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Nunito_Sans, Manrope, Source_Sans_3 } from "next/font/google";
import Footer from "@/components/ui/footer";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "700"],
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "600"],
});

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
    <html lang="nb" className={`${nunitoSans.variable} ${manrope.variable} ${sourceSans3.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
