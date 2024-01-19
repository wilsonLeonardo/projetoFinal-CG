import { ObjModel, ObjFile } from './ICustomOBJParser';

export default class CustomOBJParser {
  private fileContents: string;
  private defaultModelName: string;
  private result!: ObjFile;
  private currentMaterial!: string;
  private currentGroup!: string;
  private smoothingGroup!: number;

  /**
   * Creates an instance of the CustomOBJParser.
   * @param fileContents The contents of the OBJ file as a string.
   * @param defaultModelName The default name for models if not specified.
   */
  constructor(fileContents: string, defaultModelName: string = 'untitled') {
    this.reset();
    this.fileContents = fileContents;
    this.defaultModelName = defaultModelName;
  }

  /**
   * Resets the parser's state, clearing previously parsed data.
   */
  private reset(): void {
    this.result = {
      models: [],
      materialLibraries: [],
    };
    this.currentMaterial = '';
    this.currentGroup = '';
    this.smoothingGroup = 0;
  }

  /**
   * Parses the input OBJ file and returns the resulting data structure.
   * @returns An object representing the parsed OBJ file.
   */
  public parse(): ObjFile {
    this.reset();

    const stripComments = (lineString: string) => {
      const commentIndex = lineString.indexOf('#');
      if (commentIndex > -1) {
        return lineString.substring(0, commentIndex);
      }
      return lineString;
    };

    const lines = this.fileContents.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      const line = stripComments(lines[i]);

      const lineItems = line.replace(/\s+/g, ' ').trim().split(' ');

      switch (lineItems[0].toLowerCase()) {
        case 'o':
          this.parseObject(lineItems);
          break;
        case 'g':
          this.parseGroup(lineItems);
          break;
        case 'v':
          this.parseVertexCoords(lineItems);
          break;
        case 'vt':
          this.parseTextureCoords(lineItems);
          break;
        case 'vn':
          this.parseVertexNormal(lineItems);
          break;
        case 'l':
          this.parseLine(lineItems);
          break;
        case 's':
          this.parseSmoothShadingStatement(lineItems);
          break;
        case 'f':
          this.parsePolygon(lineItems);
          break;
        case 'mtllib':
          this.parseMtlLib(lineItems);
          break;
        case 'usemtl':
          this.parseUseMtl(lineItems);
          break;
      }
    }

