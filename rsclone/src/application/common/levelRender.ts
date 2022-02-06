import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { levelImagesPath } from "../../utils/gameData/levelData";
import { Coords } from "../iterfaces";
import { Grass, AnimalList, Chicken, Product } from "../types";
import Common from "./common";


export default class LevelRender {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	commonFunction: Common;
	images = new Map<string, HTMLImageElement>();
	imagesPath: string[];
	animals: AnimalList[];
	products: Product[];
	grass: Grass[];
	id: number;
	heightRatio: number;
	gameFrame: number;
	staggeredFrames: number;

	constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.context = context;

		this.commonFunction = new Common(this.canvas, this.context);

		this.imagesPath = levelImagesPath;

		this.animals = [];
		this.products = [];
		this.grass = [];
		this.id = 0;

		this.heightRatio = 1.3333333;

		this.gameFrame = 0;
		this.staggeredFrames = 3;

		this.createProduct('egg', 'field', 300, 300);
	}

	public moveHundler(event: MouseEvent, widthK: number, heightK: number){
		this.products.forEach((item) => {
			if (item.place === 'house')
				return;
			let productCoords : Coords = {
				currentX: item.coordX / widthK,
				currentY: item.coordY / heightK,
				currentW: 48 * 2  / widthK,
				currentH: 48 * 2 / heightK
			};
			if (this.commonFunction.determineCoords(event, productCoords)){
				item.isHover = true;
			} else
				item.isHover = false;
		});
	}

	public clickHundler(event: MouseEvent, widthK: number, heightK: number){
		this.products.forEach((item) => {
			if (item.place === 'house')
				return;
			let productCoords : Coords = {
				currentX: item.coordX / widthK,
				currentY: item.coordY / heightK,
				currentW: 48 * 2  / widthK,
				currentH: 48 * 2 / heightK
			};
			if (this.commonFunction.determineCoords(event, productCoords)){
				item.place = "house";
			} else
				item.place = "field";
		});
	}

  public startLevel() {
		this.imagesPath.forEach(async (path) => {
			let animName = '';
			const anim = path.slice(path.lastIndexOf("/") + 1, -4);
			if (path.includes('pets')){
				const petName = path.slice(12, 12 + path.slice(12).indexOf("/"));
				animName = petName + "-" + anim;
			} else if (path.includes('products')){
				const productName = path.slice(16, 16 + path.slice(16).indexOf("/"));
				animName = productName + "-" + anim;
			} else {
				animName = anim;
			}
			this.images.set(animName, await this.commonFunction.loadImage(path));
		});
	}

  public renderLevel(curWidthK: number, curHeightK: number){
		this.renderProducts(curWidthK, curHeightK);
		this.renderGrass(curWidthK, curHeightK);
		this.renderAnimals(curWidthK, curHeightK);

		this.gameFrame += 1;
	}

	protected renderProducts(curWidthK: number, curHeightK: number){
		this.products.forEach((item, index, productList) => {
			if (item.place === 'house') // Продукты на скалде надо отрисовывать в другом месте
				return;
			this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
			this.context.globalAlpha = 1;
			let animName = item.name;
			if (item.isHover)
				animName += '-hover';
			else
				animName += '-normal';
			const imageFile = this.images.get(animName) as HTMLImageElement;
			const sWidth = 48 * 2;
			const sHeight = 48 * 2;
			if (item.isBlinking && (this.gameFrame % 40) < 20)
				this.context.globalAlpha = 0.4;
			if (imageFile instanceof HTMLImageElement)
				this.context.drawImage(imageFile, 0, 0, 48, 48, item.coordX, item.coordY, sWidth, sHeight);

			item.age ++;
			if (item.age >= item.maxAge && (this.gameFrame % 40) < 20)
				productList.splice(index, 1);
			else if (item.age >= item.blinkAge)
				item.isBlinking = true;
		});
	}

	protected renderGrass(curWidthK: number, curHeightK: number){
		this.grass.forEach((item, index, grassList) => {
			this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
			this.context.globalAlpha = 1;

			const frame = Math.min(Math.max(Math.floor(this.gameFrame / Math.floor(this.staggeredFrames * 1.5)) % 16, item.age), item.maxAge);
			if (item.age < item.maxAge)
				item.age++;

			const imageFile = this.images.get("grass") as HTMLImageElement;
			const dx = 48 * (frame % 4);
			const dy = 48 * Math.floor(frame / 4);
			const sWidth = 48 * curWidthK * this.heightRatio;
			const sHeight = 48 * curHeightK * this.heightRatio;

			if (imageFile instanceof HTMLImageElement)
				this.context.drawImage(imageFile, dx, dy, 48, 48, item.coordX, item.coordY, sWidth, sHeight);
		});
	}

	protected renderAnimals(curWidthK: number, curHeightK: number){
		this.animals.forEach((item, index, animalList) => {
			this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки
			this.context.globalAlpha = 1;

			const animName = item.name + '-' + item.state;
			if (typeof this.images.get(animName) === 'undefined' || typeof this.images.get("hungerBar") === undefined)
				return;
			let frameK = 1.5;
			if (item.state === "death" || item.state.includes("eat")) // Замедляем анимацию в таком случае
				frameK = 4;
			if (item.state.includes("eat"))
				item.eatTime++;
			let frame = (Math.floor(this.gameFrame / (this.staggeredFrames / item.speedBoost * frameK)) + (item.state === "death" ? 0 : item.frameRand)) % 16;
			if (item.isDead && item.opacity > 0) {
				frame = 15; // Оставляем последний кадр
				this.context.globalAlpha = item.opacity;
				item.opacity -= 0.025; // Уменьшаем непрозначность животного понемногу;
			} if (item.isDead && item.opacity <= 0) {// Если животное уже умерло и анимация смерти закончилась, то удаляем животное
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

			if (imageFile instanceof HTMLImageElement)
				this.context.drawImage(imageFile, dx, dy, item.width, item.height, item.coordX, item.coordY, sWidth, sHeight);

			item.productAge ++;
			if (item.productAge >= item.productNeed && (((Math.floor(Math.random() * 100)) + 1) === 100)){
				this.createProduct('egg', 'field', item.coordX, item.coordY);
				item.productAge = 0;
			}

			const timeNow = new Date;
			const hungryTime = (timeNow.getTime() - item.lastEat.getTime());
			const hungryPercent = (item.food - hungryTime) / item.food;

			if (timeNow.getTime() - item.lastEat.getTime() < item.food) {
				imageFile = this.images.get("hungerBar") as HTMLImageElement;
				dx = dy = 0;
				const dWidth = Math.floor(40 * hungryPercent);
				const dHeight = 8;
				const sx = Math.floor(item.coordX + 18 * this.heightRatio);
				const sy = Math.floor(item.coordY + item.height + 28 * this.heightRatio);
				sWidth = Math.floor(dWidth * 1.9);
				sHeight = 8 * 2;
				if (imageFile instanceof HTMLImageElement) // Костыль из-за того, что картинка не всегда успевает загружаться, почему-то конкретно эта
					this.context.drawImage(imageFile, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
			}

			if (hungryPercent <= 0) { // Если умирает от голода
				item.state = "death";
			} else if (hungryPercent <= 0.38) { // Если ищет еду, то увеличиваем скорость и пытаемся найти еду
				if (!item.isWantGrass && this.grass.length > 0) { // Если желаемая точка не трава и трава на карте есть, то ищем траву
					let now = 10000000; // Очень много, чтобы любое расстояние было ближе чем
					this.grass.forEach((grass) => {
						if ((grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now) {
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
				if (item.isWantGrass) { // Если пришёл поесть
					if (item.eatTime === -1) {
						item.eatTime = 0;
						item.isEating = true;
						if (item.state.includes("left"))
							item.state = "eat-left";
						else
							item.state = "eat-right";
					}
					if (item.eatTime == 16 * 4) { // Если закончил есть
						item.state = item.state.slice(4, item.state.length);

						item.lastEat = new Date(item.lastEat.getTime() + Math.floor(item.food * 0.4));
						let now = 100000, grassIndex = 0;
						this.grass.forEach((grass, index) => {
							if ((grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now) {
								now = (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY);
								grassIndex = index;
							}
						});
						this.grass.splice(grassIndex, 1);
						item.isWantGrass = false;
						item.isEating = false;
						item.eatTime = -1;
					}
				} else { // Иначе, если просто пришёл в желаемую точку прогулки
					item.wantX = 400 + Math.floor(Math.random() * 740); // То генерируем новую
					item.wantY = 430 + Math.floor(Math.random() * 420);
				}
			}

			if (item.state !== "death" && !item.state.includes("eat")) {
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
	}

  public createAnimal(name: string) {
		if (!(typeof this.id !== "number"))
			this.id = 0;
		if (name === "chicken")
			this.animals.push(new Chicken(this.id, 400 + Math.floor(Math.random() * 740), 430 + Math.floor(Math.random() * 420)));
		this.id++;
	}

  public createGrass(clickX : number, clickY : number){
		clickX -= 24; clickY -= 24;

		const k = 42; //отступ между травами
		if (clickX - k * 2 >= 400)
			this.grass.push(new Grass(clickX - k * 2, clickY, Math.floor(Math.random() * 5) + 3));
		if (clickX - k >= 400 && clickY + k <= 850)
			this.grass.push(new Grass(clickX - k, clickY + k, Math.floor(Math.random() * 5) + 3));
		if (clickY + k * 2 <= 850)
			this.grass.push(new Grass(clickX, clickY + k * 2, Math.floor(Math.random() * 5) + 3));
		if (clickX + k <= 1140 && clickY + k <= 850)
			this.grass.push(new Grass(clickX + k, clickY + k, Math.floor(Math.random() * 5) + 3));
		if (clickX + k <= 1140)
			this.grass.push(new Grass(clickX + k * 2, clickY, Math.floor(Math.random() * 5) + 3));
		if (clickX - k >= 400 && clickY - k >= 430)
			this.grass.push(new Grass(clickX - k, clickY - k, Math.floor(Math.random() * 5) + 3));
		if (clickY - k * 2 >= 430)
			this.grass.push(new Grass(clickX, clickY - k * 2, Math.floor(Math.random() * 5) + 3));
		if (clickX + k <= 1140 && clickY - k >= 430)
			this.grass.push(new Grass(clickX + k, clickY - k, Math.floor(Math.random() * 5) + 3));

		if (clickX - k >= 400)
			this.grass.push(new Grass(clickX - k, clickY, Math.floor(Math.random() * 5) + 7));
		if (clickY + k <= 850)
			this.grass.push(new Grass(clickX, clickY + k, Math.floor(Math.random() * 5) + 7));
		if (clickX + k <= 1140)
			this.grass.push(new Grass(clickX + k, clickY, Math.floor(Math.random() * 5) + 7));
		if (clickY + k <= 850)
			this.grass.push(new Grass(clickX, clickY - k, Math.floor(Math.random() * 5) + 7));

		this.grass.push(new Grass(clickX, clickY, Math.floor(Math.random() * 4) + 12));
	}

	public createProduct(name: string, place: string, coordX : number, coordY: number){
		this.products.push(new Product(name, place, coordX, coordY));
	}
}