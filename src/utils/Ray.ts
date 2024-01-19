import { Vec3 } from '../vec/vec3';

/**
 * Represents a 3D point.
 */
export class Point3 extends Vec3 {
  /**
   * Creates a new Point3 instance.
   * @param x - The x-coordinate.
   * @param y - The y-coordinate.
   * @param z - The z-coordinate.
   */
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
  }
}

/**
 * Represents a ray in 3D space.
 */
export class Ray {
  /**
   * The origin point of the ray.
   */
  orig: Point3;

  /**
   * The direction vector of the ray.
   */
  dir: Vec3;

  /**
   * Creates a new Ray instance.
   * @param origin - The origin point of the ray.
   * @param direction - The direction vector of the ray.
   */
  constructor(origin: Point3, direction: Vec3) {
    this.orig = origin;
    this.dir = direction;
  }

  /**
   * Gets the origin point of the ray.
   * @returns The origin point of the ray.
   */
  origin(): Point3 {
    return this.orig;
  }

  /**
   * Gets the direction vector of the ray.
   * @returns The direction vector of the ray.
   */
  direction(): Vec3 {
    return this.dir;
  }

  /**
   * Computes a point along the ray at a given parameter value.
   * @param t - The parameter value.
   * @returns The point along the ray at the specified parameter value.
   */
  at(t: number): Point3 {
    return this.orig.add(this.dir.scale(t));
  }
}
