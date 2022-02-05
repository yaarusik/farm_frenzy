
import Control from "../../builder/controller";
import Common from "./../common/common";
import { Chicken, AnimalList, Grass } from "../types";
import { IPicture, Coords, IButton, IText, IAnimBuild } from "./../iterfaces";
import { levelTextOptions, userInterfaceOptions, animationBuildOptions, levelImagesPath } from './../../utils/gameData/levelData';
import Well from "../../utils/animation/well";
import Coin from "../../utils/animation/coin";
import { initialData } from "./../common/initialData";
import Timer from "../../utils/timer/levelTimer";
import LevelRender from "../common/levelRender";

export default class LevelPage extends Control {
  canvas: Control<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  levelRender: LevelRender;
  animation: number;
  userInterfaceOptions: IPicture[];
  curWidthK: number;
  curHeightK: number;
  buttons: IButton[];
  textOptions: IText[];
  animationBuildOptions: IAnimBuild[];
  animState: { [key: string]: boolean; };
  well: Well;
  price: { [key: string]: number };
  coin: Coin;
  timer: Timer;
  // a: { type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; };

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.userInterfaceOptions = userInterfaceOptions;
    this.textOptions = levelTextOptions;
    this.animationBuildOptions = animationBuildOptions;

    // this.a = {
    //   type: "picture",
    //   name: "pause",
    //   image: "images/level/panels/pause_panel.png",
    //   x: 569,
    //   y: 300,
    //   width: 462,
    //   height: 600,
    //   sx: 0,
    //   sy: 0,
    //   swidth: 0,
    //   sheight: 0
    // };

    this.buttons = <IButton[]>this.userInterfaceOptions.filter(btn => btn.type === "button");

    this.well = new Well(this.userInterfaceOptions);
    this.coin = new Coin(this.userInterfaceOptions);

    const canvasContainer = new Control(this.node, "div", "canvas__container", "");
    this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");

    this.canvas.node.width = 1600;
    this.canvas.node.height = 1200;

    this.curWidthK = 1;
    this.curHeightK = 1;

    this.animation = 0;

    this.animState = {
      well: true,
      waterIndicator: true,
    };

    this.price = {
      well: 19,
      chicken: 100,
    };

    this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
    this.commonFunction = new Common(this.canvas.node, this.context);
    this.timer = new Timer(this.canvas.node, this.context);
    this.levelRender = new LevelRender(this.canvas.node, this.context);

    this.startUI();
    this.levelRender.startLevel();

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
        if (btn.name === 'well' || btn.name === 'storage') {
          console.log('well');
        } else {
          this.buttonsHover(btn, btn.stepY, btn.hover);
          this.changeAnimation(btn, true);
        }

      } else {
        switch (btn.name) {
          case "well": {
            break;
          }
          case "pig":
          case "chicken":
          case "cow":
          case "ostrich":
          case "dog":
          case "cat": {
            const hoverCoords = 192;
            const count = 1;
            // если можно купить, ховер работает
            this.buttonsHover(btn, hoverCoords, count);
            break;
          }
          default: {
            this.buttonsHover(btn, 0, 0);
            this.changeAnimation(btn, false);
          }
        }
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
            // // ================================================
            // this.userInterfaceOptions.push(this.a);
            // const img = this.commonFunction.loadImage(this.a.image);
            // this.loadImages.push(img);
            // // ===================================================
            // console.log(this.loadImages);
            setTimeout(this.gameMapBack, 250);
            cancelAnimationFrame(this.animation);
            break;
          }
          case "well": {
            this.changeTotal(btn.name);
            if (this.animState.well) this.well.wellAnimation(btn, this.animState);
            if (this.animState.waterIndicator) this.well.fullWaterIndicator(this.animState);
            this.animState.well = false;
            this.animState.waterIndicator = false;
            break;
          }
          case 'chicken': {
            this.levelRender.createAnimal("chicken");
            this.changeTotal(btn.name);
            this.buttonsClick(btn, btn.stepY, btn.click);
            break;
          }
          case 'pig': {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.well.waterIndicatorChange();
            console.log("chicken");
            break;
          }
          case 'mainArea': {
            this.levelRender.createGrass(event.clientX, event.clientY);
            break;
          }
          default: console.log("error");
        }
      } else {
        // переделать сброс кнопки
        // this.buttonsClick(btn, 0, 0);
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

  private async startUI() {
    const loadImages = this.userInterfaceOptions.map(image => this.commonFunction.loadImage(image.image));

    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;

    const initialImages = await this.commonFunction.renderImages(loadImages);

    this.run(initialImages);
  }
    
  private async run(saveImg: HTMLImageElement[]) {
    this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
		this.context.globalAlpha = 1;
    await this.render(saveImg);
    // СДЕЛАТЬ ПО КНОПКЕ
    this.buildSpawn();
    this.coin.coinAnimation();

    this.levelRender.renderLevel(this.curWidthK, this.curHeightK);

    this.animation = requestAnimationFrame(() => {
      this.run(saveImg);
    });
  }

  private async render(saveImg: HTMLImageElement[]) {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.commonFunction.drawImage(saveImg, this.userInterfaceOptions);
    this.commonFunction.drawText(this.textOptions);
    this.timer.drawText();
  }

  //Секция анимаций для зданий ==================

  // один раз только нужно запустить
  private buildSpawn() {
    this.animationBuildOptions.forEach((item, index) => {
      this.buttons.forEach(build => {
        setTimeout(() => this.buildAnimation(item, build), 500 * index);
      });
    });
  }

  private buildAnimation(item: IAnimBuild, build: IButton) {
    if (item.name === build.name) {
      if (item.maxY > build.y)
        build.y += item.speed;
    }
  }

  private changeTotal(product: string) {
    if (this.animState.well) {
      initialData.totalLevelSum.level1 -= this.price[product];
      this.textOptions.forEach(item => {
        if (item.name === 'total') {
          console.log('total');
          item.text = initialData.totalLevelSum.level1.toString();
        }
      });
    }
  }


  //Секция анимаций для зданий ==================
  gameMapBack() {
    throw new Error("Method not implemented.");
  }
}

