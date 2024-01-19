import { Color } from './Color';
import { Material } from './Material';
import { Ray } from './Ray';
import { HitRecord } from './Hittable';
import { dot, reflect, refract, unitVector, Vec3 } from '../vec/vec3';
import { randomDouble } from './RtWeekend';

/**
 * Represents a dielectric material.
 */
export class Dielectric implements Material {
  /**
   * The index of refraction.
   */
  private ir: number;

  /**
   * Constructs a dielectric material with the given index of refraction.
   * @param index_of_refraction - The index of refraction.
   */
  constructor(index_of_refraction: number) {
    this.ir = index_of_refraction;
  }

  /**
   * Computes the scattered ray for dielectric refraction.
   * @param rIn - The incident ray.
   * @param rec - The hit record containing information about the hit point.
   * @returns An object with information about the scattered ray, attenuation, and whether scattering occurred.
   */
  scatter(rIn: Ray, rec: HitRecord): { isScatter: boolean; scattered: Ray; attenuation: Color } {
    const attenuation = new Vec3(1.0, 1.0, 1.0);
    const refraction_ratio = rec.frontFace ? 1.0 / this.ir : this.ir;

    const unit_direction = unitVector(rIn.direction());
    const cos_theta = Math.min(dot(unit_direction.negate(), rec.normal), 1.0);
    const sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta);

    const cannot_refract = refraction_ratio * sin_theta > 1.0;
    let direction: Vec3;

    if (cannot_refract || this.reflectance(cos_theta, sin_theta) > randomDouble())
      direction = reflect(unit_direction, rec.normal);
    else direction = refract(unit_direction, rec.normal, refraction_ratio);

    const scattered = new Ray(rec.p, direction);
    return { isScatter: true, scattered, attenuation };
  }

  private reflectance(cosine: number, ref_idx: number): number {
    let r0 = (1 - ref_idx) / (1 + ref_idx);
    r0 = r0 * r0;
    return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
  }
}
