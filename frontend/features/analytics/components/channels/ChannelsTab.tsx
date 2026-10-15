'use client';

import React from 'react';
import { Target, TrendingUp, DollarSign, Users, Award, ArrowUpRight } from 'lucide-react';
import { useChannelPerformance } from '../../hooks/useChannelPerformance';

export const ChannelsTab: React.FC = () => {
  const { channels, isLoading, error } = useChannelPerformance();

  return (
    <div className="space-y-6">
      {/* 1. Comparative Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channels.map((ch) => {
          const revCrores = (ch.attributedRevenueINR / 10000000).toFixed(1);
          const isMeta = ch.channel === 'meta';

          return (
            <div
              key={ch.id}
              className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#F4F4F5] pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${isMeta ? 'bg-pink-500' : 'bg-blue-500'}`}
                    />
                    <h3 className="text-sm font-bold text-[#18181B]">{ch.channelName}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    {ch.roas}x ROAS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7]">
                    <span className="text-[10px] font-bold uppercase text-[#71717A]">
                      Ad Spend
                    </span>
                    <span className="block text-base font-bold text-[#18181B] mt-0.5">
                      ₹{ch.adSpendINR.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#71717A]">{ch.sharePercentage}% budget</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7]">
                    <span className="text-[10px] font-bold uppercase text-[#71717A]">
                      Pipeline Revenue
                    </span>
                    <span className="block text-base font-bold text-emerald-600 mt-0.5">
                      ₹{revCrores} Cr
                    </span>
                    <span className="text-[10px] text-[#71717A]">Attributed deals</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7]">
                    <span className="text-[10px] font-bold uppercase text-[#71717A]">
                      Total Leads
                    </span>
                    <span className="block text-base font-bold text-[#18181B] mt-0.5">
                      {ch.leadsCount} leads
                    </span>
                    <span className="text-[10px] text-purple-700 font-semibold">
                      CPL: ₹{ch.costPerLeadINR}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E4E4E7]">
                    <span className="text-[10px] font-bold uppercase text-[#71717A]">
                      Site Visits Booked
                    </span>
                    <span className="block text-base font-bold text-[#18181B] mt-0.5">
                      {ch.siteVisitsBooked} visits
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      Verified appointments
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-[#71717A]">
                Primary advantage:{' '}
                <strong className="text-zinc-800">
                  {isMeta
                    ? 'High viral discovery & visual lifestyle engagement'
                    : 'High purchase intent & commercial search capture'}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Detailed Channel Metrics Table */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E4E4E7] bg-[#FAFAFA]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
            Channel Performance & Cost Benchmark Matrix
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white border-b border-[#E4E4E7] text-[#71717A] uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Ad Spend</th>
                <th className="py-3 px-4">Inbound Leads</th>
                <th className="py-3 px-4">Cost / Lead</th>
                <th className="py-3 px-4">Site Visits</th>
                <th className="py-3 px-4">Pipeline Revenue</th>
                <th className="py-3 px-4 text-right">Blended ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5]">
              {channels.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#18181B]">{item.channelName}</td>
                  <td className="py-3.5 px-4 text-[#71717A]">
                    ₹{item.adSpendINR.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#18181B]">{item.leadsCount}</td>
                  <td className="py-3.5 px-4 text-purple-700 font-semibold">
                    ₹{item.costPerLeadINR}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#18181B]">
                    {item.siteVisitsBooked}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">
                    ₹{(item.attributedRevenueINR / 10000000).toFixed(1)} Cr
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                      {item.roas}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
