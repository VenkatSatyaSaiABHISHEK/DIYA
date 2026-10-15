# DIYA AI — Backend API Contract (v1)

This document establishes the official API contract between the **DIYA AI Frontend** and backend services.
Services adhere to strict JSON shapes, ISO 8601 timestamps, standardized error structures, and predictable HTTP status codes.

---

## 1. Global Standards

### 1.1 Base URL
- Production: `https://api.diya.mentneo.ai/v1`
- Staging: `https://staging-api.diya.mentneo.ai/v1`
- Local: `http://localhost:8000/v1`

### 1.2 Authentication
All protected routes require an HTTP Bearer Token header:
```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: application/json
Accept: application/json
```

### 1.3 Standard Response Envelope
All API endpoints return standard JSON responses:

```typescript
// Success Response
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    timestamp: string;      // ISO 8601
    requestId: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Error Response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;           // Machine-readable code e.g. "INTEGRATION_DISCONNECTED"
    message: string;        // Human-readable message
    details?: Record<string, unknown> | Array<{ field: string; message: string }>;
  };
}
```

---

## 2. Feature Endpoints

### 2.1 Home Feature

#### `GET /home/metrics`
Retrieves aggregated marketing performance KPIs for the business.
- **Query Params**:
  - `range`: `'7d' | '30d' | '90d' | 'ytd'` (default: `'30d'`)
- **Approval Required**: No
- **Response Data (`data`)**:
```typescript
interface HomeMetricsResponse {
  isConnected: boolean;              // false if Meta/Google ads accounts are not linked
  connectedPlatforms: string[];      // ['meta', 'google']
  currency: 'INR' | 'USD';
  metrics: {
    totalAdSpend: {
      value: number;
      previousValue: number;
      changePercentage: number;
    };
    leadsGenerated: {
      value: number;
      previousValue: number;
      changePercentage: number;
    };
    costPerLead: {
      value: number;
      previousValue: number;
      changePercentage: number;
    };
    conversionRate: {
      value: number;              // percentage 0 - 100
      previousValue: number;
      changePercentage: number;
    };
  };
}
```

#### `GET /home/activities`
Retrieves recent autonomous activities executed or logged by DIYA AI.
- **Query Params**:
  - `limit`: number (default: 10)
- **Approval Required**: No
- **Response Data (`data`)**:
```typescript
interface HomeActivityItem {
  id: string;
  timestamp: string;              // ISO 8601
  title: string;
  description: string;
  category: 'campaign' | 'creative' | 'optimization' | 'seo' | 'lead';
  status: 'completed' | 'in_progress' | 'scheduled' | 'requires_action';
  impact?: string;
}

type HomeActivitiesResponse = HomeActivityItem[];
```

#### `GET /home/intelligence`
Retrieves DIYA AI's high-priority recommendations, market opportunities, and detected anomalies.
- **Approval Required**: No
- **Response Data (`data`)**:
```typescript
interface HomeIntelligenceItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  whyItMatters: string;
  impactMetric: string;           // e.g. "Estimated +18% ROI"
  recommendedAction: string;
  actionType: 'approve_budget' | 'launch_variant' | 'pause_underperforming' | 'scale_winner';
  status: 'pending' | 'approved' | 'dismissed';
  createdAt: string;
}

type HomeIntelligenceResponse = HomeIntelligenceItem[];
```

#### `POST /home/intelligence/:id/action`
Approve or reject a DIYA AI proactive recommendation.
- **Approval Required**: Yes (Mutating marketing state)
- **Request Body**:
```typescript
interface HomeIntelligenceActionRequest {
  action: 'approve' | 'dismiss';
  notes?: string;
}
```
- **Response Data (`data`)**:
```typescript
interface HomeIntelligenceActionResponse {
  id: string;
  status: 'approved' | 'dismissed';
  appliedAt: string;
  message: string;
}
```

#### `GET /home/campaigns`
Retrieves active cross-platform campaigns managed by DIYA AI.
- **Approval Required**: No
- **Response Data (`data`)**:
```typescript
interface HomeCampaignItem {
  id: string;
  name: string;
  platform: 'meta' | 'google' | 'instagram' | 'linkedin';
  objective: 'Lead Generation' | 'Conversions' | 'Brand Awareness' | 'Sales';
  status: 'recommendation' | 'draft' | 'approved' | 'live';
  spend: number;
  leads: number;
  costPerLead: number;
  roas: number;
  budgetDaily: number;
  updatedAt: string;
}

type HomeCampaignsResponse = HomeCampaignItem[];
```

#### `GET /home/performance`
Retrieves historical time-series performance data for charts.
- **Query Params**:
  - `range`: `'7d' | '30d' | '90d'` (default: `'30d'`)
