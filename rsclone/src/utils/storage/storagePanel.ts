import { IPicture, IButton, IText, Coords, IKeyBoolean, IKeyNumber } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { storagePanelImg, storagePanelStaticText, storagePanelBtn, storagePanelText } from './../gameData/storagePanelData';

export default class StoragePanel extends Common {
  storageImg: IPicture[];
  initialImage: HTMLImageElement[];
  initialBtn: HTMLImageElement[];
  startImg: HTMLImageElement[];
  storageStaticText: IText[];
  storageBtn: IButton[];
  storageText: IText[];
  icons: {
    [key: string]: IPicture
  };
  initialIcon: HTMLImageElement[];
  iconImg: Set<HTMLImageElement>;
  iconData: {
    [key: string]: IPicture
  };

  stepY: number;
  startY: number;
  iconsText: {
    [key: string]: IText
  };
  price: IKeyNumber;
  iconsPrice: {
    [key: string]: IText
  };
  textY: number;
  priceX: number;

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];
    this.initialIcon = [];
    this.iconsText = {};
    this.iconsPrice = {};

    this.storageImg = this.objParse(storagePanelImg);
    this.storageStaticText = this.objParse(storagePanelStaticText);
    this.storageBtn = this.objParse(storagePanelBtn);
    this.storageText = this.objParse(storagePanelText);

    this.stepY = 62;
    this.startY = 210;
    this.textY = 46; //смещение текста
    this.priceX = 120; // смещение цены

    this.icons = {
      'egg': {
        type: "picture",
        name: "egg",
        image: "images/level/builds/storage/egg.png",
        x: 60,
        // +62
        y: 0,
        width: 65,
        height: 65,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      "bear-1": {
        type: "picture",
        name: "bear-1",
        image: "images/level/builds/storage/bear-1.png",
        x: 60,
        y: 0,
        width: 65,
        height: 65,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
      'icon': {
        type: "picture",
        name: "coin",
        image: "images/level/builds/storage/coin.png",
        x: 300,
        y: this.startY,
        width: 65,
        height: 65,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0

      }
    };

    this.price = {
      'egg': 10,
      'bear-1': 50,
      'chicken': 25,
    };


    this.iconImg = new Set();
    this.iconData = {};

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.storageImg.map(image => this.loadImage(image.image));
    const loadBtn = this.storageBtn.map(image => this.loadImage(image.image));
    const loadIcon = Object.values(this.icons).map(icon => this.loadImage(icon.image));
    this.initialImage = await this.renderImages(loadImage);
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialIcon = await this.renderImages(loadIcon);
  }

  public render() {
    this.drawImage(this.initialImage, this.storageImg);
    this.drawImage(this.initialBtn, this.storageBtn);
    this.drawStaticText(this.storageStaticText);
    this.drawText(this.storageText);

    this.drawImage([...this.iconImg], Object.values(this.iconData));
    this.drawText(Object.values(this.iconsText));
    this.drawText(Object.values(this.iconsPrice));

  }

  drawStaticText(text: IText[]) {
    text.forEach(item => {
      this.context.fillStyle = item.color;
      this.context.font = item.fontSize;
      this.context.shadowColor = '#222222';

      this.context.shadowBlur = 4;
      this.context.shadowOffsetX = 4;
      this.context.shadowOffsetY = 4;

      this.context.strokeText(item.text, item.x, item.y);
      this.context.fillText(item.text, item.x, item.y);

      this.context.shadowBlur = 0;
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
    });
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.storageBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            this.buttonsHover(btn, btn.stepY, btn.hover);
            this.changeAnimation(btn, true, this.storageText);
            break;
          }
          case "Отмена": {
            this.buttonsHover(btn, btn.stepY, btn.hover);
            this.changeAnimation(btn, true, this.storageText);
            break;
          }
        }

      } else {
        this.buttonsHover(btn, 0, 0);
        this.changeAnimation(btn, false, this.storageText);
      }
    });
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number, isState: IKeyBoolean): void {
    this.storageBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            break;
          }
          case "Отмена": {
            setTimeout(() => isState.storagePanelSwitch = false, 200);
            this.buttonsClick(btn, btn.stepY, btn.click);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

  public addStorage(product: string, count: number): void {
    console.log('products', product, 'count ', count);
    if (count === 1) {
      const { name, img } = this.getImg(product);
      if (img) {
        // смещаем позицию товара на складе
        this.icons[name].y = this.startY;
        // добавляем данные картинки
        this.iconData[name] = this.icons[name];
        // добавляем саму картинку
        this.iconImg.add(img);
        // смещаем координату
        this.changeCoordsUp();
        // рисуем количество элементов
        this.addText(this.iconsText, product, count, 'x', 0, this.textY);
        // рисуем цену
        this.addText(this.iconsPrice, product, this.price[product], '', this.priceX, this.textY);
        // рисуем монетку


      }
    } else if (count > 1) {
      this.iconsText[product].text = `x ${count}`;
    }

  }

  // сделать смещение правильное
  private changeCoordsUp(): void {
    this.startY += this.stepY;
  }

  private addText(container: { [key: string]: IText }, product: string, count: number, isX: string, x: number, y: number) {
    container[product] = {
      text: `${isX} ${count}`,
      fontSize: '32px Vag_Rounded-Bold CY',
      color: '#fff',
      x: 146 + x,
      y: this.icons[product].y + y,
      animation: false,
    };
  }

  private getImg(product: string) {
    let imgName = '';
    const img = this.initialIcon.find(img => {
      const imgUrl = img.src;
      const iconName = imgUrl.substring(img.src.lastIndexOf('/') + 1, imgUrl.lastIndexOf('.'));
      imgName = iconName;
      return iconName === product;
    });
    return { name: imgName, img: img };
  }


}

