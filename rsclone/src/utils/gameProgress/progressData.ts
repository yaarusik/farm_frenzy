const imgOneSmall = [
  {
    type: "button",
    name: "egg",
    image: "images/level/initial/egg.png",
    x: 1346,
    y: 1058,
    width: 44,
    height: 48,
    sx: 0,
    sy: 0,
    swidth: 60,
    sheight: 64
  },
];

export const done = [
  {
    type: "picture",
    name: "one",
    image: "images/level/panels/goal_done.png",
    x: 1354,
    y: 1106,
    width: 0,
    height: 0,
    sx: 0,
    sy: 0,
    swidth: 0,
    sheight: 0
  },
  {
    type: "picture",
    name: "two",
    image: "images/level/panels/goal_done.png",
    x: 1416,
    y: 1106,
    width: 0,
    height: 0,
    sx: 0,
    sy: 0,
    swidth: 0,
    sheight: 0
  },
  {
    type: "picture",
    name: "free",
    image: "images/level/panels/goal_done.png",
    x: 1478,
    y: 1106,
    width: 0,
    height: 0,
    sx: 0,
    sy: 0,
    swidth: 0,
    sheight: 0
  },
  {
    type: "picture",
    name: "four",
    image: "images/level/panels/goal_done.png",
    x: 1540,
    y: 1106,
    width: 0,
    height: 0,
    sx: 0,
    sy: 0,
    swidth: 0,
    sheight: 0
  },
];

const textOneSmall = [
  {
    name: "egg",
    text: '0/4',
    fontSize: '22px Vag_Rounded-Bold CY',
    color: '#fff',
    x: 1350,
    y: 1130,
    animation: false,
    id: 0
  },
];

const imgTwoSmall = [
  {
    type: "button",
    name: "egg",
    image: "images/level/initial/egg.png",
    x: 1346,
    y: 1058,
    width: 44,
    height: 48,
    sx: 0,
    sy: 0,
    swidth: 60,
    sheight: 64
  },
  {
    type: "button",
    name: "egg",
    image: "images/level/initial/chicken.png",
    x: 1406,
    y: 1052,
    width: 60,
    height: 64,
    sx: 0,
    sy: 0,
    swidth: 60,
    sheight: 64
  },
];

const textTwoSmall = [
  {
    name: "egg",
    text: '0/6',
    fontSize: '22px Vag_Rounded-Bold CY',
    color: '#fff',
    x: 1350,
    y: 1130,
    animation: false,
    id: 0
  },
  {
    name: "chicken",
    text: '0/3',
    fontSize: '22px Vag_Rounded-Bold CY',
    color: '#fff',
    x: 1420,
    y: 1130,
    animation: false,
    id: 0
  },
];

export const levelSmallInitial = {
  '1': {
    img: imgOneSmall,
    text: textOneSmall,
  },
  '2': {
    img: imgTwoSmall,
    text: textTwoSmall,
  }
};

export const x = 3;