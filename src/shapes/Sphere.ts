import { Interval } from "src/utils/Interval";
import { HitRecord, Hittable } from "../utils/Hittable";
import { Point3, Ray } from "../utils/Ray";
import { Vec3, dot } from "../vec/vec3";
import { Material } from "src/utils/Material";

/**
 * Represents a sphere in 3D space, implementing the Hittable interface.
 */
export default class Sphere implements Hittable {
  private center: Point3;
  private radius: number;
  private mat: Material;

  /**
   * Creates a new Sphere instance.
   * @param center - The center of the sphere.
   * @param radius - The radius of the sphere.
   * @param material - The material of the sphere.
   */
  constructor(center: Point3, radius: number, material: Material) {
    this.center = center;
    this.radius = radius;
    this.mat = material;
  }

  /**
   * Checks for intersection between a ray and the sphere.
   * @param r - Ray to check for intersection.
   * @param rayT - Interval defining the valid range of intersection distances.
   * @returns An object indicating whether an intersection occurred and the corresponding HitRecord.
   */
  hit(r: Ray, rayT: Interval): { objectHit: boolean; rec: HitRecord | null } {
    const oc: Vec3 = r.origin().subtract(this.center);
    const a: number = r.direction().lengthSquared();
    const halfB: number = dot(oc, r.direction());
    const c: number = oc.lengthSquared() - this.radius * this.radius;

    const discriminant: number = halfB * halfB - a * c;
    if (discriminant < 0) return { objectHit: false, rec: null };
    const sqrtd: number = Math.sqrt(discriminant);

    // Find the nearest root that lies in the acceptable range.
    let root: number = (-halfB - sqrtd) / a;
    if (!rayT.surrounds(root)) {
      root = (-halfB + sqrtd) / a;
      if (!rayT.surrounds(root)) return { objectHit: false, rec: null };
    }

    const rec = new HitRecord();
    rec.t = root;
    rec.p = r.at(rec.t);
    const outwardNormal = rec.p.subtract(this.center).divide(this.radius);
    rec.setFaceNormal(r, outwardNormal);
    rec.mat = this.mat;

    return { objectHit: true, rec };
  }

  /**
   * Translates the sphere by the given vector.
   * @param vec - The translation vector.
   */
  translate(vec: Point3) {
    this.center = this.center.add(vec);
  }

  /**
   * Gets the center of the sphere.
   * @returns The center of the sphere.
   */
  getCenter(): Point3 {
    return this.center;
  }
}
