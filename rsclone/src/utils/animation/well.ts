import { initialData } from "../../application/common/initialData";
import { IButton, IKeyBoolean } from "../../application/iterfaces";
import { aside, IcontentData } from "../shopPageData";
export default class Well {

  animbtnOptions: IButton[];
  waterCount: number;
  maxCount: number;
  showPrice: IKeyBoolean;
  aside: IcontentData;
  constructor (animbtnOptions: IButton[], showPrice: IKeyBoolean) {
    this.animbtnOptions = animbtnOptions;
    this.waterCount = 0;
    this.maxCount = 5;
    this.showPrice = showPrice;
    this.aside = aside;
  }
  public wellAnimation(btn: IButton) {
    if (this.aside['well'].currentStage > 2) this.wellAnimationUpgrade(btn);
    // если в индикаторе есть вода, то блокируем нажатие на колодец
    else if (this.waterCount >= this.maxCount) {
      // во время анимации блокируем колодец
      let frameY = 0;
      const timer = setInterval(() => {
        if (btn.frameY) {
          if (frameY < btn.frameY - 1) {
            btn.sy += btn.stepY;
            frameY++;
          } else {
            frameY = 0;
            btn.sy = 0;
          }
        }
      }, 50);
      // останавливать в зависимости от индикатора
      setTimeout(() => {
        clearInterval(timer);
        btn.sy = 0;
        // обнуляем счетчик
        this.waterCount = 0;
      }, 2400);
    }
  }

  public wellAnimationUpgrade(btn: IButton) {
    if (this.waterCount >= this.maxCount) {
      let frameY = 0;
      let frameX = 0;
      const timer = setInterval(() => {
        if (frameY < 7) {
          btn.sy += btn.sheight;
          frameY++;
        } else if (frameX < 1) {
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
        // обнуляем счетчик
        this.waterCount = 0;
      }, 2400);
    }
  }
  private activeWell() {
    if (this.waterCount >= this.maxCount) {
      initialData.wellDisable = true;
      this.showPrice.well = true;
    }
  }

  // водный индикатор
  public waterIndicatorChange(grace: { [key: string]: boolean }) {
    if (this.waterCount < this.maxCount) {
      this.waterCount++;
      this.activeWell();
      const waterIndicator = <IButton>this.animbtnOptions.find(item => item.name === 'waterIndicator');
      const maxHeight = waterIndicator.sheight * <number>waterIndicator.frameY;
      const step = 5;

      if (waterIndicator.sy < maxHeight) {
        waterIndicator.sy += step * waterIndicator.stepY;
      } else {
        waterIndicator.sy = 0;
      }
      grace.grace = true;
    } else {
      // индикатор травы
      grace.grace = false;
    }
  }


  // пополнение воды
  public fullWaterIndicator() {
    if (this.waterCount >= this.maxCount) {
      const water = <IButton>this.animbtnOptions.find(item => item.name === 'waterIndicator');
      let frameY = 0;
      const timer = setInterval(() => {
        if (water.frameY) {
          if (frameY < water.frameY - 1) {
            water.sy -= water.stepY;
            frameY++;
          } else {
            frameY = 0;
            water.sy = 0;
          }
        }
      }, 100);
      setTimeout(() => {
        clearInterval(timer);
        water.sy = 0;
      }, 2400);
    }
  }

}