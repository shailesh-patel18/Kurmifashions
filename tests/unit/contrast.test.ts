import { describe, it, expect } from "vitest";

// Relative luminance calculator (WCAG 2.1)
function getLuminance(hex: string): number {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("WCAG AA Contrast Ratios", () => {
  it("verifies Light Theme body text and backgrounds exceed 4.5:1 (WCAG AA)", () => {
    const bg = "#F6F1E7";
    const surface = "#FFFFFF";
    const ink = "#1B1F1A";
    const muted = "#5E665C";
    const forest = "#1F3D2B";

    // Primary text on canvas
    const inkOnBg = getContrastRatio(ink, bg);
    expect(inkOnBg).toBeGreaterThanOrEqual(10); // Super high contrast ~14.5:1

    // Primary text on surface
    const inkOnSurface = getContrastRatio(ink, surface);
    expect(inkOnSurface).toBeGreaterThanOrEqual(14); // AAA level ~17:1

    // Forest on canvas
    const forestOnBg = getContrastRatio(forest, bg);
    expect(forestOnBg).toBeGreaterThanOrEqual(7); // AAA level ~8.7:1

    // Muted text on canvas (needs >= 4.5:1)
    const mutedOnBg = getContrastRatio(muted, bg);
    expect(mutedOnBg).toBeGreaterThanOrEqual(4.5);
  });

  it("verifies Dark Theme body text and backgrounds exceed 4.5:1 (WCAG AA)", () => {
    const darkBg = "#121712";
    const darkSurface = "#1B221B";
    const darkInk = "#EEF0E8";
    const darkAccent = "#E8855A";

    // Light ink text on dark canvas
    const inkOnDarkBg = getContrastRatio(darkInk, darkBg);
    expect(inkOnDarkBg).toBeGreaterThanOrEqual(12); // ~15:1

    // Terracotta accent on dark canvas
    const accentOnDarkBg = getContrastRatio(darkAccent, darkBg);
    expect(accentOnDarkBg).toBeGreaterThanOrEqual(4.5);
  });
});
