'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AIOrb } from '@/components/brand/AIOrb';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Platform', href: '#platform' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 sm:pt-5 px-4 pointer-events-none select-none">
      {/* Floating Pill Container */}
      <div
        className={cn(
          'pointer-events-auto flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-300 ease-out px-4 sm:px-6 py-2.5',
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
            : 'bg-white/80 backdrop-blur-md border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
        )}
      >
        {/* Brand Logo with Tiny Animated Orb + Shining Text */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-95 shrink-0"
          aria-label="DIYA AI Home"
        >
          <div className="relative flex items-center justify-center">
            <AIOrb status="running" size={26} speed={1.2} />
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="font-sans font-bold text-base sm:text-lg tracking-tight text-shine"
              style={{ letterSpacing: '-0.025em' }}
            >
              DIYA AI
            </span>
            <span className="text-[10px] font-semibold text-purple-700 hidden lg:inline-block px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200">
              by Mentneo
            </span>
          </div>
        </Link>

        {/* Center Navigation Links (Pill Style) */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 rounded-full transition-colors duration-150 hover:bg-zinc-100/80"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Sign In + Purple Gradient Pill CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/login"
            className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 px-3 py-1.5 rounded-full hover:bg-zinc-100 transition-all cursor-pointer"
          >
            Sign In
          </Link>

          <Link
            href="/onboarding"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-[0_2px_10px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.45)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Get started</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 text-zinc-700 hover:text-zinc-950 rounded-full hover:bg-zinc-100"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-zinc-200 rounded-2xl shadow-xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-zinc-800 hover:text-purple-700 hover:bg-purple-50 rounded-xl"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-zinc-100">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 rounded-xl bg-zinc-50 border border-zinc-200"
            >
              Sign In
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#9333EA] rounded-xl shadow-md"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
