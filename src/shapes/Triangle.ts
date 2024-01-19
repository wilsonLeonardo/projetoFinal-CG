import { Interval } from 'src/utils/Interval';
import { HitRecord, Hittable } from '../utils/Hittable';
import { Material } from '../utils/Material';
import { Point3, Ray } from '../utils/Ray';
import { cross, dot, unitVector } from '../vec/vec3';

function barycentric(point1: Point3, point2: Point3, point3: Point3, intersectPoint: Point3): [number, number, number] {
  const v0 = point2.subtract(point1);
  const v1 = point3.subtract(point1);
  const v2 = intersectPoint.subtract(point1);

  const d00 = dot(v0, v0);
  const d01 = dot(v0, v1);
  const d11 = dot(v1, v1);
  const d20 = dot(v2, v0);
  const d21 = dot(v2, v1);

  const denom = d00 * d11 - d01 * d01;

  const v = (d11 * d20 - d01 * d21) / denom;
  const w = (d00 * d21 - d01 * d20) / denom;
  const u = 1.0 - v - w;

  return [u, v, w];
}

export class Triangle extends Hittable {
  private material: Material;
  private vertexes: Point3[];
  private normals?: Point3[];

  constructor(vertex1: Point3, vertex2: Point3, vertex3: Point3, material: Material, normals?: Point3[]) {
    super();
    this.material = material;
    this.vertexes = [vertex1, vertex2, vertex3];

    if (normals) {
      this.normals = normals.map((normal) => unitVector(normal));
    }
  }

  getVertexes(): Point3[] {
    return this.vertexes;
  }

  getVertex1(): Point3 {
    return this.vertexes[0];
  }

  getVertex2(): Point3 {
    return this.vertexes[1];
  }

  getVertex3(): Point3 {
    return this.vertexes[2];
  }

  getNormals(): Point3[] | undefined {
    return this.normals;
  }

  getNormal1(): Point3 | undefined {
    return this.normals?.[0];
  }

  getNormal2(): Point3 | undefined {
    return this.normals?.[1];
  }

  getNormal3(): Point3 | undefined {
    return this.normals?.[2];
  }

  get(index: number): Point3 {
    return this.vertexes[index];
  }

  hit(r: Ray, rayT: Interval): { objectHit: boolean; rec: HitRecord | null } {
    const v1ToV2 = this.getVertex2().subtract(this.getVertex1());
    const v1ToV3 = this.getVertex3().subtract(this.getVertex1());
    const normal = cross(v1ToV2, v1ToV3);

    const normalDotRayDir = dot(normal, r.direction());

    if (normalDotRayDir == 0) {
      return { objectHit: false, rec: null };
    }

    const d = dot(normal.negate(), this.getVertex1());
    const t = -(dot(normal, r.origin()) + d) / normalDotRayDir;

    if (!rayT.contains(t)) {
      return { objectHit: false, rec: null };
    }

    const intersectPoint = r.at(t);

    const edge1 = this.getVertex2().subtract(this.getVertex1());
    const vp1 = intersectPoint.subtract(this.getVertex1());
    const c1 = cross(edge1, vp1);

    if (dot(normal, c1) < 0) {
      return { objectHit: false, rec: null };
    }

    const edge2 = this.getVertex3().subtract(this.getVertex2());
    const vp2 = intersectPoint.subtract(this.getVertex2());
    const c2 = cross(edge2, vp2);

    if (dot(normal, c2) < 0) {
      return { objectHit: false, rec: null };
    }

    const edge3 = this.getVertex1().subtract(this.getVertex3());
    const vp3 = intersectPoint.subtract(this.getVertex3());
    const c3 = cross(edge3, vp3);

    if (dot(normal, c3) < 0) {
      return { objectHit: false, rec: null };
    }

    if (!this.normals) {
      const rec = new HitRecord();
      rec.t = t;
      rec.p = intersectPoint;
      rec.setFaceNormal(r, normal);
      rec.mat = this.material;
      return { objectHit: true, rec };
    } else {
      const [w1, w2, w3] = barycentric(this.getVertex1(), this.getVertex2(), this.getVertex3(), intersectPoint);
      const normal = this.getNormal1()!.scale(w1).add(this.getNormal2()!.scale(w2)).add(this.getNormal3()!.scale(w3));
      const unitNormal = unitVector(normal);

      const rec = new HitRecord();
      rec.t = t;
      rec.p = intersectPoint;
      rec.setFaceNormal(r, unitNormal);
      rec.mat = this.material;

      return { objectHit: true, rec };
    }
  }
}
