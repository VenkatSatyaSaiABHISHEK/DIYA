import type React from 'react';
import { hexToRgb } from './orb-color';

export { hexToRgb };

export type OrbState =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'error'
  | 'disabled';

export const ALL_ORB_STATES: OrbState[] = [
  'idle',
  'connecting',
  'listening',
  'thinking',
  'speaking',
  'error',
  'disabled',
];

export const ERROR_COLOR_FROM = '#ef4444';
export const ERROR_COLOR_TO = '#f87171';

export const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

export interface OrbProps {
  state?: OrbState;
  size?: number;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  levelRef?: React.RefObject<number | null | undefined>;
  label?: string;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function blendStates<T extends Record<string, number>>(
  weights: Record<OrbState, number>,
  values: Record<OrbState, T>
): T {
  const sample = Object.values(values)[0];
  const result: Record<string, number> = {};
  const keys = Object.keys(sample);

  let totalWeight = 0;
  for (const s of Object.keys(weights) as OrbState[]) {
    totalWeight += weights[s] || 0;
  }
  const norm = totalWeight > 0.0001 ? totalWeight : 1;

  for (const k of keys) {
    let sum = 0;
    for (const s of Object.keys(weights) as OrbState[]) {
      const w = weights[s] || 0;
      const stateVals = values[s];
      if (stateVals && typeof stateVals[k] === 'number') {
        sum += w * stateVals[k];
      }
    }
    result[k] = sum / norm;
  }
  return result as T;
}

export function blendEnergy(
  weights: Record<OrbState, number>,
  staticPhase: number = 0.9
): number {
  const energyMap: Record<OrbState, number> = {
    idle: 0.2,
    connecting: 0.45,
    listening: 0.6,
    thinking: 0.75,
    speaking: 0.9,
    error: 1.0,
    disabled: 0.0,
  };
  let sum = 0;
  for (const s of Object.keys(weights) as OrbState[]) {
    sum += (weights[s] || 0) * (energyMap[s] ?? 0.3);
  }
  return clamp01(sum * staticPhase);
}

export function orbVars({
  size = 168,
  speed = 1,
  colorFrom = '#fb923c',
  colorTo = '#e879f9',
}: {
  size?: number;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}): React.CSSProperties {
  return {
    '--orb-size': `${size}px`,
    '--orb-speed': `${speed}`,
    '--orb-color-from': colorFrom,
    '--orb-color-to': colorTo,
  } as React.CSSProperties;
}
