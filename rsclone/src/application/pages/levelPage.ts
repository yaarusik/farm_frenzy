
import Control from "../../builder/controller";
import Common from "./../common/common";
import { Coords, IButton, IText, IAnimBuild, IFunctions, IKeyBoolean, IKeyNumber } from "./../iterfaces";
import Well from "../../utils/animation/well";
import Coin from "../../utils/animation/coin";
import { initialData } from "./../common/initialData";
import Timer from "../../utils/timer/levelTimer";
import LevelRender from "../common/levelRender";
import PausePanel from "../../utils/panels/pausePanel";
import StartPanel from "../../utils/panels/startPanel";
import LevelInterface from "./../../utils/interface/levelInterface";
import { animationBuildOptions } from "./../../utils/gameData/levelData";

export default class LevelPage extends Control {
  canvas: Control<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  levelRender: LevelRender;
  animation: number;
  curWidthK: number;
  curHeightK: number;
  animState: IKeyBoolean;
  well: Well;
  price: IKeyNumber;
  coin: Coin;
  pausePanel: PausePanel;
  click: IFunctions;
  timer: Timer;
  startPanel: StartPanel;
  panelState: { pausePanelSwitch: boolean; startPanelSwitch: boolean; };
  levelInterface: LevelInterface;
  btn: IButton[];
  animationBuildOptions: IAnimBuild[];

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    const canvasContainer = new Control(this.node, "div", "canvas__container", "");
    this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");

    this.canvas.node.width = 1600;
    this.canvas.node.height = 1200;

    this.curWidthK = 1;
    this.curHeightK = 1;
    this.animation = 0;

    this.panelState = {
      pausePanelSwitch: false,
      startPanelSwitch: true
    };

    this.animState = {
      well: true,
      waterIndicator: true,
    };

    this.price = {
      well: 19,
      chicken: 100,
    };

    this.click = {
      isPaused: () => this.panelState.pausePanelSwitch = false,
      onMain: () => this.onMain(),
      onRestart: () => this.onRestart(),
      onSettings: () => this.onSettings(),
      onMap: () => this.onMap(),
      isStart: () => this.panelState.startPanelSwitch = false,
    };

    this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
    this.commonFunction = new Common(this.canvas.node, this.context);

    this.levelInterface = new LevelInterface(this.canvas.node, this.context);
    this.startPanel = new StartPanel(this.canvas.node, this.context);
    this.timer = new Timer(this.context);
    this.levelRender = new LevelRender(this.canvas.node, this.context);
    this.pausePanel = new PausePanel(this.canvas.node, this.context, this.timer);

    const { btn, anim, text } = this.levelInterface.getData();

    this.animationBuildOptions = animationBuildOptions;
    this.btn = btn;

    this.well = new Well(anim);
    this.coin = new Coin(anim);

    this.startUI();
    this.levelRender.startLevel();

    window.onresize = () => {
      const coefficients = this.commonFunction.canvasScale();
      this.curWidthK = coefficients.curWidthK;
      this.curHeightK = coefficients.curHeightK;
    };

    this.canvas.node.addEventListener("mousemove", (e) => {
      this.canvasMoveHundler(e, [...btn, ...anim], text);
    });

    this.canvas.node.addEventListener("click", (e) => {
      this.canvasClickHundler(e, [...btn, ...anim], text);
    });
  }


  private async startUI() {
    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;

    this.run();
  }

  private async run() {
    this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
    this.context.globalAlpha = 1;
    this.render();

    // upload pause panel
    if (this.panelState.pausePanelSwitch === true) this.pausePanel.render();

    this.animation = requestAnimationFrame(() => {
      this.run();
    });
  }

  private render() {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.levelInterface.render();

    if (this.panelState.startPanelSwitch) this.startPanel.render(); // upload start panel
    else {
      this.coin.coinAnimation();
      this.timer.drawText();
      // СДЕЛАТЬ ПО КНОПКЕ
      this.buildSpawn();

      this.levelRender.renderLevel(this.curWidthK, this.curHeightK);
    }
  }

  private canvasMoveHundler(event: MouseEvent, buttons: IButton[], text: IText[]) {
    if (this.panelState.pausePanelSwitch) this.pausePanel.moveHundler(event, this.curWidthK, this.curHeightK);
    else if (this.panelState.startPanelSwitch) this.startPanel.moveHundler(event, this.curWidthK, this.curHeightK);
    else {
      buttons.forEach(btn => {
        const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
        if (this.commonFunction.determineCoords(event, scaleCoords)) {
          if (btn.name === 'well' || btn.name === 'storage') {
            console.log('well');
          } else {
            this.commonFunction.buttonsHover(btn, btn.stepY, btn.hover);
            this.commonFunction.changeAnimation(btn, true, text);
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
              this.commonFunction.changeAnimation(btn, false, text);
            }
          }
        }
      });
    }
  }

  private canvasClickHundler(event: MouseEvent, buttons: IButton[], text: IText[]) {
    if (this.panelState.pausePanelSwitch) this.pausePanel.clickHundler(event, this.curWidthK, this.curHeightK, this.click, this.animation);
    else if (this.panelState.startPanelSwitch) this.startPanel.clickHundler(event, this.curWidthK, this.curHeightK, this.click);
    else {
      buttons.forEach(btn => {
        const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
        if (this.commonFunction.determineCoords(event, scaleCoords)) {
          switch (btn.name) {
            case "Меню": {
              this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
              this.panelState.pausePanelSwitch = true;
              this.timer.isRunning = false;
              break;
            }
            case "well": {
              this.changeTotal(btn.name, text);
              if (this.animState.well) this.well.wellAnimation(btn, this.animState);
              if (this.animState.waterIndicator) this.well.fullWaterIndicator(this.animState);
              this.animState.well = false;
              this.animState.waterIndicator = false;
              break;
            }
            case 'chicken': {
              this.levelRender.createAnimal("chicken");
              this.changeTotal(btn.name, text);
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


  //Секция анимаций для зданий ==================
  // один раз только нужно запустить
  private buildSpawn() {
    this.animationBuildOptions.forEach((item, index) => {
      this.btn.forEach(build => {
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

  //Секция анимаций для зданий ==================

  private changeTotal(product: string, text: IText[]) {
    if (this.animState.well) {
      initialData.totalLevelSum.level1 -= this.price[product];
      text.forEach(item => {
        if (item.name === 'total') {
          console.log('total');
          item.text = initialData.totalLevelSum.level1.toString();
        }
      });
    }
  }

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

