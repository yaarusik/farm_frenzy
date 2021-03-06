import { IPicture, IText, Coords, IButton, IAnimBuild, IOpacity, IStaticText } from './../iterfaces';
import Picture from "../../utils/classes/canvasBtn";
import CutPicture from "../../utils/classes/cutPictures";


export default class Common {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  initialWidth: number;
  initialHeight: number;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
    this.initialWidth = 1600;
    this.initialHeight = 1200;
  }

  public loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        resolve(image);
      };
    });
  }

  public async renderImages(loadImages: Promise<HTMLImageElement>[]) {
    const images: HTMLImageElement[] = [];
    await Promise.all(loadImages).then(renderImg => renderImg.forEach(img => images.push(img)));
    return images;
  }

  public drawImage(loadImages: HTMLImageElement[], imagesData: IPicture[]) {
    loadImages.forEach((img, index) => {
      const item = imagesData[index];
      if (typeof item === 'undefined')
        return;
      if (item.type === "button" || item.type === "animation") {
        const cutPicture = new CutPicture(img, item.sx, item.sy, item.swidth, item.sheight, item.x, item.y, item.width, item.height);
        cutPicture.draw(this.context);
      } else {
        const btn = new Picture(img, item.x, item.y, item.width, item.height);
        btn.draw(this.context);
      }
    });
  }

  // функция для отрисовки текста или анимации текста
  public drawText(textArr: IText[]) {
    const letterSpacing = 0.7;
    const step = 3;
    textArr.forEach(text => {
      this.context.fillStyle = text.color;
      this.context.font = text.fontSize;
      if (!text.animation) {
        this.context.textAlign = "start";
        this.context.fillText(text.text, text.x, text.y);
      } else {
        const startY = text.y;
        const startX = text.x;
        for (let i = 0; i < text.text.length; i++) {
          const textSize = this.context.measureText(text.text[i]);
          text.x += Math.floor(textSize.width) + letterSpacing;
          i % 2 ? text.y = startY - step : text.y = startY + step;
          this.context.textAlign = "right";
          this.context.fillText(text.text[i], text.x, text.y);
        }
        text.x = startX;
        text.y = startY;
      }
    });
  }

  public canvasScale() {
    const widthContainer = getComputedStyle(this.canvas).width;
    const heightContainer = getComputedStyle(this.canvas).height;
    const curWidthK = this.initialWidth / parseInt(widthContainer, 10);
    const curHeightK = this.initialHeight / parseInt(heightContainer, 10);
    return { curWidthK, curHeightK };
  }

  public determineCoords(e: MouseEvent, scaleCoords: Coords): boolean {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const { currentX, currentW, currentY, currentH } = scaleCoords;
    return mouseX >= currentX && mouseX < (currentX + currentW) && mouseY >= currentY && mouseY < currentY + currentH;
  }

  public scaleCoords(btn: IButton, curWidthK: number, curHeightK: number): Coords {
    return {
      currentX: btn.x / curWidthK,
      currentW: btn.width / curWidthK,
      currentY: btn.y / curHeightK,
      currentH: btn.height / curHeightK
    };
  }

  public buttonsClick(btn: IButton, yStep: number, count: number) {
    btn.sy = yStep * count;
  }

  public buttonsHover(btn: IButton, yStep: number, count: number) {
    btn.sy = yStep * count;
  }

  public btnDisable(btn: IButton, yStep: number) {
    btn.sy = yStep * 3;
  }

  public btnActive(btn: IButton, yStep: number) {
    btn.sy = 0;
  }

  public changeAnimation(btn: IPicture, animEnable: boolean, text: IText[]) {
    text.forEach((item) => {
      if (item.text === btn.name) item.animation = animEnable;
    });
  }

  public objParse(obj: IPicture[] | IButton[] | IText[] | IAnimBuild[] | IStaticText[]) {
    return JSON.parse(JSON.stringify(obj));
  }

  public opacityShow(opacityState: IOpacity) {
    if (opacityState.opacity <= 1) opacityState.opacity += 0.04;
    else opacityState.show = false;
    this.context.globalAlpha = opacityState.opacity;
  }

  public opacityDisable(opacityState: IOpacity) {
    if (opacityState.opacity >= 0) opacityState.opacity -= 0.04;
    this.context.globalAlpha = opacityState.opacity;
  }


  public canvasFilters(number: number): void {
    this.context.shadowBlur = number;
    this.context.shadowOffsetX = number;
    this.context.shadowOffsetY = number;
    this.context.shadowColor = '';
  }

  drawStaticText(text: IStaticText[]) {
    text.forEach(item => {
      this.context.fillStyle = item.color;
      this.context.font = item.fontSize;
      this.context.shadowColor = item.shadowColor;
      this.context.shadowBlur = item.shadowBlur;
      this.context.shadowOffsetX = item.shadowOffsetX;
      this.context.shadowOffsetY = item.shadowOffsetY;

      this.context.strokeText(item.text, item.x, item.y);
      this.context.fillText(item.text, item.x, item.y);
      this.canvasFilters(0);
    });
  }

}