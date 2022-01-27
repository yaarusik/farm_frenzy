
import Control from "../../builder/controller";
import Common from "./../common/common";
import { IPicture, Coords, IButton, IText } from "./../iterfaces";
import { levelTextOptions, userInterfaceOptions } from './../../utils/gameData/levelData';

export default class LevelPage extends Control {
  canvas: Control<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  animation: number;
  userInterfaceOptions: IPicture[];
  curWidthK: number;
  curHeightK: number;
  buttons: IButton[];
  textOptions: IText[];

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.userInterfaceOptions = userInterfaceOptions;
    this.textOptions = levelTextOptions;
    this.buttons = this.userInterfaceOptions.filter(btn => btn.type === "button") as IButton[];

    const canvasContainer = new Control(this.node, "div", "canvas__container", "");
    this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");

    this.canvas.node.width = 1600;
    this.canvas.node.height = 1200;

    this.curWidthK = 1;
    this.curHeightK = 1;
    this.animation = 0;

    this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
    this.commonFunction = new Common(this.canvas.node, this.context);

    this.startUI();

    window.onresize = () => {
      const coefficients = this.commonFunction.canvasScale();
      this.curWidthK = coefficients.curWidthK;
      this.curHeightK = coefficients.curHeightK;
    };

    this.canvas.node.addEventListener("mousemove", (e) => {
      this.canvasMoveHundler(e, this.buttons);
    });

    this.canvas.node.addEventListener("click", (e) => {
      this.canvasClickHundler(e, this.canvas.node, this.buttons);
    });
  }

  private canvasMoveHundler(event: MouseEvent, buttons: IButton[]) {
    buttons.forEach(btn => {
      const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
      if (this.commonFunction.determineCoords(event, scaleCoords)) {
        this.buttonsHover(btn, btn.stepY, btn.hover);
        this.changeAnimation(btn, true);
      } else {
        this.buttonsHover(btn, 0, 0);
        this.changeAnimation(btn, false);
      }
    });
  }

  private canvasClickHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IButton[]) {
    buttons.forEach(btn => {
      const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
      if (this.commonFunction.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Меню": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(this.gameMapBack, 250);
            cancelAnimationFrame(this.animation);
            break;
          }
          case 'chicken': {
            // здесь можно купить курицу и она появиться
            this.buttonsClick(btn, btn.stepY, btn.click);
            console.log("chicken");
            break;
          }
          case 'pig': {
            this.buttonsClick(btn, btn.stepY, btn.click);
            console.log("chicken");
            break;
          }
          default: console.log("error");
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

  private buttonsHover(btn: IButton, yStep: number, count: number) {
    btn.sy = yStep * count;
  }

  private buttonsClick(btn: IButton, yStep: number, count: number) {
    btn.sy = yStep * count;
  }

  private changeAnimation(btn: IPicture, animEnable: boolean) {
    this.textOptions.forEach((item) => {
      if (item.text === btn.name) item.animation = animEnable;
    });
  }

  private startUI() {
    const loadImages = this.userInterfaceOptions.map(image => this.commonFunction.loadImage(image.image));
    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;
    this.run(loadImages);
  }

  private run(loadImages: Promise<HTMLImageElement>[]) {
    this.render(loadImages);

    this.animation = requestAnimationFrame(() => {
      this.run(loadImages);
    });
  }

  private async render(loadImages: Promise<HTMLImageElement>[]) {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.commonFunction.drawImageAndText(loadImages, this.userInterfaceOptions, this.textOptions);
  }

  gameMapBack() {
    throw new Error("Method not implemented.");
  }
}