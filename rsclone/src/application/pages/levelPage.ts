
import Control from "../../builder/controller";
import Common from "./../common/common";
import { Coords, IButton, IText, IFunctions, IKeyBoolean, IKeyNumber, IOpacity } from "./../iterfaces";
import Coin from "../../utils/animation/coin";
import Timer from "../../utils/timer/levelTimer";
import { Music } from "../../utils/music/music";
import LevelRender from "../common/levelRender";
import PausePanel from "../../utils/panels/pausePanel";
import StartPanel from "../../utils/panels/startPanel";
import LevelInterface from "./../../utils/interface/levelInterface";
import BuildSpawn from "../../utils/animation/spawnBuild";
import Total from "./../../utils/total/total";
import { initialData } from './../common/initialData';
import Products from "../../utils/storage/products";
import Progress from "./../../utils/gameProgress/progress";
import EndPanel from "./../../utils/panels/endPanels";
import StoragePanel from "../../utils/storage/storagePanel";
import Car from "../../utils/animation/car";
import Arrow from "../../utils/animation/arrow";
import Preloader from "../preloader";
export default class LevelPage extends Control {
  canvas: Control<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  levelRender: LevelRender;
  animation: number;
  curWidthK: number;
  curHeightK: number;
  coin: Coin;
  pausePanel: PausePanel;
  click: IFunctions;
  timer: Timer;
  startPanel: StartPanel;
  panelState: IKeyBoolean;
  levelInterface: LevelInterface;
  btn: IButton[];
  buildSpawn: BuildSpawn;
  total: Total;
  isGrace: { grace: boolean; };
  products: Products;
  level: number;
  storageProducts: string[];
  progress: Progress;
  endPanel: EndPanel;
  storage: StoragePanel;
  car: Car;
  productsCounter: IKeyNumber;
  opacityState: IOpacity;
  arrow: Arrow;
  music: Music;
  animals: string[];
  preloader: Preloader;

