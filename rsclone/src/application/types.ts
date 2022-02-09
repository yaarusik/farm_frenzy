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

  // Только для медведей, надо потом разобраться и вынести нормально в класс Bear
  cageBuild: number;
  cageRemain: number;
  isEscape: boolean;

  constructor (type: string, name: string, id: number, coordX: number, coordY: number, width: number, height: number, frameNum: number, food: number, productName: string) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.state = 'down';
    this.image = 'images/pets/' + this.name + '/down.png';
    this.coordX = coordX;
    this.coordY = coordY;
    this.width = width;
    this.height = height;
    this.frameNum = frameNum;
    this.frame = Math.floor(Math.random() * this.frameNum);
    this.wantX = this.coordX;
    this.wantY = this.coordY;
    this.food = food * 60;
    this.lastEat = 0;
    this.speedBoost = 1;
    this.opacity = 1;
    this.isWantGrass = false;
    this.isEating = false;
    this.eatTime = -1;
    this.productAge = 0;
    this.productNeed = 20 * 60;
    this.productName = productName;

    this.cageBuild = 0;
    this.cageRemain = 0;
    this.isEscape = false;
  }
}

export class Chicken extends Animal {
  constructor (id: number, coordX: number, coordY: number) {
    super("pet", "chicken", id, coordX, coordY, 64, 64, 16, 15, 'egg');
  }
}

export class Pig extends Animal {
  constructor (id: number, coordX: number, coordY: number) {
    super("pet", "pig", id, coordX, coordY, 112, 112, 16, 20, 'meat');
  }
}

export class Bear extends Animal{
  constructor (id: number, coordX: number, coordY: number, level: number) {
    let width = 0, height = 0, name = '';
    if (level === 0){
      width = height = 100;
      name = 'bear-panda';
    }
    super('bear', name, id, coordX, coordY, width, height,  16, 0, '');
  }
}

export type AnimalList = Chicken | Pig | Bear; // Потом сюда надо дописывать других животных через |

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
  coordX: number;
  coordY: number;
  age: number;
  blinkAge: number;
  maxAge: number;
  isBlinking: boolean;
  isHover: boolean;

  constructor(name: string, coordX : number, coordY: number){
    this.name = name;
    this.age = 0;
    this.blinkAge = 8 * 60;
    this.maxAge = 11 * 60;
    this.coordX = coordX;
    this.coordY = coordY;
    this.isBlinking = false;
    this.isHover = false;
  }
}