- **Approval Required**: No
- **Response Data (`data`)**:
```typescript
interface PerformanceTimeSeriesPoint {
  date: string;                   // 'YYYY-MM-DD' or 'DD MMM'
  spend: number;                  // Currency value
  leads: number;                  // Count
  conversions: number;            // Count
}

type HomePerformanceResponse = PerformanceTimeSeriesPoint[];
```

---

### 2.2 DIYA Core & AI Employee Command Center (Part 2)

#### `GET /diya/status`
Retrieves live autonomous AI workforce status, current task execution, and daily metric tallies.
- **Approval Required**: No
- **Response Data (`data`)**:
```typescript
interface DiyaStatusResponse {
  status: 'idle' | 'analyzing' | 'planning' | 'creating' | 'optimizing' | 'running' | 'awaiting_approval';
  currentTask: string;
  uptimeSeconds: number;
  tasksCompletedToday: number;
  tasksAwaitingApprovalToday: number;
}
```

#### `POST /diya/command`
Streams conversational responses or structured marketing operations blocks.
- **Approval Required**: No
- **Request Body**:
```typescript
interface DiyaCommandRequest {
  prompt: string;
  language?: 'en' | 'te' | 'hi';
  context?: Record<string, unknown>;
}
```
- **Response Data (`data`)**:
```typescript
interface DiyaCommandResponse {
  blocks: Block[]; // text, plan, timeline, campaignPreview, creativePreview, report, approval
}
```

#### `POST /diya/plans/:id/approve`
Approves and authorizes an autonomous operational campaign flight.
- **Approval Required**: Yes (Financial & Campaign deployment authorization)
- **Response Data (`data`)**: `{ success: boolean; message: string }`

#### `POST /diya/plans/:id/reject`
Rejects proposed plan and prompts DIYA to prepare alternative parameters.
- **Approval Required**: No
- **Response Data (`data`)**: `{ success: boolean; message: string }`

#### `POST /diya/strategies/generate`
Generates a complete 30-day omnichannel marketing strategy.
- **Approval Required**: No
- **Request Body**: `StrategyInput`
- **Response Data (`data`)**: `StrategyOutput` (personas, channel split, budget distribution, 30-day roadmap, forecasts).

#### `GET /diya/automations`
Lists configured autonomous background trigger recipes and execution logs.
- **Approval Required**: No
- **Response Data (`data`)**: `Automation[]`

#### `POST /diya/automations/:id/toggle`
Pauses or activates an automated background marketing rule.
- **Approval Required**: No
- **Response Data (`data`)**: `{ success: boolean }`

#### `GET /diya/runs`
Retrieves task execution timeline runs and step log traces.
- **Approval Required**: No
- **Response Data (`data`)**: `TimelineRun[]`

### 2.3 Campaigns Feature (Part 3)

#### `GET /campaigns`
List all advertising campaigns across connected ad networks (Meta, Google, Omnichannel).
- **Query Params**:
  - `search`: string
  - `platform`: `'meta' | 'google' | 'linkedin' | 'omnichannel' | 'all'`
  - `status`: `'recommendation' | 'draft' | 'approved' | 'live' | 'paused' | 'completed' | 'all'`
  - `sortBy`: `'recent' | 'spend_high' | 'leads_high' | 'cpl_low'`
- **Approval Required**: No
- **Response Data (`data`)**: `Campaign[]`

#### `GET /campaigns/:id`
Retrieves detailed campaign performance history, ad sets, creatives, and activity log.
- **Approval Required**: No
- **Response Data (`data`)**: `Campaign`

#### `POST /campaigns/create`
Creates a new campaign draft from the launch wizard.
- **Approval Required**: No (Draft state)
- **Request Body**: `LaunchDraft`
- **Response Data (`data`)**: `Campaign`

#### `PUT /campaigns/:id/draft`
Auto-saves an in-progress launch draft.
- **Approval Required**: No
- **Request Body**: `Partial<LaunchDraft>`
- **Response Data (`data`)**: `{ success: boolean, lastSavedAt: string }`

#### `POST /campaigns/:id/approve`
Approves a recommended or draft campaign for launch readiness.
- **Approval Required**: Yes (Business Owner)
- **Response Data (`data`)**: `{ success: boolean, status: 'approved' }`

#### `POST /campaigns/:id/launch`
Deploys a campaign live onto the advertising network.
- **Approval Required**: **YES (Explicit Confirmation Modal + Monetary Cap)**
- **Request Body**: `{ authorizedBudgetINR: number }`
- **Response Data (`data`)**: `{ success: boolean, status: 'live', message: string }`

#### `POST /campaigns/:id/pause`
Pauses live campaign spend on connected ad networks.
- **Approval Required**: No
- **Response Data (`data`)**: `{ success: boolean, status: 'paused' }`

