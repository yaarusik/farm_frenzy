
import Common from "./../../application/common/common";
import { IPicture, IText } from "../../application/iterfaces";
import { levelSmallInitial, done } from './progressData';
import { Music } from "../music/music";


export default class Progress extends Common {
  levelInitial: {
    [key: string]: {
      img: IPicture[],
      text: IText[],
    }
  };

  startImg: HTMLImageElement[];
  done: IPicture[];
  level: string;
  productsScore: {
    [key: string]: {
      current: number, //[egg {current: 3}]
      max: number
    };
  };
  startDone: HTMLImageElement[];
  goals: number;
  goalsDone: Set<string>;
  music: Music;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: number) {
    super(canvas, context);

    this.levelInitial = JSON.parse(JSON.stringify(levelSmallInitial));
    this.startImg = [];
    this.startDone = [];
    this.done = JSON.parse(JSON.stringify(done));
    this.level = level.toString();
    this.productsScore = {};
    this.levelInitial[this.level].text.forEach(product => {
      if (product.name) this.productsScore[product.name] = { current: 0, max: Number(product.text.split('/')[1]) };
    });

    this.goals = Object.getOwnPropertyNames(this.productsScore).length;
    this.goalsDone = new Set();
    this.music = new Music();
    this.startProgress();
  }

  private async startProgress() {
    const loadStartImg = this.levelInitial[this.level].img.map(image => this.loadImage(image.image));
    const loadDone = this.done.map(image => this.loadImage(image.image));
    this.startImg = await this.renderImages(loadStartImg);
    this.startDone = await this.renderImages(loadDone);
  }

  public render() {
    this.drawImage(this.startImg, this.levelInitial[this.level].img);
    this.drawImage(this.startDone, this.done);
    this.drawText(this.levelInitial[this.level].text);
  }

  private scoreChange(product: IText) {
    if (product.name) {
      console.log(product.name);
      const current = Number(product.text[0]);
      console.log(current);
      this.productsScore[product.name].current++;
      this.currentScore(product, current);
    }
  }

  private currentScore(product: IText, current: number) {
    if (product.name && current < this.productsScore[product.name].max) {
      this.productText(product, product.name);
    }
    this.doneCheck(product);
  }

  private productText(product: IText, productName: string) {
    product.text = `${this.productsScore[productName].current}/${this.productsScore[productName].max}`;
  }

  private doneCheck(product: IText) {
    if ((product.name && this.productsScore[product.name].current === this.productsScore[product.name].max)) {
      this.doneView(product);
      this.goalsDone.add(product.name);
    }
  }


  private chickenChange(product: IText, number: number) {
    if (product.name && product.id) {
      this.productsScore['chicken'].current = number;
      if (number < this.productsScore[product.name].max) {
        this.productText(product, product.name);
        this.done[product.id].height = 0;
        this.done[product.id].width = 0;
        this.goalsDone.delete(product.name);
      }
      this.doneCheck(product);
    }

  }

  public endGameCheck() {
    if (this.goalsDone.size === this.goals) {
      return true;
    }
    return false;
  }

  private doneView(product: IText) {
    product.text = '';

    if (product.id !== undefined) {
      this.done[product.id].height = 29;
      this.done[product.id].width = 40;
    }
  }

  public scoreCheck(product: string, chickenNum?: number) {
    this.levelInitial[this.level].text.forEach(item => {
      if (item.name === 'chicken') {
        if (chickenNum !== undefined) this.chickenChange(item, chickenNum);
      } else if (item.name === product) {
        this.scoreChange(item);
      }
    });
  }
}