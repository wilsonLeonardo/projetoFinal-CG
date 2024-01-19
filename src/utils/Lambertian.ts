import { randomUnitVector } from '../vec/vec3';
import { Color } from './Color';
import { Material } from './Material';
import { Ray } from './Ray';
import { HitRecord } from './Hittable';

/**
 * Represents a Lambertian (diffuse) material.
 */
export class Lambertian implements Material {
  /**
   * The albedo (color) of the Lambertian material.
   */
  private albedo: Color;

  /**
   * Constructs a Lambertian material with the given albedo color.
   * @param a - The albedo color.
   */
  constructor(a: Color) {
    this.albedo = a;
  }

  /**
   * Computes the scattered ray for Lambertian reflection.
   * @param _rIn - The incident ray.
   * @param rec - The hit record containing information about the hit point.
   * @returns An object with information about the scattered ray, attenuation, and whether scattering occurred.
   */
  scatter(_rIn: Ray, rec: HitRecord): { isScatter: boolean; scattered: Ray; attenuation: Color } {
    let scatterDirection = rec.normal.add(randomUnitVector());
    if (scatterDirection.nearZero()) {
      scatterDirection = rec.normal;
    }
    const scattered = new Ray(rec.p, scatterDirection);
    const attenuation = this.albedo;
    return { isScatter: true, scattered, attenuation };
  }
}
