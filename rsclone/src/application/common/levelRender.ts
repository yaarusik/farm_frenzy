
import { levelImagesPath } from "../../utils/gameData/levelData";
import { Coords } from "../iterfaces";
import { Grass, AnimalList, Chicken, Product, Pig } from "../types";
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
	}

	public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
		this.products.forEach((item) => {
			const productCoords: Coords = {
				currentX: item.coordX / widthK,
				currentY: item.coordY / heightK,
				currentW: 48 * 2 / widthK,
				currentH: 48 * 2 / heightK
			};
			if (this.commonFunction.determineCoords(event, productCoords)) {
				item.isHover = true;
			} else
				item.isHover = false;
		});
	}

	public clickHundler(event: MouseEvent, widthK: number, heightK: number): string[] {
		const clickList: string[] = [];
		this.products.forEach((item, index, productList) => {
			const productCoords: Coords = {
				currentX: item.coordX / widthK,
				currentY: item.coordY / heightK,
				currentW: 48 * 2 / widthK,
				currentH: 48 * 2 / heightK
			};
			if (this.commonFunction.determineCoords(event, productCoords)) {
				clickList.push(item.name);
				productList.splice(index, 1);
			}
		});
		return clickList;
	}

	public startLevel() {
		this.imagesPath.forEach(async (path) => {
			let animName = '';
			const anim = path.slice(path.lastIndexOf("/") + 1, -4);
			if (path.includes('pets')) {
				const petName = path.slice(12, 12 + path.slice(12).indexOf("/"));
				animName = petName + "-" + anim;
			} else if (path.includes('products')) {
				const productName = path.slice(16, 16 + path.slice(16).indexOf("/"));
				animName = productName + "-" + anim;
			} else {
				animName = anim;
			}
			this.images.set(animName, await this.commonFunction.loadImage(path));
		});
	}

  public renderLevel(curWidthK: number, curHeightK: number, isPaused: boolean){
		const renderList : (AnimalList | Product | Grass)[] = [];
		this.products.forEach((item) => renderList.push(item));
		this.grass.forEach((item) => renderList.push(item));
		this.animals.forEach((item) => renderList.push(item));
		renderList.sort(this.sortCoord);

		renderList.forEach((item) => {
			if (item instanceof Product)
				this.renderProduct(item, curWidthK, curHeightK, isPaused);
			else if (item instanceof Grass)
				this.renderGrass(item, curWidthK, curHeightK, isPaused);
			else 
				this.renderAnimal(item, curWidthK, curHeightK, isPaused);
		});

		// this.renderProducts(curWidthK, curHeightK);
		// this.renderGrass(curWidthK, curHeightK);
		// this.renderAnimals(curWidthK, curHeightK);
		if (!isPaused)
			this.gameFrame += 1;
	}

	protected renderProduct(item: Product, curWidthK: number, curHeightK: number, isPaused: boolean){
		if (item.name != 'egg')
			console.log(item)
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
			this.context.globalAlpha = 0.5;
		if (imageFile instanceof HTMLImageElement)
			this.context.drawImage(imageFile, 0, 0, 48, 48, item.coordX, item.coordY, sWidth, sHeight);

		if (!isPaused){
			item.age ++;
			if (item.age >= item.maxAge && (this.gameFrame % 40) < 20)
				this.products.splice(this.products.indexOf(item), 1);
			else if (item.age >= item.blinkAge)
				item.isBlinking = true;
		}
	}

	protected renderGrass(item : Grass, curWidthK: number, curHeightK: number, isPaused: boolean){
		this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
		this.context.globalAlpha = 1;

		const frame = item.age;
		
		const imageFile = this.images.get("grass") as HTMLImageElement;
		const dx = 48 * (frame % 4);
		const dy = 48 * Math.floor(frame / 4);
		const sWidth = 48 * 2;
		const sHeight = 48 * 2;
		
		if (imageFile instanceof HTMLImageElement)
			this.context.drawImage(imageFile, dx, dy, 48, 48, item.coordX, item.coordY, sWidth, sHeight);

		if (item.age < item.maxAge && !isPaused)
			item.age++;
	}


	protected renderAnimal(item : AnimalList, curWidthK: number, curHeightK: number, isPaused: boolean){
		this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки
		this.context.globalAlpha = 1;

		const animName = item.name + '-' + item.state;

		if (item.state === 'death' && item.frame === 15 && item.opacity <= 0){
			this.animals.splice(this.animals.indexOf(item), 1);
			return;
		} else if (item.state === 'death' && item.frame === 15){
			this.context.globalAlpha = item.opacity;
			item.opacity -= 0.025;
		}
		
		let imageFile = this.images.get(animName) as HTMLImageElement;
		let dx = item.width * (item.frame % 4);
		let dy = item.height * Math.floor(item.frame / 4);
		let sWidth = item.width * 2;
		let sHeight = item.height * 2;

		if (imageFile instanceof HTMLImageElement)
			this.context.drawImage(imageFile, dx, dy, item.width, item.height, item.coordX, item.coordY, sWidth, sHeight);

		if (!isPaused) {
			item.productAge ++;
			if (!item.state.includes('eat'))
				item.lastEat ++;
			if (item.state !== "death" || item.frame !== 15){
				let frameK = item.speedBoost;
				if (item.state === 'death' || item.state.includes('eat'))
					frameK = 0.5;

				if (this.gameFrame % Math.ceil(this.staggeredFrames / frameK) === 0)
					item.frame = (item.frame + 1) % item.frameNum;
				else if (this.gameFrame % Math.ceil(this.staggeredFrames / frameK) === 0)
					item.frame = (item.frame + 1) % item.frameNum;
			}
		}

		item.speedBoost = 1;

		if (item.state === 'death')
			return;

		if (item.productAge >= item.productNeed && (((Math.floor(Math.random() * 100)) + 1) === 100)){
			this.createProduct(item.productName, item.coordX, item.coordY);
			item.productAge = 0;
		}

		let hungryPercent = (item.food - item.lastEat) / item.food;

		if (item.lastEat < item.food) {
			imageFile = this.images.get("hungerBar") as HTMLImageElement;
			dx = dy = 0;
			const dWidth = Math.floor(40 * hungryPercent);
			const dHeight = 8;
			const sx = item.coordX + item.width - 40;
			const sy = item.coordY + item.height * 1.5 + 8;
			sWidth = dWidth * 2;
			sHeight = dHeight * 2;
			if (imageFile instanceof HTMLImageElement)
				this.context.drawImage(imageFile, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight);
		}

		if (isPaused)
			return;

		if (hungryPercent <= 0) { // Если умирает от голода
			item.state = "death";
			item.frame = 0;
		} else if (hungryPercent <= 0.38) { // Если ищет еду, то увеличиваем скорость и пытаемся найти еду
			if (!item.isWantGrass && this.grass.length > 0) { // Если желаемая точка не трава и трава на карте есть, то ищем траву
				let now = 100000, grassIndex = -1;
				this.grass.forEach((grass, index) => {
					if (!grass.isUsed && (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now) {
						now = (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY);
						item.wantX = grass.coordX;
						item.wantY = grass.coordY;
						grassIndex = index;
					}
				});
				if (grassIndex !== -1){
					this.grass[grassIndex].isUsed = true;
					item.isWantGrass = true;
				}
			}
			item.speedBoost = 2;
		}

		if (Math.abs(item.coordX - item.wantX) < 3 && Math.abs(item.coordY - item.wantY) < 3) { // Если достаточно близко к желаемой точке
			if (item.isWantGrass) { // Если пришёл поесть
				if (!item.state.includes('eat')){
					if (item.state.includes("left"))
						item.state = "eat-left";
					else
						item.state = "eat-right";
					item.frame = 0;
				} else if (item.frame === 15){
					item.state = item.state.slice(4, item.state.length);

					item.lastEat -= item.food * 0.4;
					let now = 100000, grassIndex = 0;
					this.grass.forEach((grass, index) => {
						if ((grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now) {
							now = (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY);
							grassIndex = index;
						}
					});
					this.grass.splice(grassIndex, 1);
					item.isWantGrass = false;
					
					hungryPercent = (item.food - item.lastEat) / item.food;
					if (hungryPercent <= 0.95){
						if (this.grass.length > 0) {
							let now = 100000, grassIndex = -1;
							this.grass.forEach((grass, index) => {
								if (!grass.isUsed && (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now) {
									now = (grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY);
									item.wantX = grass.coordX;
									item.wantY = grass.coordY;
									grassIndex = index;
								}
							});
							if (grassIndex !== -1){
								this.grass[grassIndex].isUsed = true;
								item.isWantGrass = true;
							}
						}
						item.speedBoost = 2;
					}
				}
			} else { // Иначе, если просто пришёл в желаемую точку прогулки
				item.wantX = 400 + Math.floor(Math.random() * 740); // То генерируем новую
				item.wantY = 410 + Math.floor(Math.random() * 440);
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
	}

	public createAnimal(name: string) {
		if (!(typeof this.id !== "number"))
			this.id = 0;
		if (name === "chicken")
			this.animals.push(new Chicken(this.id, 400 + Math.floor(Math.random() * 740), 430 + Math.floor(Math.random() * 420)));
		if (name === "pig")
			this.animals.push(new Pig(this.id, 400 + Math.floor(Math.random() * 740), 430 + Math.floor(Math.random() * 420)));
		this.id++;
	}

	public createGrass(clickX: number, clickY: number, widthK: number, heightK: number) {
		clickX -= 24 * widthK; clickY -= 24 * heightK;

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

	public createProduct(name: string, coordX: number, coordY: number) {
		this.products.push(new Product(name, coordX, coordY));
	}

	protected sortCoord(a : AnimalList | Product | Grass, b : AnimalList | Product | Grass) : number {
		let aY = a.coordY, bY = b.coordY;
		let grassK = 2.25, productK = 1.75; // Нужен для правильного баланса между животными и остальным
		let animalsK : {[key: string]: number} = {
			'chicken': 1,
			'pig': 0.1,
		};
		if (a instanceof Grass)
			aY -= 48 * grassK;
		else if (a instanceof Product)
			aY -= 48 * productK;
		else 
			aY -= a.height * animalsK[a.name];
		if (b instanceof Grass)
			bY -= 48 * grassK;
		else if (b instanceof Product)
			bY -= 48 * productK;
		else
			bY -= b.height * animalsK[b.name];
		return aY - bY;
	}
}