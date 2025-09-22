'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from "sonner";
import { ArrowRight, Users, Shield, Building2, Newspaper, Mail, Check } from 'lucide-react';

type Member = { name: string; type: 'Selskap' | 'Selvstendig'; url?: string };
type JoinForm = {
  name: string;
  email: string;
  company: string;
  role: string;
  notes: string;
  consent: boolean;
};

// Google Sheets API integration enabled
const USE_API = true;

export default function Page() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [joinOpen, setJoinOpen] = useState(false);
  
  const [form, setForm] = useState<JoinForm>({
    name: '',
    email: '',
    company: '',
    role: '',
    notes: '',
    consent: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/medlemmer', { cache: 'no-store' });
        const data = await res.json();
        setMembers(Array.isArray(data.members) ? data.members : []);
      } catch {
        setMembers([]); // fallback
      } finally {
        setLoadingMembers(false);
      }
    })();
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("onSubmit v3 payload:", form); // <- markør
  
    try {
      if (USE_API) {
        const res = await fetch("/api/innmelding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
      } else {
        console.log("Membership application (demo, not persisted):", form);
      }
  
      toast.success("Søknad sendt ✅ v3", {
        description: USE_API ? "Registrert i systemet." : "Registrert lokalt (demo).",
      });
  
      // NB: riktig state-navn
      setJoinOpen(false);
  
      setForm({ name: "", email: "", company: "", role: "", notes: "", consent: false });
    } catch (err) {
      console.error("Feil i innmelding:", err);
      toast.error("Kunne ikke sende", { description: "Prøv igjen om litt." });
    }
  }
  

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SiteNav onOpenJoin={() => setJoinOpen(true)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20 bg-gradient-to-b from-sky-100 via-white to-white" />
        <div className="container mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4">Stiftelse 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              Norsk Konsulentallianse
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Bransjeforeningen for konsulentselskaper og selvstendige konsulenter i Norge. Vi jobber
              for bedre rammevilkår, kunnskapsdeling og høyere profesjonsstandard.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
            // Hero CTA
<Dialog open={joinOpen} onOpenChange={setJoinOpen}>
  <DialogTrigger asChild>
    <Button size="lg" className="rounded-2xl px-6">
      Meld deg inn <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </DialogTrigger>
  <JoinDialogContent
    form={form}
    onChange={onChange}
    onSubmit={onSubmit}
    onClose={() => setJoinOpen(false)}
  />
</Dialog>
              <a href="#medlemskap" className="inline-flex">
                <Button variant="outline" size="lg" className="rounded-2xl px-6">
                  Les om medlemskap
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value props */}
      <section className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <ValueCard
            icon={<Users className="h-6 w-6" />}
            title="Fellesskap"
            body="Møteplasser for ledere og konsulenter – fagfora, nettverk og erfaringsutveksling."
          />
          <ValueCard
            icon={<Shield className="h-6 w-6" />}
            title="Rammevilkår"
            body="Høringsinnspill og tydelig bransjestemme overfor myndigheter og innkjøpere."
          />
          <ValueCard
            icon={<Building2 className="h-6 w-6" />}
            title="Marked & kvalitet"
            body="Standarder, maler, kontrakter og beste praksis som løfter kvaliteten i bransjen."
          />
        </div>
      </section>

      {/* About + Medlemsoversikt */}
      <section id="om" className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Hvem vi er</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Norsk Konsulentallianse er en uavhengig forening for norske konsulenthus og selvstendige
              konsulenter. Vi samler miljøer på tvers av teknologi, design og forretningsrådgivning for å
              styrke bransjen, profesjonsutøvelsen og kundenes resultater.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 mt-0.5" /> Felles stemme i politiske prosesser og offentlige anskaffelser
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 mt-0.5" /> Faglige møteplasser og deling av beste praksis
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 mt-0.5" /> Malverk og standarder som reduserer friksjon
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-sky-50 to-white border rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-medium">Snarveier</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <QuickLink title="Medlemskap" href="#medlemskap" />
              <QuickLink title="Kontakt" href="#kontakt" />
              <QuickLink title="Formål" href="#om" />
              <QuickLink title="Medlemmer" href="#medlemmer" />
            </div>
          </div>
        </div>

        {/* Medlemsoversikt */}
        <section id="medlemmer" className="mt-12 md:mt-16">
  <div className="flex items-center justify-between flex-wrap gap-3">
    <h3 className="text-2xl md:text-3xl font-semibold">Medlemmer</h3>
    <span className="text-sm text-gray-600">
      {loadingMembers ? 'Laster…' : `${members.length} registrerte`}
    </span>
  </div>

  <p className="mt-3 text-gray-700 max-w-3xl">
    Offentlig oversikt …
  </p>

  <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {!loadingMembers && members.map((m) => <MemberCard key={m.name} member={m} />)}
  </div>
