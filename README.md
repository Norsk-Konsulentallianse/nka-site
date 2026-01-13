# Norsk Konsulentallianse

Nettside for Norsk Konsulentallianse - en bransjeforening for IT-konsulentselskaper i Norge.

**Produksjon:** [norskkonsulentallianse.no](https://norskkonsulentallianse.no)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Animasjoner:** Framer Motion
- **Fonter:** Nunito Sans + Manrope
- **Backend:** Google Apps Script (medlemmer, presseoppslag)
- **Hosting:** Vercel

## Kom i gang

### 1. Installer avhengigheter

```bash
npm install
```

### 2. Sett opp miljøvariabler

Opprett `.env.local`:

```
APP_SCRIPT_URL=https://script.google.com/macros/s/DITT_SCRIPT_ID/exec
APP_SCRIPT_SECRET=din_hemmelige_nøkkel
```

### 3. Start utviklingsserver

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000)

## Prosjektstruktur

```
src/
├── app/
│   ├── page.tsx              # Forside
│   ├── vedtekter/            # Vedtekter-side
│   └── api/
│       └── innmelding/       # API-proxy til Apps Script
├── components/
│   ├── sections/             # Seksjonskomponenter
│   │   ├── HeroSection.tsx
│   │   ├── FormalSection.tsx
│   │   ├── MedlemskapSection.tsx
│   │   ├── MedlemmerSection.tsx
│   │   ├── PresseSection.tsx
│   │   ├── MedlemsfordelerSection.tsx
│   │   ├── DokumenterSection.tsx
│   │   ├── OrganisasjonSection.tsx
│   │   └── KontaktSection.tsx
│   ├── ui/                   # Gjenbrukbare UI-komponenter
│   ├── MembersCarousel.tsx   # Medlemskarusell
│   └── SignupForm.tsx        # Innmeldingsskjema
└── lib/
    └── utils.ts
```

## Google Sheets Integrasjon

Data hentes fra Google Sheets via Apps Script:

| Endepunkt | Beskrivelse |
|-----------|-------------|
| `?fn=medlemmer` | Henter medlemsoversikt |
| `?fn=presseoppslag` | Henter presseoppslag |

### Presseoppslag-kolonner

| Kolonne | Beskrivelse |
|---------|-------------|
| title | Artikkeltittel |
| source | Kildenavn (f.eks. "Digi.no") |
| url | Lenke til artikkel |
| date | Dato (YYYY-MM-DD) |
| type | `vår_kilde` eller `anbefalt` |
| excerpt | Kort beskrivelse |

## Deployment

### Produksjon

Push til `main`-branch deployer automatisk til produksjon.

### Staging

Push til `staging`-branch for preview-deployment.

```bash
git checkout staging
git merge main
git push
```

## Scripts

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start utviklingsserver |
| `npm run build` | Bygg for produksjon |
| `npm run start` | Kjør produksjonsbygg lokalt |
| `npm run lint` | Kjør linting |
