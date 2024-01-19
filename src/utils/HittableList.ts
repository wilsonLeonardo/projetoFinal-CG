import { HitRecord, Hittable } from './Hittable';
import { Interval } from './Interval';
import { Ray } from './Ray';

/**
 * Represents a collection of hittable objects in the scene.
 */
export class HittableList implements Hittable {
  /**
   * The list of hittable objects in the scene.
   */
  objects: Hittable[];

  /**
   * Constructs an empty hittable list.
   */
  constructor() {
    this.objects = [];
  }

  /**
   * Adds a hittable object to the list.
   * @param object - The hittable object to add.
   */
  add(object: Hittable): void {
    this.objects.push(object);
  }

  /**
   * Clears the list of hittable objects.
   */
  clear(): void {
    this.objects = [];
  }

  /**
   * Checks if a ray hits any object in the list within a specified interval.
   * @param r - The ray to check for intersection.
   * @param rayT - The interval of valid t-values for intersections.
   * @returns An object indicating whether the ray hits and the hit record.
   */
  hit(r: Ray, rayT: Interval): { objectHit: boolean; rec: HitRecord | null } {
    let hitAnything: boolean = false;
    let closestSoFar: number = rayT.max;
    let hitRecord: HitRecord;

    for (const object of this.objects) {
      const { objectHit, rec } = object.hit(r, new Interval(rayT.min, closestSoFar));
      if (objectHit) {
        hitAnything = true;
        closestSoFar = rec!.t;
        hitRecord = rec!;
      }
    }

    if (hitAnything) return { objectHit: true, rec: hitRecord! };
    else return { objectHit: false, rec: null };
  }
}
