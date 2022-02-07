import { IPicture, IButton, IText, Coords, IFunctions } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { startPanelImg, startPanelStaticText, startPanelBtn, startPanelText } from './../gameData/startPanelData';
import { levelInitial } from "../gameData/startLevelData";

export default class StartPanel extends Common {
  startPanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  startPanelBtn: IButton[];
  initialBtn: HTMLImageElement[];
  startPanelStaticText: IText[];
  startPanelText: IText[];
  level: string;

  startImg: HTMLImageElement[];
  levelInitial: {
    [key: string]: {
      img: IPicture[],
      text: IText[],
    }
  };


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: number) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];

    this.startPanelImg = startPanelImg;
    this.startPanelBtn = startPanelBtn;
    this.startPanelStaticText = startPanelStaticText;
    this.startPanelText = startPanelText;
    this.level = level.toString();

    this.levelInitial = levelInitial;

    this.startPanel();
  }

  private async startPanel() {

    const loadStartImg = this.levelInitial[this.level].img.map(image => this.loadImage(image.image));
    this.startImg = await this.renderImages(loadStartImg);
    const loadImage = this.startPanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.startPanelBtn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);

  }

  public render() {
    this.drawImage(this.initialImage, this.startPanelImg);
    this.drawImage(this.initialBtn, this.startPanelBtn);
    this.drawImage(this.startImg, this.levelInitial[this.level].img);
    this.drawStaticText(this.startPanelStaticText);

    this.drawText([...this.startPanelText, ...this.levelInitial[this.level].text]);


  }

  drawStaticText(text: IText[]) {
    text.forEach(item => {
      this.context.fillStyle = item.color;
      this.context.font = item.fontSize;
      if (item.text === 'Цели уровня') {
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
    this.startPanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        this.buttonsHover(btn, btn.stepY, btn.hover);
        this.changeAnimation(btn, true, this.startPanelText);
      } else {
        this.buttonsHover(btn, 0, 0);
        this.changeAnimation(btn, false, this.startPanelText);
      }
    });
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number, func: IFunctions): void {
    this.startPanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            setTimeout(() => func.isStart(), 200);
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