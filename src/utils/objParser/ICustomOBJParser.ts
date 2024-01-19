export interface ObjFile {
  models: ObjModel[];
  materialLibraries: any[];
}

export interface ObjModel {
  name: string;
  vertices: Vertex[];
  textureCoords: VertexTexture[];
  vertexNormals: Vertex[];
  faces: Face[];
  lines: Array<any>;
}

export interface Face {
  material: any;
  group: string;
  smoothingGroup: number;
  vertices: FaceVertex[];
}

export interface FaceVertex {
  vertexIndex: number;
  textureCoordsIndex: number;
  vertexNormalIndex: number;
}

export interface Vertex {
  x: number;
  y: number;
  z: number;
}

export interface VertexTexture {
  u: number;
  v: number;
  w: number;
}
