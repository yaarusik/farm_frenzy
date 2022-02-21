import Common from "../../application/common/common";

interface IEffects { type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; }

export default class Arrow extends Common {
  arrowUp: IEffects;
  arrowRight: IEffects;
  maxFrame: number;
  arrow: IEffects[];
  initialArrow: HTMLImageElement[];
  animDisable: boolean;
  animUpDisable: boolean;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.maxFrame = 7;
    this.animDisable = false;
    this.animUpDisable = false;

    this.arrowUp = {
      type: "animation",
      name: "up",
      image: "images/level/effects/arrowUp.png",
      x: 940,
      y: 100,
      width: 90,
      height: 90,
      sx: 0,
      sy: 0,
      swidth: 52,
      sheight: 52
    },
      this.arrowRight = {
        type: "animation",
        name: "right",
        image: "images/level/effects/arrowRight.png",
        x: 700,
        y: 90,
        width: 90,
        height: 90,
        sx: 0,
        sy: 0,
        swidth: 52,
        sheight: 52
      },
      this.arrow = [];
    this.initialArrow = [];

    this.startArrow();
  }

  private async startArrow() {
    const loadArrow = this.arrow.map(image => this.loadImage(image.image));
    this.initialArrow = await this.renderImages(loadArrow);
  }

  public async showArrow(name: string) {
    if (name === 'right') {
      this.arrow.push(this.arrowRight);
      this.drawProduct();
      this.arrowRightAnim();
    }
    if (name === 'up') {
      this.arrow.push(this.arrowUp);
      this.drawProduct();
      this.arrowUpAnim();
    }
  }

  private async drawProduct() {
    const arrow = this.arrow.map(image => this.loadImage(image.image));
    this.initialArrow = await this.renderImages(arrow);
  }

  private arrowRightAnim() {
    if (!this.animDisable) {
      this.animDisable = true;
      let frameX = 0;
      const arrowRight = <IEffects>this.arrow.find(item => item.name === 'right');
      const timer = setInterval(() => {
        if (frameX < this.maxFrame) {
          arrowRight.sx += arrowRight.sheight;
          frameX++;
        }
        else {
          frameX = 0;
          arrowRight.sx = 0;
        }
      }, 60);
      setTimeout(() => {
        clearInterval(timer);
        this.animDisable = false;
        arrowRight.sx = 0;
        this.animEnd();
      }, 1200);
    }
  }

  private arrowUpAnim() {
    if (!this.animUpDisable) {
      this.animUpDisable = true;

      let frameY = 0;
      const arrowUp = <IEffects>this.arrow.find(item => item.name === 'up');
      const timer = setInterval(() => {
        if (frameY < this.maxFrame) {
          arrowUp.sy += arrowUp.swidth;
          frameY++;
        }
        else {
          frameY = 0;
          arrowUp.sy = 0;
        }
      }, 60);
      setTimeout(() => {
        clearInterval(timer);
        this.animUpDisable = false;
        arrowUp.sy = 0;
        this.animEnd();
      }, 1200);
    }
  }

  public render() {
    this.drawImage(this.initialArrow, this.arrow);

  }

  private animEnd() {
    this.initialArrow = [];
    this.arrow = [];

  }
}


