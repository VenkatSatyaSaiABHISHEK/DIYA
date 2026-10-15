import { mockContentPosts, mockHookTemplates } from '../mocks';
import type {
  ContentPost,
  GeneratorBrief,
  HookTemplate,
  CarouselSlide,
  ReelScriptScene,
} from '../types';

// In-memory state for client-side demo mutability
let inMemoryPosts = [...mockContentPosts];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const contentService = {
  /**
   * Retrieves all content posts across channels with filter support.
   */
  async listPosts(): Promise<ContentPost[]> {
    // Replace mock with real API call: GET /api/v1/content/posts
    await delay(550);
    return [...inMemoryPosts];
  },

  /**
   * Retrieves single post detail by ID.
   */
  async getPost(id: string): Promise<ContentPost | null> {
    // Replace mock with real API call: GET /api/v1/content/posts/:id
    await delay(400);
    const found = inMemoryPosts.find((p) => p.id === id);
    return found ? { ...found } : null;
  },

  /**
   * Generates a complete multi-format content asset using DIYA AI.
   */
  async generateContent(brief: GeneratorBrief): Promise<ContentPost> {
    // Replace mock with real API call: POST /api/v1/content/generate
    await delay(800);

    let carouselSlides: CarouselSlide[] | undefined;
    let reelScript: ReelScriptScene[] | undefined;

    if (brief.format === 'carousel') {
      carouselSlides = [
        {
          slideNumber: 1,
          title: brief.topic.slice(0, 40) + '...',
          body: `Why high-intent buyers in Hyderabad are prioritizing this strategy right now.`,
          visualPrompt: 'Minimalist high-contrast dark purple frame with bold typography',
        },
        {
          slideNumber: 2,
          title: 'The Hidden Market Reality',
          body: `Traditional marketing relies on static lead forms. Autonomous campaigns adapt messaging in real-time.`,
          bulletPoints: ['Immediate response under 60 seconds', 'Zero wasted budget on unqualified clicks'],
        },
        {
          slideNumber: 3,
          title: 'Data Benchmark 2026',
          body: `Our recent flight drove a 4.2x increase in verified site visit bookings with 32% lower acquisition cost.`,
        },
        {
          slideNumber: 4,
          title: 'Strategic Implementation',
          body: `Configure multi-touch audience signals across Meta & Google Ads simultaneously without agency delay.`,
        },
        {
          slideNumber: 5,
          title: 'Next Step',
          body: brief.signatureCta || `Comment "AI" to access the full playbook & private demo.`,
        },
      ];
    } else if (brief.format === 'reel_script') {
      reelScript = [
        {
          timecode: '0-3s',
          phase: 'Hook',
          spokenAudio: `Stop making this huge mistake when investing in ${brief.targetPersona}...`,
          visualCue: 'Fast snap zoom on presenter pointing at dramatic data chart on screen.',
          bRollSuggestion: 'Cinematic drone shot of Financial District skyline.',
        },
        {
          timecode: '3-15s',
          phase: 'Story & Context',
          spokenAudio: `Most businesses burn ₹50,000 every single month on agencies that do not even track lead qualification.`,
          visualCue: 'Animated red down-trend line showing wasted marketing budget.',
        },
        {
          timecode: '15-45s',
          phase: 'Value & Proof',
          spokenAudio: `Here is what happens when you let DIYA AI handle creative iteration, audience retargeting, and CRM lead sync automatically.`,
          visualCue: 'Rapid UI walkthrough showing real-time dashboard and lead response notification.',
        },
        {
          timecode: '45-60s',
          phase: 'Call to Action',
          spokenAudio: brief.signatureCta || `Tap the link in bio to deploy your first autonomous campaign today.`,
          visualCue: 'Branded end-card with logo, clean CTA badge, and demo disclaimer.',
        },
      ];
    }

    const newPost: ContentPost = {
      id: `post-gen-${Date.now()}`,
      title: brief.topic,
      channel: brief.channel,
      format: brief.format,
      status: 'draft',
      caption: `🔥 ${brief.topic}\n\nBuilt for ${brief.targetPersona}. Created autonomously with ${brief.tone} brand tone.\n\n${brief.signatureCta || 'Comment below for more details.'}`,
      hashtags: ['#DIYAai', '#DigitalMarketingIndia', '#AIcreatives', '#MarketingStrategy'],
      predictedScore: Math.floor(Math.random() * 10) + 88, // 88 - 97
      estimatedImpressions: Math.floor(Math.random() * 15000) + 12000,
      targetAudience: brief.targetPersona,
      author: 'DIYA AI',
      carouselSlides,
      reelScript,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    inMemoryPosts = [newPost, ...inMemoryPosts];
    return newPost;
  },

  /**
   * Reschedules or schedules a post for social publication.
   */
  async reschedulePost(postId: string, newDate: string): Promise<ContentPost> {
    // Replace mock with real API call: POST /api/v1/content/posts/:id/reschedule
    await delay(500);
    const post = inMemoryPosts.find((p) => p.id === postId);
    if (!post) throw new Error('Post not found');
    post.scheduledFor = newDate;
    post.status = 'scheduled';
    post.updatedAt = new Date().toISOString();
    return { ...post };
  },

  /**
   * Approves a post for deployment.
   */
  async approvePost(postId: string): Promise<ContentPost> {
    // Replace mock with real API call: POST /api/v1/content/posts/:id/approve
    await delay(450);
    const post = inMemoryPosts.find((p) => p.id === postId);
    if (!post) throw new Error('Post not found');
    post.status = 'approved';
    post.updatedAt = new Date().toISOString();
    return { ...post };
  },

  /**
   * Deletes a content post draft.
   */
  async deletePost(postId: string): Promise<boolean> {
    // Replace mock with real API call: DELETE /api/v1/content/posts/:id
    await delay(400);
    inMemoryPosts = inMemoryPosts.filter((p) => p.id !== postId);
    return true;
  },

  /**
   * Retrieves viral hooks and copywriting frameworks library.
   */
  async listHookTemplates(): Promise<HookTemplate[]> {
    // Replace mock with real API call: GET /api/v1/content/hooks
    await delay(350);
    return [...mockHookTemplates];
  },

  /**
   * Resets in-memory demo posts to initial mock data.
   */
  resetDemoData(): void {
    inMemoryPosts = [...mockContentPosts];
  },
};
