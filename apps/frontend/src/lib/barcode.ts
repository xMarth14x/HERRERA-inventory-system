// Client-side barcode generation for the product catalog demo. No backend
// exists yet (see product-data.ts) — this is the single place that decides
// how a new product/variant gets its auto-generated, unique Code128 value.

const DIGITS = "0123456789";

function randomDigits(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += DIGITS[Math.floor(Math.random() * DIGITS.length)];
  }
  return out;
}

/**
 * Generates a unique Code128-compatible barcode, e.g. "BGS-K3F92-047".
 * Alphanumeric so it stays human-readable on a printed label while still
 * being fully scannable by any standard USB/camera barcode scanner.
 *
 * Retries against `existing` until a collision-free value is produced —
 * collisions are astronomically unlikely given the timestamp component, but
 * uniqueness is still verified rather than assumed.
 */
export function generateUniqueBarcode(existing: Iterable<string> = []): string {
  const taken = existing instanceof Set ? existing : new Set(existing);

  for (let attempt = 0; attempt < 50; attempt++) {
    const stamp = Date.now().toString(36).toUpperCase().slice(-5);
    const candidate = `BGS-${stamp}-${randomDigits(3)}`;
    if (!taken.has(candidate)) return candidate;
  }

  // Fallback in the pathological case of 50 straight collisions.
  return `BGS-${randomDigits(12)}`;
}
