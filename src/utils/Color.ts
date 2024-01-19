import { Vec3 } from '../vec/vec3';
import { Interval } from './Interval';

export type Color = Vec3;

/**
 * Converts a linear color component to gamma-corrected value.
 * @param linearComponent The linear color component.
 * @returns The gamma-corrected value.
 */
function linearToGamma(linearComponent: number): number {
  return Math.sqrt(linearComponent);
}

/**
 * Writes the color to the output stream to generate an image.
 * @param pixelColor The vector that generates the image's pixel color.
 * @param samplesPerPixel The number of samples per pixel.
 * @returns A string representing the pixel color for the image.
 */
export default function writeColor(pixelColor: Color, samplesPerPixel: number): string {
  let r: number = pixelColor.x();
  let g: number = pixelColor.y();
  let b: number = pixelColor.z();

  const scale: number = 1.0 / samplesPerPixel;
  r *= scale;
  g *= scale;
  b *= scale;

  r = linearToGamma(r);
  g = linearToGamma(g);
  b = linearToGamma(b);

  const intensityBounds = new Interval(0.0, 0.999);

  return (
    `${Math.floor(256 * intensityBounds.clamp(r))} ` +
    `${Math.floor(256 * intensityBounds.clamp(g))} ` +
    `${Math.floor(256 * intensityBounds.clamp(b))}\n`
  );
}
