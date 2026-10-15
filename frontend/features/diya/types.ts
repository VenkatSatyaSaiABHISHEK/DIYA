import type { AdPlatform, CampaignStatus, AIWorkStatus } from '@/types/shared';

export type RunStatus =
  | 'pending'
  | 'running'
  | 'awaiting_approval'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type StepType =
  | 'analysis'
  | 'creative'
  | 'campaign'
  | 'report'
  | 'publish';

export type PlanStepState =
  | 'recommendation'
  | 'draft'
  | 'approved'
  | 'running'
  | 'completed'
  | 'failed'
  | 'rejected';

export interface PlanStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
  requiresApproval: boolean;
  status: PlanStepState;
  estimatedCostINR?: number;
  impact?: string;
  outputSummary?: string;
  error?: string;
  missingIntegration?: 'meta' | 'google' | 'linkedin' | 'shopify';
}

export interface Plan {
  id: string;
  goal: string;
  assumptions: string[];
  steps: PlanStep[];
  status: 'recommendation' | 'draft' | 'approved' | 'running' | 'completed' | 'rejected';
  createdAt: string;
  totalCostINR?: number;
}

export interface TimelineStep {
  id: string;
  title: string;
  status: RunStatus;
  type: StepType;
  logs: string[];
  outputLink?: { label: string; href: string };
  requiresApproval?: boolean;
  error?: string;
  missingIntegration?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface TimelineRun {
  id: string;
  title: string;
  originMessageId?: string;
  status: RunStatus;
  currentStepIndex: number;
  steps: TimelineStep[];
  startedAt: string;
  completedAt?: string;
}

export interface CampaignPreviewData {
  id: string;
  name: string;
  platform: AdPlatform;
  objective: string;
  targetAudience: string;
  dailyBudgetINR: number;
  schedule: string;
  adSetsCount: number;
  status: CampaignStatus;
}

export interface CreativePreviewData {
  id: string;
  headline: string;
  bodyCopy: string;
  callToAction: string;
  placement: 'ig_feed' | 'ig_story' | 'ig_reel' | 'fb_feed';
  brief: string;
  hasGeneratedAsset: boolean;
  previewImageUrl?: string;
}

export interface ReportData {
  id: string;
  title: string;
  period: string;
  metrics: Array<{
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
  }>;
  whatChanged: string;
  likelyCause: string;
  recommendedNextAction: string;
}

export interface ApprovalRequest {
  id: string;
  actionTitle: string;
  description: string;
  financialImpactINR?: number;
  targetPlatform?: AdPlatform;
  status: 'pending' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
}

export type Block =
  | { type: 'text'; text: string }
  | { type: 'plan'; plan: Plan }
  | { type: 'timeline'; timeline: TimelineRun }
  | { type: 'campaignPreview'; campaign: CampaignPreviewData }
  | { type: 'creativePreview'; creative: CreativePreviewData }
  | { type: 'report'; report: ReportData }
  | { type: 'approval'; approval: ApprovalRequest };

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content?: string;
  blocks: Block[];
  timestamp: string;
  status?: 'sending' | 'streaming' | 'complete' | 'error';
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

// Strategy
export interface StrategyInput {
  businessName: string;
  industry: string;
  productsServices: string;
  targetAudience: string;
  locations: string;
  marketingObjectives: string[];
  monthlyBudgetINR: number;
  preferredPlatforms: AdPlatform[];
  brandPositioning: string;
  competitors: string;
}

export interface Persona {
  name: string;
  role: string;
  demographics: string;
  painPoints: string[];
  preferredChannels: string[];
  buyingMotivation: string;
}

export interface ChannelAllocation {
  platform: AdPlatform;
  percentage: number;
  monthlyBudgetINR: number;
  projectedLeadsRange: [number, number];
}

export interface RoadmapMilestone {
  dayRange: string;
  title: string;
  deliverables: string[];
  expectedMilestone: string;
}

export interface StrategyOutput {
  id: string;
  summary: string;
  personas: Persona[];
  audienceRecommendations: string[];
  channelAllocations: ChannelAllocation[];
  contentStrategySummary: string;
  leadGenPlanSummary: string;
  roadmap: RoadmapMilestone[];
  forecastAssumptions: string[];
  projectedCpaRangeINR: [number, number];
  projectedMonthlyLeadsRange: [number, number];
  createdAt: string;
}

// Automations
export interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'ai_action' | 'approval' | 'execution' | 'result';
  title: string;
  description: string;
  config: Record<string, string | number | boolean>;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused' | 'error';
  lastRunAt?: string;
  nextRunAt?: string;
  permissions: {
    canReadAdData: boolean;
    canCreateDrafts: boolean;
    canSpendMoneyWithoutApproval: boolean;
  };
  nodes: AutomationNode[];
}

export interface AutomationRun {
  id: string;
  automationId: string;
  automationName: string;
  runAt: string;
  status: 'success' | 'failed' | 'running';
  summary: string;
  error?: string;
}

export interface DiyaStatusResponse {
  status: AIWorkStatus;
  currentTask: string;
  uptimeSeconds: number;
  tasksCompletedToday: number;
  tasksAwaitingApprovalToday: number;
}
