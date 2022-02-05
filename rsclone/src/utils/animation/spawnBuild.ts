import Common from "../../application/common/common";
import { IButton, IAnimBuild, Coords, IKeyBoolean, IKeyNumber, IText } from "../../application/iterfaces";
import { animationBuildOptions } from "./../../utils/gameData/levelData";
import { buildSpawnBtn, buildSpawnAnim } from "./../gameData/spawnData";
import Well from "./well";
import { initialData } from "./../../application/common/initialData";

export default class BuildSpawn extends Common {
  build: IAnimBuild[];
  btn: IButton[];
  initialBtn: HTMLImageElement[];
  well: Well;
  animState: IKeyBoolean;
  animImg: IButton[];
  initialImg: HTMLImageElement[];
  price: IKeyNumber;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.build = animationBuildOptions;
    this.btn = buildSpawnBtn;
    this.animImg = buildSpawnAnim;
    this.initialBtn = [];
    this.initialImg = [];
    this.well = new Well([...this.btn, ...this.animImg]);

    this.animState = {
      well: true,
      waterIndicator: true,
    };

    this.price = {
      well: 19,
      chicken: 100,
    };

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.animImg.map(image => this.loadImage(image.image));
    const loadBtn = this.btn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImg = await this.renderImages(loadImage);
  }

  public render() {
    this.drawImage(this.initialBtn, this.btn);
    this.drawImage(this.initialImg, this.animImg);
    this.buildSpawn();
  }

  private buildSpawn() {
    this.build.forEach((item, index) => {
      this.btn.forEach(build => {
        setTimeout(() => this.buildAnimation(item, build), 500 * index);
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
    this.btn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "well": {
            if (this.animState.well) this.well.wellAnimation(btn, this.animState);
            if (this.animState.waterIndicator) this.well.fullWaterIndicator(this.animState);
            this.animState.well = false;
            this.animState.waterIndicator = false;
            break;
          }
          case "storage": {
            this.well.waterIndicatorChange();
            break;
          }
          default: {
            console.log("it's pausePanel");
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.btn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        // this.buttonsHover(btn, btn.stepY, btn.hover);
      } else {
        this.buttonsHover(btn, 0, 0);
      }
    });
  }

  public changeTotal(product: string, text: IText[]) {
    if (this.animState.well) {
      initialData.totalLevelSum.level1 -= this.price[product];
      text.forEach(item => {
        if (item.name === 'total') {
          console.log('total');
          item.text = initialData.totalLevelSum.level1.toString();
        }
      });
    }
  }
}


