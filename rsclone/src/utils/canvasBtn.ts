export default class Picture {
  height: number;
  width: number;
  ypoint: number;
  xpoint: number;
  picture: HTMLImageElement;

  constructor(image: HTMLImageElement,xpoint: number, ypoint: number, width: number, height: number){
     this.xpoint = xpoint;
     this.ypoint = ypoint;
     this.width = width;
     this.height = height;
     this.picture = image;
  }

  public draw(ctx: CanvasRenderingContext2D){
     ctx.drawImage(this.picture , this.xpoint, this.ypoint, this.width, this.height);
  }
}