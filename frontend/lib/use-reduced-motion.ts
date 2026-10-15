import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);

    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else if ('addListener' in media) {
      // Fallback for older Safari/browsers
      (media as any).addListener(listener);
      return () => (media as any).removeListener(listener);
    }
  }, []);

  return reduced;
}
