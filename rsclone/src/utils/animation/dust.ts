import Common from "../../application/common/common";

interface IEffects { type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; }

export default class Dust extends Common {
  dustImg: IEffects;
  maxFrame: number;
  dust: IEffects[];
  initialDust: HTMLImageElement[];
  animDisable: boolean;
  animUpDisable: boolean;



  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.maxFrame = 7;
    this.animDisable = false;
    this.animUpDisable = false;

    this.dustImg = {
      type: "animation",
      name: "up",
      image: "images/level/effects/dust_house.png",
      x: 800,
      y: 800,
      width: 200,
      height: 240,
      sx: 40,
      sy: 0,
      swidth: 40,
      sheight: 48
    },



      this.dust = [];
    this.initialDust = [];

    this.startDust();
  }

  private async startDust() {
    const loadDust = this.dust.map(image => this.loadImage(image.image));
    this.initialDust = await this.renderImages(loadDust);
  }

  public async showDust() {
    this.dust.push(this.dustImg);
    this.drawProduct();
  }

  private async drawProduct() {
    const dust = this.dust.map(image => this.loadImage(image.image));
    this.initialDust = await this.renderImages(dust);
    this.dustAnim();
  }

  public render() {
    this.drawImage(this.initialDust, this.dust);
  }

  dudstAnim() {
    const [dust] = this.dust;
    let frameY = 0;
    let frameX = 0;
    const timer = setInterval(() => {

      if (frameX < 5) {
        dust.sx += dust.swidth;
        dust.sy = dust.sheight * frameY;
        frameX++;
      } else if (frameY < 10) {
        frameY++;
        frameX = 0;
        dust.sx = 0;
      } else {
        clearInterval(timer);
        dust.sx = 0;
        dust.sy = 0;
        this.dust = [];
        this.initialDust = [];
      }
    }, 50);
  }

  public dustAnim(): void {
    let frameY = 0;
    let frameX = 0;
    const [dust] = this.dust;

    const timer = setInterval(() => {
      if (frameX < 5 || dust.sx < dust.swidth * 5) {
        dust.sx += 5;
        frameX++;
      } else if (frameY < 10) {
        frameY++;
        frameX = 0;
        dust.sx = 0;
        dust.sy += dust.sheight;
      } else {
        frameY = 0;
        dust.sy = 0;
        frameX = 0;
        dust.sx = 0;
      }
    }, 30);
    setTimeout(() => {
      clearInterval(timer);
      dust.sy = 0;
      dust.sx = 0;
    }, 2400);
  }

}