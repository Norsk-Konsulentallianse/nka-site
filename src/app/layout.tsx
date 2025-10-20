// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/ui/footer"; // juster path hvis du ikke bruker alias

export const metadata: Metadata = {
  title: "Norsk Konsulentallianse – Ideell bransjeorganisasjon",
  description:
    "Ideell, non-profit bransjeorganisasjon for virksomheter innen IT-konsulenttjenester og digitalisering. Vedtekter vedtatt 9. september 2025.",
  openGraph: {
    title: "Norsk Konsulentallianse",
    description:
      "Ideell, non-profit bransjeorganisasjon for virksomheter innen IT-konsulenttjenester og digitalisering.",
    url: "https://nka-site.vercel.app",
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
    <html lang="no" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body className="antialiased">
        {/* Header/nav-komponenten din om du har en */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
