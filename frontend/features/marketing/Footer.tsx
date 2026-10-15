'use client';

import React from 'react';
import Link from 'next/link';
import { AIOrb } from '@/components/brand/AIOrb';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full bg-white border-t border-zinc-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-500 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-left">
        {/* Brand column */}
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <AIOrb status="running" size={24} speed={1} />
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-bold text-lg text-zinc-950">DIYA AI</span>
              <span className="text-[10px] text-purple-700 px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 font-bold">
                by Mentneo
              </span>
            </div>
          </Link>
          <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
            The autonomous AI marketing employee for modern businesses. Run high-ROAS ads, generate creatives, optimize SEO, and scale customer acquisition automatically.
          </p>
          <div className="text-[11px] text-zinc-400 font-mono">
            Mentneo Technologies Private Limited • Hyderabad, India
          </div>
        </div>

        {/* Product links */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            Platform
          </span>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#features" className="hover:text-purple-700 transition-colors">
                Campaigns
              </a>
            </li>
            <li>
              <a href="#platform" className="hover:text-purple-700 transition-colors">
                Content Studio
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-purple-700 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-purple-700 transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Solutions links */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            Solutions
          </span>
          <ul className="space-y-2 text-xs">
            <li>
              <span className="hover:text-purple-700 transition-colors cursor-pointer">
                Real Estate
              </span>
            </li>
            <li>
              <span className="hover:text-purple-700 transition-colors cursor-pointer">
                High-Growth D2C
              </span>
            </li>
            <li>
              <span className="hover:text-purple-700 transition-colors cursor-pointer">
                B2B Lead Generation
              </span>
            </li>
            <li>
              <span className="hover:text-purple-700 transition-colors cursor-pointer">
                Agency Replacement
              </span>
            </li>
          </ul>
        </div>

        {/* Legal links */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
            Trust &amp; Legal
          </span>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/privacy" className="hover:text-purple-700 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-purple-700 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-purple-700 transition-colors">
                Security &amp; Audit Log
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
        <span>&copy; {new Date().getFullYear()} Mentneo Technologies. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-zinc-600">Features</a>
          <a href="#pricing" className="hover:text-zinc-600">Pricing</a>
          <a href="#faq" className="hover:text-zinc-600">FAQ</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
