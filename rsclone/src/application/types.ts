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
  frameRand: number;
  wantX: number;
  wantY: number;
  lastEat: Date; // Время последнего насыщения
  food: number; // кол-во миллисекунд от полного насыщение до смерти от голода
  speedBoost: number;
  isDead: boolean;
  opacity: number;
  isWantGrass: boolean;
  isEating: boolean;
  eatTime: number;
  productAge: number;
  productNeed: number;
  productName: string;

  constructor (type: string, name: string, id: number, state: string, image: string, coordX: number, coordY: number, width: number, height: number, frameNum: number, food: number, lastEat: Date, productName: string) {
    this.type = type;
    this.name = name;
    this.id = id;
    this.state = state;
    this.image = image;
    this.coordX = coordX;
    this.coordY = coordY;
    this.width = width;
    this.height = height;
    this.frameNum = frameNum;
    this.frameRand = Math.floor(Math.random() * this.frameNum);
    this.wantX = this.coordX;
    this.wantY = this.coordY;
    this.food = food;
    this.lastEat = lastEat;
    this.speedBoost = 1;
    this.isDead = false;
    this.opacity = 1;
    this.isWantGrass = false;
    this.isEating = false;
    this.eatTime = -1;
    this.productAge = 0;
    this.productNeed = 4 * 60;
    this.productName = productName;
  }
}

export class Chicken extends Animal {
  constructor (id: number, coordX: number, coordY: number) {
    super("pet", "chicken", id, "down", "images/pets/chicken/down.png", coordX, coordY, 64, 64, 16, 15000, new Date, 'egg');
  }
}

export type AnimalList = Chicken; // Потом сюда надо дописывать других животных через |

export class Grass{
  coordX : number;
  coordY : number;
  age : number;
  maxAge : number;

  constructor(x : number, y : number, maxAge : number){
    this.age = 0;
    this.coordX = x;
    this.coordY = y;
    this.maxAge = maxAge;
  }
}

export class Product{
  name: string;
  place: string;
  coordX: number;
  coordY: number;
  age: number;
  blinkAge: number;
  maxAge: number;
  isBlinking: boolean;
  isHover: boolean;

  constructor(name: string, place: string, coordX : number, coordY: number){
    this.name = name;
    this.place = place;
    this.age = 0;
    this.blinkAge = 8 * 60;
    this.maxAge = 11 * 60;
    this.coordX = coordX;
    this.coordY = coordY;
    this.isBlinking = false;
    this.isHover = false;
  }
}