'use client';

import React, { useRef } from 'react';
import { useCampaignsList } from '../../hooks/useCampaignsList';
import { CampaignSummaryChips } from './CampaignSummaryChips';
import { CampaignToolbar } from './CampaignToolbar';
import { CampaignCard } from './CampaignCard';
import { CampaignTable } from './CampaignTable';
import { CampaignComparePanel } from './CampaignComparePanel';
import { CampaignDetailDrawer } from './CampaignDetailDrawer';
import { ConfirmActionModal } from '@/components/ui/ConfirmActionModal';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { useCampaignsStore } from '../../store/campaigns.store';
import { Megaphone, Plus, Bot, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { animateStagger } from '@/lib/animations/stagger';
import Link from 'next/link';

export const AllCampaignsView: React.FC = () => {
  const {
    campaigns,
    counts,
    isLoading,
    error,
    viewMode,
    refetch,
    comparedCampaigns,
    selectedCampaign,
    isDetailDrawerOpen,
    closeDetailDrawer,
    handlePauseCampaign,
    handleApproveCampaign,
    handleUpdateBudget,
    dismissRecommendation,
    budgetModalCampaign,
    openBudgetModal,
    closeBudgetModal,
  } = useCampaignsList();

  const { setActiveTab, setDevState } = useCampaignsStore();
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridContainerRef.current || isLoading) return;
      const cards = gridContainerRef.current.querySelectorAll('.campaign-card-item');
      animateStagger(cards, { stagger: 0.05, yOffset: 12 });
    },
    { dependencies: [campaigns.length, isLoading, viewMode], scope: gridContainerRef }
  );

  return (
    <div className="space-y-4">
      {/* Summary Chips */}
      <CampaignSummaryChips counts={counts} />

      {/* Filter and Search Toolbar */}
      <CampaignToolbar />

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-5 rounded-2xl border border-[#E4E4E7] bg-white space-y-3">
              <Skeleton width="40%" height={20} />
              <Skeleton width="80%" height={24} />
              <Skeleton width="100%" height={60} />
              <div className="flex justify-between pt-2">
                <Skeleton width="30%" height={16} />
                <Skeleton width="25%" height={16} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="p-8 rounded-2xl border border-red-200 bg-red-50 text-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-red-600 mx-auto" />
          <h4 className="text-sm font-bold text-red-950">Error Loading Campaign Network Data</h4>
          <p className="text-xs text-red-800 max-w-md mx-auto">{error}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setDevState('default');
              refetch();
            }}
            className="text-xs bg-white"
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Retry Connection
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && campaigns.length === 0 && (
        <EmptyState
          icon={<Megaphone className="h-8 w-8 text-[#7C3AED]" />}
          title="No campaigns found"
          description="There are currently no active or draft campaigns matching your criteria."
          action={
            <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
              <Link href="/diya?tab=chat">
                <Button size="sm" variant="outline" className="text-xs" leftIcon={<Bot className="h-3.5 w-3.5" />}>
                  Ask DIYA to Plan One
                </Button>
              </Link>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setActiveTab('launch')}
                className="text-xs"
                leftIcon={<Plus className="h-3.5 w-3.5" />}
              >
                Start Launch Flow
              </Button>
              <button
                type="button"
                onClick={() => setDevState('default')}
                className="text-xs text-[#7C3AED] hover:underline font-medium"
              >
                Reset Demo Campaigns
              </button>
            </div>
          }
        />
      )}

      {/* Data Presentation: Card Grid View */}
      {!isLoading && !error && campaigns.length > 0 && viewMode === 'card' && (
        <div
          ref={gridContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {campaigns.map((camp) => (
            <div key={camp.id} className="campaign-card-item">
              <CampaignCard
                campaign={camp}
                onPause={handlePauseCampaign}
                onApprove={handleApproveCampaign}
                onOpenBudgetModal={openBudgetModal}
                onDismissRecommendation={dismissRecommendation}
              />
            </div>
          ))}
        </div>
      )}

      {/* Data Presentation: Table View */}
      {!isLoading && !error && campaigns.length > 0 && viewMode === 'table' && (
        <CampaignTable
          campaigns={campaigns}
          onPause={handlePauseCampaign}
          onApprove={handleApproveCampaign}
          onOpenBudgetModal={openBudgetModal}
        />
      )}

      {/* Floating Side-by-Side Compare Panel */}
      <CampaignComparePanel campaigns={comparedCampaigns} />

      {/* Slide-over Detail Drawer */}
      <CampaignDetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={closeDetailDrawer}
        campaign={selectedCampaign}
        onOpenBudgetModal={openBudgetModal}
      />

      {/* Increase Budget Confirmation Modal */}
      {budgetModalCampaign && (
        <ConfirmActionModal
          isOpen={!!budgetModalCampaign}
          onClose={closeBudgetModal}
          onConfirm={() =>
            handleUpdateBudget(
              budgetModalCampaign.id,
              budgetModalCampaign.dailyBudgetINR + 1000
            )
          }
          actionType="budget_increase"
          title={`Increase Daily Budget Cap for ${budgetModalCampaign.name}`}
          campaignName={budgetModalCampaign.name}
          platform={budgetModalCampaign.platform}
          currentAmountINR={budgetModalCampaign.dailyBudgetINR}
          newAmountINR={budgetModalCampaign.dailyBudgetINR + 1000}
          confirmButtonText="Confirm Budget Increment"
        />
      )}
    </div>
  );
};
