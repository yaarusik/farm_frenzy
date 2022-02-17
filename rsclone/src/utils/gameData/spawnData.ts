export const buildSpawnBtn = [

  {
    type: "button",
    name: "storage",
    image: "images/level/builds/storage/storage-1.png",
    x: 640,
    y: -300,
    stepY: 132,
    stepX: 0,
    hover: 1,
    click: 2,
    width: 300,
    height: 240,
    sx: 0,
    sy: 0,
    swidth: 164,
    sheight: 132
  },
  {
    type: "animation",
    name: "car",
    image: "images/level/car/car-1.png",
    x: 400,
    y: -210,
    width: 200,
    height: 192,
    stepY: 106,
    stepX: 0,
    hover: 1,
    click: 2,
    sx: 0,
    sy: 0,
    swidth: 110,
    sheight: 106
  },
  {
    type: "button",
    name: "well",
    image: "images/level/builds/well/well-1.png",
    frameY: 16,
    stepY: 100,
    stepX: 0,
    hover: 1,
    click: 2,
    x: 720,
    y: -200,
    width: 230,
    height: 180,
    sx: 0,
    sy: 0,
    swidth: 128,
    sheight: 100
  },
  {
    type: "animation",
    name: "waterIndicator",
    image: "images/level/indicators/indicator_water.png",
    x: 930,
    y: -200,
    width: 22,
    stepY: 52,
    stepX: 0,
    hover: 1,
    click: 2,
    height: 100,
    frameY: 27,
    sx: 0,
    sy: 0,
    swidth: 12,
    sheight: 52
  },

];


export const driedEggsBtn = [
  {
    type: "button",
    name: "flourBuild",
    image: "images/level/builds/driedEgg/flour-1.png",
    x: 206,
    y: -300,
    stepY: 156,
    stepX: 176,
    hover: 1,
    click: 2,
    width: 280,
    height: 248,
    sx: 0,
    sy: 0,
    swidth: 176,
    sheight: 156
  },
  {
    type: "animation",
    name: "houseIndicator",
    image: "images/level/builds/driedEgg/houseIndicator.png",
    x: 470,
    y: -100,
    width: 22,
    height: 100,
    stepY: 52,
    stepX: 0,
    hover: 1,
    click: 2,
    frameY: 27,
    sx: 0,
    sy: 0,
    swidth: 12,
    sheight: 53
  },

];

export const driedAnim = [
  {
    name: 'flourBuild',
    maxX: 0,
    maxY: 235,
    speed: 24
  },
  {
    name: 'houseIndicator',
    maxX: 0,
    maxY: 330,
    speed: 24
  },
];
