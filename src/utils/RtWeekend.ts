// Constants

/**
 * Represents positive infinity.
 */
const infinity: number = Number.POSITIVE_INFINITY;

/**
 * Represents the mathematical constant pi.
 */
// eslint-disable-next-line @typescript-eslint/no-loss-of-precision
const pi: number = 3.1415926535897932385;

// Utility Functions

/**
 * Converts degrees to radians.
 * @param degrees - The angle in degrees.
 * @returns The angle in radians.
 */
function degreesToRadians(degrees: number): number {
  return degrees * (pi / 180.0);
}

/**
 * Generates a random double in the range [0, 1).
 * @returns A random double in the range [0, 1).
 */
function randomDouble(): number {
  return Math.random();
}

/**
 * Generates a random double in the specified range.
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (exclusive).
 * @returns A random double in the range [min, max).
 */
function randomDoubleRange(min: number, max: number): number {
  return min + (max - min) * Math.random();
}

export { infinity, pi, degreesToRadians, randomDouble, randomDoubleRange };
