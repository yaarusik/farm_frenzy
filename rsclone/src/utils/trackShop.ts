import { houses, aside, Engineering, IcontentData } from './shopPageData';
import { IButton } from './../application/iterfaces';

export default class TrackShop {
  unionData: IcontentData[];
  shopParams: IButton[];
  shopData: {
    [key: string]: number;
  };

  constructor (shopParams: IButton[]) {
    this.unionData = [houses, aside, Engineering];
    this.shopParams = shopParams;
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
    this.changeImgParams();
  }

  private changeImgParams() {
    this.shopParams.forEach(item => {

      if (item.name in this.shopData) {
        const num = this.shopData[item.name];
        console.log(num);
        let imgUrl = item.image;
        const regex = new RegExp(/[0-9]/, 'g');
        imgUrl = imgUrl.replace(regex, `${num}`);
        console.log(imgUrl);
      }
    });
    console.log(this.shopData);
  }

}