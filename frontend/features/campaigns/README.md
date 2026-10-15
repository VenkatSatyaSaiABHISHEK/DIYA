# Campaigns Feature — Omnichannel Ad Operations & Ad Studio (Part 3)

The **Campaigns** feature manages cross-channel advertising operations across **Meta Ads (Instagram & Facebook)**, **Google Ads (Search & Performance Max)**, and **Omnichannel flights**. It provides a real-time campaign dashboard, an end-to-end 6-step campaign launch engine with budget guardrails, and an interactive **AI Ad Studio** for multi-placement creative synthesis.

---

## 🏗 Sub-Tabs & Architecture

The feature is accessible at `/campaigns` and synchronized with URL search params (`?tab=all|launch|studio`):

### 1. All Campaigns (`?tab=all`)
- **Summary Chips**: Real-time count pills for Total, Live Active, Drafts, Pending Approval, and Paused.
- **Search & Filtering**: Live search by name or audience, platform filter, status filter, objective filter, and sorting (Recent, Spend, Leads, CPL).
- **Presentation Modes**: Toggle between visual **Card Grid View** (with Recharts/SVG sparklines and GSAP entry stagger) and dense **Table View**.
- **Performance Health Indicators**: Explicit text badges (`On Track`, `Needs Attention`, `Underperforming`).
- **DIYA Operational Recommendations**: Underperforming campaigns display an inline recommendation strip outlining the diagnosis, impact, and a 1-click strategic fix.
- **Compare Mode**: Checkbox selection on 2–3 campaigns triggers a floating glass side-by-side comparison panel displaying Spend, Impressions, Clicks, CTR, CPC, Leads, CPL, and ROAS.
- **Campaign Detail Drawer**: Slide-over glass drawer with 7-day lead & spend trajectory chart (Recharts with GSAP entrance), ad sets breakdown, creative copy previews, and audit activity logs.

### 2. Launch Flow Engine (`?tab=launch`)
A 6-step guided campaign creation wizard:
1. **Goal & Network**: Campaign name, marketing objective (Leads, Conversions, Awareness, Traffic), ad network selection, and strategic brief.
2. **Target Audience**: Geo-clustering tags, age demographic range slider (18–65), gender, communication languages, and interest tags with DIYA recommendation prefill.
3. **Budget & Schedule**: Daily vs Lifetime pacing, INR amount quick chips (₹5,000 / ₹15,000 / ₹30,000 / ₹60,000), flight duration slider, and live forecast range explicitly labeled *"Estimate, not guaranteed"* with transparent assumptions.
4. **Creative Copy**: Headline, primary caption, CTA selector, and live sponsored feed mockup.
5. **Attribution Tracking**: Conversion destination (Meta Instant Form, Landing Page, WhatsApp CRM), Pixel status verification (Not verified alert), UTM parameter builder with live URL generator, and form fields.
6. **Review & Launch**: Pre-flight audit checklist with status warnings, section summaries with jump-to-edit links, and launch button triggering `ConfirmActionModal`.

### 3. AI Ad Studio (`?tab=studio`)
A 3-panel creative layout engine (stacked on desktop, tabbed on mobile):
- **Left Panel (Creative Brief & Brand Kit)**: Prompt input, core offer hook, audience targeting, language, brand tone, brand color palette pickers, font selector, "Use Brand Knowledge" prefill, and format chips (Feed, Story, Reel, Carousel, Google Display). "Generate Creative" triggers an animated 4-step synthesis sequence.
- **Center Panel (Interactive Canvas Preview)**: Placement switcher for Instagram Feed (1:1), Story (9:16), Reel Video Script (9:16), Facebook Feed, and Google Display (300x250). Displays a CSS-built device mockup with abstract brand gradient art (no stock photography, no copyrighted logos) labeled with a prominent *"Preview only"* badge. Features inline copy editing, regeneration, variation creation, approval, and export simulation.
- **Right Panel (Copy Matrix & Platform Specs)**: 5 headline variations, 3 primary text angles, CTA chips, local hashtag matrix, platform character limit counters with truncation warnings, and approved variation registry.

---

## 📡 API Contract & Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/campaigns` | List all campaigns with spend, leads, CPL, and status |
| `GET` | `/campaigns/:id` | Fetch full campaign detail, performance history, ad sets, and audit logs |
| `POST` | `/campaigns/create` | Create a draft campaign from the launch flow |
| `PUT` | `/campaigns/:id/draft` | Auto-save draft campaign parameters in progress |
| `POST` | `/campaigns/:id/approve` | Approve a recommended or draft campaign |
| `POST` | `/campaigns/:id/launch` | Authorize live flight deployment with budget cap |
| `POST` | `/campaigns/:id/pause` | Pause an active campaign flight |
| `PUT` | `/campaigns/:id/budget` | Update or increment daily spend cap |
| `POST` | `/campaigns/studio/generate` | Synthesize creative variations from a studio brief |
| `POST` | `/campaigns/studio/variations`| Create additional creative copy angles |
| `POST` | `/campaigns/studio/:id/approve`| Mark a creative variation as approved |
| `POST` | `/campaigns/studio/:id/export` | Export asset package (PNG, MP4, PDF, Text) in demo sandbox |

---

## 🛡 High-Impact Action Safeguards

Any action involving live advertising networks or monetary expenditure strictly requires explicit user sign-off via `ConfirmActionModal`:
- **Real Money Warning**: Clear visual indicator that live payment methods will be engaged in production.
- **Spend Guardrail**: Explicit INR budget caps displayed with transparent flight duration.
- **Mandatory Checkbox Agreement**: The launch confirmation button remains disabled until the user manually checks *"I approve this campaign configuration and authorized budget"*.
- **Demo Mode Transparency**: In this prototype, confirmation triggers a labeled simulation flow concluding with *"Demo mode: no campaign was created or published on Meta Ads. No money was spent."*

---

## 🎨 UI States Handled

- **Default State**: Rich, realistic Indian real estate marketing dataset (West Hyderabad Kokapet Sky Villas scenario).
- **Loading State**: Animated skeleton cards simulating network latency.
- **Empty State**: Friendly `EmptyState` component with direct buttons to ask DIYA to plan a campaign or launch a new flight, plus a "Reset Demo Campaigns" button.
- **Error State**: Resilient error banner with a "Retry Connection" recovery action.
- **Dev Toggle**: Built-in developer switcher in the toolbar (`Dev: [Default / Loading / Empty / Error]`) for instantaneous verification of all interface states.
