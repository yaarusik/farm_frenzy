import Common from "../../application/common/common";
import { IKeyBoolean, IPicture, IText } from "../../application/iterfaces";
import { initialData } from "../../application/common/initialData";
import { Music } from "../music/music";
import Preloader from "../../application/preloader";


export default class Car extends Common {

  initialR: HTMLImageElement[];
  initialM: HTMLImageElement[];
  initialL: HTMLImageElement[];
  carRight: IPicture;
  carLeft: IPicture;
  minimap: IPicture;
  maxRight: number;
  maxLeft: number;
  carCondition: boolean;
  mapRight: number;
  mapLeft: number;
  isState: IKeyBoolean;
  text: IText;
  textRight: number;
  total: number;
  music: Music;


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, isState: IKeyBoolean) {
    super(canvas, context);

    this.isState = isState;
    this.music = new Music();

    this.total = 0;
    this.initialL = [];
    this.initialR = [];
    this.initialM = [];


    this.maxRight = 1490;
    this.textRight = 1470;
    this.maxLeft = 1258;
    this.mapRight = 1414;
    this.mapLeft = 1182;
    this.carRight =
    {
      type: "picture",
      name: "carRight",
      image: "images/level/car/car-right.png",
      x: 1258,
      y: 86,
      width: 80,
      height: 68,
      sx: 0,
      sy: 0,
      swidth: 0,
      sheight: 0
    },

      this.carLeft = {
        type: "picture",
        name: "carLeft",
        image: "images/level/car/car-left.png",
        x: 1490,
        y: 86,
        width: 0,
        height: 0,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },

      this.minimap = {
        type: "picture",
        name: "minimap",
        image: "images/level/car/minimap.png",
        x: 1182,
        y: 140,
        width: 120,
        height: 40,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      };

    this.text = {
      text: '0',
      fontSize: '24px Vag_Rounded-Bold CY',
      color: '#000',
      x: 1238,
      y: 168,
      animation: false,
    },

      this.carCondition = false;

    this.startCar();
  }

  private async startCar() {
    const loadCarR = [this.carRight].map(image => this.loadImage(image.image));
    const loadCarL = [this.carLeft].map(image => this.loadImage(image.image));
    const loadMinimap = [this.minimap].map(image => this.loadImage(image.image));
    this.initialR = await this.renderImages(loadCarR);
    this.initialL = await this.renderImages(loadCarL);
    this.initialM = await this.renderImages(loadMinimap);
  }

  public render() {
    this.drawImage(this.initialR, [this.carRight]);
    this.drawImage(this.initialL, [this.carLeft]);
    this.drawImage(this.initialM, [this.minimap]);
    this.drawText([this.text]);
    if (!this.carCondition) this.carRightAnimation();
    if (this.carCondition) this.carLeftAnimation();
  }

  private carRightAnimation() {
    if (this.carRight.x < this.maxRight && this.minimap.x < this.mapRight) {
      this.carRight.x += 0.5;
      this.minimap.x += 0.5;
      this.text.x += 0.5;
    } else {
      // Car drop music
      this.carRight.width = 0;
      this.carRight.height = 0;
      this.carRight.x = this.maxLeft;
      this.carCondition = true;
    }

  }

  private carLeftAnimation() {
    if (this.carLeft.x > this.maxLeft && this.minimap.x > this.mapLeft) {
      this.carLeft.x -= 0.5;
      this.minimap.x -= 0.5;
      this.text.x -= 0.5;
      this.carLeft.width = 80;
      this.carLeft.height = 68;
    } else {
      this.music.car();
      this.carLeft.width = 0;
      this.carLeft.height = 0;
      this.carRight.width = 80;
      this.carRight.height = 68;
      this.carLeft.x = this.maxRight;
      this.carCondition = false;
      this.isState.carAnimationOn = false;
      // тут можно добавить общему тоталу 
      initialData.changeTotalPlus(this.total);

    }
  }

  public addStorageTotal(total: string): void {
    this.music.car();
    this.text.text = total;
    this.total = +total;
  }


}


