import type {
  Conversation,
  Message,
  StrategyOutput,
  Automation,
  TimelineRun,
  DiyaStatusResponse,
} from './types';

export const mockDiyaStatus: DiyaStatusResponse = {
  status: 'optimizing',
  currentTask: 'Reviewing real estate campaign CPA in Hyderabad and drafting copy variant B',
  uptimeSeconds: 94200,
  tasksCompletedToday: 8,
  tasksAwaitingApprovalToday: 2,
};

export const mockInitialMessages: Message[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content:
      "Hello! I'm **DIYA**, your dedicated AI digital marketing manager. I plan cross-channel campaigns, produce ad creatives, optimize live ad spend, and generate qualified leads. What marketing goal are we tackling today?",
    blocks: [
      {
        type: 'text',
        text: "Hello! I'm **DIYA**, your dedicated AI digital marketing manager. I plan cross-channel campaigns, produce ad creatives, optimize live ad spend, and generate qualified leads. What marketing goal are we tackling today?",
      },
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'complete',
  },
  {
    id: 'msg-2',
    role: 'user',
    content: 'Generate leads for my real estate business in Hyderabad',
    blocks: [
      {
        type: 'text',
        text: 'Generate leads for my real estate business in Hyderabad',
      },
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    status: 'complete',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: 'I have structured a high-intent marketing blueprint for luxury real estate in Hyderabad. Here is the operational plan and ad set preview ready for your approval:',
    blocks: [
      {
        type: 'text',
        text: 'I have analyzed the Hyderabad real estate market dynamics. High-intent buyers are concentrated around Gachibowli, Kokapet, and the Financial District. Here is the full execution plan, creative preview, and campaign configuration awaiting your sign-off:',
      },
      {
        type: 'plan',
        plan: {
          id: 'plan-hyd-re',
          goal: 'Acquire 100+ verified luxury villa & apartment buyer leads in Hyderabad within ₹15,000 ad budget.',
          assumptions: [
            'Target acquisition cost: ₹125 – ₹165 per verified lead via Meta Instant Forms.',
            'Audience filter: High Net Worth Tech Directors & NRI investors (Kokapet, Financial District, Jubliee Hills).',
            'Pilot flight duration: 7 days with daily automated bid cap optimization.',
          ],
          status: 'draft',
          createdAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
          totalCostINR: 14000,
          steps: [
            {
              id: 'step-1',
              title: 'Audience Geo-Cluster Mapping',
              description: 'Analyze demographics and buying signals in Kokapet, Nanakramguda, and Kondapur.',
              type: 'analysis',
              requiresApproval: false,
              status: 'completed',
              impact: 'Targeting 240,000 active prospective buyers',
              outputSummary: 'Pinpointed 3 micro-segments with 2.8x higher purchasing affinity.',
            },
            {
              id: 'step-2',
              title: 'Synthesize 3 Video Scripts & Ad Creative Briefs',
              description: 'Draft high-hook copy emphasizing 0% Pre-EMI and rooftop infinity amenities.',
              type: 'creative',
              requiresApproval: false,
              status: 'completed',
              impact: 'Ready for preview in Ad Studio',
              outputSummary: 'Generated 3 copy variations with estimated 3.4% CTR.',
            },
            {
              id: 'step-3',
              title: 'Deploy Meta Lead Generation Campaign',
              description: 'Launch pilot ad set with ₹2,000 daily budget cap on Instagram & Facebook Feed.',
              type: 'campaign',
              requiresApproval: true,
              status: 'draft',
              estimatedCostINR: 14000,
              impact: 'Projected 100 - 130 qualified phone leads',
            },
            {
              id: 'step-4',
              title: 'Automated WhatsApp CRM Routing',
              description: 'Instant notification dispatched to your sales desk within 45 seconds of lead submission.',
              type: 'publish',
              requiresApproval: true,
              status: 'draft',
              impact: '< 1 min lead response time',
            },
          ],
        },
      },
      {
        type: 'campaignPreview',
        campaign: {
          id: 'camp-preview-1',
          name: 'Hyderabad Luxury Sky Villas — Lead Engine',
          platform: 'meta',
          objective: 'Lead Generation',
          targetAudience: 'Ages 28–54, IT Directors, Doctors, NRI Investors in West Hyderabad',
          dailyBudgetINR: 2000,
          schedule: '7 Days Pilot (Immediate Launch upon approval)',
          adSetsCount: 2,
          status: 'draft',
        },
      },
      {
        type: 'creativePreview',
        creative: {
          id: 'creative-preview-1',
          headline: 'Own a 4BHK Sky Villa in Kokapet with 0% Pre-EMI',
          bodyCopy:
            'Looking for your sanctuary near Hyderabad Financial District? Gated community living with 35,000 sq.ft clubhouse, private elevator access, and panoramic city views. Exclusive launch pricing ending this Sunday.',
          callToAction: 'Download Floorplan & Pricing Sheet',
          placement: 'ig_feed',
          brief: 'Visual focus on ultra-luxury modern architecture with clean typography.',
          hasGeneratedAsset: false,
        },
      },
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
    status: 'complete',
  },
];

export const mockStrategyOutput: StrategyOutput = {
  id: 'strat-hyd-1',
  summary:
    'A full-funnel 30-day omnichannel growth playbook combining high-intent Meta Lead Forms, Google Search for branded queries, and automated WhatsApp nurturing to achieve scalable lead flow at < ₹170 CPL.',
  personas: [
    {
      name: 'Tech Executive Vikram',
      role: 'VP of Engineering / Tech Director',
      demographics: '34–45 years, ₹45L+ annual income, lives in Hitec City / Gachibowli',
      painPoints: [
        'Frustrated by traffic congestion during daily commutes.',
        'Wants spacious luxury for growing family without leaving tech hub corridor.',
      ],
      preferredChannels: ['Instagram Feed', 'Google Search', 'LinkedIn'],
      buyingMotivation: 'Status, proximity to work, high capital appreciation in Kokapet.',
    },
    {
      name: 'NRI Investor Anita',
      role: 'Consultant & Global Investor',
      demographics: '38–55 years, US / UAE based, looking for prime Indian real estate',
      painPoints: [
        'Lack of transparent site visits and hassle-free documentation from overseas.',
        'High rental yield guarantees.',
      ],
      preferredChannels: ['Facebook', 'WhatsApp', 'Google Display'],
      buyingMotivation: 'Safe asset preservation and high rental yields in Hyderabad.',
    },
  ],
  audienceRecommendations: [
    'Interest stacking: Real estate investment + Luxury lifestyle + Wealth management',
    'Exclude: Job seekers, brokers, real estate students',
    'Lookalike: 2% of previous form completions and brochure downloads',
  ],
  channelAllocations: [
    {
      platform: 'meta',
      percentage: 55,
      monthlyBudgetINR: 55000,
      projectedLeadsRange: [320, 390],
    },
    {
      platform: 'google',
      percentage: 30,
      monthlyBudgetINR: 30000,
      projectedLeadsRange: [140, 180],
    },
    {
      platform: 'linkedin',
      percentage: 15,
      monthlyBudgetINR: 15000,
      projectedLeadsRange: [40, 60],
    },
  ],
  contentStrategySummary:
    'Split creative mix: 50% Video Walkthrough Reels (drone footage + interior highlights), 30% Carousel Floorplans, 20% Founder / Architect vision testimonials.',
  leadGenPlanSummary:
    'Two-tier qualification form: Asking property type preference (3BHK vs 4BHK) and expected possession timeframe (Ready vs Under Construction) to filter out non-serious clicks.',
  roadmap: [
    {
      dayRange: 'Day 1 – 7',
      title: 'Foundation & Pilot Testing',
      deliverables: ['Launch 2 Meta ad sets', 'Google Search top 15 keyword setup', 'Lead webhook test'],
      expectedMilestone: 'First 50 verified leads captured; baseline CPA established.',
    },
    {
      dayRange: 'Day 8 – 15',
      title: 'Creative Angle Iteration',
      deliverables: ['Cut underperforming hooks', 'Test Video Variant C', 'Introduce WhatsApp remarketing'],
      expectedMilestone: 'CPL reduction by 15-20% as lookalike audiences mature.',
    },
    {
      dayRange: 'Day 16 – 23',
      title: 'High-Intent Scaling',
      deliverables: ['Scale top ad set by 25%', 'Deploy Google Retargeting for site visitors'],
      expectedMilestone: 'Consistent flow of 15+ qualified site visit bookings weekly.',
    },
    {
      dayRange: 'Day 24 – 30',
      title: 'Review & Full-Funnel Attribution',
      deliverables: ['Comprehensive ROI report', 'Cost per site-visit audit', 'Next month plan'],
      expectedMilestone: 'Projected 500+ total leads with 4x estimated pipeline value.',
    },
  ],
  forecastAssumptions: [
    'Average Lead Form CTR remains between 2.2% and 3.5%',
    'Cost per 1,000 impressions (CPM) in Hyderabad luxury tier is ~₹220',
    'Form completion rate of 8.5% on qualified clicks',
  ],
  projectedCpaRangeINR: [135, 175],
  projectedMonthlyLeadsRange: [500, 630],
  createdAt: new Date().toISOString(),
};

export const mockAutomations: Automation[] = [
  {
    id: 'auto-1',
    name: 'Weekly Executive Marketing Breakdown',
    trigger: 'Every Monday at 9:00 AM IST',
    status: 'active',
    lastRunAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    nextRunAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    permissions: {
      canReadAdData: true,
      canCreateDrafts: true,
      canSpendMoneyWithoutApproval: false,
    },
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        title: 'Schedule Trigger',
        description: 'Fires weekly on Mondays at 9:00 AM IST',
        config: { cron: '0 9 * * 1' },
      },
      {
        id: 'node-2',
        type: 'ai_action',
        title: 'Aggregate Cross-Platform Metrics',
        description: 'Pulls spend, leads, and CPA from Meta and Google Ads',
        config: { period: '7d' },
      },
      {
        id: 'node-3',
        type: 'ai_action',
        title: 'Generate Intelligence Diagnostics',
        description: 'Analyzes anomalies and writes plain-English recommendations',
        config: { model: 'diya-analyst-v2' },
      },
      {
        id: 'node-4',
        type: 'execution',
        title: 'Publish Report to Workspace',
        description: 'Creates interactive Report Card in Home and Timeline',
        config: { notification: true },
      },
    ],
  },
  {
    id: 'auto-2',
    name: 'Emergency Ad Spend Spike Guard',
    trigger: 'When 24h Cost Per Lead exceeds ₹350',
    status: 'active',
    lastRunAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    nextRunAt: 'Monitoring continuously',
    permissions: {
      canReadAdData: true,
      canCreateDrafts: true,
      canSpendMoneyWithoutApproval: false,
    },
    nodes: [
      {
        id: 'node-21',
        type: 'trigger',
        title: 'Real-Time Metric Webhook',
        description: 'Hourly poll on campaign spend efficiency',
        config: { metric: 'cpl', threshold: 350 },
      },
      {
        id: 'node-22',
        type: 'condition',
        title: 'Verify Spend Volume',
        description: 'Ensure at least ₹1,500 was spent before checking',
        config: { minSpend: 1500 },
      },
      {
        id: 'node-23',
        type: 'approval',
        title: 'Request Approval to Pause',
        description: 'Send immediate alert to owner with 1-click pause confirmation',
        config: { priority: 'high' },
      },
    ],
  },
  {
    id: 'auto-3',
    name: 'Dynamic High-ROAS Budget Reallocation',
    trigger: 'When 3-day ROAS is > 4.0x on winning campaign',
    status: 'paused',
    permissions: {
      canReadAdData: true,
      canCreateDrafts: true,
      canSpendMoneyWithoutApproval: false,
    },
    nodes: [
      {
        id: 'node-31',
        type: 'trigger',
        title: 'ROAS Milestone Check',
        description: 'Runs daily at midnight',
        config: { minRoas: 4.0 },
      },
      {
        id: 'node-32',
        type: 'ai_action',
        title: 'Draft Scaling Proposal',
        description: 'Calculates optimal +15% daily budget increase',
        config: { maxIncrease: 20 },
      },
      {
        id: 'node-33',
        type: 'approval',
        title: 'Owner Confirmation Required',
        description: 'Awaits user sign-off in Command Chat before altering ad accounts',
        config: { channel: 'chat' },
      },
    ],
  },
];

