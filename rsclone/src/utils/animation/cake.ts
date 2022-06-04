import BuildUtils from "../classes/buildUtil";
import { IButton, IAnimBuild, Coords, IFunctions, IKeyNumber } from "../../application/iterfaces";
import { cakeBtn, cakeAnim } from "./../gameData/spawnData";
import TrackShop from "./../trackShop";
import { Music } from "../music/music";
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

  animationProduct: boolean;
  opacityState: { active: boolean; opacity: number; };

  productWait: number;
  productOpacity: number;
  trackShop: TrackShop;
  music: Music;


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, func: IFunctions, productCounter: IKeyNumber) {
    super(canvas, context);
    this.build = this.objParse(cakeAnim);
    this.btn = this.objParse(cakeBtn);
    this.music = new Music();
    this.trackShop = new TrackShop(this.btn);
    this.productCounter = productCounter;
    this.func = func;
    this.initialBtn = [];
    this.flour = {
      type: "button",
      name: "cake",
      image: "images/level/initial/cake.png",
      x: 1100,
      y: 550,
      width: 104,
      height: 60,
      hover: 1,
      click: 2,
      stepY: 60,
      stepX: 0,
      sx: 0,
      sy: 0,
      swidth: 104,
      sheight: 60
    };

    this.flourProducts = [];
    this.initialFlour = [];
    this.maxFrameY = 7;
    this.maxFrameX = 1;
    this.houseDisable = false;
    this.animTime = 16000;
    this.animSpeed = 600;
    this.useProduct = 'flour';
    this.opacityState = { active: true, opacity: 1 };
    this.animationProduct = false;
    this.productOpacity = 5000;
    this.productWait = 9000;

    this.startPanel();
  }

  private async startPanel() {
    const loadBtn = this.btn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
  }

  public render() {
    this.drawImage(this.initialBtn, this.btn);
    if (this.animationProduct) this.productGhost(this.opacityState);
    this.drawImage(this.initialFlour, this.flourProducts);
    this.context.globalAlpha = 1;
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
          case "cakeBuild": {
            this.music.houseClick();
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
          case "cake": {
            this.music.productDone();
            this.opacityState.active = false;
            const product = this.deleteProduct(this.initialFlour, this.flourProducts);
            if (product) this.func.productToStorage(product);
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
          case "cake": {
            this.buttonsHover(button, button.stepY, button.hover);
            break;
          }
        }
      } else {
        switch (button.name) {
          case 'cake': {
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
    setTimeout(() => this.trackingProducts(), this.productWait);
  }

  private trackingProducts() {
    this.animationProduct = true;
    setTimeout(() => {
      this.deleteProduct(this.initialFlour, this.flourProducts);
      this.animationProduct = false;
    }, this.productOpacity);
  }

  private async drawProduct() {
    const loadFlour = this.flourProducts.map(image => this.loadImage(image.image));
    this.initialFlour = await this.renderImages(loadFlour);
  }

}
