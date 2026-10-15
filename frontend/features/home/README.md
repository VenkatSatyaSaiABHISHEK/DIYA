# Home Feature — DIYA AI

The Home feature answers three essential questions for the business owner:
1. **How am I doing?** (Executive Hero insight + 4 KPI Metric Tiles + Performance Chart)
2. **What needs my decision?** (Needs your approval accordion list with confirmation dialog for budget updates)
3. **What is DIYA doing?** (DIYA autonomous activity stream with one-line live action logs)

---

## 🏛️ Layout Architecture (12-Column Bento Grid, Max Width 1600px)

- **Row 1: Hero (12 cols)** — `HomeHero`
  - Deep purple to violet gradient with ambient lighting (`rounded-[22px]`).
  - Serif greeting: `"Good morning, {first name}."`
  - Dynamic insight sentence generated from the live metrics.
  - Large glass Ask DIYA input box with 3 suggestion chips; submitting opens `/chat?q=...`.
  - Dotted globe (`GlobeOrb`) with status-driven glow.
- **Row 2: 4 Metric Tiles (3 cols each) OR Setup Checklist** — `MetricTile` / `SetupChecklist`
  - Connected state: Total Ad Spend, Leads, Cost Per Lead, Conversion Rate. Each tile features a big serif number, tiny sparkline with draw animation, and trend chip.
  - Setup state (`!isConnected`): Replaces tiles with `SetupChecklist` (Connect Meta Ads, Add brand info, Set your budget) with progress counter and zero numbers.
- **Row 3: "Needs your approval" (7 cols) + "DIYA activity" (5 cols)** — `ApprovalList` / `ActivityList`
  - `ApprovalList`: Max 3 rows. Priority dot + label, title, one-line reason, impact chip, and Approve / Dismiss buttons. Expands inline as an accordion to show "Why it matters" and "What will happen". Approving budget changes triggers a confirmation dialog. "View all" links to `/campaigns`.
  - `ActivityList`: Last 4 items only, one line each with category icon, status dot with tooltip, and timestamp. "View all" links to `/timeline`.
- **Row 4: "Performance" chart (7 cols) + "Top campaigns" (5 cols)** — `PerformanceChart` / `TopCampaigns`
  - `PerformanceChart`: Single-line title, Recharts area chart with purple gradient fill, Leads by default, segmented metric toggle (Leads / Spend / Conversions), and range picker (7D / 30D / 90D).
  - `TopCampaigns`: 3 compact rows showing platform tag, name, status badge, and key metric (ROAS / Leads). "View all campaigns" links to `/campaigns`.

---

## 🧩 Components

| Component | Description |
|---|---|
| `HomeHero` | Executive gradient card with serif greeting, dynamic insight, glass chat input, suggestion chips, and GlobeOrb |
| `MetricTile` | 20-24px rounded card with big serif number, GSAP count-up, tiny SVG sparkline, and trend chip |
| `ApprovalList` | Prioritized decisions with inline accordion expansion and budget confirmation dialog |
| `ActivityList` | Compact 4-row stream of autonomous AI actions with status dot tooltips |
| `PerformanceChart` | Area chart with soft violet gradient, segmented metric selector, and time range tabs |
| `TopCampaigns` | 3 compact campaign rows with platform badges, status pills, and ROAS numbers |
| `SetupChecklist` | Initial onboarding checklist with progress bar for disconnected accounts |
| `HomeSkeleton` | Shimmer skeleton placeholders matching each block for smooth staggered reveal |

---

## 📡 API Endpoints

1. `GET /home/metrics` — Core KPIs (spend, leads, CPL, conversion rate).
2. `GET /home/activities` — Autonomous agent action stream.
3. `GET /home/intelligence` — Proactive optimization opportunities.
4. `POST /home/intelligence/:id/action` — Approve or dismiss recommendations.
5. `GET /home/campaigns` — Cross-channel active marketing flights.
6. `GET /home/performance` — Time-series performance metrics.
