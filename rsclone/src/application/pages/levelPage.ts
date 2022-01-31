
import Control from "../../builder/controller";
import Common from "./../common/common";
import { IPicture, Coords, IButton, IText, IAnimBuild } from "./../iterfaces";
import { levelTextOptions, userInterfaceOptions, animationBuildOptions } from './../../utils/gameData/levelData';

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
  animationBuildOptions: IAnimBuild[];
  animationImage: IButton[];
  conditionAnimation: { [key: string]: boolean; };

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.userInterfaceOptions = userInterfaceOptions;
    this.textOptions = levelTextOptions;
    this.animationBuildOptions = animationBuildOptions;
    this.buttons = <IButton[]>this.userInterfaceOptions.filter(btn => btn.type === "button");

    this.animationImage = <IButton[]>this.userInterfaceOptions.filter(anim => anim.type === "animation");

    const canvasContainer = new Control(this.node, "div", "canvas__container", "");
    this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");

    this.canvas.node.width = 1600;
    this.canvas.node.height = 1200;

    this.curWidthK = 1;
    this.curHeightK = 1;
    this.animation = 0;

    this.conditionAnimation = {
      well: true,
      waterIndicator: true,
    };

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
            setTimeout(this.gameMapBack, 250);
            cancelAnimationFrame(this.animation);
            break;
          }
          case "well": {
            if (this.conditionAnimation.well) this.wellAnimation(btn);
            if (this.conditionAnimation.waterIndicator) this.fullWaterIndicator();
            this.conditionAnimation.well = false;
            this.conditionAnimation.waterIndicator = false;
            break;
          }
          case 'chicken': {
            // здесь можно купить курицу и она появиться
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.waterIndicatorChange();
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

  private startUI() {
    const loadImages = this.userInterfaceOptions.map(image => this.commonFunction.loadImage(image.image));
    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;
    this.run(loadImages);
  }

  private async run(loadImages: Promise<HTMLImageElement>[]) {
    await this.render(loadImages);
    // СДЕЛАТЬ ПО КНОПКЕ
    this.buildSpawn();
    this.animation = requestAnimationFrame(() => {
      this.run(loadImages);
    });
  }

  private async render(loadImages: Promise<HTMLImageElement>[]) {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.commonFunction.drawImageAndText(loadImages, this.userInterfaceOptions, this.textOptions);
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

  private wellAnimation(btn: IButton) {
    let frameY = 0;
    const timer = setInterval(() => {
      if (btn.frameY) {
        if (frameY < btn.frameY - 1) {
          btn.sy += btn.stepY;
          frameY++;
        } else {
          frameY = 0;
          btn.sy = 0;
        }
      }
    }, 50);
    // останавливать в зависимости от индикатора
    setTimeout(() => {
      clearInterval(timer);
      this.conditionAnimation.well = true;
      btn.sy = 0;
    }, 2400);
  }

  // водный индикатор
  private waterIndicatorChange() {
    const waterIndicator = <IButton>this.animationImage.find(item => item.name === 'waterIndicator');
    const maxHeight = waterIndicator.sheight * <number>waterIndicator.frameY;
    const step = 5;
    if (waterIndicator.sy < maxHeight) {
      waterIndicator.sy += step * waterIndicator.stepY;
    } else {
      waterIndicator.sy = 0;
    }
  }

  // пополнение воды
  private fullWaterIndicator() {
    const water = <IButton>this.animationImage.find(item => item.name === 'waterIndicator');
    let frameY = 0;
    const timer = setInterval(() => {
      if (water.frameY) {
        if (frameY < water.frameY - 1) {
          water.sy -= water.stepY;
          frameY++;
        } else {
          frameY = 0;
          water.sy = 0;
        }
      }
    }, 100);
    //дизейблить кнопку, когда вода еще полностью не закончилась
    setTimeout(() => {
      clearInterval(timer);
      this.conditionAnimation.waterIndicator = true;
      water.sy = 0;
    }, 2400);
  }



  //Секция анимаций для зданий ==================
  gameMapBack() {
    throw new Error("Method not implemented.");
  }
}

