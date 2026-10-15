# DIYA AI — The AI Marketing Workforce Platform
> **Create. Advertise. Grow. Automatically.**  
> *One AI. Your Entire Marketing Workforce.*

DIYA AI by **Mentneo** is an enterprise-grade AI digital marketing employee platform. It is engineered so that any business owner can effortlessly run their complete digital marketing apparatus—planning, copywriting, ad generation, multi-platform campaign management, SEO, lead qualification, and performance analytics—without relying on external agencies or fragmented tools.

---

## 🛠 Technology Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Language**: TypeScript (Strict Mode, 0 `any` allowance)
- **Styling**: Tailwind CSS + Custom CSS Design Tokens & Glassmorphism (`tokens.css`, `glass.css`, `globals.css`)
- **Animations**: GSAP 3 + ScrollTrigger + `@gsap/react` (`useGSAP`) with strict cleanup and `prefers-reduced-motion` compliance
- **State Management**: Zustand
- **Icons**: Lucide React (`strokeWidth: 1.5`)
- **Data Visualization**: Recharts with GSAP vector animations
- **Typography**: Geist Sans & Mono (`next/font/google`)
- **Utilities**: `clsx` + `tailwind-merge` (`cn`), INR currency & compact formatters
- **Deployment**: Vercel-ready

---

## 🏛 System Architecture

The platform follows a modular, feature-first architecture decoupled from routing mechanics:

```
diya-ai/
├── frontend/
│   ├── app/
│   │   ├── (marketing)/page.tsx          # Placeholder landing
│   │   ├── (auth)/login/page.tsx         # Placeholder auth
│   │   ├── onboarding/page.tsx           # Placeholder onboarding
│   │   └── (app)/
│   │       ├── layout.tsx                # AppShell (Sidebar, Topbar, MobileNav)
│   │       ├── home/page.tsx             # Thin route for Home feature
│   │       ├── diya/page.tsx             # Thin route for DIYA Command Center
│   │       ├── campaigns/page.tsx        # Thin route for Campaigns
│   │       ├── content/page.tsx          # Thin route for Content
│   │       ├── seo/page.tsx              # Thin route for SEO & Website
│   │       ├── leads/page.tsx            # Thin route for Leads & CRM
│   │       ├── analytics/page.tsx        # Thin route for Analytics
│   │       └── settings/page.tsx         # Thin route for Settings & Integrations
│   ├── features/                         # Independent Domain Modules (Strict Isolation)
│   │   ├── home/                         # Fully implemented in Part 1
│   │   │   ├── components/               # MetricsRow, ActivityFeed, IntelligencePanel, CampaignCards, PerformanceChart
│   │   │   ├── hooks/                    # useHomeData.ts
│   │   │   ├── services/                 # home.service.ts
│   │   │   ├── types.ts                  # Typed request/response contracts
│   │   │   ├── mocks.ts                  # Realistic mock responses
│   │   │   ├── constants.ts              # Domain constants
│   │   │   └── README.md                 # Feature documentation & API contract
│   │   ├── diya/                         # Feature scaffold (Part 2)
│   │   ├── campaigns/                    # Feature scaffold (Part 3)
│   │   ├── content/                      # Feature scaffold (Part 4)
│   │   ├── seo/                          # Feature scaffold (Part 4)
│   │   ├── leads/                        # Feature scaffold (Part 5)
│   │   ├── analytics/                    # Feature scaffold (Part 5)
│   │   ├── settings/                     # Feature scaffold (Part 6)
│   │   ├── onboarding/                   # Feature scaffold (Part 6)
│   │   └── auth/                         # Feature scaffold (Part 6)
│   ├── components/
│   │   ├── ui/                           # Button, Card, GlassCard, Badge, Input, Select, Tabs, Modal, Drawer, Toast, Skeleton, EmptyState, Tooltip, Avatar, StatCard, DemoBadge
│   │   ├── layout/                       # AppShell, Sidebar, Topbar, MobileNav, AIStatus
│   │   └── brand/                        # Logo, AIOrb
│   ├── lib/
│   │   ├── api/                          # client.ts (fetch wrapper), endpoints.ts, errors.ts
│   │   ├── animations/                   # pageTransition.ts, countUp.ts, stagger.ts, drawLine.ts
│   │   ├── utils/                        # cn.ts, format.ts (INR, compact numbers)
│   │   └── env.ts                        # Type-safe, validated environment variables
│   ├── store/                            # ui.store.ts, ai-status.store.ts
│   ├── styles/                           # globals.css, tokens.css, glass.css
│   └── types/                            # shared.ts
├── docs/
│   └── API_CONTRACT.md                   # Consolidated API contract across all features
├── .env.example
└── README.md
```

