# SEO & Website Feature (`features/seo`)

## Overview
The **SEO & Website Command Center** monitors search engine visibility, Core Web Vitals, organic traffic trends, and crawler errors for DIYA AI workspaces. It provides automated keyword ranking tables, site health audits with 1-click auto-fixes, and a live Google SERP preview box with real-time character counter validation.

---

## 1. Architectural Structure
```
frontend/features/seo/
├── components/
│   ├── overview/
│   │   ├── SeoOverviewKpis.tsx
│   │   ├── SeoTrafficChart.tsx
│   │   ├── SeoRecommendations.tsx
│   │   └── SeoOverviewTab.tsx
│   ├── keywords/
│   │   └── SeoKeywordsTab.tsx
│   ├── audit/
│   │   └── SeoAuditTab.tsx
│   ├── pages/
│   │   └── SeoPagesTab.tsx
│   ├── SeoWorkspace.tsx
│   └── SeoView.tsx
├── hooks/
│   ├── useSeoOverview.ts
│   ├── useSeoKeywords.ts
│   ├── useSeoAudit.ts
│   └── useSeoPages.ts
├── services/
│   └── seo.service.ts
├── store/
│   └── seo.store.ts
├── constants.ts
├── mocks.ts
├── types.ts
└── README.md
```

---

## 2. Sub-Tabs & Workflows (`?tab=`)

1. **SEO Overview (`?tab=overview`)**:
   - High-level KPIs: Domain Health Score (88/100), Monthly Organic Visits (42,850), Tracked Keywords (348 queries), Google Indexed Pages (126 URLs).
   - Recharts dual-axis area chart with GSAP line draw showing 30-day organic clicks vs impressions.
   - High-impact DIYA SEO recommendations with 1-click jumps to fix workflows.
   - Dev State Switcher (`[Default | Loading | Empty | Error]`).
2. **Keyword Rankings (`?tab=keywords`)**:
   - KPI Strip: Top 3 Positions (42), Page 1 / Top 10 (118), Rank Improved (+24), Rank Dropped (-6).
   - Search query filter, Intent dropdown (Commercial, Informational, Transactional, Navigational), Ranking Tier dropdown (Top 3, Top 10, Striking Distance), and Sort by rank/volume.
   - Detailed keywords table with Google rank change pills (`▲ 2`, `▼ 1`), Search volume, KD% difficulty bars, and SERP feature badges.
   - "Track New Keyword" demo modal.
3. **Technical Site Audit (`?tab=audit`)**:
   - Overall technical score & Core Web Vitals (LCP: 1.8s, INP: 110ms, CLS: 0.04, TTFB: 380ms).
   - 4-step on-demand crawler simulation with progress indicator.
   - Categorized issue list (Critical, Warnings, Notices) with 1-click DIYA Auto-Fix demo modal.
4. **SERP & Meta Studio (`?tab=pages`)**:
   - Key landing page selector.
   - Interactive Google SERP snippet preview with **Desktop vs. Mobile** toggle.
   - Real-time Title and Meta Description inputs with character counter validation status badges.
   - "DIYA Auto-Optimize" button synthesizing optimal copy based on local market keywords.
   - "Save & Publish Meta Tags" demo action.

---

## 3. UI-Only Safeguards & Verification
- **Simulated Delays**: All mock service methods simulate 400–900ms real-world network latency.
- **Demo Disclaimers**: All destructive/publishing actions display transparent demo disclaimers (`"Demo mode: simulated auto-fix. In production, DIYA writes canonical tags to your repository"`).
- **Dev State Switcher**: Toolbar provides 1-click toggling between `Default`, `Loading`, `Empty`, and `Error` states.
