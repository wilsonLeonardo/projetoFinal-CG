import im from 'imagemagick';
import fs from 'fs';

/**
 *
 * Class responsible for generate and save images
 */
export default class GenerateImage {
  constructor(
    private imageWidth: number = 255,
    private imageHeight: number = 255,
  ) {}

  /**
   *
   * this method generate a gradient image
   */
  public generateGradientImage(filename: string): void {
    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < this.imageHeight; ++i) {
      for (let j = 0; j < this.imageWidth; ++j) {
        const r = j / (this.imageWidth - 1);
        const g = i / (this.imageHeight - 1);
        const b = 0;

        const ir = parseInt((255.999 * r).toString());
        const ig = parseInt((255.999 * g).toString());
        const ib = parseInt((255.999 * b).toString());

        content = `${content}${ir} ${ig} ${ib}\n`;
      }
    }
    this.generateImage(filename, content);
  }

  /**
   *
   * this method generate a image with a circle
   */
  public generateCircleImage(filename: string): void {
    const centerX = this.imageWidth / 2; // Coordenada x do centro do círculo
    const centerY = this.imageHeight / 2; // Coordenada y do centro do círculo
    const radius = Math.min(centerX, centerY); // Raio do círculo

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < this.imageHeight; ++i) {
      for (let j = 0; j < this.imageWidth; ++j) {
        const distanceToCenter = Math.sqrt((j - centerX) ** 2 + (i - centerY) ** 2);

        let r = 0;
        const g = 0;
        const b = 0;

        if (distanceToCenter <= radius) {
          r = 255;
        }
        content = `${content}${r} ${g} ${b}\n`;
      }
    }
    this.generateImage(filename, content);
  }

  /**
   *
   * this method generate a image with a square
   */
  public generateSquareImage(filename: string): void {
    const centerX = this.imageWidth / 2; // Coordenada x do centro do quadrado
    const centerY = this.imageHeight / 2; // Coordenada y do centro do quadrado
    const halfSize = 100; // Tamanho/raio do quadrado dividido por 2

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < this.imageHeight; ++i) {
      for (let j = 0; j < this.imageWidth; ++j) {
        const r = 0;
        let g = 0;
        const b = 0;
        if (j >= centerX - halfSize && j <= centerX + halfSize && i >= centerY - halfSize && i <= centerY + halfSize) {
          // Define a cor verde
          g = 255;
        }

        content = `${content}${r} ${g} ${b}\n`;
      }
    }

    this.generateImage(filename, content);
  }

  /**
   *
   * this method generate the .ppm and .png files
   */
  public generateImage(filename: string, content: string) {
    const sourcePath = `./src/out`;

    fs.writeFileSync(`${sourcePath}/ppm/${filename}.ppm`, content);

    im.convert([`${sourcePath}/ppm/${filename}.ppm`, `${sourcePath}/png/${filename}.png`], async (err) => {
      if (err) {
        throw err;
      }
      console.log(`Files ${filename}.ppm and ${filename}.png image created successfully in scr/out!`);
    });
  }
}
