import { IPicture, IButton, IText, Coords, IFunctions } from "../../application/iterfaces";
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

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, timer: Timer, 
  node: HTMLElement, canvasContainer: Control<HTMLElement>) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];

    this.pausePanelImg = pausePanelImg;
    this.pausePanelBtn = pausePanelBtn;
    this.pausePanelText = pausePanelText;
    this.timer = timer;
    this.node = node;
    this.canvasContainer = canvasContainer;
    this.music = new Music();

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.pausePanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.pausePanelBtn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);
  }

  public render() {
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
            setTimeout(() => func.isPaused(), 200);
            this.timer.isRunning = true;
            console.log(this.timer.isRunning);
            break;
          }
          case "Главное Меню": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onMain(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            this.music.onStart();
            break;
          }
          case "Перезапустить": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onRestart(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            this.music.onMain();
            break;
          }
          case "Карта": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onMap(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            this.music.onMain();
            break;
          }
          case "Настройки": {
            let settings;
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.canvasContainer.node.style.display = "none";
            if (this.node.childElementCount < 2) {
              settings = new SettingsPage(this.node);
              (<HTMLElement>settings.node.children[0]).classList.add("map");
            }
            // setTimeout(() => func.onSettings(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            break;
          }
          case "Помощь": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => alert("будем делать эту страничку?"), 200);
            break;
          }
          default: {
            console.log("it's pausePanel");
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

}