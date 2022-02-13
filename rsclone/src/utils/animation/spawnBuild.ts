import Common from "../../application/common/common";
import { IButton, IAnimBuild, Coords, IKeyBoolean, IKeyNumber, IFunctions } from "../../application/iterfaces";
import { animationBuildOptions } from "./../../utils/gameData/levelData";
import { buildSpawnBtn } from "./../gameData/spawnData";
import Well from "./well";
import { initialData } from "./../../application/common/initialData";

export default class BuildSpawn extends Common {
  build: IAnimBuild[];
  btn: IButton[];
  initialBtn: HTMLImageElement[];
  well: Well;
  animState: IKeyBoolean;
  initialImg: HTMLImageElement[];
  price: IKeyNumber;
  panelState: IKeyBoolean;
  func: IFunctions;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, panelState: IKeyBoolean, func: IFunctions) {
    super(canvas, context);
    this.func = func;
    this.build = this.objParse(animationBuildOptions);
    this.btn = this.objParse(buildSpawnBtn);
    this.initialBtn = [];
    this.initialImg = [];
    this.well = new Well(this.btn);
    this.panelState = panelState;

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
    const loadBtn = this.btn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
  }

  public render() {
    this.drawImage(this.initialBtn, this.btn);
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
    this.btn.forEach(button => {
      const scaleCoords: Coords = this.scaleCoords(button, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (button.name) {
          case "well": {
            initialData.changeTotalMinus(button.name);
            if (this.animState.well) this.well.wellAnimation(button, this.animState);
            if (this.animState.waterIndicator) this.well.fullWaterIndicator(this.animState);
            break;
          }
          case "storage": {
            if (!this.panelState.carAnimationOn) {
              this.func.renderStorage();
              this.panelState.storagePanelSwitch = true;
            }
            break;
          }
          default: {
            console.log("it's pausePanel");
          }
        }
      } else {
        // this.buttonsClick(button, 0, 0);
      }
    });
  }

  public waterChange(grace: { [key: string]: boolean }) {
    this.well.waterIndicatorChange(grace);
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.btn.forEach(button => {
      const scaleCoords: Coords = this.scaleCoords(button, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (button.name) {
          case 'well': {
            break;
          }
          case 'storage': {
            this.buttonsHover(button, button.stepY, button.hover);
            break;
          }
        }
      } else {
        switch (button.name) {
          case 'storage': {
            this.buttonsHover(button, 0, 0);
            break;
          }
        }

      }
    });
  }
}


// смещение товара
// сохранение состояния
// перемещение в машину и обратно ***