import { IPicture, IButton, IText, Coords, IFunctions } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { endBtn, endImg, endStaticText, endText } from './../gameData/endPanelData';

export default class EndPanel extends Common {
  endPanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  initialBtn: HTMLImageElement[];
  endPanelStaticText: IText[];
  startImg: HTMLImageElement[];
  endPanelBtn: IButton[];
  endPanelText: IText[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];

    this.endPanelImg = endImg;
    this.endPanelStaticText = endStaticText;
    this.endPanelBtn = endBtn;
    this.endPanelText = endText;

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.endPanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.endPanelBtn.map(btn => this.loadImage(btn.image));
    this.initialImage = await this.renderImages(loadImage);
    this.initialBtn = await this.renderImages(loadBtn);

  }

  public render() {
    this.drawImage(this.initialImage, this.endPanelImg);
    this.drawImage(this.initialBtn, this.endPanelBtn);
    this.drawStaticText(this.endPanelStaticText);
    this.drawText(this.endPanelText);
  }

  drawStaticText(text: IText[]) {
    text.forEach(item => {
      this.context.fillStyle = item.color;
      this.context.font = item.fontSize;
      if (item.text === 'Результаты уровня') {
        this.context.shadowColor = '#7f5f30';
        this.context.shadowBlur = 10;
      } else {
        this.context.shadowColor = '#222222';
        this.context.shadowBlur = 4;
      }
      this.context.shadowOffsetX = 4;
      this.context.shadowOffsetY = 4;
      if (item.text === 'Лучшее время :') {
        this.context.shadowBlur = 0;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowColor = '';
      }
      this.context.strokeText(item.text, item.x, item.y);
      this.context.fillText(item.text, item.x, item.y);
    });
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.endPanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        this.buttonsHover(btn, btn.stepY, btn.hover);
        this.changeAnimation(btn, true, this.endPanelText);
      } else {
        this.buttonsHover(btn, 0, 0);
        this.changeAnimation(btn, false, this.endPanelText);
      }
    });
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number, func: IFunctions): void {
    this.endPanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.onMap(), 200);
            break;
          }
          default: {
            console.log("it's startPanel");
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }






}