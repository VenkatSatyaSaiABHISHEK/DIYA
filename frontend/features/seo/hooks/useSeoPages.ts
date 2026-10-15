import { useState, useMemo } from 'react';
import { useSeoStore } from '../store/seo.store';
import { seoService } from '../services/seo.service';
import type { SeoPageMeta } from '../types';

export function useSeoPages() {
  const { pages, selectedPageId, setSelectedPageId, updatePageMeta } = useSeoStore();

  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const activePage = useMemo(() => {
    return pages.find((p) => p.id === selectedPageId) || pages[0];
  }, [pages, selectedPageId]);

  const titleLength = activePage?.title?.length || 0;
  const descriptionLength = activePage?.metaDescription?.length || 0;

  // Title Status (50-60 is ideal)
  const titleStatus = useMemo(() => {
    if (titleLength === 0) return { label: 'Empty', color: 'text-red-600', isGood: false };
    if (titleLength < 45) return { label: 'A bit short', color: 'text-amber-600', isGood: false };
    if (titleLength > 65) return { label: 'Truncated on Google', color: 'text-red-600', isGood: false };
    return { label: 'Optimal length', color: 'text-emerald-600', isGood: true };
  }, [titleLength]);

  // Description Status (150-160 is ideal)
  const descriptionStatus = useMemo(() => {
    if (descriptionLength === 0) return { label: 'Empty', color: 'text-red-600', isGood: false };
    if (descriptionLength < 120) return { label: 'Too short', color: 'text-amber-600', isGood: false };
    if (descriptionLength > 165) return { label: 'May truncate on mobile', color: 'text-amber-600', isGood: false };
    return { label: 'Optimal length', color: 'text-emerald-600', isGood: true };
  }, [descriptionLength]);

  const handleGenerateAiMeta = async () => {
    setIsAiGenerating(true);
    await new Promise((r) => setTimeout(r, 600));

    if (activePage.path.includes('kokapet')) {
      updatePageMeta(activePage.id, {
        title: 'Ultra Luxury 4 BHK Sky Villas in Kokapet | Neopolis West Hyderabad',
        metaDescription:
          'Tour 5,200 sq.ft ultra-luxury sky villas in Kokapet, 8 mins from Financial District. Private pool, panoramic balconies & RERA approved builder pricing.',
      });
    } else if (activePage.path.includes('pricing')) {
      updatePageMeta(activePage.id, {
        title: 'Kokapet Sky Villas Floor Plans & All-Inclusive Pricing Sheets | Mentneo',
        metaDescription:
          'Download official architectural 4 & 5 BHK floor plans, private elevator specifications, and verified all-inclusive pricing sheets for luxury residences in Kokapet.',
      });
    } else {
      updatePageMeta(activePage.id, {
        title: `${activePage.pageName} | DIYA AI Autonomous Marketing by Mentneo`,
        metaDescription: `Discover how DIYA AI manages high-converting campaigns, content synthesis, and real-time SEO ranking updates automatically without agency overhead.`,
      });
    }

    setIsAiGenerating(false);
  };

  const handleSavePage = async () => {
    setIsSaving(true);
    await seoService.updatePageMeta(activePage.id, {
      title: activePage.title,
      metaDescription: activePage.metaDescription,
    });
    setIsSaving(false);
    setSaveNotice('Demo mode: Meta tags updated in simulated CMS metadata.');
    setTimeout(() => setSaveNotice(null), 3000);
  };

  return {
    pages,
    selectedPageId,
    setSelectedPageId,
    activePage,
    updatePageMeta,
    deviceMode,
    setDeviceMode,
    titleLength,
    descriptionLength,
    titleStatus,
    descriptionStatus,
    handleGenerateAiMeta,
    handleSavePage,
    isSaving,
    saveNotice,
    isAiGenerating,
  };
}
