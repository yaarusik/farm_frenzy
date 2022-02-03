import { levelImagesPath } from "../../utils/gameData/levelData";
import { Grass, AnimalList } from "../types";
import Common from "./common";


export default class LevelRender{
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  images = new Map<string, HTMLImageElement>();
  imagesPath: string[];
  heightRatio: number;
  gameFrame: number;
	staggeredFrames: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D){
    this.canvas = canvas;
    this.context = context;

    this.commonFunction = new Common(this.canvas, this.context);

    this.imagesPath = levelImagesPath;

    this.heightRatio = 1.3333333;

    this.gameFrame = 0;
		this.staggeredFrames = 3;
  }

  startLevel() {
		this.imagesPath.forEach(async (path) => {
			const petName = path.slice(12, 12 + path.slice(12).indexOf("/"));
			const anim = path.slice(path.lastIndexOf("/") + 1, -4);
			let animName = petName + "-" + anim;
			if (path.slice(7, 11) !== "pets") // Если анимация не для животных
				animName = anim;
			this.images.set(animName, await this.commonFunction.loadImage(path));
		});
	}

  renderLevel(grass: Grass[], animals: AnimalList[], curWidthK: number, curHeightK: number){
    grass.forEach((item, index, grassList) => {
			this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
			this.context.globalAlpha = 1;

			let frame = Math.min(Math.max(Math.floor(this.gameFrame / this.staggeredFrames) % 16, item.age), item.maxAge);
			if (item.age < item.maxAge)
				item.age ++;
			
			let imageFile = this.images.get("grass") as HTMLImageElement;
			let dx = 48 * (frame % 4);
			let dy = 48 * Math.floor(frame / 4);
			let sWidth = 48 * curWidthK * this.heightRatio;
			let sHeight = 48 * curHeightK * this.heightRatio;

			if (imageFile instanceof HTMLImageElement)
				this.context.drawImage(imageFile, dx, dy, 48, 48, item.coordX, item.coordY, sWidth, sHeight);
		});

		
		animals.forEach((item, index, animalList) => {
			this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки
			this.context.globalAlpha = 1;
			
			const animName = item.name + '-' + item.state;
			if (typeof this.images.get(animName) === 'undefined' || typeof this.images.get("hungerBar") === undefined)
				return;
			let frameK = 1.5;
			if (item.state === "death" || item.state.includes("eat")) // Замедляем анимацию в таком случае
				frameK = 4;
			if (item.state.includes("eat"))
				item.eatTime ++;
			let frame = (Math.floor(this.gameFrame / (this.staggeredFrames / item.speedBoost * frameK)) + (item.state === "death" ? 0 : item.frameRand)) % 16;
			if (item.isDead && item.opacity > 0){ 
				frame = 15; // Оставляем последний кадр
				this.context.globalAlpha = item.opacity;
				item.opacity -= 0.025 // Уменьшаем непрозначность животного понемногу;
			}if (item.isDead && item.opacity <= 0){// Если животное уже умерло и анимация смерти закончилась, то удаляем животное
				animalList.splice(index, 1);
				return;
			}
			if (item.state === "death" && frame === 15)
				item.isDead = true;
			let imageFile = this.images.get(animName) as HTMLImageElement;
			let dx = item.width * (frame % 4);
			let dy = item.height * Math.floor(frame / 4);
			let sWidth = item.width * curWidthK * this.heightRatio;
			let sHeight = item.height * curHeightK * this.heightRatio;

      if (imageFile instanceof HTMLImageElement){
        // console.log('im drawing');
        // console.log(imageFile);
        
        this.context.drawImage(imageFile, dx, dy, item.width, item.height, item.coordX, item.coordY, sWidth, sHeight);
      }

			let timeNow = new Date;
			let hungryTime = (timeNow.getTime() - item.lastEat.getTime());
			let hungryPercent = (item.food - hungryTime) / item.food;
			
			if (timeNow.getTime() - item.lastEat.getTime() < item.food){	
				imageFile = this.images.get("hungerBar") as HTMLImageElement;
				dx = dy = 0;
				let dWidth = Math.floor(40 * hungryPercent);
				let dHeight = 8;
				let sx = Math.floor(item.coordX + 18 * this.heightRatio);
				let sy = Math.floor(item.coordY + item.height + 28 * this.heightRatio);
				sWidth = Math.floor(dWidth * 1.9);
				sHeight = 8 * 2;
				if (imageFile instanceof HTMLImageElement) // Костыль из-за того, что картинка не всегда успевает загружаться, почему-то конкретно эта
					this.context.drawImage(imageFile, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
			}

			if (hungryPercent <= 0){ // Если умирает от голода
				item.state = "death";
			} else if (hungryPercent <= 0.38){ // Если ищет еду, то увеличиваем скорость и пытаемся найти еду
				if (!item.isWantGrass && grass.length > 0){ // Если желаемая точка не трава и трава на карте есть, то ищем траву
					let now = 10000000; // Очень много, чтобы любое расстояние было ближе чем
					grass.forEach((grass) => {
						if ((grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now){
							now = (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY);
							item.wantX = grass.coordX;
							item.wantY = grass.coordY;
						}
					});
					item.isWantGrass = true;
				}
				item.speedBoost = 2;
			} else {
				item.speedBoost = 1;
			}

			if (Math.abs(item.coordX - item.wantX) < 3 && Math.abs(item.coordY - item.wantY) < 3) { // Если достаточно близко к желаемой точке
				if (item.isWantGrass){ // Если пришёл поесть
					if (item.eatTime === -1){
						item.eatTime = 0;
						item.isEating = true;
						if (item.state.includes("left"))
							item.state = "eat-left";
						else
							item.state = "eat-right";
					}
					if (item.eatTime == 16 * 4){ // Если закончил есть
						item.state = item.state.slice(4, item.state.length);
						
						item.lastEat = new Date(item.lastEat.getTime() + item.food);
						let now = 100000, grassIndex = 0;
						grass.forEach((grass, index) => {
							if ((grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now){
								now = (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY);
								grassIndex = index;
							}
						});
						grass.splice(grassIndex, 1);
						item.isWantGrass = false;
						item.isEating = false;
						item.eatTime = -1;
					}
				} else { // Иначе, если просто пришёл в желаемую точку прогулки
					item.wantX = 400 + Math.floor(Math.random() * 740); // То генерируем новую
					item.wantY = 430 + Math.floor(Math.random() * 420);
				}
			}

			if (item.state !== "death" && !item.state.includes("eat")){
				let state = '';

				if (item.coordY - item.wantY < -2)
					state = 'down';
				else if (item.coordY - item.wantY > 2)
					state = 'up';

				if (item.coordX - item.wantX < -2)
					state += (state.length > 0 ? '-' : '') + 'right';
				else if (item.coordX - item.wantX > 2)
					state += (state.length > 0 ? '-' : '') + 'left';

				switch (state) {
					case 'down':
						item.coordY += 1.75 * item.speedBoost;
						break;
					case 'down-right':
						item.coordY += 1.25 * item.speedBoost;
						item.coordX += 1.25 * item.speedBoost;
						break;
					case 'down-left':
						item.coordY += 1.25 * item.speedBoost;
						item.coordX -= 1.25 * item.speedBoost;
						break;
					case 'up':
						item.coordY -= 1.75 * item.speedBoost;
						break;
					case 'up-right':
						item.coordY -= 1.25 * item.speedBoost;
						item.coordX += 1.25 * item.speedBoost;
						break;
					case 'up-left':
						item.coordY -= 1.25 * item.speedBoost;
						item.coordX -= 1.25 * item.speedBoost;
						break;
					case 'right':
						item.coordX += 1.75 * item.speedBoost;
						break;
					case 'left':
						item.coordX -= 1.75 * item.speedBoost;
						break;
				}
				if (state !== '')
					item.state = state;
			}
		});

		this.gameFrame += 1;
  }
}