
// MAP SECTION ========================
export interface IPictures {
  type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; stepY?: number; id?: number
}
export interface Coords {
  currentX: number, currentY: number, currentW: number, currentH: number
}
export interface IText {
  text: string; x: number; y: number; animation: boolean;
}
// MAP SECTION ========================
