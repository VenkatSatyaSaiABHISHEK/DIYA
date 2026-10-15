import type { Automation } from './types';

export const DIYA_CONSTANTS = {
  tabTitle: 'DIYA AI — Your Marketing Employee',
  subTabs: [
    { id: 'chat', label: 'Command Chat' },
    { id: 'strategy', label: 'Strategy Planner' },
    { id: 'automations', label: 'Automations' },
    { id: 'timeline', label: 'Execution Timeline' },
  ],
  languages: [
    { id: 'en', label: 'English' },
    { id: 'te', label: 'తెలుగు (Telugu)' },
    { id: 'hi', label: 'हिन्दी (Hindi)' },
  ],
  exampleChips: [
    'Generate leads for my real estate business in Hyderabad',
    'Create a 30-day digital marketing strategy',
    'Create five Instagram posts and three video ad concepts',
    'Analyze my Meta Ads campaigns and reduce my cost per lead',
    'Launch a lead generation campaign with a Rs 15,000 budget',
    'Review my website SEO and find the biggest growth opportunities',
    'Generate a weekly marketing performance report',
  ],
  starterAutomationTemplates: [
    {
      id: 'template-weekly-report',
      name: 'Weekly Marketing Performance Report',
      trigger: 'Every Monday at 9:00 AM IST',
      description: 'Aggregates spend, leads, and CPA across Meta and Google, emailing an executive breakdown.',
    },
    {
      id: 'template-prepare-posts',
      name: 'Prepare Social Posts for Approval',
      trigger: 'Every Friday at 4:00 PM IST',
      description: 'Drafts 4 carousel and reel scripts for the coming week tailored to trending brand keywords.',
    },
    {
      id: 'template-cpl-alert',
      name: 'High Cost-Per-Lead (CPL) Emergency Alert',
      trigger: 'When 24h Meta CPA exceeds ₹350',
      description: 'Pauses fatigue ad sets and alerts you on WhatsApp before budget burns.',
    },
    {
      id: 'template-budget-adjust',
      name: 'Dynamic High-ROAS Budget Reallocation',
      trigger: 'When 3-day ROAS is > 4.0x on any campaign',
      description: 'Proposes budget scale plan (+20% daily) for your review in Command Chat.',
    },
    {
      id: 'template-lead-followup',
      name: 'Inbound Lead Instant Notification',
      trigger: 'On Meta Instant Form submission',
      description: 'Enriches lead phone number and pushes instant alert to WhatsApp CRM.',
    },
  ],
} as const;
