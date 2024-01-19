import { Color } from './Color';
import { HitRecord } from './Hittable';
import { Ray } from './Ray';

/**
 * Represents an abstract material.
 */
export abstract class Material {
  /**
   * Computes the scattered ray for the material.
   * @param rIn - The incident ray.
   * @param rec - The hit record containing information about the hit point.
   * @returns An object with information about the scattered ray, attenuation, and whether scattering occurred.
   */
  abstract scatter(rIn: Ray, rec: HitRecord): { isScatter: boolean; scattered: Ray; attenuation: Color };
}
