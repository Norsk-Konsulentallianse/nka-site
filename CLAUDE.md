# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Project Overview

Norsk Konsulentallianse (NKA) - a non-profit industry organization website for IT consulting companies in Norway. Built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS 4.

## Architecture

### Tech Stack
- Next.js 15.5 with App Router
- React 19 with Server Components (default) and Client Components where needed
- Tailwind CSS 4 with oklch color variables for theming
- shadcn/ui components (Radix UI based)
- Framer Motion for animations

### Key Directories
- `src/app/` - Routes and API endpoints
- `src/components/ui/` - shadcn component library
- `src/components/` - Custom components (SignupForm, MembersList)
- `src/lib/` - Utilities (cn() for class merging)

### Data Flow
The app uses a proxy pattern for external data:
1. Client components fetch from Next.js API routes (`/api/innmelding`)
2. API routes proxy to Google Apps Script with secret key authentication
3. Member data stored in Google Sheets

### API Endpoints
- `POST /api/innmelding` - Submit membership application (requires: name, company, email, consent)
- `GET /api/innmelding?fn=medlemmer` - Fetch member list

### Environment Variables
```
APP_SCRIPT_URL=<Google Apps Script endpoint>
APP_SCRIPT_SECRET=<API key for Apps Script>
```

## Key Patterns

- **Graceful degradation**: API returns empty arrays instead of errors when upstream unavailable
- **Flexible data normalization**: MembersList handles both JSON object arrays and spreadsheet row arrays
- **Norwegian language**: All content in Norwegian, HTML lang="nb"
- **Path alias**: `@/*` maps to `./src/*`
