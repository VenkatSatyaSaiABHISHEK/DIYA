# Content & Creatives Feature (`features/content`)

## Overview
The **Content & Creatives Studio** is an autonomous marketing synthesis engine within DIYA AI. It enables business owners and marketing directors to generate high-retention multi-slide Instagram carousels, 60-second viral reel cues, LinkedIn thought-leadership essays, and direct-response ad copy tailored for the Indian market (Hyderabad/Bengaluru tech corridors).

---

## 1. Architectural Structure
```
frontend/features/content/
├── components/
│   ├── posts/
│   │   ├── ContentSummaryChips.tsx
│   │   ├── ContentToolbar.tsx
│   │   ├── ContentPostCard.tsx
│   │   ├── ContentPostTable.tsx
│   │   ├── ContentDetailDrawer.tsx
│   │   └── PostsView.tsx
│   ├── calendar/
│   │   └── ContentCalendarView.tsx
│   ├── generator/
│   │   └── ContentGeneratorView.tsx
│   ├── library/
│   │   └── ContentLibraryView.tsx
│   ├── ContentWorkspace.tsx
│   └── ContentView.tsx
├── hooks/
│   ├── useContentPosts.ts
│   ├── useContentCalendar.ts
│   └── useContentGenerator.ts
├── services/
│   └── content.service.ts
├── store/
│   └── content.store.ts
├── constants.ts
├── mocks.ts
├── types.ts
└── README.md
```

---

## 2. Sub-Tabs & Workflows (`?tab=`)

1. **Posts & Creatives Matrix (`?tab=posts`)**:
   - Summary filter chips: `Total`, `Scheduled`, `Published (Mock)`, `Needs Approval`, `Drafts`.
   - Visual mockups with gradient artwork, slide counters with live card navigation, and 60s reel scene badges.
   - Search, multi-channel filters (Instagram, LinkedIn, Facebook, X, YouTube Shorts), format filters, and sort options.
   - Grid / Table view toggle.
   - Detail drawer with full caption copy tools, slide-by-slide copy viewer, and reel timecode breakdown.
   - Demo Reschedule modal with simulated IST time slots.
2. **Publishing Calendar (`?tab=calendar`)**:
   - Interactive monthly grid (October 2026) with channel-colored post pills and `🔥 7:30 PM` optimal engagement time badges.
   - Side inspector panel detailing flights scheduled for selected date.
   - 1-click shortcut to launch generator with that date preselected.
3. **AI Content Studio (`?tab=generator`)**:
   - 2-panel studio: creative brief inputs (topic, persona, language: English/Telugu/Hindi, tone, format) on left; interactive canvas on right.
   - 4-step labeled simulation: *Analyzing audience -> Synthesizing hooks -> Generating narrative -> Applying brand kit*.
   - Live editable canvas for carousels and reel scripts.
   - Demo export modal for PNG, PDF, and Text.
4. **Hooks & Brand Kit Library (`?tab=library`)**:
   - Curated proven hook matrix (Negative Urgency, Contrarian, Data-Driven, Curiosity Gap, Social Proof).
   - 1-click *"Use in Studio"* button that feeds the prompt directly into the AI Studio.

---

## 3. UI-Only Safeguards & Verification
- **Simulated Delays**: All mock service methods simulate 400–900ms real-world network latency.
- **Demo Disclaimers**: Every action (schedule, export, approve, generate) displays clear demo disclaimers (`"Demo mode: no real social media account was updated"`, `"Demo content: sample structured data, not a real AI model"`).
- **Dev State Switcher**: Toolbar provides 1-click toggling between `Default`, `Loading`, `Empty`, and `Error` states.
