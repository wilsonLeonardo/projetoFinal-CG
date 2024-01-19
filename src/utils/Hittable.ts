import { Vec3, dot } from '../vec/vec3';
import { Interval } from './Interval';
import { Material } from './Material';
import { Point3, Ray } from './Ray';

/**
 * Represents the hit record information when a ray intersects an object.
 */
export class HitRecord {
  /**
   * The intersection point in 3D space.
   */
  p!: Point3;

  /**
   * The surface normal at the intersection point.
   */
  normal!: Vec3;

  /**
   * The material of the object at the intersection point.
   */
  mat!: Material;

  /**
   * The parameter along the ray where the intersection occurs.
   */
  t!: number;

  /**
   * Indicates whether the ray hit the front face of the object.
   */
  frontFace!: boolean;

  /**
   * Sets the front face normal based on the intersection details.
   * @param r - The incident ray.
   * @param outwardNormal - The outward normal at the intersection point.
   */
  public setFaceNormal(r: Ray, outwardNormal: Vec3): void {
    // Sets the hit record normal vector.
    // NOTE: the parameter `outward_normal` is assumed to have unit length.

    this.frontFace = dot(r.direction(), outwardNormal) < 0;
    this.normal = this.frontFace ? outwardNormal : outwardNormal.negate();
  }
}

/**
 * Abstract class representing a hittable object in the scene.
 */
export abstract class Hittable {
  /**
   * Checks if a ray hits the object within a specified interval.
   * @param r - The ray to check for intersection.
   * @param rayT - The interval of valid t-values for intersections.
   * @returns An object indicating whether the ray hits and the hit record.
   */
  abstract hit(r: Ray, rayT: Interval): { objectHit: boolean; rec: HitRecord | null };
}
