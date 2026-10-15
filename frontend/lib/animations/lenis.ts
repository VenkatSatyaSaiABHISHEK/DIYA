'use client';

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from './pageTransition';

/**
 * Initializes Lenis smooth scrolling and binds it directly to GSAP ScrollTrigger.
 * Respects prefers-reduced-motion by bypassing smooth scrolling.
 */
export function initSmoothScroll(): {
  lenis: Lenis | null;
  destroy: () => void;
} {
  if (typeof window === 'undefined') {
    return { lenis: null, destroy: () => {} };
  }

  // Bypass if user prefers reduced motion
  if (isReducedMotion()) {
    return { lenis: null, destroy: () => {} };
  }

  // Register ScrollTrigger plugin safely
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Connect Lenis scroll events to ScrollTrigger updates
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis tick via GSAP ticker for perfect 1:1 frame synchrony
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  const destroy = () => {
    gsap.ticker.remove(tickerCallback);
    lenis.destroy();
  };

  return { lenis, destroy };
}
