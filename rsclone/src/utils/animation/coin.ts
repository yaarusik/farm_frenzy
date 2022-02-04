import { IButton, IPicture } from "../../application/iterfaces";

export default class Coin {
  userInterfaceOptions: IPicture[];
  animationImage: IButton[];
  gameFrame: number;
  constructor (iterfaceOption: IPicture[]) {
    this.gameFrame = 0;
    this.userInterfaceOptions = iterfaceOption;
    this.animationImage = <IButton[]>this.userInterfaceOptions.filter(anim => anim.type === "animation");
  }

  public coinAnimation() {
    const coin = <IButton>this.animationImage.find(item => item.name === 'coin');
    const maxHeight = coin.sheight * (<number>coin.frameY);
    const stagger = 5;
    if (this.gameFrame % stagger === 0) {
      if (coin.sy < maxHeight) {
        coin.sy += coin.stepY;
      } else {
        coin.sy = 0;
      }
    }
    this.gameFrame += 1;
  }
}