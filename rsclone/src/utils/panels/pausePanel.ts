import { IPicture, IButton, IText, Coords, IFunctions, IOpacity } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { pausePanelImg, pausePanelBtn, pausePanelText } from "./../gameData/pausePanelData";
import Timer from "../timer/levelTimer";
import SettingsPage from "../../application/pages/settingsPage";
import Control from "../../builder/controller";
import { Music } from "../music/music";
export default class PausePanel extends Common {
  pausePanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  pausePanelBtn: IButton[];
  initialBtn: HTMLImageElement[];
  pausePanelText: IText[];
  timer: Timer;
  node: HTMLElement;
  canvasContainer: Control<HTMLElement>;
  music: Music;
  opacityState: IOpacity;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, timer: Timer,
    node: HTMLElement, canvasContainer: Control<HTMLElement>, opacityState: IOpacity) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];

    this.pausePanelImg = this.objParse(pausePanelImg);
    this.pausePanelBtn = this.objParse(pausePanelBtn);
    this.pausePanelText = this.objParse(pausePanelText);
    this.timer = timer;
    this.node = node;
    this.canvasContainer = canvasContainer;
    this.music = new Music();
    this.opacityState = opacityState;

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.pausePanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.pausePanelBtn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);
  }

  public render() {
    if (this.opacityState.show) this.opacityShow(this.opacityState);
    if (this.opacityState.disable) this.opacityDisable(this.opacityState);
    this.drawImage(this.initialImage, this.pausePanelImg);
    this.drawImage(this.initialBtn, this.pausePanelBtn);
    this.drawText(this.pausePanelText);
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.pausePanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        this.buttonsHover(btn, btn.stepY, btn.hover);
        this.changeAnimation(btn, true, this.pausePanelText);
      } else {
        this.buttonsHover(btn, 0, 0);
        this.changeAnimation(btn, false, this.pausePanelText);
      }
    });
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number, func: IFunctions, cancelAnim: number): void {
    this.pausePanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Продолжить": {
            this.buttonsClick(btn, btn.stepY, btn.click);

            this.opacityState.disable = true;
            setTimeout(() => func.isPaused(), 400);
            this.timer.isRunning = true;
            break;
          }
          case "Главное Меню": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.opacityState.disable = true;
            setTimeout(() => func.onMain(), 300);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 300);
            this.music.onStart();
            break;
          }
          case "Перезапустить": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.opacityState.disable = true;
            setTimeout(() => func.onRestart(), 300);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 300);
            this.music.onMain();
            break;
          }
          case "Карта": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.opacityState.disable = true;
            setTimeout(() => func.onMap(), 300);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 300);
            this.music.onMain();
            break;
          }
          case "Настройки": {
            let settings;
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.opacityState.disable = true;
            this.canvasContainer.node.style.display = "none";
            if (this.node.childElementCount < 2) {
              settings = new SettingsPage(this.node);
              (<HTMLElement>settings.node.children[0]).classList.add("map");
            }
            // setTimeout(() => func.onSettings(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 300);
            break;
          }
          case "Помощь": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.opacityState.disable = true;
            setTimeout(() => alert("будем делать эту страничку?"), 300);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

}