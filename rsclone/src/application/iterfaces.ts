
// MAP SECTION ========================
export interface IPicture {
  type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number;
}
export interface Coords {
  currentX: number, currentY: number, currentW: number, currentH: number
}
export interface IText {
  text: string; x: number; y: number; animation: boolean;
}

export interface IButton extends IPicture {
  hover: number;
  stepY: number;
  click: number;
}
// MAP SECTION ========================
