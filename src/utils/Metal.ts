import { Color } from './Color';
import { Material } from './Material';
import { Ray } from './Ray';
import { HitRecord } from './Hittable';
import { dot, randomUnitVector, reflect, unitVector } from '../vec/vec3';

/**
 * Represents a metal material.
 */
export class Metal implements Material {
  /**
   * The albedo (color) of the metal material.
   */
  private albedo: Color;
  private fuzz: number;

  /**
   * Constructs a metal material with the given albedo color.
   * @param a - The albedo color.
   */
  constructor(a: Color, f: number) {
    this.albedo = a;
    this.fuzz = f < 1 ? f : 1;
  }

  /**
   * Computes the scattered ray for metal reflection.
   * @param rIn - The incident ray.
   * @param rec - The hit record containing information about the hit point.
   * @returns An object with information about the scattered ray, attenuation, and whether scattering occurred.
   */
  scatter(rIn: Ray, rec: HitRecord): { isScatter: boolean; scattered: Ray; attenuation: Color } {
    const reflected = reflect(unitVector(rIn.direction()), rec.normal);
    const scattered = new Ray(rec.p, randomUnitVector().scale(this.fuzz).add(reflected));
    const attenuation = this.albedo;
    return { isScatter: dot(scattered.direction(), rec.normal) > 0, scattered, attenuation };
  }
}
