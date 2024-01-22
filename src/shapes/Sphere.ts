import { Interval } from "src/utils/Interval";
import { HitRecord, Hittable } from "../utils/Hittable";
import { Point3, Ray } from "../utils/Ray";
import { Vec3, dot } from "../vec/vec3";
import { Material } from "src/utils/Material";

export default class Sphere implements Hittable {
  private center: Point3;
  private radius: number;
  private mat: Material;

  constructor(center: Point3, radius: number, material: Material) {
    this.center = center;
    this.radius = radius;
    this.mat = material;
  }

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
  translate(vec: Point3) {
    this.center = this.center.add(vec);
  }
  getCenter(): Point3 {
    return this.center;
  }
}
