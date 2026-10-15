# DIYA Feature — Interactive AI Marketing Employee (Part 2)

The **DIYA Tab** is the direct command center for your autonomous digital marketing manager. DIYA is designed to act like a senior digital marketing employee—not a chatbot—turning executive goals into structured plans, generating 30-day strategies, executing background automations, and providing live execution telemetry.

---

## 📡 API Endpoints

### 1. Command & Chat Operations

#### `GET /diya/status`
- **Method**: `GET`
- **Approval Required**: No
- **Response**:
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
- **Method**: `POST`
- **Approval Required**: No
- **Request Body**:
```typescript
{
  prompt: string;
  language?: 'en' | 'te' | 'hi';
  context?: Record<string, unknown>;
}
```
- **Response**: Streams chunks or returns `{ blocks: Block[] }`.

#### `POST /diya/plans/:id/approve`
- **Method**: `POST`
- **Approval Required**: **Yes** (Authorizes ad spend & draft campaign assembly)
- **Response**: `{ success: boolean; message: string }`

#### `POST /diya/plans/:id/reject`
- **Method**: `POST`
- **Approval Required**: No
- **Response**: `{ success: boolean; message: string }`

#### `POST /diya/steps/:id/approve`
- **Method**: `POST`
- **Approval Required**: **Yes**
- **Response**: `{ success: boolean; message: string }`

#### `POST /diya/steps/:id/retry`
- **Method**: `POST`
- **Approval Required**: No
- **Response**: `{ success: boolean; message: string }`

---

### 2. Strategy Engine

#### `POST /diya/strategies/generate`
- **Method**: `POST`
- **Approval Required**: No
- **Request Body**: `StrategyInput`
```typescript
interface StrategyInput {
  businessName: string;
  industry: string;
  productsServices: string;
  targetAudience: string;
  locations: string;
  marketingObjectives: string[];
  monthlyBudgetINR: number;
  preferredPlatforms: ('meta' | 'google' | 'linkedin')[];
  brandPositioning: string;
  competitors: string;
}
```
- **Response**: `ApiResponse<StrategyOutput>` (personas, channel donuts, budget distribution bar chart, 30-day roadmap, transparent forecast estimates).

---

### 3. Workflow Automations

#### `GET /diya/automations`
- **Method**: `GET`
- **Response**: `ApiResponse<Automation[]>`

#### `POST /diya/automations/:id/toggle`
- **Method**: `POST`
- **Response**: `{ success: boolean }`

---

### 4. Task Execution Timeline

#### `GET /diya/runs`
- **Method**: `GET`
- **Response**: `ApiResponse<TimelineRun[]>`

---

## 🎨 UI States Handled

| State | Implementation |
|---|---|
| **Streaming / Generating** | Real-time token append with blinking violet caret and explicit `Stop` button. |
| **Loading** | Skeletons for strategy charts, automation cards, and timeline traces. |
| **Empty State** | Welcome card with 7 one-click prompt chips + Brand Knowledge callout. |
| **Missing Integration** | Clear "Needs Meta Ads connection" badge with link to Settings. No simulated fake success. |
| **Error Handling** | In-message red error banners with immediate `Retry` action. |

---

## 🛡 Actions Requiring User Approval

1. **Deploying Live Paid Campaigns**:
   - Triggers `ApprovalModal` stating exact ad account, daily budget cap in INR, and risk level.
2. **Budget Increases & High-Impact Scaling**:
   - Modifying ad flight allocations > ₹5,000.
3. **Publishing Live Content**:
   - Pushing ad creatives to connected client social profiles.

---

## 🏷 Item State Model

Every action, step, and campaign item tracks its lifecycle through distinct badges:
`Recommendation` → `Draft` → `Approved` → `Running` → `Completed` (or `Failed` / `Rejected`).
Never displays `Completed` unless confirmed through live backend execution.
