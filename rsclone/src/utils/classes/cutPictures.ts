import Button from "./canvasBtn";

export default class CutPicture extends Button {
   sheight: number;
   swidth: number;
   sypoint: number;
   sxpoint: number;

   constructor (image: HTMLImageElement, sxpoint: number, sypoint: number, swidth: number, sheight: number, xpoint: number, ypoint: number, width: number, height: number) {
      super(image, xpoint, ypoint, width, height);
      this.sxpoint = sxpoint;
      this.sypoint = sypoint;
      this.swidth = swidth;
      this.sheight = sheight;
   }

   public draw(ctx: CanvasRenderingContext2D) {
      ctx.drawImage(this.picture, this.sxpoint, this.sypoint, this.swidth, this.sheight, this.xpoint, this.ypoint, this.width, this.height);
   }
}
