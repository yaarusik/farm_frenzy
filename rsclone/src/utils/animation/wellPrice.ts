
import Common from "../../application/common/common";
import { IPicture, IText } from "../../application/iterfaces";


export default class WellPrice extends Common {

  coin: IPicture[];
  coinData: never[];
  coinText: IText[];
  initialCoin: HTMLImageElement[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.coin = [{
      type: "picture",
      name: "coin",
      image: "images/level/builds/storage/coin.png",
      x: 916,
      y: 170,
      width: 35,
      height: 35,
      sx: 0,
      sy: 0,
      swidth: 28,
      sheight: 28

    }];
    this.coinText = [{
      text: '19',
      fontSize: '32px Vag_Rounded-Bold CY',
      color: '#fff',
      x: 955,
      y: 195,
      animation: false,
    }];
    this.coinData = [];
    this.initialCoin = [];

    this.startPrice();
  }

  private async startPrice() {
    const loadBtn = this.coin.map(image => this.loadImage(image.image));
    this.initialCoin = await this.renderImages(loadBtn);
  }

  public render() {
    this.drawImage(this.initialCoin, this.coin);
    this.drawText(this.coinText);
  }
}

