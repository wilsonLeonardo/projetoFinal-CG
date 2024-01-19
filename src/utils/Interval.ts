import { infinity } from './RtWeekend';

/**
 * Represents a closed interval between two numeric values.
 */
class Interval {
  /**
   * The minimum value of the interval.
   */
  min: number;

  /**
   * The maximum value of the interval.
   */
  max: number;

  /**
   * Constructs a new interval with specified minimum and maximum values.
   * @param _min - The minimum value of the interval (default is positive infinity).
   * @param _max - The maximum value of the interval (default is negative infinity).
   */
  constructor(_min: number = infinity, _max: number = -infinity) {
    this.min = _min;
    this.max = _max;
  }

  /**
   * Checks if a value is within the interval (inclusive).
   * @param x - The value to check.
   * @returns A boolean indicating whether the value is within the interval.
   */
  contains(x: number): boolean {
    return this.min <= x && x <= this.max;
  }

  /**
   * Checks if a value is strictly within the interval.
   * @param x - The value to check.
   * @returns A boolean indicating whether the value is strictly within the interval.
   */
  surrounds(x: number): boolean {
    return this.min < x && x < this.max;
  }

  /**
   * Clamps a value to be within the interval.
   * @param x - The value to clamp.
   * @returns The clamped value.
   */
  clamp(x: number): number {
    return Math.min(Math.max(x, this.min), this.max);
  }
}

/**
 * An empty interval with bounds at positive and negative infinity.
 */
const empty: Interval = new Interval(infinity, -infinity);

/**
 * A universe interval covering the entire real number line.
 */
const universe: Interval = new Interval(-infinity, infinity);

export { Interval, empty, universe };
