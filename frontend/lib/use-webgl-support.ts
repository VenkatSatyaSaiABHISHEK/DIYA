import { useEffect, useState } from 'react';

let cachedSupported: boolean | null = null;

export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(cachedSupported);

  useEffect(() => {
    if (cachedSupported !== null) {
      setSupported(cachedSupported);
      return;
    }
    if (typeof window === 'undefined') return;
    try {
      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')) as
        | WebGLRenderingContext
        | WebGL2RenderingContext
        | null;
      const isSupp = Boolean(gl);
      if (gl) {
        // Immediately release the probe context so it does not count against browser context limit
        try {
          const loseContext = gl.getExtension('WEBGL_lose_context');
          if (loseContext) {
            loseContext.loseContext();
          }
        } catch {
          // ignore
        }
      }
      cachedSupported = isSupp;
      setSupported(isSupp);
    } catch {
      cachedSupported = false;
      setSupported(false);
    }
  }, []);

  return supported;
}
