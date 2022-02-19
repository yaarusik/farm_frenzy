import { IPicture, IButton, IText, Coords, IFunctions, IOpacity, IKeyNumber, IStaticText } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { startPanelImg, startPanelStaticText, startPanelBtn, startPanelText } from './../gameData/startPanelData';
import { levelInitial } from "../gameData/startLevelData";
import LevelRender from "../../application/common/levelRender";

export default class StartPanel extends Common {
  startPanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  startPanelBtn: IButton[];
  initialBtn: HTMLImageElement[];
  startPanelStaticText: IStaticText[];
  startPanelText: IText[];
  level: string;
  startImg: HTMLImageElement[];
  levelInitial: {
    [key: string]: {
      img: IPicture[],
      text: IText[],
    }
  };

  opacityState: IOpacity;
  levelRender: LevelRender;
  levelAnimals: IKeyNumber;
  levelBear: IKeyNumber;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: number, levelRender: LevelRender) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];
    this.levelRender = levelRender;

    this.startPanelImg = this.objParse(startPanelImg);
    this.startPanelBtn = this.objParse(startPanelBtn);
    this.startPanelStaticText = this.objParse(startPanelStaticText);
    this.startPanelText = this.objParse(startPanelText);
    this.level = level.toString();

    this.levelInitial = JSON.parse(JSON.stringify(levelInitial));
    // не работает из-за того что рендериться сразу
    this.opacityState = {
      show: true,
      disable: false,
      opacity: 0
    };

    this.levelAnimals = {
      '1': 2,
      '2': 2,
      '3': 2,
      '4': 0,
    };
    this.levelBear = {
      '1': 2,
      '2': 5,
      '3': 4,
      '4': 3
    };

    this.startPanel();
  }

  private async startPanel() {
    const loadStartImg = this.levelInitial[this.level].img.map(image => this.loadImage(image.image));
    const loadImage = this.startPanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.startPanelBtn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);
    this.startImg = await this.renderImages(loadStartImg);

  }

  public render() {
    if (this.opacityState.show) this.opacityShow(this.opacityState);
    if (this.opacityState.disable) this.opacityDisable(this.opacityState);
    this.drawImage(this.initialImage, this.startPanelImg);
    this.drawImage(this.initialBtn, this.startPanelBtn);
    this.drawImage(this.startImg, this.levelInitial[this.level].img);
    this.drawStaticText(this.startPanelStaticText);
    this.drawText([...this.startPanelText, ...this.levelInitial[this.level].text]);
  }

  drawStaticText(text: IStaticText[]) {
    text.forEach(item => {
      this.context.fillStyle = item.color;
      this.context.font = item.fontSize;
      this.context.shadowColor = item.shadowColor;
      this.context.shadowBlur = item.shadowBlur;
      this.context.shadowOffsetX = item.shadowOffsetX;
      this.context.shadowOffsetY = item.shadowOffsetY;

      this.context.strokeText(item.text, item.x, item.y);
      this.context.fillText(item.text, item.x, item.y);
      this.canvasFilters(0);
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
            this.opacityState.disable = true;
            setTimeout(() => this.initialAnimal(), 200);
            setTimeout(() => this.initialBear(), 1000);
            setTimeout(() => func.isStart(), 300);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

  private initialAnimal() {
    for (let i = 1; i <= this.levelAnimals[this.level]; i++) {
      setTimeout(() => {
        this.levelRender.createAnimal('chicken');
      }, 500 * i);
    }
  }

  private initialBear() {
    for (let i = 1; i <= this.levelBear[this.level]; i++) {
      setTimeout(() => {
        this.levelRender.createAnimal('bear');
      }, this.random(25000, 40000) * i);
    }
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}