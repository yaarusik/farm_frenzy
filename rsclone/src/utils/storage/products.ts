import { IPicture, IKeyNumber } from "../../application/iterfaces";
import Progress from "../gameProgress/progress";
import Common from "../../application/common/common";

export default class Products extends Common {
  product: IPicture[];
  initialProducts: HTMLImageElement[];
  goods: string[];
  storageHeight: number;
  sizeUp: number;
  sizeRight: number;
  productsCounter: IKeyNumber;
  productRender: IPicture[];
  startX: number;
  startY: number;
  changeColumn: number;
  maxColumn: number;
  columnCount: number;
  progress: Progress;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, progress: Progress, productsCounter: IKeyNumber) {
    super(canvas, context);
    this.productsCounter = productsCounter;
    this.initialProducts = [];
    // товар, который приходит
    this.goods = [];

    this.progress = progress;

    this.storageHeight = 5;
    // максимальное количество колонок
    this.maxColumn = 6;
    this.columnCount = 0;
    this.changeColumn = 1;

    // смещение продуктов
    this.sizeUp = 23;
    this.sizeRight = 23;


    // исходные данные для отрисовки
    this.startX = 725;
    this.startY = 1090;
    // начальные данные
    this.product = [];
    // динамически создается склад
    this.productRender = [];


    this.updateProduct();
  }


  private async startStorage() {
    const loadImage = this.productRender.map(image => this.loadImage(image.image));
    this.initialProducts = await this.renderImages(loadImage);
    await this.render();
  }

  private updateProduct() {
    this.product = [
      {
        type: "picture",
        name: "egg",
        image: "images/level/products_mini/mini_egg.png",
        x: this.startX,
        y: this.startY,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "bear-1",
        image: "images/level/products_mini/mini_bear1.png",
        x: this.startX,
        y: this.startY,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      {
        type: "picture",
        name: "flour",
        image: "images/level/products_mini/mini_flour.png",
        x: this.startX,
        y: this.startY,
        width: 23,
        height: 23,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
    ];
  }

  async render() {
    this.context.restore();
    this.context.globalAlpha = 1;
    this.drawImage(this.initialProducts, this.productRender);
  }

  private changeCoords() {
    if (this.changeColumn % this.storageHeight) {
      this.startY -= this.sizeUp;
      this.changeColumn++;
    } else {
      this.startX += this.sizeRight;
      this.startY = 1090;
      this.changeColumn = 1;
      this.columnCount++;
    }
  }

  public add(product: string[]) {

    if (this.columnCount < this.maxColumn) {
      this.goods = product; // ['egg']
      this.goods.forEach(product => {
        this.product.forEach(img => {
          if (img.name === product) {
            console.log(product, img.name);
            this.productRender.push(img);
            this.changeCoords();
            this.updateProduct();
            // сохранение количества продуктов
            this.productsCounter[product]++;
            // отображение прогресса игры
            this.progress.scoreCheck(product);
          }
        });
      });
      this.startStorage();
    } else {
      // всплывающее сообщение
      alert("склад переполнен");
    }

  }

  public reRenderStorage() {
    this.productRender = [];
    this.initialProducts = [];
    this.startX = 725;
    this.startY = 1090;
    this.changeColumn = 1;
    this.columnCount = 0;
    this.updateProduct();

    Object.entries(this.productsCounter).forEach(item => {
      const [product, count] = item;
      for (let i = 0; i < count; i++) {
        this.product.forEach(img => {
          if (img.name === product) {
            this.productRender.push(img);
            this.changeCoords();
            this.updateProduct();
          }
        });
      }
    });
    this.startStorage();
  }

  public saveproductsCounter(product: IKeyNumber) {
    this.productsCounter = product;
  }
}