#### `PUT /campaigns/:id/budget`
Updates or increases daily spend cap for an active campaign flight.
- **Approval Required**: **YES (Explicit Confirmation Modal for Financial Increases)**
- **Request Body**: `{ newDailyBudgetINR: number }`
- **Response Data (`data`)**: `{ success: boolean, updatedBudgetINR: number }`

#### `POST /campaigns/studio/generate`
Generates creative copy variations, headlines, and angles from a creative brief.
- **Approval Required**: No
- **Request Body**: `StudioBrief`
- **Response Data (`data`)**: `GeneratedCopy`

#### `POST /campaigns/studio/variations`
Generates additional creative angles from a base primary text.
- **Approval Required**: No
- **Request Body**: `{ baseCopy: string }`
- **Response Data (`data`)**: `CreativeVariation[]`

#### `POST /campaigns/studio/:id/approve`
Marks a creative variation as approved for campaign deployment.
- **Approval Required**: No
- **Response Data (`data`)**: `{ success: boolean, status: 'approved' }`

#### `POST /campaigns/studio/:id/export`
Exports asset package (PNG, MP4, PDF, Text) for distribution.
- **Approval Required**: No
- **Request Body**: `{ format: 'png' | 'mp4' | 'pdf' | 'text' }`
- **Response Data (`data`)**: `{ success: boolean, message: string }`

### 2.4 Content & Creatives (Part 4)

#### `GET /content/posts`
Retrieves generated marketing posts, carousels, reel scripts, and scheduled social flights.
- **Query Params**:
  - `channel`: `'instagram' | 'linkedin' | 'facebook' | 'twitter' | 'youtube' | 'all'`
  - `format`: `'carousel' | 'reel_script' | 'single_image' | 'article' | 'ad_copy' | 'all'`
  - `status`: `'draft' | 'needs_approval' | 'scheduled' | 'published' | 'all'`
  - `sortBy`: `'latest' | 'score' | 'scheduled'`
- **Approval Required**: No
- **Response Data (`data`)**: `ContentPost[]`

#### `GET /content/posts/:id`
Retrieves single post detail, slide copy breakdown, or reel timestamp cues.
- **Approval Required**: No
- **Response Data (`data`)**: `ContentPost`

#### `POST /content/generate`
Synthesizes a complete multi-format content asset (carousels, reel scripts, copy) based on audience persona and tone.
- **Approval Required**: No
- **Request Body**: `GeneratorBrief`
- **Response Data (`data`)**: `ContentPost`

#### `POST /content/posts/:id/schedule`
Updates publishing date and time for a scheduled social media post.
- **Approval Required**: No
- **Request Body**: `{ newDate: string }`
- **Response Data (`data`)**: `ContentPost`

#### `POST /content/posts/:id/approve`
Approves a draft content post for deployment.
- **Approval Required**: Yes (Business Owner / Marketing Lead)
- **Response Data (`data`)**: `ContentPost`

#### `DELETE /content/posts/:id`
Deletes an unneeded content post or draft.
- **Approval Required**: No
- **Response Data (`data`)**: `{ success: boolean }`

#### `GET /content/hooks`
Retrieves curated viral hooks and copywriting frameworks library.
- **Approval Required**: No
- **Response Data (`data`)**: `HookTemplate[]`

---

### 2.5 SEO & Website (Part 4)

#### `GET /seo/overview`
Retrieves overall domain health score, monthly organic visits, tracked keywords summary, and 30-day traffic points.
- **Approval Required**: No
- **Response Data (`data`)**: `SeoOverviewData`

#### `GET /seo/keywords`
Retrieves tracked search queries with Google rank positions, monthly search volumes, and difficulty scores.
- **Query Params**:
  - `search`: string
  - `intent`: `'commercial' | 'informational' | 'transactional' | 'navigational' | 'all'`
  - `rankingTier`: `'top3' | 'top10' | 'striking' | 'all'`
  - `sortBy`: `'rank' | 'volume' | 'difficulty'`
- **Approval Required**: No
- **Response Data (`data`)**: `SeoKeywordItem[]`

#### `GET /seo/vitals`
Retrieves field Core Web Vitals telemetry (LCP, INP, CLS, TTFB) from Google CrUX report.
- **Approval Required**: No
- **Response Data (`data`)**: `CoreWebVitals`

#### `GET /seo/audit/issues`
Retrieves technical crawler issues categorized by severity (`critical`, `warning`, `notice`).
- **Approval Required**: No
- **Response Data (`data`)**: `SeoAuditIssue[]`

#### `POST /seo/audit/run`
Triggers an on-demand full website crawler audit across sitemap URLs.
- **Approval Required**: No
- **Response Data (`data`)**: `{ issuesFound: number, healthScore: number }`

#### `POST /seo/audit/autofix`
Autonomously resolves an on-page technical issue (e.g. injecting canonical tag or schema markup).
- **Approval Required**: Yes
- **Request Body**: `{ issueId: string }`
- **Response Data (`data`)**: `{ success: boolean }`

