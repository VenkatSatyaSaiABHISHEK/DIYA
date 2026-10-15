'use client';

import React, { useState } from 'react';
import { CAMPAIGNS_CONSTANTS } from '../../constants';
import { Plus, X, Sparkles, MapPin, Users, Languages } from 'lucide-react';
import type { LaunchDraft } from '../../types';
import { cn } from '@/lib/utils/cn';

export interface StepAudienceProps {
  draft: LaunchDraft;
  onChange: (partial: Partial<LaunchDraft>) => void;
}

export const StepAudience: React.FC<StepAudienceProps> = ({ draft, onChange }) => {
  const [newLocation, setNewLocation] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const audience = draft.audience;

  const updateAudience = (partial: Partial<typeof audience>) => {
    onChange({
      audience: {
        ...audience,
        ...partial,
      },
    });
  };

  const addLocation = (loc: string) => {
    if (loc && !audience.locations.includes(loc)) {
      updateAudience({ locations: [...audience.locations, loc] });
      setNewLocation('');
    }
  };

  const removeLocation = (loc: string) => {
    updateAudience({ locations: audience.locations.filter((l) => l !== loc) });
  };

  const addInterest = (interest: string) => {
    if (interest && !audience.interests.includes(interest)) {
      updateAudience({ interests: [...audience.interests, interest] });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    updateAudience({ interests: audience.interests.filter((i) => i !== interest) });
  };

  const toggleLanguage = (lang: 'en' | 'te' | 'hi') => {
    const exists = audience.languages.includes(lang);
    if (exists && audience.languages.length > 1) {
      updateAudience({ languages: audience.languages.filter((l) => l !== lang) });
    } else if (!exists) {
      updateAudience({ languages: [...audience.languages, lang] });
    }
  };

  return (
    <div className="space-y-6">
      {/* DIYA AI Suggestion Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50/70 border border-[#DDD6FE] text-xs text-[#4C1D95] space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#6D28D9]">
          <Sparkles className="h-4 w-4 text-[#7C3AED]" />
          <span>DIYA Audience Recommendation</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[#581C87]">
          {audience.diyaRecommendation ||
            'Based on market dynamics, high-intent buyer clustering around West Hyderabad IT corridor yields 2.4x higher instant form completion.'}
        </p>
      </div>

      {/* Target Locations */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#7C3AED]" /> Target Geographic Clusters
        </label>

        {/* Existing Location Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {audience.locations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FAFAFC] border border-[#E4E4E7] text-[#18181B]"
            >
              <span>{loc}</span>
              <button
                type="button"
                onClick={() => removeLocation(loc)}
                className="text-[#A1A1AA] hover:text-[#DC2626]"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add Location Input */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addLocation(newLocation.trim());
              }
            }}
            placeholder="Add custom city or locality (e.g. Jubilee Hills)..."
            className="flex-1 rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#7C3AED] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => addLocation(newLocation.trim())}
            disabled={!newLocation.trim()}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-40 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Presets */}
        <div className="pt-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] text-[#A1A1AA] shrink-0">Presets:</span>
          {CAMPAIGNS_CONSTANTS.locationPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addLocation(preset.split(' ')[0])}
              className="shrink-0 text-[10px] font-medium text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full hover:bg-[#DDD6FE]"
            >
              + {preset.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Age & Gender Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Age Range Slider */}
        <div className="space-y-2 p-3.5 rounded-xl border border-[#E4E4E7] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#18181B]">Age Demographics</span>
            <span className="text-xs font-bold text-[#7C3AED]">
              {audience.ageMin} – {audience.ageMax} Years
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="range"
              min="18"
              max="65"
              value={audience.ageMin}
              onChange={(e) =>
                updateAudience({
                  ageMin: Math.min(Number(e.target.value), audience.ageMax - 5),
                })
              }
              className="w-full accent-[#7C3AED]"
            />
            <input
              type="range"
              min="25"
              max="65"
              value={audience.ageMax}
              onChange={(e) =>
                updateAudience({
                  ageMax: Math.max(Number(e.target.value), audience.ageMin + 5),
                })
              }
              className="w-full accent-[#7C3AED]"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2 p-3.5 rounded-xl border border-[#E4E4E7] bg-white">
          <span className="text-xs font-bold text-[#18181B] block">Gender Selection</span>
          <div className="grid grid-cols-3 gap-2">
            {(['all', 'men', 'women'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateAudience({ gender: g })}
                className={cn(
                  'py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all select-none',
                  audience.gender === g
                    ? 'border-[#7C3AED] bg-[#FAF5FF] text-[#7C3AED]'
                    : 'border-[#E4E4E7] text-[#52525B] hover:border-[#D4D4D8]'
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block flex items-center gap-1.5">
          <Languages className="h-3.5 w-3.5 text-[#7C3AED]" /> Communication Languages
        </label>
        <div className="flex items-center gap-2">
          {CAMPAIGNS_CONSTANTS.languages.map((l) => {
            const isSelected = audience.languages.includes(l.id);

            return (
              <button
                key={l.id}
                type="button"
                onClick={() => toggleLanguage(l.id)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all select-none',
                  isSelected
                    ? 'border-[#7C3AED] bg-[#FAF5FF] text-[#7C3AED] shadow-2xs'
                    : 'border-[#E4E4E7] bg-white text-[#71717A] hover:border-[#D4D4D8]'
                )}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Interests & Affinity */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#18181B] block">
          Interests, Industry & Job Titles
        </label>

        <div className="flex items-center gap-2 flex-wrap">
          {audience.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FAFAFC] border border-[#E4E4E7] text-[#18181B]"
            >
              <span>{interest}</span>
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="text-[#A1A1AA] hover:text-[#DC2626]"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add custom interest */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addInterest(newInterest.trim());
              }
            }}
            placeholder="Add industry or interest tag..."
            className="flex-1 rounded-xl border border-[#E4E4E7] bg-white px-3.5 py-2 text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:border-[#7C3AED] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => addInterest(newInterest.trim())}
            disabled={!newInterest.trim()}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-40 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Presets */}
        <div className="pt-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] text-[#A1A1AA] shrink-0">Suggestions:</span>
          {CAMPAIGNS_CONSTANTS.interestPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addInterest(preset)}
              className="shrink-0 text-[10px] font-medium text-[#7C3AED] bg-[#EDE9FE] px-2 py-0.5 rounded-full hover:bg-[#DDD6FE]"
            >
              + {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
