import BuildUtils from "../classes/buildUtil";
import { IButton, IAnimBuild, Coords, IFunctions, IKeyNumber, } from "../../application/iterfaces";
import { driedEggsBtn, driedAnim } from "./../gameData/spawnData";

export default class DriedEgg extends BuildUtils {
  build: IAnimBuild[];
  btn: IButton[];
  initialBtn: HTMLImageElement[];
  maxFrameY: number;
  maxFrameX: number;
  flour: IButton;
  initialFlour: HTMLImageElement[];
  houseDisable: boolean;
  flourProducts: IButton[];
  func: IFunctions;
  productCounter: IKeyNumber;
  animTime: number;
  animSpeed: number;
  useProduct: string;


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, func: IFunctions, productCounter: IKeyNumber) {
    super(canvas, context);
    this.build = this.objParse(driedAnim);
    this.btn = this.objParse(driedEggsBtn);
    this.productCounter = productCounter;
    this.func = func;
    this.initialBtn = [];
    this.flour = {
      type: "button",
      name: "flour",
      image: "images/level/initial/flour.png",
      x: 510,
      y: 326,
      width: 80,
      height: 96,
      hover: 1,
      click: 2,
      stepY: 96,
      stepX: 0,
      sx: 0,
      sy: 0,
      swidth: 80,
      sheight: 96
    };

    this.flourProducts = [];
    this.initialFlour = [];
    this.maxFrameY = 7;
    this.maxFrameX = 1;
    this.houseDisable = false;
    this.animTime = 2400;
    this.animSpeed = 90;
    this.useProduct = 'egg';

    this.startPanel();
  }

  private async startPanel() {
    const loadBtn = this.btn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
  }

  public render() {
    this.drawImage(this.initialBtn, this.btn);
    this.drawImage(this.initialFlour, this.flourProducts);
    this.startSpawn();
  }

  private startSpawn() {
    this.build.forEach((item) => {
      this.btn.forEach(build => {
        this.buildSpawn(item, build);
      });
    });
  }


  public clickHundler(event: MouseEvent, widthK: number, heightK: number): void {
    [...this.btn, ...this.flourProducts].forEach(button => {
      const scaleCoords: Coords = this.scaleCoords(button, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (button.name) {
          case "flourBuild": {
            if (!this.houseDisable && this.checkProduct(this.useProduct, this.productCounter)) {
              this.houseDisable = true;
              this.deleteUseProduct(this.useProduct, this.productCounter);
              this.func.reRenderStorage();
              this.buildAnimation(button, this.maxFrameX, this.maxFrameY, () => {
                this.showProduct();
                this.houseDisable = false;
              });
              this.fullhouseIndicator(this.btn, this.animTime, this.animSpeed);
            }
            break;
          }
          case "flour": {
            const product = this.deleteProduct(this.initialFlour, this.flourProducts);
            this.func.productToStorage(product);
            break;
          }
        }
      }
    });
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.flourProducts.forEach(button => {
      const scaleCoords: Coords = this.scaleCoords(button, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (button.name) {
          case "flour": {
            this.buttonsHover(button, button.stepY, button.hover);
            break;
          }
        }
      } else {
        switch (button.name) {
          case 'flour': {
            this.buttonsHover(button, 0, 0);
            break;
          }
        }
      }
    });
  }

  // отдельный массив, чтоб выплевывал продукт
  private showProduct() {
    this.flourProducts.push(this.flour);
    this.drawProduct();
  }

  private async drawProduct() {
    const loadFlour = this.flourProducts.map(image => this.loadImage(image.image));
    this.initialFlour = await this.renderImages(loadFlour);
  }

}
