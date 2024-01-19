import { Vec3, cross, unitVector } from '../vec/vec3';
import { Hittable } from './Hittable';
import { Interval } from './Interval';
import { Point3, Ray } from './Ray';
import { degreesToRadians, infinity, randomDouble } from './RtWeekend';
import writeColor, { Color } from './Color';
import GenerateImage from './GenerateImage';

/**
 * Represents a camera in the scene.
 */
export default class Camera {
  aspectRatio: number = 1.0; // Ratio of image width over height
  imageWidth: number = 100; // Rendered image width in pixel count
  samplesPerPixel: number = 10; // Count of random samples for each pixel
  maxDepth: number = 10; // Maximum number of ray bounces into scene
  vFov: number = 90; // Vertical view angle (field of view)
  lookFrom: Point3 = new Point3(0, 0, -1); // Point camera is looking from
  lookAt: Point3 = new Point3(0, 0, 0); // Point camera is looking at
  vup: Vec3 = new Vec3(0, 1, 0); // Camera-relative "up" direction

  private imageHeight!: number;
  private center!: Point3;
  private pixel00Loc!: Point3;
  private pixelDeltaU!: Vec3;
  private pixelDeltaV!: Vec3;
  private imageGenerator!: GenerateImage;
  private u!: Vec3;
  private v!: Vec3;
  private w!: Vec3;

  /**
   * Renders the scene and generates an image file.
   * @param filename - The name of the image file to be generated.
   * @param world - The hittable object representing the scene.
   */
  render(filename: string, world: Hittable): void {
    this.initialize();

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let j = 0; j < this.imageHeight; ++j) {
      console.log(`\rScanlines remaining: ${this.imageHeight - j} `);
      for (let i = 0; i < this.imageWidth; ++i) {
        let pixelColor: Color = new Vec3(0, 0, 0);
        for (let sample = 0; sample < this.samplesPerPixel; ++sample) {
          const r: Ray = this.getRay(i, j);
          pixelColor = pixelColor.add(this.rayColor(r, this.maxDepth, world));
        }
        content += writeColor(pixelColor, this.samplesPerPixel);
      }
    }

    this.imageGenerator.generateImage(filename, content);
    console.log('\rDone.                 \n');
  }

  /**
   * Initializes the camera parameters and precomputes necessary values.
   */
  private initialize(): void {
    this.imageHeight = Math.max(1, Math.floor(this.imageWidth / this.aspectRatio));
    this.imageGenerator = new GenerateImage(this.imageWidth, this.imageHeight);

    this.center = this.lookFrom;

    const focalLength = this.lookFrom.subtract(this.lookAt).length();
    const theta = degreesToRadians(this.vFov);
    const h = Math.tan(theta / 2);
    const viewportHeight = 2 * h * focalLength;
    const viewportWidth = viewportHeight * (this.imageWidth / this.imageHeight);

    // Calculate the u,v,w unit basis vectors for the camera coordinate frame.
    this.w = unitVector(this.lookFrom.subtract(this.lookAt));
    this.u = unitVector(cross(this.vup, this.w));
    this.v = cross(this.w, this.u);

    const viewportU = this.u.scale(viewportWidth);
    const viewportV = this.v.negate().scale(viewportHeight);

    this.pixelDeltaU = viewportU.divide(this.imageWidth);
    this.pixelDeltaV = viewportV.divide(this.imageHeight);

    const viewportUpperLeft = this.center
      .subtract(this.w.scale(focalLength))
      .subtract(viewportU.divide(2))
      .subtract(viewportV.divide(2));
    this.pixel00Loc = viewportUpperLeft.add(this.pixelDeltaU.divide(2)).add(this.pixelDeltaV.divide(2));
  }

  /**
   * Calculates the color of a ray in the scene.
   * @param r - The ray to calculate the color for.
   * @param depth - The recursion depth for ray bouncing.
   * @param world - The hittable object representing the scene.
   * @returns The color of the ray.
   */
  private rayColor(r: Ray, depth: number, world: Hittable): Color {
    if (depth <= 0) {
      return new Vec3(0, 0, 0);
    }
    const { objectHit, rec } = world.hit(r, new Interval(0.001, infinity));
    if (objectHit) {
      const { isScatter, attenuation, scattered } = rec!.mat.scatter(r, rec!);

      if (isScatter) {
        return attenuation.mul(this.rayColor(scattered, depth - 1, world));
      }

      return new Vec3(0, 0, 0);
    }

    const unitDirection: Vec3 = unitVector(r.direction());
    const a: number = 0.5 * (unitDirection.y() + 1.0);

    const white: Color = new Vec3(1.0, 1.0, 1.0);
    const blue: Color = new Vec3(0.5, 0.7, 1.0);

    return white.scale(1.0 - a).add(blue.scale(a));
  }

  /**
   * Generates a ray for a given pixel.
   * @param i - The x-coordinate of the pixel.
   * @param j - The y-coordinate of the pixel.
   * @returns The generated ray.
   */
  private getRay(i: number, j: number): Ray {
    const pixelCenter = this.pixel00Loc.add(this.pixelDeltaU.scale(i)).add(this.pixelDeltaV.scale(j));
    const pixelSample = pixelCenter.add(this.pixelSampleSquare());

    const rayOrigin = this.center;
    const rayDirection = pixelSample.subtract(rayOrigin);

    return new Ray(rayOrigin, rayDirection);
  }

  /**
   * Generates a random point within the square surrounding a pixel.
   * @returns The randomly generated point.
   */
  private pixelSampleSquare(): Vec3 {
    const px: number = -0.5 + randomDouble();
    const py: number = -0.5 + randomDouble();
    return this.pixelDeltaU.scale(px).add(this.pixelDeltaV.scale(py));
  }
}
