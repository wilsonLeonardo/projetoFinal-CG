import {
  degreesToRadians,
  randomDouble,
  randomDoubleRange,
} from "../utils/RtWeekend";
import { VecBase } from "./vecBase";

/**
 * Represents a 3D vector with three components (x, y, z).
 */
export class Vec3 extends VecBase {
  /**
   * Creates a Vec3 instance with the specified components.
   * @param e0 - The first component.
   * @param e1 - The second component.
   * @param e2 - The third component.
   */
  constructor(e0: number, e1: number, e2: number) {
    super(3);
    this.e = [e0, e1, e2];
  }

  /**
   * Gets the x-component of the vector.
   * @returns The x-component.
   */
  x(): number {
    return this.e[0];
  }

  /**
   * Gets the y-component of the vector.
   * @returns The y-component.
   */
  y(): number {
    return this.e[1];
  }

  /**
   * Gets the z-component of the vector.
   * @returns The z-component.
   */
  z(): number {
    return this.e[2];
  }

  /**
   * Negates the vector.
   * @returns A new Vec3 instance representing the negated vector.
   */
  negate(): Vec3 {
    return new Vec3(-this.e[0], -this.e[1], -this.e[2]);
  }

  /**
   * Gets the value at the specified index.
   * @param index - The index to retrieve the value from.
   * @returns The value at the specified index.
   */
  get(index: number): number {
    return this.e[index];
  }

  /**
   * Sets the value at the specified index.
   * @param index - The index to set the value at.
   * @param value - The value to set.
   */
  set(index: number, value: number): void {
    this.e[index] = value;
  }

  /**
   * Adds another vector to this vector.
   * @param v - The vector to add.
   * @returns A new Vec3 instance representing the result of the addition.
   */
  add(v: Vec3): Vec3 {
    const e0 = this.e[0] + v.e[0];
    const e1 = this.e[1] + v.e[1];
    const e2 = this.e[2] + v.e[2];
    return new Vec3(e0, e1, e2);
  }

  /**
   * Subtracts another vector from this vector.
   * @param v - The vector to subtract.
   * @returns A new Vec3 instance representing the result of the subtraction.
   */
  subtract(v: Vec3): Vec3 {
    const e0 = this.e[0] - v.e[0];
    const e1 = this.e[1] - v.e[1];
    const e2 = this.e[2] - v.e[2];
    return new Vec3(e0, e1, e2);
  }

  /**
   * Scales the vector by a scalar factor.
   * @param t - The scalar factor.
   * @returns A new Vec3 instance representing the scaled vector.
   */
  scale(t: number): Vec3 {
    const e0 = this.e[0] * t;
    const e1 = this.e[1] * t;
    const e2 = this.e[2] * t;
    return new Vec3(e0, e1, e2);
  }

  /**
   * Divides the vector by a scalar factor.
   * @param t - The scalar factor.
   * @returns A new Vec3 instance representing the divided vector.
   */
  divide(t: number): Vec3 {
    return this.scale(1 / t);
  }

  /**
   * Element-wise multiplication with another vector.
   * @param v - The vector to multiply with.
   * @returns A new Vec3 instance representing the element-wise product.
   */
  mul(v: Vec3): Vec3 {
    return new Vec3(this.x() * v.x(), this.y() * v.y(), this.z() * v.z());
  }

  /**
   * Calculates the Euclidean length of the vector.
   * @returns The Euclidean length of the vector.
   */
  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  /**
   * Calculates the squared length of the vector (avoids square root for performance).
   * @returns The squared length of the vector.
   */
  lengthSquared(): number {
    return (
      this.e[0] * this.e[0] + this.e[1] * this.e[1] + this.e[2] * this.e[2]
    );
  }

  /**
   * Checks if the vector is near zero (within a small tolerance).
   * @returns A boolean indicating whether the vector is near zero.
   */
  nearZero(): boolean {
    const s = 1e-8;
    return (
      Math.abs(this.e[0]) < s &&
      Math.abs(this.e[1]) < s &&
      Math.abs(this.e[2]) < s
    );
  }

