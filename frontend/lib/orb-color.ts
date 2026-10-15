export type Rgb = [number, number, number];

export function hexToRgb(hex: string): Rgb {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (Number.isNaN(num)) return [124, 58, 237];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function rgbToHex([r, g, b]: Rgb): string {
  const clamp = (v: number) => Math.min(255, Math.max(0, Math.round(v)));
  const hex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export function mixRgb(rgb1: Rgb, rgb2: Rgb, weight: number): Rgb {
  const w = Math.min(1, Math.max(0, weight));
  return [
    Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * w),
    Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * w),
    Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * w),
  ];
}

export function mixHex(hex1: string, hex2: string, weight: number): string {
  return rgbToHex(mixRgb(hexToRgb(hex1), hexToRgb(hex2), weight));
}

export function shadeHex(hex: string, amount: number): string {
  return mixHex(hex, '#000000', amount);
}

export function tintHex(hex: string, amount: number): string {
  return mixHex(hex, '#ffffff', amount);
}
