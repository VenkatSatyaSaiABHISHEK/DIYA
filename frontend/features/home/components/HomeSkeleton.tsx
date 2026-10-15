'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="w-full flex-1 flex flex-col gap-3 lg:gap-3.5 lg:grid lg:grid-rows-[auto_auto_1fr] overflow-hidden animate-pulse">
      {/* Row 1: Hero Skeleton (max 170px) */}
      <div className="h-[162px] max-h-[170px] rounded-[20px] lg:rounded-[22px] bg-gradient-to-br from-[#160D27]/80 via-[#240D3E]/80 to-[#120722]/80 border border-[#581C87]/40 p-4 lg:p-5 flex justify-between items-center shrink-0">
        <div className="space-y-2.5 max-w-lg w-full">
          <Skeleton width={130} height={20} className="bg-white/10 rounded-full" />
          <Skeleton width={240} height={32} className="bg-white/10 rounded-xl" />
          <Skeleton width="85%" height={14} className="bg-white/10 rounded-md" />
        </div>
        <Skeleton width={120} height={120} className="rounded-full bg-white/10 shrink-0 hidden sm:block" />
      </div>

      {/* Row 2: 4 Metric Tiles Skeleton (118px) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3.5 h-[114px] lg:h-[118px] shrink-0">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] h-full flex flex-col justify-between"
          >
            <Skeleton width="45%" height={14} />
            <Skeleton width="60%" height={26} />
            <div className="flex justify-between items-center">
              <Skeleton width="30%" height={12} />
              <Skeleton width="40%" height={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Three Equal Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-3.5 flex-1 min-h-0 h-full overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 lg:p-5 rounded-[20px] bg-white dark:bg-[#0E0E10] border border-[#EAEAEA] dark:border-[#262626] h-full flex flex-col justify-between"
          >
            <div className="flex justify-between pb-3 border-b border-[#F4F4F6] dark:border-[#222]">
              <Skeleton width="40%" height={18} />
              <Skeleton width={60} height={14} />
            </div>
            <div className="space-y-3 my-auto">
              <Skeleton width="100%" height={40} className="rounded-xl" />
              <Skeleton width="100%" height={40} className="rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
