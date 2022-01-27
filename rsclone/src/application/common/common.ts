import { IPicture, IText, Coords, IButton } from './../iterfaces';
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

  public drawImageAndText(loadImages: Promise<HTMLImageElement>[], imagesData: IPicture[], textData?: IText[]) {
    Promise.all(loadImages).then(responses => {
      responses.forEach((img, index) => {
        const item = imagesData[index];
        if (item.type === "button") {
          const cutPicture = new CutPicture(img, item.sx, item.sy, item.swidth, item.sheight, item.x, item.y, item.width, item.height);
          cutPicture.draw(this.context);
        } else {
          const btn = new Picture(img, item.x, item.y, item.width, item.height);
          btn.draw(this.context);
        }
      });
      if (textData) this.drawText(textData);
    });
  }

  // функция бля отрисовки текста или анимации текста
  private drawText(textArr: IText[]) {
    this.context.font = "24px Vag_Rounded-Bold CY";
    this.context.fillStyle = "#fff";
    const letterSpacing = 0.5;
    const step = 3;
    textArr.forEach(text => {
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

  public scaleCoords(btn: IButton, curWidthK: number, curHeightK: number) {
    return {
      currentX: btn.x / curWidthK,
      currentW: btn.width / curWidthK,
      currentY: btn.y / curHeightK,
      currentH: btn.height / curHeightK
    };
  }


}