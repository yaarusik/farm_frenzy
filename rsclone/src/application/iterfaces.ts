
// MAP SECTION ========================
export interface IPicture {
  type: string;
  name: string;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  sx: number;
  sy: number;
  swidth: number;
  sheight: number;
}
export interface Coords {
  currentX: number;
  currentY: number;
  currentW: number;
  currentH: number;
}
export interface IText {
  text: string;
  x: number;
  y: number;
  animation: boolean;
  fontSize: string;
  color: string;
  name?: string;
  id?: number
}


export interface IButton extends IPicture {
  hover: number;
  stepY: number;
  stepX: number;
  click: number;
  frameY?: number;
  frameX?: number;
}
// MAP SECTION ========================

// LEVELSECTION =======================
export interface IAnimBuild {
  name: string,
  maxX: number,
  maxY: number,
  speed: number
}
export interface IBuild extends IPicture {
  frameX: number,
  frameY: number,
  stepY?: number;
  stepX?: number;
}
export interface IFunctions {
  isPaused: () => boolean;
  onMain: () => void;
  onRestart: () => void;
  onMap: () => void;
  onSettings: () => void;
  isStart: () => void;
  renderStorage: (productsCounter: IKeyNumber) => void;
  addStorageTotal: (total: string) => void;
  productToStorage: (product: string[]) => void;
  reRenderStorage: () => void;
}

export interface IKeyBoolean {
  [key: string]: boolean;
}

export interface IKeyNumber {
  [key: string]: number;
}

export interface IKeyText {
  [key: string]: IText;
}

export interface IKeyString {
  [key: string]: string;
}

export interface IKeyImage {
  [key: string]: HTMLImageElement;
}

export interface IOpacity {
  opacity: number,
  show: boolean,
  disable: boolean
}

export interface IStaticText {
  text: string,
  fontSize: string,
  color: string,
  shadowColor: string,
  shadowBlur: number,
  x: number,
  y: number, shadowOffsetX: number,
  shadowOffsetY: number
}

// LEVELSECTION =======================