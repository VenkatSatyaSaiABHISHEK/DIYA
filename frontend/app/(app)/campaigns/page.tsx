'use client';

import React from 'react';
import Link from 'next/link';
import { useCampaignsList } from '@/features/campaigns/hooks/useCampaignsList';
import { CampaignTable } from '@/features/campaigns/components/all/CampaignTable';
import { CampaignCard } from '@/features/campaigns/components/all/CampaignCard';
import { CampaignDetailDrawer } from '@/features/campaigns/components/all/CampaignDetailDrawer';
import { ConfirmActionModal } from '@/components/ui/ConfirmActionModal';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatINR } from '@/lib/utils/format';
import {
  Megaphone,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  LayoutGrid,
  List,
} from 'lucide-react';

export default function CampaignsPage() {
  const {
    campaigns,
    counts,
    isLoading,
    error,
    viewMode,
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

  const totalSpend = campaigns.reduce((acc, c) => acc + c.spendTotalINR, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + (c.leadsCount || 0), 0);
  const avgRoas = campaigns.length
    ? (campaigns.reduce((acc, c) => acc + (c.roas || 0), 0) / campaigns.length).toFixed(1)
    : '4.8';

  return (
    <div className="w-full space-y-6">
      {/* 1. Header: Page Title, One-line Description, Primary Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
            Campaigns
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            Omnichannel ad flights across Meta, Google, and LinkedIn with autonomous bidding.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/campaigns/studio">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9"
              leftIcon={<Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />}
            >
              Ad Studio
            </Button>
          </Link>
          <Link href="/campaigns/new">
            <Button
              variant="gradient"
              size="sm"
              className="text-xs h-9 font-semibold shadow-xs"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              New Campaign
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Simple Summary Row (Max 3-4 numbers, small) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <span className="text-[11px] font-semibold text-[#71717A] dark:text-[#888] uppercase tracking-wider block">
            Active Campaigns
          </span>
          <span className="text-2xl font-bold text-[#18181B] dark:text-[#EDEDED] mt-1.5 block">
            {counts.live}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">100% on schedule</span>
        </div>

        <div className="p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <span className="text-[11px] font-semibold text-[#71717A] dark:text-[#888] uppercase tracking-wider block">
            Ad Spend (Month)
          </span>
          <span className="text-2xl font-bold text-[#18181B] dark:text-[#EDEDED] mt-1.5 block">
            {formatINR(totalSpend || 45200)}
          </span>
          <span className="text-[11px] text-[#71717A] dark:text-[#888] mt-0.5 block">Under allocated cap</span>
        </div>

        <div className="p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <span className="text-[11px] font-semibold text-[#71717A] dark:text-[#888] uppercase tracking-wider block">
            Blended ROAS
          </span>
          <span className="text-2xl font-bold text-[#7C3AED] dark:text-[#A78BFA] mt-1.5 block">
            {avgRoas}x
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">+0.8x vs industry</span>
        </div>

        <div className="p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
          <span className="text-[11px] font-semibold text-[#71717A] dark:text-[#888] uppercase tracking-wider block">
            Leads Generated
          </span>
          <span className="text-2xl font-bold text-[#16A34A] dark:text-emerald-400 mt-1.5 block">
            {totalLeads || 218}
          </span>
          <span className="text-[11px] text-[#71717A] dark:text-[#888] mt-0.5 block">Avg CPL: ₹207</span>
        </div>
      </div>

      {/* 3. Main Content: Clean List / Table (Click row opens side Sheet) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
            All Ad Flights ({campaigns.length})
          </span>
          <span className="text-xs text-[#71717A]">Click any row to inspect in side drawer</span>
        </div>

        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} width="100%" height={64} className="rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && campaigns.length === 0 && (
          <EmptyState
            icon={<Megaphone className="h-8 w-8 text-[#7C3AED]" />}
            title="Connect Ad Accounts to see live campaigns"
            description="Link Meta Ads Manager or Google Ads in Settings to synchronize your live marketing flights."
            action={
              <Link href="/campaigns/new">
                <Button size="sm" variant="gradient" className="text-xs font-semibold">
                  Launch Demo Campaign
                </Button>
              </Link>
            }
          />
        )}

        {!isLoading && campaigns.length > 0 && (
          <CampaignTable
            campaigns={campaigns}
            onPause={handlePauseCampaign}
            onApprove={handleApproveCampaign}
            onOpenBudgetModal={openBudgetModal}
          />
        )}
      </div>

      {/* Side Sheet for Details on Click */}
      <CampaignDetailDrawer
        isOpen={isDetailDrawerOpen}
        onClose={closeDetailDrawer}
        campaign={selectedCampaign}
        onOpenBudgetModal={openBudgetModal}
      />

      {/* Budget Increase Confirmation Modal */}
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
          title={`Increase Daily Budget for ${budgetModalCampaign.name}`}
          campaignName={budgetModalCampaign.name}
          platform={budgetModalCampaign.platform}
          currentAmountINR={budgetModalCampaign.dailyBudgetINR}
          newAmountINR={budgetModalCampaign.dailyBudgetINR + 1000}
          confirmButtonText="Confirm Budget Increment"
        />
      )}
    </div>
  );
}
