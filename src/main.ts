import Sphere from "./shapes/Sphere";
import { Triangle } from "./shapes/Triangle";
import Camera from "./utils/Camera";
import { HittableList } from "./utils/HittableList";
import { Lambertian } from "./utils/Lambertian";
import { Material } from "./utils/Material";
import { Metal } from "./utils/Metal";
import { Point3 } from "./utils/Ray";
import CustomOBJParser from "./utils/objParser/CustomOBJParser";
import { ObjModel } from "./utils/objParser/ICustomOBJParser";
import { Vec3 } from "./vec/vec3";
import fs from "fs";

/**
 * Converts an OBJ model to an array of triangles.
 * @param model - The OBJ model to convert.
 * @param translation - Translation vector for the model.
 * @param resize - Scaling factor for the model.
 * @returns An array of triangles representing the OBJ model.
 */
function objToTriangles(
  model: ObjModel,
  material: Material,
  translation: Point3 = new Point3(0, 0, 0),
  resize: number = 1
): Array<Triangle> {
  const triangles = model.faces.map((face) => {
    const vertices = face.vertices.map(
      (vertex) => model.vertices[vertex.vertexIndex - 1]
    );
    const verticesNormals = face.vertices.map(
      (vertex) => model.vertexNormals[vertex.vertexNormalIndex - 1]
    );

    const validVertices = vertices.map((vtx) =>
      new Vec3(vtx.x, vtx.y, vtx.z).add(translation).scale(resize)
    );

    let validVerticesNormals = undefined;
    if (!verticesNormals.every((vtx) => vtx === undefined))
      validVerticesNormals = verticesNormals.map(
        (vtx) => new Vec3(vtx.x, vtx.y, vtx.z)
      );

    const triangle = new Triangle(
      validVertices[0],
      validVertices[1],
      validVertices[2],
      material,
      validVerticesNormals
    );

    return triangle;
  });

  return triangles;
}

/**
 * Reads an OBJ file and returns the parsed OBJ model.
 * @param objFilePath - Path to the OBJ file.
 * @returns The parsed OBJ model.
 */
function readObject(objFilePath: string): ObjModel {
  const data = fs.readFileSync(objFilePath, "utf-8");
  const parser = new CustomOBJParser(data);
  return parser.parse().models[0];
}

/**
 * The main export function to generate images with spheres, triangles, and other 3D objects.
 */
export function main() {
  const world = new HittableList();

  const material_ground = new Lambertian(new Vec3(0.8, 0.8, 0.0));
  const material_left = new Lambertian(new Vec3(0.1, 0.2, 0.5));
  const material_center = new Metal(new Vec3(0.8, 0.6, 0.2), 0.0);
  const material_right = new Lambertian(new Vec3(1, 0, 0));

  const model = readObject("src/obj/cube.obj");

  const translate_direction1 = new Point3(0, 0.2, 0);
  const translate_direction2 = new Point3(0, -0.2, 0);
  let toUp = true;

  world.add(new Sphere(new Point3(0.0, -100.5, -1.0), 100.0, material_ground));
  const translate = new Point3(-1, -3, -1.2);

  objToTriangles(model, material_center, translate, 0.8).forEach((shapes) => {
    world.add(shapes);
  });

  const sphere1 = new Sphere(new Point3(2, 0.0, -1), 0.5, material_left);
  const sphere2 = new Sphere(new Point3(-2, 0.0, 1), 0.5, material_right);
  world.add(sphere1);
  world.add(sphere2);

  const cam = new Camera();

  cam.aspectRatio = 16.0 / 9.0;
  cam.imageWidth = 400;
  cam.samplesPerPixel = 100;
  cam.maxDepth = 50;
  cam.vFov = 80;
  cam.lookFrom = new Point3(-2, 2, -5);
  cam.lookAt = new Point3(0, 0, 0);
  cam.vup = new Vec3(0, 1, 0);

  const fps = 28;
  const animation_duration = 5;

  for (let i = 0; i < fps * animation_duration; i++) {
    if (Math.round(sphere1.getCenter().y()) == 3) {
      toUp = false;
    } else if (sphere1.getCenter().y() <= 0.1) {
      toUp = true;
    }
    if (i > fps) {
      sphere1.translate(toUp ? translate_direction1 : translate_direction2);
      sphere2.translate(toUp ? translate_direction1 : translate_direction2);
    }

    cam.render(`world-${i}`, world);

    cam.lookFrom = cam.lookFrom.rotate("y", 5);
  }
}
