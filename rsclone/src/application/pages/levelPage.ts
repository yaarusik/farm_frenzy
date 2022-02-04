
import Control from "../../builder/controller";
import Common from "./../common/common";
import { IPicture, Coords, IButton, IText, IAnimBuild, IFunctions } from "./../iterfaces";
import { levelTextOptions, userInterfaceOptions, animationBuildOptions } from './../../utils/gameData/levelData';
import Well from "../../utils/animation/well";
import Coin from "../../utils/animation/coin";
import { initialData } from "./../common/initialData";
import LevelRender from "../common/levelRender";
import PausePanel from "../../utils/panels/pausePanel";
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
  initialImages: HTMLImageElement[];
  pausePanel: PausePanel;
  pausePanelSwitch: boolean;
  click: IFunctions;

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.userInterfaceOptions = userInterfaceOptions;
    this.textOptions = levelTextOptions;
    this.animationBuildOptions = animationBuildOptions;
    this.initialImages = [];

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
    this.pausePanelSwitch = false;

    this.animState = {
      well: true,
      waterIndicator: true,
    };

    this.price = {
      well: 19,
      chicken: 100,
    };

    this.click = {
      isPaused: () => this.pausePanelSwitch = false,
      onMain: () => this.onMain(),
      onRestart: () => this.onRestart(),
      onSettings: () => this.onSettings(),
      onMap: () => this.onMap(),
    };

    this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
    this.commonFunction = new Common(this.canvas.node, this.context);

    this.levelRender = new LevelRender(this.canvas.node, this.context);

    this.pausePanel = new PausePanel(this.canvas.node, this.context);

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
      this.canvasClickHundler(e, this.buttons);
    });
  }

  private canvasMoveHundler(event: MouseEvent, buttons: IButton[]) {
    if (this.pausePanelSwitch) this.pausePanel.moveHundler(event, this.curWidthK, this.curHeightK);
    else {
      buttons.forEach(btn => {
        const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
        if (this.commonFunction.determineCoords(event, scaleCoords)) {
          if (btn.name === 'well' || btn.name === 'storage') {
            console.log('well');
          } else {
            this.commonFunction.buttonsHover(btn, btn.stepY, btn.hover);
            this.commonFunction.changeAnimation(btn, true, this.textOptions);
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
              this.commonFunction.buttonsHover(btn, hoverCoords, count);
              break;
            }
            default: {
              this.commonFunction.buttonsHover(btn, 0, 0);
              this.commonFunction.changeAnimation(btn, false, this.textOptions);
            }
          }
        }
      });
    }

  }

  private canvasClickHundler(event: MouseEvent, buttons: IButton[]) {
    if (this.pausePanelSwitch) this.pausePanel.clickHundler(event, this.curWidthK, this.curHeightK, this.click, this.animation);
    else {
      buttons.forEach(btn => {
        const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
        if (this.commonFunction.determineCoords(event, scaleCoords)) {
          switch (btn.name) {
            case "Меню": {
              this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
              this.pausePanelSwitch = true;
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
              this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
              break;
            }
            case 'pig': {
              this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
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
  }

  private async startUI() {
    const loadImages = this.userInterfaceOptions.map(image => this.commonFunction.loadImage(image.image));

    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;

    this.initialImages = await this.commonFunction.renderImages(loadImages);
    this.run(this.initialImages);
  }

  private async run(saveImg: HTMLImageElement[]) {
    this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
    this.context.globalAlpha = 1;
    this.render(saveImg);

    // СДЕЛАТЬ ПО КНОПКЕ
    this.buildSpawn();

    this.levelRender.renderLevel(this.curWidthK, this.curHeightK);
    if (this.pausePanelSwitch === true) {
      this.pausePanel.render();
    }
    // console.log(this.pausePanelSwitch);

    this.animation = requestAnimationFrame(() => {
      this.run(saveImg);
    });
  }

  private render(saveImg: HTMLImageElement[]) {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.commonFunction.drawImage(saveImg, this.userInterfaceOptions);
    this.commonFunction.drawText(this.textOptions);
    this.coin.coinAnimation();
    // здесь вызываем функцию drawImage с данными панели
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
  onMap(): void {
    throw new Error("Method not implemented.");
  }
  onMain(): void {
    throw new Error("Method not implemented.");
  }
  onRestart(): void {
    throw new Error("Method not implemented.");
  }
  onSettings(): void {
    throw new Error("Method not implemented.");
  }
}

