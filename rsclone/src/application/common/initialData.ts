import { IKeyBoolean, IKeyNumber } from "../iterfaces";


class InitialData {
  protected static _instance: InitialData = new InitialData;

  levelShop: IKeyNumber = {
    'chicken': 100,
    'pig': 1000,
    'well': 19
  };
  // счетчик монет
  totalText = {
    name: 'total',
    text: "0",
    fontSize: '40px Vag_Rounded-Bold CY',
    color: '#f7f21a',
    x: 1076,
    y: 126,
    animation: false,
  };

  // общий объект для dizable кнопок
  btnDisable: IKeyBoolean = {
    'chicken': false,
    'pig': false,
    'well': false,
  };

  wellDisable = false;

  constructor () {
    if (InitialData._instance) {
      throw new Error('Instantiation failed: ' +
        'use InitialData.getInstance() instead of new.');
    }
  }

  public static getInstance(): InitialData {
    return InitialData._instance;
  }

  public checkTotal(price: number) {
    return +this.totalText.text >= price;
  }

  public changeTotalMinus(btnName: string) {
    const isTotal = this.checkTotal(this.levelShop[btnName]);
    if (isTotal) {
      this.totalText.text = +this.totalText.text - this.levelShop[btnName] + '';
      this.changeCoords();
      this.checkDisable();
    }
  }

  public changeTotalPlus(sum: number) {
    this.totalText.text = +this.totalText.text + sum + '';
    this.changeCoords();
    this.checkDisable();
  }

  public checkDisable() {
    for (const key in this.btnDisable) {
      // если деньги еще есть
      if (this.checkTotal(this.levelShop[key])) {
        this.btnDisable[key] = true;
      } else this.btnDisable[key] = false;
    }
  }

  public changeCoords() {
    if (this.totalText.text.length === 1) this.totalText.x = 1093;
    if (this.totalText.text.length === 2) this.totalText.x = 1082;
    if (this.totalText.text.length === 3) this.totalText.x = 1070;
  }
}

export const initialData = InitialData.getInstance();
