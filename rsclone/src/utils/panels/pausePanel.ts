import { Coords, IFunctions } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { pausePanelImg, pausePanelBtn, pausePanelText } from "./../gameData/pausePanelData";



export default class PausePanel extends Common {
  initialImage: HTMLImageElement[];
  initialBtn: HTMLImageElement[];


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];


    this.startPanel();
  }

  private async startPanel() {
    const loadImage = pausePanelImg.map(image => this.loadImage(image.image));
    const loadBtn = pausePanelBtn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);
  }

  public render() {
    this.drawImage(this.initialImage, pausePanelImg);
    this.drawImage(this.initialBtn, pausePanelBtn);
    this.drawText(pausePanelText);
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number, func: IFunctions, cancelAnim: number): void {
    pausePanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Продолжить": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.isPaused(), 200);
            break;
          }
          case "Главное Меню": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onMain(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            break;
          }
          case "Перезапустить": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onRestart(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            break;
          }
          case "Карта": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onMap(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            break;
          }
          case "Настройки": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onSettings(), 200);
            setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
            break;
          }
          case "Помощь": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => alert("будем делать эту страничку?"), 200);
            // setTimeout(() => cancelAnimationFrame(cancelAnim), 200);
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