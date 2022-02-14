import { IPicture, IButton, IText, Coords, IKeyBoolean, IKeyNumber, IFunctions, IOpacity, IKeyText } from "../../application/iterfaces";
import Products from "./products";
import Common from "./../../application/common/common";
import { storagePanelImg, storagePanelStaticText, storagePanelBtn, storagePanelText, icons } from './../gameData/storagePanelData';
import CarTrunc from "./carTrunc";

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
  iconImg: Map<string, HTMLImageElement>;
  iconData: {
    [key: string]: IPicture
  };

  stepY: number;
  startY: number;
  iconsText: IKeyText;
  iconsBtnText: IKeyText;
  price: IKeyNumber;
  iconsPrice: IKeyText;
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

  productsCounter: IKeyNumber;
  currentState: IKeyNumber;
  checkProduct: IKeyBoolean;
  productClass: Products;
  isState: IKeyBoolean;
  func: IFunctions;
  buttonCondition: IKeyBoolean;
  carTrunc: CarTrunc;
  click: {
    changeCountBoxProduct: (boxCounter: IKeyNumber, product: string) => void;
    totalSubstraction: (product: string, number: number) => void;
  };
  currentStateCheck: boolean;
  opacityState: IOpacity;


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, productClass: Products, isState: IKeyBoolean, func: IFunctions, productsCounter: IKeyNumber, opacityState: IOpacity) {
    super(canvas, context);
    this.isState = isState;
    this.func = func;
    this.productsCounter = productsCounter;

    this.click = {
      changeCountBoxProduct: (boxCounter: IKeyNumber, product: string) => { this.changeCountBoxProduct(boxCounter, product); },
      totalSubstraction: (product: string, number: number) => { this.totalSubstraction(product, number); }
    };

    this.carTrunc = new CarTrunc(canvas, context, this.click);


    this.productClass = productClass;
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];
    this.initialIcon = [];
    this.iconsText = {};
    this.iconsPrice = {};
    this.iconsBtnText = {};

    this.checkProduct = {};

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

    this.iconImg = new Map();
    this.iconData = {};
    this.coinData = {};
    this.coinImg = {};

    this.btnImg = {};
    this.btnData = {};
    this.btnAllImg = {};
    this.btnAllData = {};

    this.buttonCondition = {
      'ok': false,
    };
    // сохраняем текущее состояние склада
    this.currentState = {};
    this.currentStateCheck = true;


    this.opacityState = opacityState;

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
    if (this.opacityState.show) this.opacityShow(this.opacityState);
    if (this.opacityState.disable) this.opacityDisable(this.opacityState);
    this.drawImage(this.initialImage, this.storageImg);
    this.drawImage(this.initialBtn, this.storageBtn);
    this.drawStaticText(this.storageStaticText);
    this.drawText(this.storageText);

    this.drawImage([...this.iconImg.values()], Object.values(this.iconData));
    this.drawText(Object.values(this.iconsText));
    this.drawText(Object.values(this.iconsPrice));
    this.drawImage(Object.values(this.coinImg), Object.values(this.coinData));
    this.drawImage(Object.values(this.btnImg), Object.values(this.btnData));
    this.drawImage(Object.values(this.btnAllImg), Object.values(this.btnAllData));
    this.drawText(Object.values(this.iconsBtnText));

    this.carTrunc.render();
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

  public renderStorage(products: IKeyNumber) {

    if (this.currentStateCheck) this.saveState(products);
    this.productsCounter = products;

    Object.entries(products).forEach(item => {
      const [product, count] = item;
      for (let i = 1; i <= count; i++) {
        if (i === 1 && this.checkProduct[product] === undefined) {
          const { name, img } = this.getImg(product);
          if (img) {
            // смещаем позицию товара на складе
            this.icons[name].y = this.startY;
            // добавляем данные картинки
            this.iconData[name] = this.icons[name];
            // добавляем саму картинку
            this.iconImg.set(name, img);
            // рисуем количество элементов
            this.addText(this.iconsText, product, i, 'x', 0, this.textY);
            // рисуем цену
            this.addText(this.iconsPrice, product, this.price[product], '', this.priceX, this.textY);
            // рисуем монетку
            this.drawCoin(product);
            // рисуем кнопки
            this.drawBtn(product);
            // рисуем текст для кнопок
            this.addText(this.iconsBtnText, product, 1, '', 250, this.textY);
            // смещаем координату
            this.changeCoordsUp();
            // знаем что продукт уже есть
            this.checkProduct[product] = true;
          }
        } else if (i > 1) {
          this.iconsText[product].text = `x ${i}`;
        }
      }
    });
  }

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
            if (this.buttonCondition.ok) {
              this.buttonsClick(btn, btn.stepY, btn.click);
              this.opacityState.disable = true;
              this.productClass.reRenderStorage(); //перерисовка склада
              setTimeout(() => isState.storagePanelSwitch = false, 300);
              this.changeTotal('', 0); // обнуление счетчика склада
              this.isState.carAnimationOn = true; // запуск анимации машины
              this.buttonDisable();              // дизейблим кнопку
              this.buttonCondition.ok = false;
              this.carTruncClear();
              // для возврата исходного сотояния
              this.currentStateCheck = true;
            }
            break;
          }
          case "Отмена": {
            setTimeout(() => isState.storagePanelSwitch = false, 300);
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.opacityState.disable = true;
            this.buttonCondition.ok = false;
            this.buttonDisable();
            this.changeTotal('', 0);
            // для возврата исходного соcтояния
            this.currentStateCheck = true;
            this.saveProducts();
            this.carTruncClear();
            break;
          }
        }
      }
    });



    Object.entries(this.btnData).forEach(btnObj => {
      const [key, btn] = btnObj;
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "1": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.carTrunc.drawBox(key, 1);
            this.productSubstraction(key);
            this.changeTotal(key, 1);
            this.buttonCondition.ok = true;
            break;
          }
        }
      }
    });


    Object.entries(this.btnAllData).forEach(btnObj => {
      const [key, btn] = btnObj;
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "All": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.changeTotal(key, this.productsCounter[key]);
            this.carTrunc.drawBox(key, this.productsCounter[key]);
            this.productsCounter[key] = 0;
            this.deleteRow();
            this.buttonCondition.ok = true;

            break;
          }
        }
      }
    });

    this.carTrunc.clickHundler(event, widthK, heightK);
  }



  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.storageBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            if (this.buttonCondition.ok) {
              this.buttonsHover(btn, btn.stepY, btn.hover);
              this.changeAnimation(btn, true, this.storageText);
            }
            break;
          }
          case "Отмена": {
            this.buttonsHover(btn, btn.stepY, btn.hover);
            this.changeAnimation(btn, true, this.storageText);
            break;
          }
        }

      } else {
        switch (btn.name) {
          case "Ок": {
            if (this.buttonCondition.ok) {
              this.buttonsHover(btn, btn.stepY, 0);
              this.changeAnimation(btn, false, this.storageText);
            }
            break;
          }
          default: {
            this.buttonsHover(btn, 0, 0);
            this.changeAnimation(btn, false, this.storageText);
          }
        }

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

  private productSubstraction(product: string) {
    const count = this.productsCounter[product] -= 1;

    if (count > 0) {
      this.iconsText[product].text = `x ${count}`;
    } else if (count === 0) {
      this.deleteRow();
    }
  }

  private deleteRow() {
    this.startY = 210;
    this.iconsText = {};
    this.iconsPrice = {};
    this.iconsBtnText = {};
    // данные монетки
    this.coinData = {};
    this.coinImg = {};
    // данные кнопки
    this.btnData = {};
    this.btnImg = {};
    // данные кнопки
    this.btnAllImg = {};
    this.btnAllData = {};
    // данные иконки
    this.iconImg = new Map();
    this.iconData = {};
    this.checkProduct = {};

    this.renderStorage(this.productsCounter);
  }

  private changeTotal(product: string, num: number): void {
    this.storageText.forEach(item => {
      if (item.name === 'total') {
        if (num === 0) {
          this.func.addStorageTotal(item.text);
          item.text = `${num}`;
          // отправляем сумму в машину
        } else {
          const currentSum = +item.text + (this.price[product] * num);
          item.text = `${currentSum}`;
        }
      }
    });
  }

  public totalSubstraction(product: string, num: number) {
    this.storageText.forEach(item => {
      if (item.name === 'total') {
        const currentSum = +item.text - (this.price[product] * num);
        item.text = `${currentSum}`;
        if (currentSum === 0) {
          this.buttonCondition.ok = false;
          this.buttonDisable();
        }
      }
    });
  }

  public buttonDisable() {
    this.storageBtn.forEach(btn => {
      if (btn.name === 'Ок') btn.sy = btn.stepY * 3;
    });
  }

  // ПРИ ОТКРЫТИИ ПАНЕЛИ СОХРАНЯТЬ ТЕКУЩЕЕ СОСТОЯНИЕ
  private saveState(products: IKeyNumber) {
    this.currentState = JSON.parse(JSON.stringify(products));
    this.currentStateCheck = false;
  }

  public saveProducts() {
    for (const key in this.productsCounter) {
      this.productsCounter[key] = this.currentState[key];
    }
  }

  public changeCountBoxProduct(boxCount: { [key: string]: number }, product: string) {
    this.productsCounter[product] += boxCount[product];
    this.currentStateCheck = false;
    this.renderStorage(this.productsCounter);
  }

  private carTruncClear() {
    this.carTrunc.boxCounter = {
      'egg': 0,
      'bear-1': 0,
      'chicken': 0
    };
    this.carTrunc.box = {};
    this.carTrunc.boxData = {};
    this.carTrunc.counter = 0;
    this.carTrunc.startX = 1208;
  }
}