export const mockTimelineRuns: TimelineRun[] = [
  {
    id: 'run-101',
    title: 'Hyderabad Real Estate Lead Engine Flight 1',
    originMessageId: 'msg-3',
    status: 'awaiting_approval',
    currentStepIndex: 2,
    startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    steps: [
      {
        id: 't-step-1',
        title: 'Audience Geo-Cluster Mapping',
        status: 'completed',
        type: 'analysis',
        logs: [
          'Connecting to Meta Graph API audience insights...',
          'Querying demographic indices for Kokapet, Gachibowli, Jubilee Hills...',
          'Identified 240,000 targetable high-income professionals.',
          'Cluster mapped successfully in 1.4s.',
        ],
        outputLink: { label: 'View Audience Blueprint', href: '#audience' },
        startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      },
      {
        id: 't-step-2',
        title: 'Synthesize 3 Video Scripts & Ad Creative Briefs',
        status: 'completed',
        type: 'creative',
        logs: [
          'Synthesizing video hook angles for real estate luxury niche...',
          'Drafted Hook 1: "0% Pre-EMI Kokapet Sky Villa"',
          'Drafted Hook 2: "Why Tech Leaders are flocking to Gachibowli West"',
          'Generated 3 social image briefs and copy variations.',
        ],
        outputLink: { label: 'View Ad Copies in Content Studio', href: '/content' },
        startedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        completedAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
      },
      {
        id: 't-step-3',
        title: 'Deploy Meta Lead Generation Campaign (₹2,000/day)',
        status: 'awaiting_approval',
        type: 'campaign',
        requiresApproval: true,
        logs: [
          'Campaign blueprint compiled.',
          'Draft ad set prepared in Meta Ads sandbox.',
          'Budget configured: ₹2,000/day.',
          'Awaiting explicit business owner authorization to push live.',
        ],
        startedAt: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
      },
      {
        id: 't-step-4',
        title: 'Automated WhatsApp CRM Routing',
        status: 'pending',
        type: 'publish',
        requiresApproval: true,
        logs: ['Queued to activate after campaign deployment approval.'],
      },
    ],
  },
];
