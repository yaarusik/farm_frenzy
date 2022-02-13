interface IKeyNumber {
  [key: string]: number
}

class InitialData {
  protected static _instance: InitialData = new InitialData;

  levelShop: IKeyNumber = {
    'chicken': 100,
    'pig': 1000,
    'well': 19
  };

  totalText = {
    name: 'total',
    text: "0",
    fontSize: '40px Vag_Rounded-Bold CY',
    color: '#f7f21a',
    x: 1076,
    y: 126,
    animation: false,
  };

  level = {
    one: '100',
  };

  // общий объект для dizable кнопок и менять их состояние
  btnDisable = {
    'chicken': false,
    'pig': false,
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
    }
  }

  // public checkDisable() {

  // }


  public changeTotalPlus(sum: number) {
    this.totalText.text = +this.totalText.text + sum + '';
  }



}

export const initialData = InitialData.getInstance();
