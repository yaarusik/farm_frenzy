
import Control from "../../builder/controller";
import Common from "./../common/common";
import { IPictures, Coords, IButtons, IText } from "./../iterfaces";
import { levelTextOptions, userInterfaceOptions } from './../../utils/gameData/levelData';



export default class LevelPage extends Control {
  canvas: Control<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  animation: number;
  userInterfaceOptions: IPictures[];
  curWidthK: number;
  curHeightK: number;
  buttons: IButtons[];
  textOptions: IText[];


  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.userInterfaceOptions = userInterfaceOptions;
    this.textOptions = levelTextOptions;
    this.buttons = this.userInterfaceOptions.filter(btn => btn.type === "button") as IButtons[];

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
  }


  private canvasMoveHundler(event: MouseEvent, buttons: IButtons[]) {
    buttons.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn);
      if (this.commonFunction.determineCoords(event, scaleCoords)) {
        this.buttonsHover(btn, btn.stepY, btn.hover);
        // this.changeAnimation(btn, true);
      } else {
        this.buttonsHover(btn, 0, 0);
        // this.changeAnimation(btn, false);
      }
    });
  }
  // перенести в общие функции
  private scaleCoords(btn: IButtons) {
    return {
      currentX: btn.x / this.curWidthK,
      currentW: btn.width / this.curWidthK,
      currentY: btn.y / this.curHeightK,
      currentH: btn.height / this.curHeightK
    };
  }

  private buttonsHover(btn: IPictures, yStep: number, count: number) {
    btn.sy = yStep * count;
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