### Architectural Invariants
1. **Thin Routing**: `app/` routes contain zero business logic. They simply mount feature components.
2. **Feature Isolation**: Features never import from sibling features (`features/home` never imports from `features/campaigns`). Common logic resides in `components/`, `lib/`, `store/`, or `types/`.
3. **Data Flow**: `Component` → `Hook` → `Service` → `lib/api/client`. Direct `fetch()` calls inside components or hooks are forbidden.
4. **Mock Transparency**: When `NEXT_PUBLIC_USE_MOCKS=true`, services return data from `mocks.ts`, and a visible **"Demo data"** badge is displayed. Mock data is never passed off as live business metrics.
5. **GSAP Hygiene**: All GSAP animations execute strictly inside client components within `useGSAP` hooks with automatic or explicit cleanup.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+ (Node 22 recommended)
- npm 10+

### 2. Environment Setup
```bash
# In frontend/ directory:
cp ../.env.example .env.local
```

Configure your `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.diya.mentneo.ai/v1
NEXT_PUBLIC_USE_MOCKS=true
AUTH_SECRET=your_32_character_auth_secret_key_here
```

### 3. Installation
```bash
cd frontend
npm install
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The default root redirects directly to the AppShell dashboard at `/home`.

---

## 📖 How to Add a New Feature or Endpoint

When extending the platform in subsequent phases (Parts 2-6), follow this rigorous step-by-step workflow:

### Step 1: Define API Contract & Types
1. In `features/<feature-name>/types.ts`, define the TypeScript request and response interfaces.
2. In `lib/api/endpoints.ts`, append the endpoint path constants:
   ```typescript
   export const API_ENDPOINTS = {
     // ...
     featureName: {
       list: '/feature-name',
       detail: (id: string) => `/feature-name/${id}`,
       action: (id: string) => `/feature-name/${id}/action`,
     },
   };
   ```
3. Update `docs/API_CONTRACT.md` and `features/<feature-name>/README.md` with the new route signature, query parameters, payload shapes, and approval requirements.

### Step 2: Add Realistic Mock Data
In `features/<feature-name>/mocks.ts`, create typed mock objects adhering exactly to the response contracts. Always test both populated and empty state variations.

### Step 3: Implement the Service Layer
In `features/<feature-name>/services/<feature-name>.service.ts`:
```typescript
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { env } from '@/lib/env';
import { mockFeatureData } from '../mocks';
import type { FeatureResponse } from '../types';

export const featureService = {
  async getData(): Promise<FeatureResponse> {
    if (env.NEXT_PUBLIC_USE_MOCKS) {
      return mockFeatureData;
    }
    return apiClient.get<FeatureResponse>(API_ENDPOINTS.featureName.list);
  },
};
```

### Step 4: Create a Dedicated React Hook
In `features/<feature-name>/hooks/use<FeatureName>.ts`, encapsulate loading, error, and data states:
```typescript
export function useFeatureData() {
  const [data, setData] = useState<FeatureResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fetch via featureService...
  return { data, loading, error, refetch };
}
```

### Step 5: Build UI Components
Inside `features/<feature-name>/components/`, implement:
- **Skeleton loading state** using `@/components/ui/Skeleton`
- **Empty state** using `@/components/ui/EmptyState`
- **Error state** with a retry trigger
- Main presentational views using `@/components/ui/` primitives

### Step 6: Expose Thin App Route
In `app/(app)/<feature-name>/page.tsx`:
```tsx
import { FeatureMainComponent } from '@/features/<feature-name>/components/FeatureMainComponent';

export default function FeaturePage() {
  return <FeatureMainComponent />;
}
```

---

## 🎨 Design Tokens & Visual Hierarchy

- **Primary Colors**:
  - `primary`: `#7C3AED` (Violet 600)
  - `primary-deep`: `#4C1D95` (Violet 900)
  - `primary-soft`: `#EDE9FE` (Violet 100)
  - `gradient`: `linear-gradient(135deg, #7C3AED, #A78BFA)`
- **Neutrals**:
  - Background: `#FAFAFC` (Cool Off-White)
  - Surface: `#FFFFFF`
  - Border: `#E4E4E7` (Zinc 200)
  - Text Primary: `#18181B` (Zinc 900)
  - Muted: `#71717A` (Zinc 500)
- **Glassmorphism**: Reserved for floating panels, sidebar, topbar, modal overlays, and the AI Orb container:
  - Background: `rgba(255, 255, 255, 0.65)`
  - Backdrop Blur: `blur(20px) saturate(160%)`
  - Border: `1px solid rgba(255, 255, 255, 0.6)`
  - Shadow: `0 8px 32px rgba(124, 58, 237, 0.10)`
