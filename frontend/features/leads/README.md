# Leads & CRM Feature (`features/leads`)

## Overview
The **Leads & CRM Pipeline** within DIYA AI automatically captures, qualifies, scores, and routes high-intent real estate prospects from Meta Lead Ads, Google Search PMax campaigns, website landing pages, and direct WhatsApp chats.

---

## 1. Architectural Structure
```
frontend/features/leads/
├── components/
│   ├── pipeline/
│   │   └── LeadsPipelineBoard.tsx
│   ├── directory/
│   │   ├── LeadsSummaryChips.tsx
│   │   ├── LeadsToolbar.tsx
│   │   ├── LeadsDirectoryTable.tsx
│   │   └── LeadsExportModal.tsx
│   ├── qualification/
│   │   └── LeadsQualificationTab.tsx
│   ├── sync/
│   │   └── LeadsSyncTab.tsx
│   ├── drawer/
│   │   └── LeadDetailDrawer.tsx
│   ├── LeadsWorkspace.tsx
│   └── LeadsView.tsx
├── hooks/
│   ├── useLeadsPipeline.ts
│   └── useLeadsDirectory.ts
├── services/
│   └── leads.service.ts
├── store/
│   └── leads.store.ts
├── constants.ts
├── mocks.ts
├── types.ts
└── README.md
```

---

## 2. Sub-Tabs & Workflows (`?tab=`)

1. **Kanban Pipeline (`?tab=pipeline`)**:
   - 6 stages: `New Leads`, `AI Contacted`, `Verified Qualified`, `Site Visit Booked`, `Token / Offer`, `Converted / Won`.
   - Live stage total value in Indian Crores (e.g. `₹18.4 Cr`).
   - Drag & drop / 1-click stage advancement buttons.
   - Lead cards with qualification score badges, channel origin, and company role.
2. **Lead Directory (`?tab=directory`)**:
   - Filter pills (`Total`, `Site Visits`, `Negotiation`, `Converted`).
   - Search input, channel filter, tier filter (Hot, Warm, Cold), and sort options.
   - Dense table with multi-select checkbox batching.
   - Batch Export to CSV / CRM Demo modal (HubSpot, Salesforce, Zoho, CSV).
3. **DIYA AI Telemetry & Qualification (`?tab=qualification`)**:
   - 4-pillar qualification model (Timeline, Budget, Employment/NRI, Channel Engagement).
   - "Run Auto-Qualification Scan" 4-step simulation.
   - High-priority Hot Leads Watchlist.
4. **CRM Sync Hub (`?tab=sync`)**:
   - Status cards for HubSpot, Salesforce, Zoho CRM, LeadSquared, and Google Sheets.
   - 1-click "Connect Integration" demo modal with simulated field mapping.
5. **Slide-Over Profile Drawer**:
   - Complete contact telemetry, AI qualification reasoning, activity audit log, and stage selector.

---

## 3. UI-Only Safeguards & Verification
- **Simulated Delays**: All mock service methods simulate 400–750ms network latency.
- **Demo Disclaimers**: All export and connection actions display clear demo notices (`"Demo mode: export is simulated. No real CRM records were synced or files downloaded"`).
- **Dev State Switcher**: Toolbar provides 1-click toggling between `Default`, `Loading`, `Empty`, and `Error` states.
