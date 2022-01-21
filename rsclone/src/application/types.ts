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

  constructor (type: string, name: string, id: number, state: string, image: string, coordX: number, coordY: number, width: number, height: number, frameNum: number) {
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
  }

  die() {

  }

  // Нужны методы для потребности в еде и т.д.
}

export class Chicken extends Animal {
  constructor (id: number, coordX: number, coordY: number) {
    super("pet", "chicken", id, "down", "images/pets/chicken/down.png", coordX, coordY, 64, 64, 16);
  }
}

export type AnimalList = Chicken; // Потом сюда надо дописывать других животных

export enum AnimalState {
  //  = 'down',
}