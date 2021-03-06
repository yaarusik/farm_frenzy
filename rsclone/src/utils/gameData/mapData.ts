export const imagesOptions = [
  {
    type: "picture",
    name: "карта",
    image: "images/map/gameMapComplete.jpg",
    x: 0,
    y: 0,
    width: 1600,
    height: 1200,
    sx: 0,
    sy: 0,
    swidth: 0,
    sheight: 0
  },
  {
    type: "picture",
    name: "меню__бар",
    image: "images/map/map__menu.png",
    x: 0,
    y: 1092,
    width: 1600,
    height: 110,
    sx: 0,
    sy: 0,
    swidth: 0,
    sheight: 0
  },
  {
    type: "button",
    name: "Магазин",
    image: "images/map/menuButtons.png",
    stepY: 44,
    x: 16,
    y: 1112,
    width: 148,
    height: 68,
    sx: 0,
    sy: 0,
    swidth: 80,
    sheight: 41,
  },
  {
    type: "button",
    name: "Меню",
    image: "images/map/menuButtons.png",
    stepY: 44,
    x: 1456,
    y: 1112,
    width: 136,
    height: 66,
    sx: 0,
    sy: 0,
    swidth: 80,
    sheight: 41,
  },
];

export interface IlevelFinish {
  [key: string]: string
}

export const levelFinish: IlevelFinish = {
  '1': 'start',
  // '2': 'start',
  // '3': 'start',
  // '4': 'start',
  // '5': 'start'
};

export const levelCoords = {
  '1': {
    x: 560,
    y: 928
  },
  '2': {
    x: 635,
    y: 997
  },
  '3': {
    x: 716,
    y: 1068
  },
  '4': {
    x: 805,
    y: 1014
  },
  '5': {
    x: 890,
    y: 945
  },
  // '6': {
  //   x: 890,
  //   y: 945
  // },
};


export const textOptions = [
  {
    text: "Магазин",
    fontSize: '24px Vag_Rounded-Bold CY',
    color: '#fff',
    x: 42,
    y: 1153,
    animation: false,
  },
  {
    text: "Меню",
    fontSize: '24px Vag_Rounded-Bold CY',
    color: '#fff',
    x: 1492,
    y: 1151,
    animation: false,
  }
];
