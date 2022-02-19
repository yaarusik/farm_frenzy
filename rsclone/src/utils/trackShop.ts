import { houses, aside, Engineering, IcontentData } from './shopPageData';
import { IButton } from './../application/iterfaces';
import { buildData } from './storage/storageData';
interface IItems {
  [Key: string]: IProp
}
interface Example {
  [key: string]: IItems
}

interface IProp {
  [key: string]: number;
}
export default class TrackShop {
  unionData: IcontentData[];
  shopParams: IButton[];
  shopData: {
    [key: string]: number;
  };

  buildData: Example;

  constructor (shopParams: IButton[]) {
    this.unionData = [houses, aside, Engineering];
    this.shopParams = shopParams;
    this.buildData = buildData;
    this.shopData = {};
    this.saveParams();
  }

  private saveParams() {
    this.unionData.forEach(item => {
      Object.entries(item).forEach(item => {
        const [key, value] = item;
        this.shopData[key] = value.currentStage;
      });
    });
    console.log(this.shopData);
    this.changeImgParams();
  }

  private changeImgParams() {
    this.shopParams.forEach(item => {

      if (item.name in this.shopData) {
        // получаем currentStage
        const number = this.shopData[item.name];
        let imgUrl = item.image;
        const regex = new RegExp(/[0-9]/, 'g');
        imgUrl = imgUrl.replace(regex, `${number}`);
        item.image = imgUrl;
        if (item.name in this.buildData) {
          item.width = this.buildData[item.name][`${number}`].width;
          item.height = this.buildData[item.name][`${number}`].height;
          item.swidth = this.buildData[item.name][`${number}`].swidth;
          item.sheight = this.buildData[item.name][`${number}`].sheight;
          item.stepY = this.buildData[item.name][`${number}`].stepY;
          item.y = this.buildData[item.name][`${number}`].y;
        }
      }
    });
  }

}