  constructor (parentNode: HTMLElement, tagName: string, className: string, level: number, preloader: Preloader) {
    super(parentNode, tagName, className);
    this.level = level;
    this.preloader = preloader;
    const canvasContainer = new Control(this.node, "div", "canvas__container", "");
    this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");

    this.canvas.node.width = 1600;
    this.canvas.node.height = 1200;

    this.music = new Music();

    this.curWidthK = 1;
    this.curHeightK = 1;
    this.animation = 0;
    this.isGrace = {
      grace: true,
    };

    this.storageProducts = [];

    this.panelState = {
      pausePanelSwitch: false,
      startPanelSwitch: true,
      endPanelSwitch: false,
      storagePanelSwitch: false,
      carAnimationOn: false,
    };

    this.productsCounter = {
      'egg': 0,
      'chicken': 0,
      'bear-1': 0,
      'flour': 0,
      'cake': 0,
    };

    this.opacityState = {
      show: false,
      disable: false,
      opacity: 0
    };

    this.click = {
      isPaused: () => this.panelState.pausePanelSwitch = false,
      onMain: () => this.onMain(),
      onRestart: () => this.onRestart(),
      onSettings: () => this.onSettings(),
      onMap: () => this.onMap(),
      isStart: () => this.panelState.startPanelSwitch = false,
      renderStorage: (productsCounter: IKeyNumber) => this.storage.renderStorage(productsCounter),
      addStorageTotal: (total: string) => this.car.addStorageTotal(total),
      productToStorage: (product: string[]) => this.products.add(product),
      reRenderStorage: () => this.products.reRenderStorage(),
    };

    this.animals = [];

    this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
    this.commonFunction = new Common(this.canvas.node, this.context);

    this.levelInterface = new LevelInterface(this.canvas.node, this.context, this.level);
    this.levelRender = new LevelRender(this.canvas.node, this.context);
    this.startPanel = new StartPanel(this.canvas.node, this.context, this.level, this.levelRender);
    this.timer = new Timer(this.canvas.node, this.context, this.level);
    this.total = new Total(this.canvas.node, this.context, this.level);
    this.pausePanel = new PausePanel(this.canvas.node, this.context, this.timer, this.node, canvasContainer, this.opacityState);
    this.buildSpawn = new BuildSpawn(this.canvas.node, this.context, this.panelState, this.click, this.productsCounter, this.opacityState, this.level);
    this.progress = new Progress(this.canvas.node, this.context, this.level);
    this.products = new Products(this.canvas.node, this.context, this.progress, this.productsCounter);
    this.endPanel = new EndPanel(this.canvas.node, this.context, this.timer, this.level);
    this.storage = new StoragePanel(this.canvas.node, this.context, this.products, this.panelState, this.click, this.productsCounter, this.opacityState, this.preloader,);
    this.car = new Car(this.canvas.node, this.context, this.panelState);
    this.arrow = new Arrow(this.canvas.node, this.context);
    const { btn, anim, text } = this.levelInterface.getData();
    this.btn = btn;

    this.coin = new Coin(anim);
    // проверка всех кнопок
    initialData.checkDisable();

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
      this.canvasClickHundler(e, [...btn, ...anim]);
    });
  }

  private async startUI() {
    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;

    this.run();
  }

  private async run() {
    this.context.restore();
    this.context.globalAlpha = 1;
    this.render();

    if (this.panelState.pausePanelSwitch === true) this.pausePanel.render();

    this.animation = requestAnimationFrame(() => {
      this.run();
    });
  }

  private render() {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.levelInterface.render();
    this.total.render();

    if (this.panelState.startPanelSwitch) this.startPanel.render();
    else {
      this.coin.coinAnimation();
      this.timer.drawText();
      this.levelRender.renderLevel(this.curWidthK, this.curHeightK, this.panelState.pausePanelSwitch);
      this.buildSpawn.render();
      this.products.render();
      this.progress.render();
      this.arrow.render();

      if (this.panelState.carAnimationOn) this.car.render();
      if (this.panelState.storagePanelSwitch) this.storage.render();
      else {
        // проверка окончания уровня
        this.endGameCheck();
        if (this.panelState.endPanelSwitch) this.endPanel.render();
      }
    }

  }

  private endGameCheck(): void {
    this.panelState.endPanelSwitch = this.progress.endGameCheck();
  }

  private canvasMoveHundler(event: MouseEvent, buttons: IButton[], text: IText[]) {

    if (this.panelState.pausePanelSwitch) this.pausePanel.moveHundler(event, this.curWidthK, this.curHeightK);
    else if (this.panelState.startPanelSwitch) this.startPanel.moveHundler(event, this.curWidthK, this.curHeightK);
    else if (this.panelState.endPanelSwitch) this.endPanel.moveHundler(event, this.curWidthK, this.curHeightK);
    else if (this.panelState.storagePanelSwitch) this.storage.moveHundler(event, this.curWidthK, this.curHeightK);
    else {
      this.checkChicken(event);
      this.buildSpawn.moveHundler(event, this.curWidthK, this.curHeightK);
      buttons.forEach(btn => {
        const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
        if (this.commonFunction.determineCoords(event, scaleCoords)) {
          switch (btn.name) {
            case "pig":
            case "chicken": {
              if (initialData.btnDisable[btn.name]) {
                this.commonFunction.buttonsHover(btn, btn.stepY, btn.hover);
              } else {
                this.commonFunction.btnDisable(btn, btn.stepY);
              }
              break;
            }
            case 'Меню':
            case 'levelPanel': {
              this.commonFunction.buttonsHover(btn, btn.stepY, btn.hover);
              this.commonFunction.changeAnimation(btn, true, text);
              break;
            }
          }
        }
        else {
          switch (btn.name) {
            case "pig":
            case "chicken": {
              if (initialData.btnDisable[btn.name]) {
                this.commonFunction.buttonsHover(btn, 0, 0);
              } else {
                this.commonFunction.btnDisable(btn, btn.stepY);
              }
              break;
            }
            case 'Меню':
            case 'levelPanel': {
              this.commonFunction.buttonsHover(btn, 0, 0);
              this.commonFunction.changeAnimation(btn, false, text);
              break;
            }
          }
        }
      });
    }
  }

  private canvasClickHundler(event: MouseEvent, buttons: IButton[]) {
    if (this.panelState.pausePanelSwitch) this.pausePanel.clickHundler(event, this.curWidthK, this.curHeightK, this.click, this.animation);
    else if (this.panelState.startPanelSwitch) this.startPanel.clickHundler(event, this.curWidthK, this.curHeightK, this.click);
    else if (this.panelState.endPanelSwitch) this.endPanel.clickHundler(event, this.curWidthK, this.curHeightK, this.click);
    else if (this.panelState.storagePanelSwitch) this.storage.clickHundler(event, this.curWidthK, this.curHeightK, this.panelState);
    else {
      this.storageProducts = [...this.levelRender.clickHundler(event, this.curWidthK, this.curHeightK)];
      if (this.storageProducts.length === 0) {
        this.buildSpawn.clickHundler(event, this.curWidthK, this.curHeightK);
        buttons.forEach(btn => {
          const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
          if (this.commonFunction.determineCoords(event, scaleCoords)) {
            switch (btn.name) {
              case "Меню": {
                this.music.btnClick();
                this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
                this.opacityState.show = true;
                this.opacityState.disable = false;
                this.panelState.pausePanelSwitch = true;
                this.timer.isRunning = false;
                setTimeout(() => this.startBtn(btn), 300);
                break;
              }
              case 'chicken': {
                if (initialData.btnDisable[btn.name]) { // chicken music
                  this.music.onChicken();
                  this.levelRender.createAnimal("chicken");
                  initialData.changeTotalMinus(btn.name);
                  this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
                  setTimeout(() => this.startBtn(btn), 200);
                } else {
                  this.music.graceDisable();
                  this.arrow.showArrow('up');
                }
                break;
              }
              case 'pig': {
                if (initialData.btnDisable[btn.name]) {
                  this.levelRender.createAnimal("pig"); //Оставь тут эту строку, а медведя на какую-нибудь кнопку кота или другое
                  // this.levelRender.createAnimal("bear");
                  initialData.changeTotalMinus(btn.name);
                  this.commonFunction.buttonsClick(btn, btn.stepY, btn.click);
                  setTimeout(() => this.startBtn(btn), 200);
                } else {
                  this.music.graceDisable();
                  this.arrow.showArrow('up');
                }
                break;
              }
              case 'mainArea': {
                const rect = this.canvas.node.getBoundingClientRect();
                const clickX = (event.clientX - rect.left) * this.curWidthK;
                const clickY = (event.clientY - rect.top) * this.curHeightK;
                this.buildSpawn.waterChange(this.isGrace);
                if (this.isGrace.grace) {
                  this.music.graceBevavior();
                  this.levelRender.createGrass(clickX, clickY, this.curWidthK, this.curHeightK);
                }
                else {
                  this.music.graceDisable();
                  this.arrow.showArrow('right');

                }
                break;
              }
            }
          }
        });
      } else {
        this.products.add(this.storageProducts);
      }
    }
  }

  private startBtn(btn: IButton) {
    this.commonFunction.btnActive(btn, btn.stepY);
  }

  private checkChicken(event: MouseEvent) {
    this.animals = this.levelRender.moveHundler(event, this.curWidthK, this.curHeightK);
    this.animals = this.animals.filter(item => item === 'chicken');
    this.progress.scoreCheck('chicken', this.animals.length);
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