  /**
   * Rotates the vector around a specified axis by a given angle.
   * @param axis - The axis of rotation ('x', 'y', or 'z').
   * @param angle - The angle of rotation in degrees.
   * @returns A new Vec3 instance representing the rotated vector.
   */
  rotate(axis: "x" | "y" | "z", angle: number): Vec3 {
    const angleRadians = degreesToRadians(angle);
    const models = {
      x: () =>
        new Vec3(
          this.e[0],
          this.e[1] * Math.cos(angleRadians) -
            this.e[2] * Math.sin(angleRadians),
          this.e[1] * Math.sin(angleRadians) +
            this.e[2] * Math.cos(angleRadians)
        ),
      y: () =>
        new Vec3(
          this.e[0] * Math.cos(angleRadians) +
            this.e[2] * Math.sin(angleRadians),
          this.e[1],
          -this.e[0] * Math.sin(angleRadians) +
            this.e[2] * Math.cos(angleRadians)
        ),
      z: () =>
        new Vec3(
          this.e[0] * Math.cos(angleRadians) -
            this.e[1] * Math.sin(angleRadians),
          this.e[0] * Math.sin(angleRadians) +
            this.e[1] * Math.cos(angleRadians),
          this.e[2]
        ),
    };
    return models[axis]();
  }
}

/**
 * Calculates the dot product of two Vec3 objects.
 * @param u - The first Vec3 object.
 * @param v - The second Vec3 object.
 * @returns The dot product of the two Vec3 objects.
 */
export function dot(u: Vec3, v: Vec3): number {
  return u.x() * v.x() + u.y() * v.y() + u.z() * v.z();
}

/**
 * Calculates the cross product of two Vec3 objects.
 * @param u - The first Vec3 object.
 * @param v - The second Vec3 object.
 * @returns The cross product of the two Vec3 objects as a new Vec3 object.
 */
export function cross(u: Vec3, v: Vec3): Vec3 {
  return new Vec3(
    u.y() * v.z() - u.z() * v.y(),
    u.z() * v.x() - u.x() * v.z(),
    u.x() * v.y() - u.y() * v.x()
  );
}

/**
 * Calculates the unit vector (normalized) of a Vec3 vector.
 * @param v - The Vec3 vector to be normalized.
 * @returns A new Vec3 representing the unit vector of the input vector.
 */
export function unitVector(v: Vec3): Vec3 {
  return v.divide(v.length());
}

/**
 * Generates a random Vec3 vector within a specified range.
 * @param min - The minimum value for each component (optional).
 * @param max - The maximum value for each component (optional).
 * @returns A new random Vec3 vector.
 */
export function random(min?: number, max?: number): Vec3 {
  if (min && max) {
    return new Vec3(
      randomDoubleRange(min, max),
      randomDoubleRange(min, max),
      randomDoubleRange(min, max)
    );
  }
  return new Vec3(randomDouble(), randomDouble(), randomDouble());
}

/**
 * Generates a random vector within a unit sphere.
 * @returns A new random Vec3 vector within the unit sphere.
 */
export function randomInUnitSphere(): Vec3 {
  while (true) {
    const p: Vec3 = random(-1, 1);
    if (p.lengthSquared() < 1) {
      return p;
    }
  }
}

/**
 * Generates a random unit vector.
 * @returns A new random unit Vec3 vector.
 */
export function randomUnitVector(): Vec3 {
  return unitVector(randomInUnitSphere());
}

/**
 * Generates a random vector on a hemisphere given a normal vector.
 * @param normal - The normal vector of the hemisphere.
 * @returns A new random Vec3 vector on the hemisphere.
 */
export function randomOnHemisphere(normal: Vec3): Vec3 {
  const onUnitSphere = randomUnitVector();
  if (dot(onUnitSphere, normal) > 0.0) return onUnitSphere;
  else return onUnitSphere.negate();
}

/**
 * Reflects a vector off a surface with a given normal.
 * @param v - The incident vector.
 * @param n - The surface normal vector.
 * @returns The reflected vector.
 */
export function reflect(v: Vec3, n: Vec3): Vec3 {
  return v.subtract(n.scale(dot(v, n) * 2));
}

/**
 * Refracts a vector as it passes through a transparent medium.
 * @param uv - The incident vector.
 * @param n - The surface normal vector.
 * @param etai_over_etat - The ratio of refractive indices (source to target medium).
 * @returns The refracted vector.
 */
export function refract(uv: Vec3, n: Vec3, etai_over_etat: number): Vec3 {
  const cosTheta = Math.min(dot(uv.negate(), n), 1.0);
  const rOutPerp = n.scale(cosTheta).add(uv).scale(etai_over_etat);
  const rOutParallel = n.scale(
    -Math.sqrt(Math.abs(1.0 - rOutPerp.lengthSquared()))
  );
  return rOutPerp.add(rOutParallel);
}
