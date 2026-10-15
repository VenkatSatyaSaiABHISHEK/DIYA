import { useState, useEffect, useCallback } from 'react';
import { seoService } from '../services/seo.service';
import { useSeoStore } from '../store/seo.store';
import type { CoreWebVitals, SeoAuditIssue } from '../types';

export function useSeoAudit() {
  const [vitals, setVitals] = useState<CoreWebVitals | null>(null);
  const [issues, setIssues] = useState<SeoAuditIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuditing, auditStep, auditStepLabel, setIsAuditing, setAuditStep } = useSeoStore();

  const [activeFixIssue, setActiveFixIssue] = useState<SeoAuditIssue | null>(null);
  const [fixNotice, setFixNotice] = useState<string | null>(null);
  const [isFixing, setIsFixing] = useState(false);

  const fetchAuditData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [vitalsData, issuesData] = await Promise.all([
        seoService.getCoreWebVitals(),
        seoService.listAuditIssues(),
      ]);
      setVitals(vitalsData);
      setIssues(issuesData);
    } catch {
      setError('Failed to fetch technical audit results.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditData();
  }, [fetchAuditData]);

  // Run On-Demand Crawler Simulation
  const runFullAudit = async () => {
    setIsAuditing(true);

    const steps = [
      { step: 1, label: 'Crawling sitemap.xml & 126 landing page routes...' },
      { step: 2, label: 'Measuring field Core Web Vitals (LCP, INP, CLS, TTFB)...' },
      { step: 3, label: 'Checking canonical links, robots directives & schema tags...' },
      { step: 4, label: 'Auditing mobile responsiveness & image compression...' },
    ];

    try {
      for (const s of steps) {
        setAuditStep(s.step, s.label);
        await new Promise((r) => setTimeout(r, 500));
      }
      await seoService.runSiteAudit();
      await fetchAuditData();
    } catch (err) {
      console.error(err);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleConfirmFix = async () => {
    if (!activeFixIssue) return;
    setIsFixing(true);
    await seoService.autoFixIssue(activeFixIssue.id);
    setIsFixing(false);
    setFixNotice(`Demo mode: "${activeFixIssue.title}" marked as resolved in local simulation.`);
    setTimeout(() => {
      setFixNotice(null);
      setActiveFixIssue(null);
      fetchAuditData();
    }, 2000);
  };

  return {
    vitals,
    issues,
    isLoading,
    error,
    isAuditing,
    auditStep,
    auditStepLabel,
    runFullAudit,
    activeFixIssue,
    setActiveFixIssue,
    fixNotice,
    isFixing,
    handleConfirmFix,
    refreshAudit: fetchAuditData,
  };
}
