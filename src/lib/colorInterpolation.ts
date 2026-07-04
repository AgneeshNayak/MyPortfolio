// ─────────────────────────────────────────────────────────────
// Color Interpolation — Scroll-driven scene color transitions
// ─────────────────────────────────────────────────────────────

/** RGB color representation with 0-255 integer channels. */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

// ── Scene Palette ───────────────────────────────────────────

/** Color anchors for each cinematic scene. */
export const sceneColors: RGB[] = [
  { r: 255, g: 200, b: 150 }, // Dawn
  { r: 100, g: 200, b: 255 }, // Exploration
  { r: 255, g: 150, b: 100 }, // Creation
  { r: 255, g: 200, b: 100 }, // Growth
  { r: 200, g: 150, b: 255 }, // Peak
];

/** Human-readable scene names. */
export const sceneNames: readonly string[] = [
  'Dawn',
  'Exploration',
  'Creation',
  'Growth',
  'Peak',
] as const;

/** Narrative subtitles for each scene. */
export const sceneSubtitles: readonly string[] = [
  'First Lines of Code',
  'Learning the Stack',
  'Shipping Real Projects',
  'Hackathons & Competition',
  "Ready to Build What's Next",
] as const;

// ── Interpolation Utilities ─────────────────────────────────

/**
 * Linearly interpolate between two RGB colors.
 * @param color1 - Start color
 * @param color2 - End color
 * @param t - Interpolation factor, clamped to [0, 1]
 */
export function interpolateRGB(color1: RGB, color2: RGB, t: number): RGB {
  const clamped = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(color1.r + (color2.r - color1.r) * clamped),
    g: Math.round(color1.g + (color2.g - color1.g) * clamped),
    b: Math.round(color1.b + (color2.b - color1.b) * clamped),
  };
}

/**
 * Get the interpolated scene color for any scroll position.
 * @param scrollProgress - Normalized scroll position in [0, 1]
 * @returns Interpolated RGB color
 */
export function getSceneColor(scrollProgress: number): RGB {
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const totalSegments = sceneColors.length - 1;
  const segment = clamped * totalSegments;
  const index = Math.min(Math.floor(segment), totalSegments - 1);
  const t = segment - index;

  return interpolateRGB(sceneColors[index], sceneColors[index + 1], t);
}

// ── Formatting Utilities ────────────────────────────────────

/**
 * Convert an RGB color to a CSS `rgb()` string.
 */
export function rgbToString(color: RGB): string {
  return `rgb(${color.r},${color.g},${color.b})`;
}

/**
 * Convert an RGB color to a CSS `rgba()` string with optional alpha.
 * @param color - The RGB color
 * @param alpha - Opacity value, 0-1 (default: 1)
 */
export function rgbToGradient(color: RGB, alpha: number = 1): string {
  const clampedAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${color.r},${color.g},${color.b},${clampedAlpha})`;
}

// ── Scene Index Utilities ───────────────────────────────────

/**
 * Get the current scene index (0-4) for a given scroll position.
 * @param scrollProgress - Normalized scroll position in [0, 1]
 * @returns Scene index from 0 to `sceneColors.length - 1`
 */
export function getSceneIndex(scrollProgress: number): number {
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const totalSegments = sceneColors.length - 1;
  const segment = clamped * totalSegments;
  return Math.min(Math.floor(segment), totalSegments);
}

/**
 * Get the transition progress within the current scene (0-1).
 * Returns 0 at the start of a scene transition and 1 at the end.
 * @param scrollProgress - Normalized scroll position in [0, 1]
 */
export function getSceneTransitionProgress(scrollProgress: number): number {
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const totalSegments = sceneColors.length - 1;
  const segment = clamped * totalSegments;
  return segment - Math.floor(Math.min(segment, totalSegments - 1));
}
