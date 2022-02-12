import { IPicture, IButton, IText, Coords, IKeyBoolean, IKeyNumber } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { storagePanelImg, storagePanelStaticText, storagePanelBtn, storagePanelText, icons } from './../gameData/storagePanelData';

export default class StoragePanel extends Common {
  storageImg: IPicture[];
  initialImage: HTMLImageElement[];
  initialBtn: HTMLImageElement[];
  startImg: HTMLImageElement[];
  storageStaticText: IText[];
  storageBtn: IButton[];
  storageText: IText[];
  icons: {
    [key: string]: IPicture | IButton
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
  iconsBtnText: {
    [key: string]: IText
  };
  price: IKeyNumber;
  iconsPrice: {
    [key: string]: IText
  };
  textY: number;
  priceX: number;

  coinImg: {
    [key: string]: HTMLImageElement
  };
  coinData: {
    [key: string]: IPicture
  };
  coinX: number;
  btnData: {
    [key: string]: IButton
  };

  btnImg: {
    [key: string]: HTMLImageElement
  };

  btnAllData: {
    [key: string]: IButton
  };

  btnAllImg: {
    [key: string]: HTMLImageElement
  };

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];
    this.initialIcon = [];
    this.iconsText = {};
    this.iconsPrice = {};
    this.iconsBtnText = {};


    this.storageImg = this.objParse(storagePanelImg);
    this.storageStaticText = this.objParse(storagePanelStaticText);
    this.storageBtn = this.objParse(storagePanelBtn);
    this.storageText = this.objParse(storagePanelText);

    this.stepY = 62;
    this.startY = 210;
    this.textY = 46; //смещение текста
    this.priceX = 120; // смещение цены
    this.coinX = 17; //смещение денюжки

    this.icons = JSON.parse(JSON.stringify(icons));

    this.price = {
      'egg': 10,
      'bear-1': 50,
      'chicken': 25,
    };

    this.iconImg = new Set();
    this.iconData = {};
    this.coinData = {};
    this.coinImg = {};

    this.btnImg = {};
    this.btnData = {};
    this.btnAllImg = {};
    this.btnAllData = {};
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
    this.drawImage(Object.values(this.coinImg), Object.values(this.coinData));
    this.drawImage(Object.values(this.btnImg), Object.values(this.btnData));
    this.drawImage(Object.values(this.btnAllImg), Object.values(this.btnAllData));
    this.drawText(Object.values(this.iconsBtnText));
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
        // рисуем количество элементов
        this.addText(this.iconsText, product, count, 'x', 0, this.textY);
        // рисуем цену
        this.addText(this.iconsPrice, product, this.price[product], '', this.priceX, this.textY);
        // рисуем монетку
        this.drawCoin(product);
        // рисуем кнопки
        this.drawBtn(product);
        // рисуем текст для кнопок
        this.addText(this.iconsBtnText, product, 1, '', 320, this.textY);
        // смещаем координату
        this.changeCoordsUp();
      }
    } else if (count > 1) {
      this.iconsText[product].text = `x ${count}`;
    }
  }

  // сделать смещение правильное
  private changeCoordsUp(): void {
    this.startY += this.stepY;
  }

  private addText(container: { [key: string]: IText }, product: string, count: number | string, isX: string, x: number, y: number) {
    container[product] = {
      text: `${isX} ${count}`,
      fontSize: '32px Vag_Rounded-Bold CY',
      color: '#fff',
      x: 132 + x,
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

  private drawCoin(product: string) {
    const { name, img } = this.getImg('coin');
    this.coinData[product] =
    {
      type: "picture",
      name: "coin",
      image: "images/level/builds/storage/coin.png",
      x: 300,
      y: this.icons[product].y + this.coinX,
      width: 40,
      height: 40,
      sx: 0,
      sy: 0,
      swidth: 0,
      sheight: 0
    };
    console.log(img);
    if (img) this.coinImg[product] = img;
    else {
      throw new Error('coin img not found');
    }
  }

  private drawBtn(product: string) {
    const { name, img } = this.getImg('btn');
    this.btnData[product] = {
      type: "button",
      name: "1",
      image: "images/level/builds/storage/btn.png",
      stepY: 28,
      stepX: 0,
      hover: 1,
      click: 2,
      x: 360,
      y: this.icons[product].y + 12,
      width: 70,
      height: 50,
      sx: 0,
      sy: 0,
      swidth: 40,
      sheight: 28
    };
    this.btnAllData[product] = {
      type: "button",
      name: "All",
      image: "images/level/builds/storage/btn.png",
      stepY: 28,
      stepX: 0,
      hover: 1,
      click: 2,
      x: 360 + 75,
      y: this.icons[product].y + 12,
      width: 70,
      height: 50,
      sx: 0,
      sy: 0,
      swidth: 40,
      sheight: 28
    };
    if (img) {
      this.btnImg[product] = img;
      this.btnAllImg[product] = img;
    }
    else {
      throw new Error('coin img not found');
    }
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

    Object.entries(this.btnData).forEach(btnObj => {
      const [key, btn] = btnObj;
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "1": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            console.log(key);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });


    Object.entries(this.btnAllData).forEach(btnObj => {
      const [key, btn] = btnObj;
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "All": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            console.log(key);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
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

    Object.entries(this.btnData).forEach(btnObj => {
      const [key, btn] = btnObj;
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "1": {
            this.buttonsHover(btn, btn.stepY, btn.hover);
            this.changeAnimation(btn, true, [this.iconsBtnText[key]]);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }




}

