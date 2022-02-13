import { IKeyNumber, Coords, IButton } from "../../application/iterfaces";
import Common from "../../application/common/common";

export default class CarTrunc extends Common {
  productContainer: IButton[];
  initialBox: HTMLImageElement[];

  box: {
    [key: string]: HTMLImageElement
  };

  boxData: {
    [key: string]: IButton
  };

  startX: number;
  boxCounter: {
    [key: string]: number
  };
  func: {
    changeCountBoxProduct: (boxCounter: IKeyNumber, product: string) => void;
    totalSubstraction: (product: string, number: number) => void;
  };

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, func: {
    changeCountBoxProduct: (boxCounter: IKeyNumber, product: string) => void;
    totalSubstraction: (product: string, number: number) => void;
  }) {
    super(canvas, context);
    this.initialBox = [];
    this.func = func;
    this.box = {};
    this.boxData = {};

    this.productContainer = [
      {
        type: "button",
        name: "egg",
        image: "images/level/builds/storage/box/egg.png",
        stepY: 28,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 1208,
        y: 722,
        width: 68,
        height: 59,
        sx: 0,
        sy: 0,
        swidth: 44,
        sheight: 38
      },
      {
        type: "button",
        name: "bear-1",
        image: "images/level/builds/storage/box/bear-1.png",
        stepY: 28,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 1288,
        y: 722,
        width: 68,
        height: 59,
        sx: 0,
        sy: 0,
        swidth: 44,
        sheight: 38
      }
    ];

    this.boxCounter = {
      'egg': 0,
      'bear-1': 0,
      'chicken': 0
    };

    this.startX = 1208;

    this.startTrunc();
  }


  private async startTrunc() {
    const loadImage = this.productContainer.map(image => this.loadImage(image.image));
    this.initialBox = await this.renderImages(loadImage);
  }


  render() {
    this.drawImage(Object.values(this.box), Object.values(this.boxData));
  }


  private getImg(product: string) {
    let imgName = '';
    const img = this.initialBox.find(img => {
      const imgUrl = img.src;
      const iconName = imgUrl.substring(img.src.lastIndexOf('/') + 1, imgUrl.lastIndexOf('.'));
      imgName = iconName;
      return iconName === product;
    });
    return { name: imgName, img: img };
  }

  public drawBox(product: string, count: number): void {
    const { name, img } = this.getImg(product);
    this.boxData[product] =
    {
      type: "button",
      name: `${product}`,
      image: `images/level/builds/storage/box/${product}.png`,
      stepY: 28,
      stepX: 0,
      hover: 1,
      click: 2,
      x: this.startX,
      y: 722,
      width: 68,
      height: 59,
      sx: 0,
      sy: 0,
      swidth: 44,
      sheight: 38
    };
    if (img) this.box[product] = img;
    else {
      throw new Error('box img not found');
    }
    this.changeBoxPosition();
    console.log('count:', count);
    this.boxCounter[product] += count;
  }

  private changeBoxPosition() {
    this.startX += 80;
  }

  private deleteProduct(product: string) {
    this.startX = 1208;
    delete this.box[product];
    delete this.boxData[product];
    // перед этим нужно передать значение
    this.boxCounter[product] = 0;
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number): void {
    Object.values(this.boxData).forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "egg": {
            this.func.changeCountBoxProduct(this.boxCounter, btn.name);
            this.func.totalSubstraction(btn.name, this.boxCounter[btn.name]);
            this.deleteProduct(btn.name);
            console.log(this.boxCounter, 'egg');
            break;
          }
          case "bear-1": {
            this.func.changeCountBoxProduct(this.boxCounter, btn.name);
            this.func.totalSubstraction(btn.name, this.boxCounter[btn.name]);
            this.deleteProduct(btn.name);
            console.log(this.boxCounter, 'bear');
            break;
          }
        }
      }
    });

  }



}