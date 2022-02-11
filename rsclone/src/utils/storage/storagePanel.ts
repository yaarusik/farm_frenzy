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
  iconsText: { text: string; fontSize: string; color: string; x: number; y: number; };

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];
    this.initialIcon = [];

    this.storageImg = this.objParse(storagePanelImg);
    this.storageStaticText = this.objParse(storagePanelStaticText);
    this.storageBtn = this.objParse(storagePanelBtn);
    this.storageText = this.objParse(storagePanelText);

    this.stepY = 62;
    this.startY = 210;

    this.icons = {
      'egg': {
        type: "picture",
        name: "egg",
        image: "images/level/builds/storage/egg.png",
        x: 95,
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
        x: 95,
        y: 0,
        width: 65,
        height: 65,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
    };

    this.iconsText = {
      text: '',
      fontSize: '32px Vag_Rounded-Bold CY',
      color: '#fff',
      x: 0,
      y: 0,
    },



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
      let imgName = '';
      const img = this.initialIcon.find(img => {
        const imgUrl = img.src;
        const iconName = imgUrl.substring(img.src.lastIndexOf('/') + 1, imgUrl.lastIndexOf('.'));
        imgName = iconName;
        return iconName === product;
      });
      if (img) {
        // смещаем позицию товара на складе
        this.icons[imgName].y = this.startY;
        // добавляем данные картинки
        this.iconData[imgName] = this.icons[imgName];
        // добавляем саму картинку
        this.iconImg.add(img);
        // смещаем координату
        this.changeCoordsUp();

        console.log(this.iconImg, ' 1');
        console.log(this.iconData, ' 2');
      }
    }

  }
  // сделать смещение правильное
  public changeCoordsUp(): void {
    this.startY += this.stepY;
  }
}

