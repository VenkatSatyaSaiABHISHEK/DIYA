import type {
  Objective,
  Platform,
  PlatformSpec,
  LaunchDraft,
  StudioBrief,
} from './types';

export const CAMPAIGNS_CONSTANTS = {
  subTabs: [
    { id: 'all', label: 'All Campaigns' },
    { id: 'launch', label: 'Launch Flow' },
    { id: 'studio', label: 'Ad Studio' },
  ],

  platforms: [
    {
      id: 'meta' as Platform,
      name: 'Meta Ads',
      channels: 'Instagram & Facebook',
      accentColor: '#1877F2',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'google' as Platform,
      name: 'Google Ads',
      channels: 'Search & Performance Max',
      accentColor: '#EA4335',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      id: 'omnichannel' as Platform,
      name: 'Omnichannel',
      channels: 'Meta + Google Combined',
      accentColor: '#7C3AED',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ],

  objectives: [
    {
      id: 'leads' as Objective,
      label: 'Lead Generation',
      description: 'Capture verified phone numbers & emails via Instant Forms & WhatsApp',
      recommendedPlatform: 'meta',
    },
    {
      id: 'conversions' as Objective,
      label: 'Sales & Conversions',
      description: 'Drive high-intent visits directly to your checkout or sales page',
      recommendedPlatform: 'omnichannel',
    },
    {
      id: 'awareness' as Objective,
      label: 'Brand Awareness',
      description: 'Maximize high-frequency visual impressions among local prospects',
      recommendedPlatform: 'meta',
    },
    {
      id: 'traffic' as Objective,
      label: 'Website Traffic',
      description: 'Send qualified visitors to your landing page or digital portfolio',
      recommendedPlatform: 'google',
    },
  ],

  budgetChipsINR: [5000, 15000, 30000, 60000],

  locationPresets: [
    'Hyderabad (West Clusters: Kokapet, Gachibowli, Financial District)',
    'Bengaluru (Whitefield, Indiranagar, Koramangala)',
    'Mumbai (BKC, Powai, Worli)',
    'Delhi NCR (Gurugram Golf Course Rd)',
  ],

  interestPresets: [
    'Luxury Real Estate',
    'High Net Worth Tech Directors',
    'NRI Property Investments',
    'Commercial Office Spaces',
    'Villa Gated Communities',
    'Equity & Angel Investors',
  ],

  languages: [
    { id: 'en' as const, label: 'English' },
    { id: 'te' as const, label: 'Telugu (తెలుగు)' },
    { id: 'hi' as const, label: 'Hindi (हिंदी)' },
  ],

  studioFormats: [
    { id: 'feed' as const, label: 'IG Feed (1:1)', ratio: '1:1', tag: 'Standard Post' },
    { id: 'story' as const, label: 'Story (9:16)', ratio: '9:16', tag: 'Vertical Story' },
    { id: 'reel' as const, label: 'Reel Script (9:16)', ratio: '9:16', tag: 'Short Video' },
    { id: 'carousel' as const, label: 'Carousel (1:1)', ratio: '1:1', tag: 'Multi-Slide' },
    { id: 'google_responsive' as const, label: 'Google Display', ratio: '1.91:1', tag: 'Web Banner' },
  ],

  studioTones: [
    { id: 'luxurious' as const, label: 'Luxury & Exclusive' },
    { id: 'professional' as const, label: 'Professional & Direct' },
    { id: 'urgent' as const, label: 'Launch Pricing & Urgent' },
    { id: 'friendly' as const, label: 'Warm & Conversational' },
  ],

  platformSpecs: [
    {
      platform: 'meta',
      placement: 'Instagram Feed (1:1)',
      maxHeadlineChars: 40,
      maxPrimaryTextChars: 125,
      aspectRatio: '1:1',
      recommendedResolution: '1080 x 1080 px',
    },
    {
      platform: 'meta',
      placement: 'Instagram Story & Reel (9:16)',
      maxHeadlineChars: 45,
      maxPrimaryTextChars: 90,
      aspectRatio: '9:16',
      recommendedResolution: '1080 x 1920 px',
    },
    {
      platform: 'google',
      placement: 'Google Responsive Display',
      maxHeadlineChars: 30,
      maxPrimaryTextChars: 90,
      aspectRatio: '1.91:1',
      recommendedResolution: '1200 x 628 px',
    },
  ] as PlatformSpec[],

  defaultLaunchDraft: {
    currentStep: 1,
    name: 'Hyderabad Luxury Sky Villas — Lead Engine',
    objective: 'leads' as Objective,
    platform: 'meta' as Platform,
    brief: 'High-intent buyer acquisition for luxury 4BHK sky villas near Financial District with 0% Pre-EMI benefit.',
    audience: {
      locations: ['Kokapet', 'Gachibowli', 'Financial District', 'Jubilee Hills'],
      ageMin: 28,
      ageMax: 54,
      gender: 'all',
      languages: ['en', 'te'],
      interests: ['Luxury Real Estate', 'Tech Leadership', 'NRI Investments'],
      diyaRecommendation: 'DIYA recommends targeting IT Directors & NRI investors with income > ₹35L in West Hyderabad.',
    },
    budget: {
      budgetType: 'daily',
      amountINR: 15000,
      startDate: new Date().toISOString().split('T')[0],
      flightDurationDays: 7,
      estimate: {
        projectedLeadsMin: 100,
        projectedLeadsMax: 135,
        cplMinINR: 115,
        cplMaxINR: 155,
        reachMin: 85000,
        reachMax: 120000,
        assumptions: [
          'Meta Instant Forms conversion rate estimated at 4.2%',
          'Daily bid cap dynamically adjusted between 10am and 9pm',
          'Audience saturation guarded by automated frequency capping',
        ],
      },
    },
    creative: {
      headline: 'Own a 4BHK Sky Villa in Kokapet with 0% Pre-EMI',
      bodyCopy:
        'Sanctuary living 5 mins from Hyderabad Financial District. Private elevator access, 35,000 sq.ft clubhouse, and panoramic views. Exclusive launch pricing ending this Sunday.',
      callToAction: 'Download Pricing & Floorplan',
      placement: 'ig_feed',
    },
    tracking: {
      conversionGoal: 'meta_instant_form',
      pixelStatus: 'not_verified',
      utmSource: 'meta',
      utmMedium: 'paid_social',
      utmCampaign: 'hyd_sky_villas_launch',
      utmContent: 'creative_v1_infinity',
      leadFormFields: ['Full Name', 'Phone (+91)', 'Email', 'Preferred BHK'],
    },
    lastSavedAt: new Date().toISOString(),
  } as LaunchDraft,

  defaultStudioBrief: {
    prompt: '4BHK Sky Villas in Kokapet with 0% Pre-EMI until handover for IT leaders',
    objective: 'leads' as Objective,
    offerHook: '0% Pre-EMI Until Handover + Free Designer Modular Kitchen',
    targetAudience: 'Ages 28–52, Tech Directors & VP engineers in Hitec City & Kokapet',
    language: 'en',
    tone: 'luxurious',
    brandSettings: {
      logoName: 'Mentneo Realty',
      primaryColor: '#7C3AED',
      secondaryColor: '#18181B',
      accentColor: '#F59E0B',
      font: 'Outfit',
      useBrandKnowledge: true,
    },
    format: 'feed',
  } as StudioBrief,
};
