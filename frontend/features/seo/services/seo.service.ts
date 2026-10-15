import {
  mockSeoOverview,
  mockSeoKeywords,
  mockCoreWebVitals,
  mockSeoAuditIssues,
  mockSeoPages,
  mockSeoRecommendations,
} from '../mocks';
import type {
  SeoOverviewData,
  SeoKeywordItem,
  CoreWebVitals,
  SeoAuditIssue,
  SeoPageMeta,
  SeoRecommendation,
} from '../types';

let inMemoryIssues = [...mockSeoAuditIssues];
let inMemoryPages = [...mockSeoPages];
let inMemoryKeywords = [...mockSeoKeywords];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const seoService = {
  /**
   * Retrieves high-level domain SEO health, keyword counts, and traffic history.
   */
  async getOverview(): Promise<SeoOverviewData> {
    // Replace mock with real API call: GET /api/v1/seo/overview
    await delay(500);
    return { ...mockSeoOverview };
  },

  /**
   * Retrieves tracked keyword rankings and search engine positions.
   */
  async listKeywords(): Promise<SeoKeywordItem[]> {
    // Replace mock with real API call: GET /api/v1/seo/keywords
    await delay(550);
    return [...inMemoryKeywords];
  },

  /**
   * Retrieves real-world Core Web Vitals metrics.
   */
  async getCoreWebVitals(): Promise<CoreWebVitals> {
    // Replace mock with real API call: GET /api/v1/seo/vitals
    await delay(400);
    return { ...mockCoreWebVitals };
  },

  /**
   * Retrieves technical crawler audit issues categorized by severity.
   */
  async listAuditIssues(): Promise<SeoAuditIssue[]> {
    // Replace mock with real API call: GET /api/v1/seo/audit/issues
    await delay(500);
    return [...inMemoryIssues];
  },

  /**
   * Runs an on-demand comprehensive technical site audit.
   */
  async runSiteAudit(): Promise<{ issuesFound: number; healthScore: number }> {
    // Replace mock with real API call: POST /api/v1/seo/audit/run
    await delay(900);
    return {
      issuesFound: inMemoryIssues.length,
      healthScore: 88,
    };
  },

  /**
   * Automatically resolves a technical SEO issue.
   */
  async autoFixIssue(issueId: string): Promise<boolean> {
    // Replace mock with real API call: POST /api/v1/seo/audit/autofix
    await delay(600);
    inMemoryIssues = inMemoryIssues.filter((i) => i.id !== issueId);
    return true;
  },

  /**
   * Retrieves website key landing pages with meta tags and schema markup.
   */
  async listPages(): Promise<SeoPageMeta[]> {
    // Replace mock with real API call: GET /api/v1/seo/pages
    await delay(400);
    return [...inMemoryPages];
  },

  /**
   * Updates title, description, or schema for a landing page.
   */
  async updatePageMeta(id: string, updates: Partial<SeoPageMeta>): Promise<SeoPageMeta> {
    // Replace mock with real API call: PUT /api/v1/seo/pages/:id
    await delay(500);
    const pageIndex = inMemoryPages.findIndex((p) => p.id === id);
    if (pageIndex === -1) throw new Error('Page not found');
    inMemoryPages[pageIndex] = { ...inMemoryPages[pageIndex], ...updates };
    return { ...inMemoryPages[pageIndex] };
  },

  /**
   * Retrieves DIYA AI autonomous SEO recommendations.
   */
  async listRecommendations(): Promise<SeoRecommendation[]> {
    // Replace mock with real API call: GET /api/v1/seo/recommendations
    await delay(400);
    return [...mockSeoRecommendations];
  },

  /**
   * Resets in-memory demo data.
   */
  resetDemoData(): void {
    inMemoryIssues = [...mockSeoAuditIssues];
    inMemoryPages = [...mockSeoPages];
    inMemoryKeywords = [...mockSeoKeywords];
  },
};
