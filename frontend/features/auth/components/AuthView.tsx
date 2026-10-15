'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AIOrb } from '@/components/brand/AIOrb';
import { useAuth } from '../hooks/useAuth';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
} from 'lucide-react';

export const AuthView: React.FC = () => {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [demoLoggingIn, setDemoLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // One-click Demo Login handler
  const handleDemoLogin = async (role: string = 'Growth Lead') => {
    setErrorMessage(null);
    setDemoLoggingIn(true);
    setSuccessMessage(`Authenticating as Demo ${role}...`);

    setEmail('demo.lead@diya.ai');
    setPassword('••••••••••••');

    try {
      await login({
        email: 'demo.lead@diya.ai',
        password: 'demo_password_123',
      });
      setTimeout(() => {
        router.push('/home');
      }, 700);
    } catch {
      setErrorMessage('Failed to sign in to demo environment. Please try again.');
      setDemoLoggingIn(false);
      setSuccessMessage(null);
    }
  };

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    try {
      setSuccessMessage('Signing in to your workspace...');
      await login({ email, password });
      setTimeout(() => {
        router.push('/home');
      }, 600);
    } catch {
      setErrorMessage('Invalid credentials. You can also use the 1-Click Demo Login above.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-zinc-900 selection:bg-[#EDE9FE] selection:text-[#6D28D9]">
      {/* =========================================================================
          FULL-WIDTH UNIFIED TOP HEADER
          Logo is cleanly on the top-left; Back link is on the top-right.
         ========================================================================= */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-6 pb-4 flex items-center justify-between">
        {/* Brand Logo in Natural Top-Left Position */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90 shrink-0"
          aria-label="DIYA AI Home"
        >
          <AIOrb status="running" size={26} speed={1.2} />
          <div className="flex items-center gap-1.5">
            <span
              className="font-sans font-bold text-lg tracking-tight text-shine"
              style={{ letterSpacing: '-0.025em' }}
            >
              DIYA AI
            </span>
            <span className="text-[10px] font-semibold text-purple-700 hidden sm:inline-block px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200">
              by Mentneo
            </span>
          </div>
        </Link>

        {/* Back Link on Top-Right */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors py-1.5 px-3 rounded-full hover:bg-zinc-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to website</span>
        </Link>
      </header>

      {/* =========================================================================
          SEAMLESS UNIFIED CONTENT: FORM ON LEFT, JUST THE ORB ON RIGHT
          Single background, no awkward dividing line, perfectly balanced.
         ========================================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full items-center">
          {/* ---------------------------------------------------------------------
              LEFT COLUMN: Form + 1-Click Demo Login
             --------------------------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto lg:mx-0 space-y-7">
              {/* Headline */}
              <div className="space-y-2 text-left">
                <h1 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                  Sign in to your cockpit
                </h1>
                <p className="text-sm text-zinc-500">
                  Access your autonomous AI marketing workforce or test drive with 1-click Demo Login.
                </p>
              </div>

              {/* 1-Click Demo Login Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/90 via-purple-50/40 to-white border border-purple-200 shadow-[0_4px_20px_rgba(124,58,237,0.08)] relative overflow-hidden text-left space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-purple-100 text-purple-700">
                      <Zap className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-bold text-purple-950 uppercase tracking-wider font-mono">
                      Instant Demo Access
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200">
                    No Password Required
                  </span>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed">
                  Experience the full DIYA AI platform with mock ad campaigns, live lead telemetry, and creative synthesis.
                </p>

                <button
                  type="button"
                  disabled={loading || demoLoggingIn}
                  onClick={() => handleDemoLogin('Growth Lead')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-[0_4px_14px_rgba(124,58,237,0.3)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.4)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
                >
                  {demoLoggingIn ? (
                    <>
                      <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Entering Demo Cockpit...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Sign in as Demo Growth Lead</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200" />
                </div>
                <span className="relative px-3 text-[11px] font-medium text-zinc-400 bg-white uppercase tracking-wider font-mono">
                  Or sign in with email
                </span>
              </div>

              {/* Feedback Alerts */}
              {errorMessage && (
                <div className="p-3 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl text-left">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-3 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-xl text-left flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600 animate-ping" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Credentials Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email-input"
                    className="block text-xs font-semibold text-zinc-700"
                  >
                    Work Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password-input"
                      className="block text-xs font-semibold text-zinc-700"
                    >
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        setErrorMessage('Password reset link has been dispatched to your email.');
                      }}
                      className="text-[11px] font-semibold text-purple-700 hover:text-purple-900"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 text-xs text-zinc-900 bg-white border border-zinc-200 rounded-xl placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-3.5 w-3.5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-xs text-zinc-600">Remember this device for 30 days</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || demoLoggingIn}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer shadow-sm disabled:opacity-70 mt-2"
                >
                  {loading && !demoLoggingIn ? (
                    <>
                      <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Cockpit</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Google Workspace User')}
                  className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('GitHub SSO User')}
                  className="inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-zinc-700 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub SSO</span>
                </button>
              </div>

              {/* Bottom Free Trial Note */}
              <div className="pt-4 text-center">
                <p className="text-xs text-zinc-500">
                  Don&apos;t have an account yet?{' '}
                  <Link
                    href="/onboarding"
                    className="font-semibold text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    Start 14-day free trial
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              RIGHT COLUMN: JUST THE ORB (Minimalist, White Background, Centered)
             --------------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 items-center justify-center relative select-none py-12">
            {/* Soft Radiant Ambient Horizon Glow */}
            <div
              aria-hidden="true"
              className="absolute w-[500px] h-[500px] pointer-events-none rounded-full blur-3xl opacity-35"
              style={{
                background:
                  'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(232, 121, 249, 0.2) 45%, transparent 70%)',
              }}
            />

            {/* Subtle Concentric Rings */}
            <div
              aria-hidden="true"
              className="absolute w-[400px] h-[400px] rounded-full border border-purple-200/50 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute w-[320px] h-[320px] rounded-full border border-purple-300/40 pointer-events-none"
            />

            {/* Central Animated WebGL DIYA AI Orb Only */}
            <div className="relative z-10 flex items-center justify-center">
              <AIOrb status="creating" size={260} speed={1.2} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthView;
