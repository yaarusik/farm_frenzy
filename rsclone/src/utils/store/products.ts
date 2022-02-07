import { IPicture } from "../../application/iterfaces";
import Common from "./../../application/common/common";

export default class Products extends Common {
  products: IPicture[];
  initialProducts: HTMLImageElement[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialProducts = [];


    this.products = [
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: 600,
        y: 1090,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: 600,
        y: 1067,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: 600,
        y: 1044,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: 600,
        y: 1021,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: 600,
        y: 998,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: 623,
        y: 1090,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      }
    ];


    this.startStorage();
  }


  private async startStorage() {
    const loadImage = this.products.map(image => this.loadImage(image.image));
    this.initialProducts = await this.renderImages(loadImage);
  }



  public render() {
    this.drawImage(this.initialProducts, this.products);

  }


}