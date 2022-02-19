import Common from "../../application/common/common";
import { IButton, IKeyString } from './../../application/iterfaces';
import { levelFinish, levelCoords } from "./../gameData/mapData";
interface Level {
  [key: string]: Coords
}
interface Coords {
  [key: string]: number
}

export default class LevelProgress extends Common {
  levelBtnData: IButton[];
  levelBtnImg: HTMLImageElement[];
  levelFinish: IKeyString;
  levelCoords: Level;
  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.levelFinish = levelFinish;
    this.levelCoords = levelCoords;

    this.levelBtnData = [
    ];
    this.levelBtnImg = [];

    this.finishCheck();
    this.startBtn();
  }

  private async startBtn() {
    const btnImg = this.levelBtnData.map(image => this.loadImage(image.image));
    this.levelBtnImg = await this.renderImages(btnImg);
  }

  public render() {
    this.drawImage(this.levelBtnImg, this.levelBtnData);
  }

  private drawLevelBtn(levelStation = 'start', level: number, x: number, y: number): void {
    const btn = {
      type: "button",
      name: `${level}`,
      image: `images/map/${levelStation}.png`,
      id: level,
      x: x,
      y: y,
      width: 76,
      height: 76,
      stepY: 76,
      stepX: 0,
      hover: 1,
      click: 2,
      sx: 0,
      sy: 0,
      swidth: 76,
      sheight: 76,
    };
    this.levelBtnData.push(btn);
  }

  private finishCheck() {
    Object.entries(this.levelFinish).forEach(btn => {
      const [level, status] = btn;
      this.drawLevelBtn(status, Number(level), this.levelCoords[level].x, this.levelCoords[level].y);
    });
  }
}