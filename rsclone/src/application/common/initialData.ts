class InitialData {
  protected static _instance: InitialData = new InitialData;

  levelShop = [
    {
      product: 'chicken',
      price: 100
    },
    {
      product: 'pig',
      price: 1000
    },
    {
      product: 'cow',
      price: 10000
    },
    {
      product: 'ostrich',
      price: 70000
    },
    {
      product: 'dog',
      price: 2600
    },
    {
      product: 'cat',
      price: 2500
    },
    {
      product: 'well',
      price: 19
    },
  ];

  totalLevelSum = {
    level1: 100
  };


  constructor () {
    if (InitialData._instance) {
      throw new Error('Instantiation failed: ' +
        'use InitialData.getInstance() instead of new.');
    }
  }


  public static getInstance(): InitialData {
    return InitialData._instance;
  }
}

export const initialData = InitialData.getInstance();
