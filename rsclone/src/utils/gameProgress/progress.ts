
import Common from "./../../application/common/common";
import { IPicture, IText } from "../../application/iterfaces";
import { levelSmallInitial, done } from './progressData';


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
      current: number,
      max: number
    };
  };
  startDone: HTMLImageElement[];
  goals: number;
  goalsDone: Set<string>;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: number) {
    super(canvas, context);

    this.levelInitial = levelSmallInitial;
    this.startImg = [];
    this.startDone = [];
    this.done = done;
    this.level = level.toString();
    this.productsScore = {};
    this.levelInitial[this.level].text.forEach(product => {
      if (product.name) this.productsScore[product.name] = { current: 0, max: Number(product.text.slice(-1)) };
    });

    this.goals = Object.getOwnPropertyNames(this.productsScore).length;

    this.goalsDone = new Set();

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
      const current = Number(product.text[0]);
      this.productsScore[product.name].current++;
      if (current < this.productsScore[product.name].max) {
        product.text = `${this.productsScore[product.name].current}/${this.productsScore[product.name].max}`;
      }
      if ((this.productsScore[product.name].current === this.productsScore[product.name].max)) {
        this.doneView(product);
        this.goalsDone.add(product.name);
      }
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



  public scoreCheck(product: string) {
    this.levelInitial[this.level].text.forEach(item => {
      if (item.name === product) {
        this.scoreChange(item);
      }
    });
  }
}