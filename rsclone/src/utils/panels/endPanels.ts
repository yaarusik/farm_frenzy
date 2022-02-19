import { IPicture, IButton, IText, Coords, IFunctions, IOpacity, IKeyString } from "../../application/iterfaces";
import Timer from "../timer/levelTimer";
import Common from "./../../application/common/common";
import { endBtn, endImg, endStaticText, endText, endTextData } from './../gameData/endPanelData';
import { levelFinish, levelCoords } from "../gameData/mapData";

export default class EndPanel extends Common {
  endPanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  initialBtn: HTMLImageElement[];
  endPanelStaticText: IText[];
  startImg: HTMLImageElement[];
  endPanelBtn: IButton[];
  endPanelText: IText[];
  timer: Timer;
  dataText: IText[];
  opacityState: IOpacity;
  level: number;
  levelFinish: IKeyString;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, timer: Timer, level: number) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];

    this.endPanelImg = endImg;
    this.endPanelStaticText = endStaticText;
    this.endPanelBtn = endBtn;
    this.endPanelText = endText;
    this.dataText = endTextData;
    this.timer = timer;
    this.endPanelImg = this.objParse(endImg);
    this.endPanelStaticText = this.objParse(endStaticText);
    this.endPanelBtn = this.objParse(endBtn);
    this.endPanelText = this.objParse(endText);
    this.level = level;
    this.levelFinish = levelFinish;

    this.opacityState = {
      show: false,
      disable: false,
      opacity: 0
    };

    this.startPanel();
  }

  private async startPanel() {
    if (this.opacityState.show) this.opacityShow(this.opacityState);
    if (this.opacityState.disable) this.opacityDisable(this.opacityState);
    const loadImage = this.endPanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.endPanelBtn.map(btn => this.loadImage(btn.image));
    this.initialImage = await this.renderImages(loadImage);
    this.initialBtn = await this.renderImages(loadBtn);
  }

  public render() {
    this.timer.isRunning = false;
    this.timer.endPanelView();
    this.drawImage(this.initialImage, this.endPanelImg);
    this.drawImage(this.initialBtn, this.endPanelBtn);
    this.drawStaticText(this.endPanelStaticText);
    this.drawText(this.endPanelText);
    this.drawText(this.dataText);
    this.timer.checkZeroTime();
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
      this.context.strokeText(item.text, item.x, item.y);
      this.context.fillText(item.text, item.x, item.y);
      this.canvasFilters(0);
      this.context.shadowColor = '';
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
            this.opacityState.disable = true;
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.addLevelBtn();
            setTimeout(() => func.onMap(), 300);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }


  private addLevelBtn() {
    const nextLevel = (this.level + 1).toString();
    if (!(nextLevel in this.levelFinish) && (nextLevel in levelCoords)) {
      this.levelFinish[nextLevel] = 'start';
    } //else {
    //   throw new Error('level does not exist');
    // }
  }



}