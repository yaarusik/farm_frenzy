import Common from "../../application/common/common";
import { IAnimBuild, IButton, IKeyNumber } from "../../application/iterfaces";


export default class BuildUtils extends Common {

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
  }

  public buildSpawn(item: IAnimBuild, build: IButton) {
    if (item.name === build.name) {
      if (item.maxY > build.y) build.y += item.speed;
      else {
        build.y = item.maxY;
      }
    }
  }

  // пополнение
  public fullhouseIndicator(btnArr: IButton[], time: number, speed: number) {
    const house = <IButton>btnArr.find(item => item.name === 'houseIndicator');
    let frameY = 0;
    let animStop = false;
    const timer = setInterval(() => {
      if (house.frameY && !animStop) {
        if (frameY < house.frameY) {
          house.sy += house.stepY;
          frameY++;
        } else {
          animStop = true;
        }
      }
    }, speed);
    setTimeout(() => {
      clearInterval(timer);
      house.sy = 0;
    }, time);
  }

  public buildAnimation(btn: IButton, maxX: number, maxY: number, animEnd: () => void): void {
    let frameY = 0;
    let frameX = 0;
    const timer = setInterval(() => {
      if (frameY < maxY) {
        btn.sy += btn.sheight;
        frameY++;
      } else if (frameX < maxX) {
        frameX++;
        frameY = 0;
        btn.sy = 0;
        btn.sx += btn.swidth;
      } else {
        frameY = 0;
        btn.sy = 0;
        frameX = 0;
        btn.sx = 0;
      }
    }, 50);
    setTimeout(() => {
      clearInterval(timer);
      btn.sy = 0;
      btn.sx = 0;
      animEnd();
    }, 16000);
  }

  public checkProduct(product: string, prodCounter: IKeyNumber): boolean {
    return prodCounter[product] !== 0;
  }

  public deleteProduct(initialData: HTMLImageElement[], productData: IButton[]): string[] | undefined {

    const product = <IButton>productData.pop();
    initialData.pop();
    if (product) return [product.name];
  }

  public deleteUseProduct(product: string, productCounter: IKeyNumber) {
    productCounter[product]--;
  }

  public productGhost(opacityState: { active: boolean; opacity: number; }) {
    if (opacityState.opacity <= 1 && opacityState.opacity > 0.5 && opacityState.active) {
      opacityState.opacity -= 0.02;
    } else {
      opacityState.active = false;
      opacityState.opacity += 0.02;
      if (opacityState.opacity >= 1) opacityState.active = true;
    }
    this.context.globalAlpha = opacityState.opacity;
  }

}

