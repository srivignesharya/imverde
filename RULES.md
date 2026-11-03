# ImVerde — Agent Rules & Engineering Standards

## 1. Project Overview & Vision
**ImVerde** is a premium, high-craft web application designed to help households and businesses in **India** understand and reduce their electricity consumption, carbon footprint, and energy costs.
- **Core User Flow**: Users upload an electricity bill (PDF or image) -> Multimodal AI extracts key consumption and tariff data -> ImVerde calculates the carbon footprint and provides top actionable steps to save money (₹ INR) and CO₂ (kg/tonne).
- **Target Market**: India (calibrated for Indian state DISCOM tariffs, billing cycles, and regional grid carbon intensity factors).

---

## 2. Technology Stack
Every agent working on this codebase must adhere strictly to this stack:
- **Framework**: Next.js (App Router, Server Components, Server Actions)
- **Language**: TypeScript (strict mode, zero untyped `any`)
- **Styling**: Tailwind CSS
- **Backend / Database / Auth / Storage**: Supabase
  - Supabase Auth (authenticated & anonymous guest sessions)
  - Supabase PostgreSQL (with relational schemas & Row Level Security)
  - Supabase Storage (secure storage buckets for bill uploads)
- **AI & Extraction**: Google Gemini API (multimodal document/image parsing and personalized recommendation engine)
- **Motion & 3D**:
  - GSAP + ScrollTrigger
  - Lenis (smooth inertial scrolling)
  - Framer Motion (page transitions and micro-interactions)
  - React Three Fiber (R3F) & Three.js (interactive, lightweight 3D elements)

---

## 3. Design Standards (Apple / Nike Polish)
- **Aesthetic**: Deep, refined, and aspirational. Apple- and Nike-level elegance with meticulous attention to detail, typography, and micro-interactions.
- **Color Palette**:
  - Primary: Deep forest green tones
  - Backgrounds & Neutrals: Pristine off-white palettes in light mode; deep obsidian / matte slate in dark mode
  - Accents: Subtle emerald, sage, and warm amber accents
- **Modes**: Full Light Mode and Dark Mode support with seamless transitions.
- **Typography**:
  - Strictly **one display font** (bold, architectural, modern) and **one body font** (clean, highly legible, optimized for numbers and metrics).
  - Editorial hierarchy with huge, expressive hero type and disciplined metadata sizing.
- **Layout & Components**:
  - Mobile-first responsive design.
  - Generous negative space and whitespace.
  - Soft rounded cards, subtle hairline borders, and refined glassmorphic surfaces.

---

## 4. Motion & Performance Guidelines
- **GPU-Accelerated Only**: Animate **only** `transform` and `opacity`. Never animate layout-triggering properties (`width`, `height`, `top`, `margin`, `padding`).
- **Frame Rate**: Guarantee silky 60fps performance across devices.
- **Timing & Curves**:
  - Transition durations between `0.6s` and `1.2s`.
  - Use custom, organic easing curves (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`). Avoid linear or generic ease-in-out transitions.
- **Accessibility**:
  - Strictly respect `prefers-reduced-motion`.
  - When reduced motion is preferred, collapse transitions to instant or subtle opacity fades.

---

## 5. Security & Data Privacy
- **Secrets Management**:
  - All API keys, connection strings, and service tokens belong exclusively in `.env.local` and server-only modules (`process.env`).
  - Never expose secrets in client-side bundles or `NEXT_PUBLIC_` prefixes unless explicitly designed for public access (e.g., public anon key).
- **Database Security**:
  - **Row Level Security (RLS)** must be enabled and enforced on **every** table.
  - No database tables may be left open without explicit RLS policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
- **Bill & PII Privacy**:
  - User bills contain sensitive information (names, consumer numbers, addresses).
  - **Never log bill contents or personally identifiable information (PII)** to console, logs, or third-party telemetry.
  - Store uploaded bills in private Supabase Storage buckets accessible solely via short-lived signed URLs.

---

## 6. Code Quality & UX Resilience
- **State Handling**:
  - Every screen, route, and data-dependent component must explicitly implement:
    1. **Loading State**: Elegant skeletons or purposeful loading animations (no jarring layout shifts).
    2. **Empty State**: Thoughtful, encouraging empty state designs with clear calls-to-action.
    3. **Error State**: Informative, graceful error boundaries with retry mechanisms.
- **Accessibility (a11y)**:
  - Accessible contrast ratios meeting WCAG AA standards in both light and dark themes.
  - Full keyboard navigability (focus indicators, logical tab orders, ARIA attributes).

---

## 7. Execution Process (Mandatory for Every Task)
Every agent working on this repository must follow this sequence for every non-trivial task:
1. **Plan First**: Formulate and present a clear, step-by-step implementation plan.
2. **User Approval**: Wait for user review and explicit approval before modifying code or running setup steps.
3. **Build**: Execute the implementation meticulously, following all standards in this document.
4. **Test**: Verify functionality and visuals in the browser and sandbox environment before concluding.

