# SkyHigh AllStar - Tryout 2026

Tryout registration system and marketing landing page for SkyHigh AllStar cheerleading (São Paulo, Brazil). Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

| Layer | Tools |
|-------|-------|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3.4, shadcn/ui, Framer Motion 11 |
| Backend | Supabase (PostgreSQL, Storage), Next Safe Action, Zod |
| Forms | React Hook Form, Zod validation |
| Testing | Vitest, Testing Library, Happy DOM |
| Deploy | Vercel (with Analytics) |

## Pages

### Landing Page (`/`)

Marketing page with hero, benefits, team selector, journey timeline, testimonials, tryout info, FAQ, and CTA sections. Features animated backgrounds, storm-themed particles per team, parallax scrolling, and scroll progress indicator.

**Teams:** Hailstorm COED N2, Snowstorm All Girl N2-N3, Rainstorm COED N3, Thunderstorm COED N3, Lightningstorm COED N4, All Boy N2-N3, Cheer Pom.

### Registration Form (`/formulario`)

4-step form with real-time validation:

1. **Personal Data** - Name, DOB, age (auto-calculated), gender, phone, email. Guardian fields appear for minors.
2. **Experience** - Cheerleading background, previous teams, gymnastics, position/level interests.
3. **Availability** - Training days, competition participation, crossover acceptance.
4. **Health & Terms** - Medical conditions, parental authorization, liability acceptance.

Includes progress indicator, auto-save, confetti on submission, and duplicate email detection.

### Admin Dashboard (`/admin/[token]`)

Token-protected panel with:

- **Stats** - Registrations by status, attendance, level distribution, position interests, age demographics.
- **Registration table** - Search, filter, status management, payment tracking, proof uploads.
- **Charts** - Bar, donut, and line charts for visual analytics.

### Check-in (`/admin/[token]/checkin`)

Tryout day interface with quick search, status filters, check-in cards, live attendance stats, and payment verification.

### Approved Member (`/aprovado`)

Post-tryout enrollment flow:

1. Email verification finds the registration.
2. Conditional rendering based on status (approved, pending, rejected, absent, scheduled).
3. Approved athletes complete enrollment: CPF, RG, Instagram, address, emergency contact, health info, shirt size, medical documents.

## Supabase Integration

### Tables

| Table | Purpose |
|-------|---------|
| `registrations` | Tryout applications |
| `guardians` | Parent/guardian info for minors |
| `athletes` | Approved athlete profiles with enrollment data |
| `athlete_guardians` | Guardian info for enrolled athletes |

### Views

- `registrations_full` - Registrations joined with guardian data
- `registration_stats` - Aggregated statistics

### RPC Functions

| Function | Purpose |
|----------|---------|
| `submit_registration` | Create registration with validation |
| `update_registration_status` | Change registration status |
| `update_attendance_status` | Check-in on tryout day |
| `update_payment_status` | Track payments |
| `check_duplicate_email` | Email uniqueness check |
| `create_athlete_with_guardian` | Enroll approved athlete |
| `calculate_age` / `is_minor_by_date` | Age utilities |

### Key Enums

- **Status**: pending, under_review, accepted, rejected, waitlisted
- **Attendance**: not_checked, present, absent
- **Payment**: comprovante_pendente, pago
- **Levels**: n2, n3, n4
- **Positions**: base, flyer, back
- **Teams**: snowstorm, hailstorm, rainstorm, cheerpom, unassigned
- **Enrollment**: team_cheer, individual_only, tumbling_only, team_and_tumbling

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ADMIN_TOKEN=your_admin_access_token
```

### 3. Run

```bash
npm run dev          # Development (http://localhost:3000)
npm run build        # Production build
npm start            # Production server
npm test             # Run tests
npm run test:coverage # Coverage report
npm run clean        # Clear .next cache
```

## Design System

**Colors:** Primary Orange (`#FF7F00`), Secondary Cyan (`#00BFFF`), Royal Blue (`#1E3A8A`), Dark Navy (`#000c1f`).

**Typography:** Bebas Neue (display), Work Sans (body).

**Animations:** Framer Motion with ease-out-expo easing, 80ms stagger delays, storm-themed particle effects per team.

## Project Structure

```
src/
├── actions/          # Type-safe server actions (registration, admin, enrollment)
├── app/              # Next.js pages (landing, formulario, admin, aprovado)
├── components/
│   ├── ui/           # Base components (shadcn/ui + custom animated components)
│   ├── animations/   # Storm particles, flip cards, tilt cards, animated text
│   ├── admin/        # Dashboard stats, tables, charts, check-in cards
│   └── aprovado/     # Email verification, status states, athlete enrollment
├── constants/        # Static data (teams, form sections, animations, payment)
├── context/          # Storm weather theme context
├── hooks/            # Custom hooks (intersection, media query, mouse, scroll)
├── lib/
│   ├── animations/   # Storm configs, transitions, variants
│   ├── schemas/      # Zod schemas (registration, athlete, approved member)
│   ├── supabase.ts   # Supabase client
│   ├── safe-action.ts
│   └── error-logger.ts
├── types/            # TypeScript types (database, form, approved member)
└── styles/
```

## License

Private and proprietary - SkyHigh AllStar.

## Contact

- **WhatsApp**: [(11) 91331-1920](https://wa.me/5511913311920)
- **Instagram**: [@skyhigh.allstar](https://instagram.com/skyhigh.allstar)
- **Location**: Centro Esportivo Tietê, Av. Santos Dumont, 843 - Luz, São Paulo - SP