#### `GET /seo/pages`
Retrieves monitored website landing pages with title tags, meta descriptions, and schema types.
- **Approval Required**: No
- **Response Data (`data`)**: `SeoPageMeta[]`

#### `PUT /seo/pages/:id`
Updates title, meta description, and schema markup for a landing page.
- **Approval Required**: Yes (CMS Publish)
- **Request Body**: `Partial<SeoPageMeta>`
- **Response Data (`data`)**: `SeoPageMeta`

#### `GET /seo/recommendations`
Retrieves DIYA AI autonomous high-impact search engine opportunities.
- **Approval Required**: No
- **Response Data (`data`)**: `SeoRecommendation[]`

### 2.6 Leads & CRM (Part 5)

#### `GET /leads`
Retrieves inbound prospects captured across Meta Lead Ads, Google Search PMax, landing pages, and WhatsApp chats.
- **Query Params**:
  - `search`: string
  - `stage`: `'new' | 'contacted' | 'qualified' | 'site_visit' | 'negotiation' | 'converted' | 'all'`
  - `source`: `'meta' | 'google' | 'landing_page' | 'whatsapp' | 'all'`
  - `tier`: `'hot' | 'warm' | 'cold' | 'all'`
  - `sortBy`: `'score' | 'recent' | 'budget'`
- **Approval Required**: No
- **Response Data (`data`)**: `LeadRecord[]`

#### `GET /leads/:id`
Retrieves full prospect profile, AI qualification score breakdown, property preferences, and activity audit timeline.
- **Approval Required**: No
- **Response Data (`data`)**: `LeadRecord`

#### `PUT /leads/:id/stage`
Updates the pipeline stage for a prospect (e.g. advancing from Qualified to Site Visit Booked).
- **Approval Required**: No
- **Request Body**: `{ stage: LeadStage }`
- **Response Data (`data`)**: `LeadRecord`

#### `POST /leads/export`
Exports selected leads or entire directory to external CRM or CSV file.
- **Approval Required**: Yes (Data Export)
- **Request Body**: `{ leadIds: string[], destination: 'hubspot' | 'salesforce' | 'zoho' | 'csv' }`
- **Response Data (`data`)**: `{ exportedCount: number, message: string }`

#### `GET /leads/integrations`
Retrieves status of CRM integrations (HubSpot, Salesforce, Zoho, LeadSquared, Google Sheets).
- **Approval Required**: No
- **Response Data (`data`)**: `CrmIntegrationStatus[]`

#### `POST /leads/integrations/:provider/connect`
Simulates OAuth authorization with a CRM provider.
- **Approval Required**: Yes
- **Response Data (`data`)**: `{ success: boolean }`

---

### 2.7 Analytics & Attribution (Part 5)

#### `GET /analytics/overview`
Retrieves executive marketing performance KPIs: total attributed pipeline revenue, blended ROAS, customer acquisition cost, and 30-day spend vs. revenue trends.
- **Query Params**:
  - `timeRange`: `'7d' | '30d' | '90d' | 'ytd'` (default: `'30d'`)
- **Approval Required**: No
- **Response Data (`data`)**: `AnalyticsOverviewData`

#### `GET /analytics/attribution/paths`
Retrieves top customer multi-touch conversion journeys and touchpoint attribution splits.
- **Query Params**:
  - `model`: `'data_driven' | 'first_touch' | 'last_touch' | 'linear'`
- **Approval Required**: No
- **Response Data (`data`)**: `ConversionPath[]`

#### `GET /analytics/channels`
Retrieves comparative cross-channel matrix contrasting Meta Ads vs. Google Ads.
- **Approval Required**: No
- **Response Data (`data`)**: `ChannelPerformanceItem[]`

#### `GET /analytics/funnel`
Retrieves full 6-stage marketing and sales conversion funnel metrics with bottleneck diagnostics.
- **Approval Required**: No
- **Response Data (`data`)**: `FunnelStageData[]`

### 2.8 Settings & Integrations (Planned Part 6)
- `GET /settings/integrations`: Connection status of Meta Ads, Google Ads, GA4, Shopify, etc.
- `POST /settings/integrations/:provider/connect`: Initiate OAuth connection.
- `DELETE /settings/integrations/:provider/disconnect`: Revoke platform token.
- `GET /settings/business`: Business profile, industry, target audience definition.
- `PUT /settings/business`: Update brand guidelines, tone of voice, budget caps.

### 2.9 Onboarding & Auth (Planned Part 6)
- `POST /auth/login`: User credentials authentication.
- `POST /auth/refresh`: Refresh expired JWT session.
- `GET /auth/me`: Authenticated user profile and workspace permissions.
- `POST /onboarding/setup`: Initial multi-step business setup wizard.