</section>
      </section>

      {/* Membership */}
      <section id="medlemskap" className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20 bg-white">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">Medlemskap</h2>
          <p className="mt-4 text-gray-700">
            Medlemskap er åpent for konsulentselskaper og selvstendige. Kontingent foreslås differensiert
            etter størrelse. Innmelding er uforpliktende frem til kontingent er fakturert og godkjent.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Selvstendig konsulent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <div>Foreslått kontingent: 1 500 NOK/år</div>
              <ul className="list-disc list-inside">
                <li>Tilgang til nettverk og malverk</li>
                <li>Fagfora og arrangement</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Liten bedrift</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <div>Foreslått kontingent: 5 000 NOK/år</div>
              <ul className="list-disc list-inside">
                <li>Bedriftsprofil i medlemsoversikten</li>
                <li>Tilgang til fagfora og maler</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Mellomstor/Større</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <div>Foreslått kontingent: 15 000–30 000 NOK/år</div>
              <ul className="list-disc list-inside">
                <li>Profilering og partnerskap</li>
                <li>Medvirkning i arbeidsgrupper</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
        <Button size="lg" className="rounded-2xl" onClick={() => setJoinOpen(true)}>
  Meld deg inn
</Button>
        </div>
      </section>

      {/* News */}
      <section id="aktuelt" className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
        <div className="flex items-center gap-2 mb-4">
          <Newspaper className="h-5 w-5" />
          <h2 className="text-2xl md:text-3xl font-semibold">Aktuelt</h2>
        </div>
        <p className="text-gray-700">Her kan dere publisere nyheter og høringsinnspill etter hvert.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <CardTitle>Nyhetstittel {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Kort ingress om saken. Bytt ut med CMS senere (Sanity/Notion/Webflow CMS).
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="container mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5" />
            <h2 className="text-2xl md:text-3xl font-semibold">Kontakt</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Har du spørsmål om medlemskap eller samarbeid? Send oss en e-post.
          </p>
          <a href="mailto:post@norskkonsulentallianse.no" className="inline-flex">
            <Button variant="outline" className="rounded-2xl">
              post@norskkonsulentallianse.no
            </Button>
          </a>
        </div>
      </section>

      <footer className="border-t">
        <div className="container mx-auto px-6 md:px-10 lg:px-16 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Norsk Konsulentallianse</div>
          <div className="flex gap-4">
            <a href="#om" className="hover:text-gray-900">
              Om oss
            </a>
            <a href="#medlemskap" className="hover:text-gray-900">
              Medlemskap
            </a>
            <a href="#kontakt" className="hover:text-gray-900">
              Kontakt
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ----------------- Helpers & småkomponenter ----------------- */

function SiteNav(props: { onOpenJoin: () => void }) {
  const { onOpenJoin } = props;
  return (
    <header className="sticky top-0 z-40 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-sky-600" />
          <span className="font-medium">Norsk Konsulentallianse</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#om" className="hover:text-gray-900">
            Om oss
          </a>
          <a href="#medlemskap" className="hover:text-gray-900">
            Medlemskap
          </a>
          <a href="#aktuelt" className="hover:text-gray-900">
            Aktuelt
          </a>
          <a href="#kontakt" className="hover:text-gray-900">
            Kontakt
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" className="rounded-xl" onClick={onOpenJoin}>
            Meld deg inn
          </Button>
        </div>
      </div>
    </header>
  );
}

function ValueCard(props: { icon: React.ReactNode; title: string; body: string }) {
  const { icon, title, body } = props;
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center gap-3">
        <div className="p-2 rounded-xl bg-sky-50 text-sky-700">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{body}</p>
      </CardContent>
    </Card>
  );
}

function QuickLink(props: { title: string; href: string }) {
  const { title, href } = props;
  return (
    <a href={href} className="block">
      <div className="p-4 rounded-xl border hover:shadow-sm transition flex items-center justify-between">
        <span>{title}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
}

function MemberCard(props: { member: Member }) {
  const { member } = props;
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="inline-flex h-6 w-6 rounded-md bg-sky-100" />
          {member.url ? (
            <a href={member.url} target="_blank" rel="noreferrer" className="hover:underline">
              {member.name}
            </a>
          ) : (
            member.name
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Badge variant="secondary">{member.type}</Badge>
      </CardContent>
    </Card>
  );
}

function JoinDialogContent(props: {
  form: JoinForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onClose: () => void;
}) {
  const { form, onChange, onSubmit, onClose } = props;

  return (
    <DialogContent className="sm:max-w-lg rounded-2xl">
      <DialogHeader>
        <DialogTitle>Meld deg inn</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Navn</label>
            <Input name="name" value={form.name} onChange={onChange} required placeholder="Fornavn Etternavn" />
          </div>
          <div>
            <label className="text-sm">E-post</label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="navn@firma.no"
            />
          </div>
          <div>
            <label className="text-sm">Selskap</label>
            <Input name="company" value={form.company} onChange={onChange} placeholder="Firmanavn / selvstendig" />
          </div>
          <div>
            <label className="text-sm">Rolle</label>
            <Input name="role" value={form.role} onChange={onChange} placeholder="Daglig leder, konsulent, etc." />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm">Kommentar (valgfritt)</label>
            <Textarea
              name="notes"
              value={form.notes}
              onChange={onChange}
              placeholder="Eventuelle spørsmål eller tilleggsinfo"
            />
          </div>
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} required className="mt-0.5" />
          Jeg samtykker til at foreningen kan kontakte meg om medlemskap og behandling av personopplysninger iht.
          personvernerklæring.
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>
            Avbryt
          </Button>
          <Button type="submit" className="rounded-xl">
            Send søknad
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
