import { initialData } from "../../application/common/initialData";
import { IButton } from "../../application/iterfaces";
export default class Well {

  animbtnOptions: IButton[];
  waterCount: number;
  maxCount: number;
  constructor (animbtnOptions: IButton[],) {
    this.animbtnOptions = animbtnOptions;
    this.waterCount = 0;
    this.maxCount = 5;
  }
  public wellAnimation(btn: IButton, animState: { [key: string]: boolean; }) {
    // если в индикаторе есть вода, то блокируем нажатие на колодец
    if (this.waterCount >= this.maxCount) {
      // во время анимации блокируем колодец
      animState.well = false;
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
        animState.well = true;
        btn.sy = 0;
        // обнуляем счетчик
        this.waterCount = 0;
      }, 2400);
    }
  }

  // водный индикатор
  public waterIndicatorChange() {
    if (this.waterCount < this.maxCount) {
      const waterIndicator = <IButton>this.animbtnOptions.find(item => item.name === 'waterIndicator');
      const maxHeight = waterIndicator.sheight * <number>waterIndicator.frameY;
      const step = 5;
      if (waterIndicator.sy < maxHeight) {
        waterIndicator.sy += step * waterIndicator.stepY;
      } else {
        waterIndicator.sy = 0;
      }
      this.waterCount++;
    }
  }


  // пополнение воды
  public fullWaterIndicator(animState: { [key: string]: boolean; }) {
    if (this.waterCount >= this.maxCount) {
      // во время анимации блокируем индикатор
      animState.waterIndicator = false;
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
        animState.waterIndicator = true;
        water.sy = 0;
      }, 2400);
    }
  }

}