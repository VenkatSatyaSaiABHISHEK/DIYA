import { useEffect, useRef } from 'react';
import { ALL_ORB_STATES, type OrbState } from './orb-state';
import { useReducedMotion } from './use-reduced-motion';

export type OrbFrame = {
  phase: number;
  reduced: boolean;
  level: number;
  weights: Record<OrbState, number>;
};

export interface OrbAnimatorOptions {
  state: OrbState;
  levelRef?: React.RefObject<number | null | undefined>;
  speed?: number;
  onFrame: (frame: OrbFrame) => void;
}

export function useOrbAnimator(
  _rootRef: React.RefObject<HTMLDivElement | null>,
  { state, levelRef, speed = 1, onFrame }: OrbAnimatorOptions
) {
  const reduced = useReducedMotion();
  const onFrameRef = useRef(onFrame);
  onFrameRef.current = onFrame;

  const weightsRef = useRef<Record<OrbState, number>>({
    idle: state === 'idle' ? 1 : 0,
    connecting: state === 'connecting' ? 1 : 0,
    listening: state === 'listening' ? 1 : 0,
    thinking: state === 'thinking' ? 1 : 0,
    speaking: state === 'speaking' ? 1 : 0,
    error: state === 'error' ? 1 : 0,
    disabled: state === 'disabled' ? 1 : 0,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let phase = 0;

    const tick = (now: number) => {
      const deltaMs = Math.min(100, now - lastTime);
      lastTime = now;

      // Update phase
      const currentSpeed = speedRef.current;
      phase += (deltaMs / 1000) * currentSpeed;

      // Smoothly transition state weights
      const targetState = stateRef.current;
      const weights = weightsRef.current;
      const lerpFactor = Math.min(1, deltaMs * 0.008);

      for (const s of ALL_ORB_STATES) {
        const target = s === targetState ? 1 : 0;
        weights[s] += (target - weights[s]) * lerpFactor;
      }

      // Read audio or energy level
      const rawLevel = levelRef?.current;
      const level = typeof rawLevel === 'number' ? Math.max(0, Math.min(1, rawLevel)) : 0;

      onFrameRef.current({
        phase,
        reduced,
        level,
        weights: { ...weights },
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [reduced, levelRef]);
}
