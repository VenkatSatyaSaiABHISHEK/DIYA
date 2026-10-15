# Analytics & Attribution Feature (`features/analytics`)

## Overview
The **Analytics & Attribution** workspace provides marketing leadership with algorithmic multi-touch attribution modeling, cross-channel ROAS benchmarking (Meta Ads vs. Google Ads), customer conversion journey paths, and full-funnel drop-off diagnostics.

---

## 1. Architectural Structure
```
frontend/features/analytics/
├── components/
│   ├── overview/
│   │   ├── AnalyticsKpiCards.tsx
│   │   ├── AnalyticsRevenueChart.tsx
│   │   └── AnalyticsOverviewTab.tsx
│   ├── attribution/
│   │   └── AttributionTab.tsx
│   ├── channels/
│   │   └── ChannelsTab.tsx
│   ├── funnel/
│   │   └── FunnelTab.tsx
│   ├── AnalyticsWorkspace.tsx
│   └── AnalyticsView.tsx
├── hooks/
│   ├── useAnalyticsOverview.ts
│   ├── useAttributionModel.ts
│   └── useChannelPerformance.ts
├── services/
│   └── analytics.service.ts
├── store/
│   └── analytics.store.ts
├── constants.ts
├── mocks.ts
├── types.ts
└── README.md
```

---

## 2. Sub-Tabs & Workflows (`?tab=`)

1. **Executive Overview (`?tab=overview`)**:
   - High-level KPIs: Attributed Pipeline Revenue (`₹38.4 Cr`, +24.8% MoM), Blended ROAS (`8.4x`), Customer Acquisition Cost (`₹18,450 / unit`, -22.4%), Total Inbound Inquiries (`184 leads` at average CPL of ₹640).
   - Recharts dual-gradient Area Chart showing 30-day Ad Spend vs. Pipeline Revenue with GSAP line draw animation.
   - DIYA Attribution Intelligence cards (Channel split insights, ₹30k budget scaling lift, and Saturday peak response velocity).
   - Dev State Switcher (`[Default | Loading | Empty | Error]`).
2. **Multi-Touch Attribution (`?tab=attribution`)**:
   - Attribution model switcher: **DIYA AI Data-Driven (Weighted)**, **First-Touch Discovery**, **Last-Touch Conversion**, and **Linear Even Split**.
   - Top customer conversion paths visualizer with multi-touch journey step pills (e.g. *Instagram Carousel &rarr; Villas Landing &rarr; FB Retargeting &rarr; Google Search &rarr; WhatsApp Site Booking*).
   - Average days to convert metric (12.4 days).
3. **Channel ROAS Matrix (`?tab=channels`)**:
   - Comparative channel cards for Meta Ads (Instagram & Facebook) vs. Google Ads (Search & PMax).
   - Detailed metrics table with Spend, Inbound Leads, Cost / Lead, Site Visits, Pipeline Revenue, and Blended ROAS.
4. **Conversion Funnel (`?tab=funnel`)**:
   - 6-Stage visual funnel: Impressions &rarr; Clicks & Visitors &rarr; Lead Inquiries &rarr; AI Qualified &rarr; Site Visits &rarr; Closed Booking Tokens.
   - Drop-off diagnostics pinpointing conversion bottlenecks with 1-click DIYA fix recommendations.

---

## 3. UI-Only Safeguards & Verification
- **Simulated Delays**: All mock service methods simulate 400–500ms network latency.
- **Demo Disclaimers**: All telemetry represents calibrated demonstration data.
- **Dev State Switcher**: Toolbar provides 1-click toggling between `Default`, `Loading`, `Empty`, and `Error` states.
