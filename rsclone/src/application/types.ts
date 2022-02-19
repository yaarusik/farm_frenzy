export class Animal {
  type: string;
  name: string;
  id: number;
  state: string;
  image: string;
  coordX: number;
  coordY: number;
  width: number;
  height: number;
  shadowWidth: number;
  shadowHeight: number;
  frameNum: number;
  frame: number;
  wantX: number;
  wantY: number;
  lastEat: number;
  food: number;
  speedBoost: number;
  opacity: number;
  isWantGrass: boolean;
  isEating: boolean;
  eatTime: number;
  productAge: number;
  productNeed: number;
  productName: string;
  fallY: number;
  rotate: number;

  // Только для медведей, надо потом разобраться и вынести нормально в класс Bear
  cageBuild: number;
  cageRemain: number;
  isEscape: boolean;
  speedX: number;
  speedY: number;

  constructor (type: string, name: string, id: number, state: string, coordX: number, coordY: number, width: number, height: number, frameNum: number, food: number, productName: string, shadowWidth: number, shadowHeight: number) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.state = state;
    this.image = 'images/pets/' + this.name + '/down.png';
    this.coordX = coordX;
    this.coordY = coordY;
    this.width = width;
    this.height = height;
    this.shadowWidth = shadowWidth;
    this.shadowHeight = shadowHeight;
    this.frameNum = frameNum;
    this.frame = Math.floor(Math.random() * this.frameNum);
    this.wantX = this.coordX;
    this.wantY = this.coordY;
    this.food = food * 60;
    this.lastEat = 0;
    this.speedBoost = 1;
    this.opacity = 1;
    this.opacity = 0.5;
    this.isWantGrass = false;
    this.isEating = false;
    this.eatTime = -1;
    this.productAge = 0;
    this.productNeed = 20 * 60;
    this.productName = productName;
    this.fallY = this.coordY;
    if (this.state === 'shadow')
      this.coordY = -500;
    this.rotate = 0;

    this.cageBuild = 0;
    this.cageRemain = 0;
    this.isEscape = false;
    this.speedX = this.speedY = 0;
  }
}

export class Chicken extends Animal {
  constructor (id: number, coordX: number, coordY: number) {
    super("pet", "chicken", id, "shadow", coordX, coordY, 64, 64, 16, 15, 'egg', 44, 24);
  }
}

export class Pig extends Animal {
  constructor (id: number, coordX: number, coordY: number) {
    super("pet", "pig", id, "shadow", coordX, coordY, 112, 112, 16, 20, 'meat', 60, 20);
  }
}

export class Bear extends Animal{
  constructor (id: number, coordX: number, coordY: number, level: number) {
    let width = 0, height = 0, name = '';
    if (level === 0){
      width = height = 100;
      name = 'bear-panda';
    }
    super('bear', name, id, "shadow", coordX, coordY, width, height,  16, 0, '', 60, 28);
  }
}

export type AnimalList = Chicken | Pig | Bear;

export class Grass{
  coordX : number;
  coordY : number;
  age : number;
  maxAge : number;
  isUsed : boolean;

  constructor(x : number, y : number, maxAge : number){
    this.age = 0;
    this.coordX = x;
    this.coordY = y;
    this.maxAge = maxAge;
    this.isUsed = false;
  }
}

export class Product{
  name: string;
  state: string;
  coordX: number;
  coordY: number;
  age: number;
  blinkAge: number;
  maxAge: number;
  isBlinking: boolean;
  isHover: boolean;

  wantX: number;
  wantY: number;
  speedX: number;
  speedY: number;

  constructor(name: string, coordX : number, coordY: number){
    this.name = name;
    this.state = "earth";
    this.age = 0;
    this.blinkAge = 8 * 60;
    this.maxAge = 11 * 60;
    this.coordX = coordX;
    this.coordY = coordY;
    this.isBlinking = false;
    this.isHover = false;

    this.wantX = 660;
    this.wantY = 925;

    this.speedX = (this.wantX - this.coordX) / (0.2 * 60);
    this.speedY = (this.wantY - this.coordY) / (0.2 * 60);
  }
}

export type ResponseSign = {
  message: string
}