    return this.result;
  }
  /**
   * Creates a new OBJ model with the specified name.
   * @param name The name of the new model.
   * @returns A new OBJ model object.
   */
  private createNewModel(name: string = this.defaultModelName): ObjModel {
    return {
      name,
      vertices: [],
      textureCoords: [],
      vertexNormals: [],
      faces: [],
      lines: [],
    };
  }

  /**
   * Returns the currently active model being constructed.
   * @returns The current OBJ model object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private currentModel(): any {
    if (this.result.models.length === 0) {
      const defaultModel = this.createNewModel();
      this.result.models.push(defaultModel);
      this.currentGroup = '';
      this.smoothingGroup = 0;
    }

    return this.result.models[this.result.models.length - 1];
  }

  /**
   * Parses an "o" statement, creating a new object in the OBJ file.
   * @param lineItems An array of items from the line.
   */
  private parseObject(lineItems: string[]): void {
    const modelName = lineItems.length >= 2 ? lineItems[1] : this.defaultModelName;
    const model = this.createNewModel(modelName);
    this.result.models.push(model);
    this.currentGroup = '';
    this.smoothingGroup = 0;
  }

  /**
   * Parses a "g" statement, setting the current group for subsequent faces.
   * @param lineItems An array of items from the line.
   */
  private parseGroup(lineItems: string[]): void {
    if (lineItems.length !== 2) {
      throw 'Group statements must have exactly 1 argument (eg. g group_1)';
    }

    this.currentGroup = lineItems[1];
  }

  /**
   * Parses a "v" statement, extracting vertex coordinates.
   * @param lineItems An array of items from the line.
   */
  private parseVertexCoords(lineItems: string[]): void {
    const x = lineItems.length >= 2 ? parseFloat(lineItems[1]) : 0.0;
    const y = lineItems.length >= 3 ? parseFloat(lineItems[2]) : 0.0;
    const z = lineItems.length >= 4 ? parseFloat(lineItems[3]) : 0.0;

    this.currentModel().vertices.push({ x, y, z });
  }

  /**
   * Parses a "vt" statement, extracting texture coordinates.
   * @param lineItems An array of items from the line.
   */
  private parseTextureCoords(lineItems: string[]): void {
    const u = lineItems.length >= 2 ? parseFloat(lineItems[1]) : 0.0;
    const v = lineItems.length >= 3 ? parseFloat(lineItems[2]) : 0.0;
    const w = lineItems.length >= 4 ? parseFloat(lineItems[3]) : 0.0;

    this.currentModel().textureCoords.push({ u, v, w });
  }

  /**
   * Parses a "vn" statement, extracting vertex normals.
   * @param lineItems An array of items from the line.
   */
  private parseVertexNormal(lineItems: string[]): void {
    const x = lineItems.length >= 2 ? parseFloat(lineItems[1]) : 0.0;
    const y = lineItems.length >= 3 ? parseFloat(lineItems[2]) : 0.0;
    const z = lineItems.length >= 4 ? parseFloat(lineItems[3]) : 0.0;

    this.currentModel().vertexNormals.push({ x, y, z });
  }

  /**
   * Parses an "l" statement, extracting line segments.
   * @param lineItems An array of items from the line.
   */
  private parseLine(lineItems: string[]): void {
    const totalVertices = lineItems.length - 1;
    if (totalVertices < 2) {
      throw 'Line statement has less than 2 vertices';
    }

    const line = [];

    for (let i = 0; i < totalVertices; i += 1) {
      const vertexString = lineItems[i + 1];
      const vertexValues = vertexString.split('/');

      if (vertexValues.length < 1 || vertexValues.length > 2) {
        throw 'Too many values (separated by /) for a single vertex';
      }

      let vertexIndex = 0;
      let textureCoordsIndex = 0;
      vertexIndex = parseInt(vertexValues[0]);
      if (vertexValues.length > 1 && vertexValues[1] !== '') {
        textureCoordsIndex = parseInt(vertexValues[1]);
      }

      line.push({
        vertexIndex,
        textureCoordsIndex,
      });
    }
    this.currentModel().lines.push(line);
  }

  /**
   * Parses an "f" statement, extracting polygon (face) data.
   * @param lineItems An array of items from the line.
   */
  private parsePolygon(lineItems: string[]): void {
    const totalVertices = lineItems.length - 1;
    if (totalVertices < 3) {
      throw 'Face statement has less than 3 vertices';
    }

    const face = {
      material: this.currentMaterial,
      group: this.currentGroup,
      smoothingGroup: this.smoothingGroup,
      vertices: [],
    };

    for (let i = 0; i < totalVertices; i += 1) {
      const vertexString = lineItems[i + 1];
      const vertexValues = vertexString.split('/');

      if (vertexValues.length < 1 || vertexValues.length > 3) {
        throw 'Too many values (separated by /) for a single vertex';
      }

      let vertexIndex = 0;
      let textureCoordsIndex = 0;
      let vertexNormalIndex = 0;
      vertexIndex = parseInt(vertexValues[0]);
      if (vertexValues.length > 1 && vertexValues[1] !== '') {
        textureCoordsIndex = parseInt(vertexValues[1]);
      }
      if (vertexValues.length > 2) {
        vertexNormalIndex = parseInt(vertexValues[2]);
      }

      if (vertexIndex === 0) {
        throw 'Faces use an invalid vertex index of 0';
      }

      if (vertexIndex < 0) {
        vertexIndex = this.currentModel().vertices.length + 1 + vertexIndex;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (face.vertices as unknown as any).push({
        vertexIndex,
        textureCoordsIndex,
        vertexNormalIndex,
      });
    }
    this.currentModel().faces.push(face);
  }

  /**
   * Parses an "mtllib" statement, which specifies a material library file.
   * @param lineItems An array of items from the line.
   */
  private parseMtlLib(lineItems: string[]): void {
    if (lineItems.length >= 2) {
      this.result.materialLibraries.push(lineItems[1]);
    }
  }

  /**
   * Parses a "usemtl" statement, which specifies the use of a specific material.
   * @param lineItems An array of items from the line.
   */
  private parseUseMtl(lineItems: string[]): void {
    if (lineItems.length >= 2) {
      this.currentMaterial = lineItems[1];
    }
  }

  /**
   * Parses an "s" statement, which specifies smoothing group information.
   * @param lineItems An array of items from the line.
   */
  private parseSmoothShadingStatement(lineItems: string[]): void {
    if (lineItems.length !== 2) {
      throw 'Smoothing group statements must have exactly 1 argument (eg. s <number|off>)';
    }

    const groupNumber = lineItems[1].toLowerCase() === 'off' ? 0 : parseInt(lineItems[1]);
    this.smoothingGroup = groupNumber;
  }
}
