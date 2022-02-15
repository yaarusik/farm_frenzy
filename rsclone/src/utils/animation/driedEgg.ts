import Common from "../../application/common/common";
import { IButton, IAnimBuild, Coords, } from "../../application/iterfaces";
import { driedEggsBtn, driedAnim } from "./../gameData/spawnData";

export default class DriedEgg extends Common {
  build: IAnimBuild[];
  btn: IButton[];
  initialBtn: HTMLImageElement[];
  maxFrameY: number;
  maxFrameX: number;
  flour: IButton;
  initialFlour: HTMLImageElement[];
  houseDisable: boolean;
  flourProducts: IButton[];


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D,) {
    super(canvas, context);
    this.build = this.objParse(driedAnim);
    this.btn = this.objParse(driedEggsBtn);
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
      stepY: 0,
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


    this.startPanel();
  }

  private async startPanel() {
    const loadBtn = this.btn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
  }

  public render() {
    this.drawImage(this.initialBtn, this.btn);
    this.drawImage(this.initialFlour, this.flourProducts);

    this.buildSpawn();
  }

  private buildSpawn() {
    this.build.forEach((item, index) => {
      this.btn.forEach(build => {
        setTimeout(() => this.buildAnimation(item, build), 400 * index);
      });
    });
  }

  private buildAnimation(item: IAnimBuild, build: IButton) {
    if (item.name === build.name) {
      if (item.maxY > build.y)
        build.y += item.speed;
    }
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number): void {
    [...this.btn, ...this.flourProducts].forEach(button => {
      const scaleCoords: Coords = this.scaleCoords(button, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (button.name) {
          case "flourBuild": {
            if (!this.houseDisable) {
              this.houseDisable = true;
              this.flourAnim(button);
              this.fullhouseIndicator();
            }
            break;
          }
          case "flour": {
            const product = this.deleteProduct();
            console.log(product);
            break;
          }
        }
      }
    });
  }

  // пополнение
  public fullhouseIndicator() {

    const house = <IButton>this.btn.find(item => item.name === 'houseIndicator');
    let frameY = 0;
    let animStop = false;
    const timer = setInterval(() => {
      if (house.frameY && !animStop) {
        if (frameY < house.frameY) {
          house.sy += house.stepY;
          frameY++;
        } else {
          animStop = true;
        }
      }
    }, 90);
    setTimeout(() => {
      clearInterval(timer);
      house.sy = 0;
    }, 2400);
  }

  private flourAnim(btn: IButton): void {
    let frameY = 0;
    let frameX = 0;
    const timer = setInterval(() => {
      if (frameY < this.maxFrameY) {
        btn.sy += btn.sheight;
        frameY++;
      } else if (frameX < this.maxFrameX) {
        frameX++;
        frameY = 0;
        btn.sy = 0;
        btn.sx += btn.swidth;
      } else {
        frameY = 0;
        btn.sy = 0;
        frameX = 0;
        btn.sx = 0;
      }
    }, 50);
    setTimeout(() => {
      clearInterval(timer);
      btn.sy = 0;
      btn.sx = 0;
      this.showProduct();
      this.houseDisable = false;
    }, 2400);
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

  private deleteProduct(): string {
    this.initialFlour.pop();
    const product = <IButton>this.flourProducts.pop();
    return product.name;
  }



}
