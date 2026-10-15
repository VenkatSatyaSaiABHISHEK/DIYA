# DIYA AI Public Marketing Landing Page

The official public landing page for **DIYA AI by Mentneo** built with Next.js 16, GSAP ScrollTrigger, Lenis smooth scrolling, anime.js micro-animations, and Cobe 3D dotted globe.

---

## 🏛️ Architecture & Sections

| Section | Component | Description | Animation Engine |
|---|---|---|---|
| **Sticky Navbar** | `Navbar.tsx` | Glass navigation bar with brand shine animation (`text-shine`), tiny orb, navigation anchors, "Sign In" button, and gradient "Get started" CTA. Shrinks on scroll. | CSS / State |
| **Section 1: Hero** | `Hero.tsx`, `GlobeHero.tsx` | 100vh dark deep-purple gradient hero with 520px Cobe dotted globe, glowing markers on Hyderabad, Bengaluru, Delhi, Mumbai, slow orbit rings, and glass Ask DIYA input. | GSAP timeline + anime.js typewriter |
| **Section 2: Meet the Team** | `TeamOrbit.tsx` | As user scrolls, the central globe scales to 260px and 6 glass chips fly in and settle on an orbit around it (Campaigns, Content, SEO, Leads, Analytics, Automations). | GSAP ScrollTrigger (scrub: 1.2) |
| **Section 3: Tell DIYA** | `TellDiyaScene.tsx` | Pinned 3-step interactive chat story: User goal types out, DIYA reply checklist builds sequentially, and timeline bar fills as globe switches to "Planning". | GSAP ScrollTrigger (pinned) |
| **Section 4: DIYA Builds** | `BuildScenes.tsx` | Pinned horizontal 5-scene production preview (Ad Creative, Content Calendar, SEO Ring, Lead Funnel, Performance Chart with SVG line draw and count-up numbers). | GSAP ScrollTrigger (pinned) + anime.js |
| **Section 5: You Stay in Control** | `ApprovalScene.tsx` | Financial authorization card slides in from the right, triggers button press animation into "Running" state with progress bar. 3 trust pillars. | GSAP ScrollTrigger + State |
| **Section 6: Integrations** | `IntegrationsRow.tsx` | Plain text generic chips (Meta Ads, Google Ads, Instagram, GA4, Search Console, WhatsApp, CRM) connecting to central small globe with animated SVG lines. | anime.js SVG line draw + float |
| **Section 7: Pricing + FAQ** | `PricingPreview.tsx`, `Faq.tsx` | 3 glass cards (Starter, Growth, Scale) with hover lift + accessible FAQ accordion with 5 questions. | CSS transitions |
| **Section 8: Final CTA + Footer** | `FinalCta.tsx`, `Footer.tsx` | Large cropped globe, high-contrast white headline, purple gradient CTA, and footer with legal, product, and Mentneo copyright. | Static / Cobe canvas |

---

## 📜 ScrollTrigger Registry

1. **`TeamOrbit` (Scrubbed Scale & Orbit)**:
   - **Trigger**: `#features` / `TeamOrbit` container.
   - **Start**: `top 75%`, **End**: `center center`.
   - **Scrub**: `1.2`.
   - **Actions**:
     - Headline fades in: `{ opacity: 0, y: 30 }` -> `{ opacity: 1, y: 0 }`.
     - Globe scales down: `{ scale: 1.15 }` -> `{ scale: 0.82 }`.
     - 6 chips fly in from 240px radial offset to orbit anchor positions.

2. **`TellDiyaScene` (Pinned 3-Step Execution)**:
   - **Trigger**: `#how-it-works` / `TellDiyaScene` container.
   - **Start**: `top top`, **End**: `+=160%`.
   - **Pin**: `true`, **Scrub**: `0.8`.
   - **Actions**:
     - Progress `0.00 - 0.33`: Step 1 (User prompt displayed).
     - Progress `0.33 - 0.68`: Step 2 (DIYA 5-point action plan builds with checkmarks).
     - Progress `0.68 - 1.00`: Step 3 (100% progress bar, authorization chip, "Planning Complete").

3. **`BuildScenes` (Pinned 5-Scene Production Suite)**:
   - **Trigger**: `#build-scenes` / `BuildScenes` container.
   - **Start**: `top top`, **End**: `+=240%`.
   - **Pin**: `true`, **Scrub**: `0.8`.
   - **Actions**:
     - Steps through Scene 1 (Creative Card), Scene 2 (Content Calendar), Scene 3 (SEO Ring), Scene 4 (Lead Funnel), Scene 5 (Performance Line Draw & Count-Up).

4. **`ApprovalScene` (Slide-In & Auto Demo)**:
   - **Trigger**: `ApprovalScene` container.
   - **Start**: `top 70%`, **End**: `center center`.
   - **Once**: `true`.
   - **Actions**:
     - Card slides in: `{ x: 120, opacity: 0 }` -> `{ x: 0, opacity: 1 }`.
     - On completion, triggers button press animation into "Running" progress state.

---

## 🎨 Brand & Color Tokens

- **Primary Purple**: `#7C3AED`
- **Deep Purple**: `#4C1D95` / `#0C0418` / `#07010F`
- **Soft Violet**: `#EDE9FE` / `#C4B5FD`
- **Text on Dark**: Strictly white `#FFFFFF` with secondary at `rgba(255, 255, 255, 0.75)`
- **Typography**: Geist Sans only (no serif)
- **Accessibility**: All animations automatically bypassed if user has `prefers-reduced-motion` enabled.
