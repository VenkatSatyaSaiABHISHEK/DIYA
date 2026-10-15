'use client';

import { animate, stagger, type JSAnimation } from 'animejs';
import { isReducedMotion } from './pageTransition';

/**
 * Typewriter effect cycling through prompt strings with cursor.
 */
export function animeTypewriter(
  targetEl: HTMLElement,
  text: string,
  options?: {
    speed?: number;
    onComplete?: () => void;
  }
): { stop: () => void } {
  if (typeof window === 'undefined' || !targetEl) {
    return { stop: () => {} };
  }

  if (isReducedMotion()) {
    targetEl.textContent = text;
    options?.onComplete?.();
    return { stop: () => {} };
  }

  let index = 0;
  let timer: NodeJS.Timeout | null = null;
  let isStopped = false;

  targetEl.textContent = '';
  const interval = options?.speed ?? 36;

  const typeNext = () => {
    if (isStopped) return;
    if (index < text.length) {
      targetEl.textContent = text.slice(0, index + 1);
      index++;
      timer = setTimeout(typeNext, interval);
    } else {
      options?.onComplete?.();
    }
  };

  timer = setTimeout(typeNext, interval);

  return {
    stop: () => {
      isStopped = true;
      if (timer) clearTimeout(timer);
    },
  };
}

/**
 * Animate numeric counter with anime.js.
 */
export function animeCountUp(
  targetEl: HTMLElement,
  fromVal: number,
  toVal: number,
  formatFn?: (n: number) => string,
  duration = 1200
): JSAnimation | null {
  if (typeof window === 'undefined' || !targetEl) return null;

  if (isReducedMotion()) {
    targetEl.textContent = formatFn ? formatFn(toVal) : String(toVal);
    return null;
  }

  const obj = { val: fromVal };
  return animate(obj, {
    val: toVal,
    duration,
    ease: 'outExpo',
    onUpdate: () => {
      targetEl.textContent = formatFn ? formatFn(Math.round(obj.val)) : String(Math.round(obj.val));
    },
  });
}

/**
 * Animate SVG line draw using strokeDashoffset with anime.js.
 */
export function animeSvgLineDraw(
  pathEl: SVGPathElement,
  options?: {
    duration?: number;
    delay?: number;
    onComplete?: () => void;
  }
): JSAnimation | null {
  if (typeof window === 'undefined' || !pathEl) return null;

  if (isReducedMotion()) {
    pathEl.style.strokeDashoffset = '0';
    options?.onComplete?.();
    return null;
  }

  const length = pathEl.getTotalLength();
  pathEl.style.strokeDasharray = `${length}`;
  pathEl.style.strokeDashoffset = `${length}`;

  return animate(pathEl, {
    strokeDashoffset: [length, 0],
    duration: options?.duration ?? 950,
    delay: options?.delay ?? 0,
    ease: 'inOutSine',
    onComplete: () => {
      options?.onComplete?.();
    },
  });
}

/**
 * Subtle floating motion for chips or badges.
 */
export function animeFloating(
  targets: HTMLElement[] | string,
  options?: {
    translateY?: number | [number, number];
    duration?: number;
  }
): JSAnimation | null {
  if (typeof window === 'undefined') return null;

  if (isReducedMotion()) return null;

  return animate(targets, {
    translateY: options?.translateY ?? [-4, 4],
    direction: 'alternate',
    loop: true,
    duration: options?.duration ?? 2600,
    ease: 'inOutQuad',
    delay: stagger(120),
  });
}
