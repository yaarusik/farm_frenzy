
import Control from "../../builder/controller";
import Common from "./../common/common";
import { Chicken, AnimalList, Grass } from "../types";
import { IPicture, Coords, IButton, IText, IAnimBuild } from "./../iterfaces";
import { levelTextOptions, userInterfaceOptions, animationBuildOptions, levelImagesPath } from './../../utils/gameData/levelData';
import Well from "../../utils/animation/well";
import Coin from "../../utils/animation/coin";
import { initialData } from "./../common/initialData";

export default class LevelPage extends Control {
  canvas: Control<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  commonFunction: Common;
  animation: number;
  userInterfaceOptions: IPicture[];
  curWidthK: number;
  curHeightK: number;
  buttons: IButton[];
  textOptions: IText[];
  animationBuildOptions: IAnimBuild[];
  animState: { [key: string]: boolean; };
  well: Well;
  price: { [key: string]: number };
  coin: Coin;
  // a: { type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; };
  heightRatio: number;
	animals: AnimalList[];
	grass: Grass[];
	gameFrame: number;
	staggeredFrames: number;
	id: number; // Для животых
	images = new Map<string, HTMLImageElement>();
	imagesPath: string[];

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.userInterfaceOptions = userInterfaceOptions;
    this.textOptions = levelTextOptions;
    this.animationBuildOptions = animationBuildOptions;

    // this.a = {
    //   type: "picture",
    //   name: "pause",
    //   image: "images/level/panels/pause_panel.png",
    //   x: 569,
    //   y: 300,
    //   width: 462,
    //   height: 600,
    //   sx: 0,
    //   sy: 0,
    //   swidth: 0,
    //   sheight: 0
    // };

    this.animals = [];
		this.grass = [];
    this.imagesPath = levelImagesPath;
    this.createAnimal("chicken");

    this.buttons = <IButton[]>this.userInterfaceOptions.filter(btn => btn.type === "button");

    this.well = new Well(this.userInterfaceOptions);
    this.coin = new Coin(this.userInterfaceOptions);

    const canvasContainer = new Control(this.node, "div", "canvas__container", "");
    this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");

    this.canvas.node.width = 1600;
    this.canvas.node.height = 1200;

    this.curWidthK = 1;
    this.curHeightK = 1;
    this.heightRatio = 1.333333333;

    this.gameFrame = 0;
		this.staggeredFrames = 3;
		this.id = 0;
    this.animation = 0;

    this.animState = {
      well: true,
      waterIndicator: true,
    };

    this.price = {
      well: 19,
      chicken: 100,
    };

    this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
    this.commonFunction = new Common(this.canvas.node, this.context);

    this.startUI();

    window.onresize = () => {
      const coefficients = this.commonFunction.canvasScale();
      this.curWidthK = coefficients.curWidthK;
      this.curHeightK = coefficients.curHeightK;
    };

    this.canvas.node.addEventListener("mousemove", (e) => {
      this.canvasMoveHundler(e, this.buttons);
    });

    this.canvas.node.addEventListener("click", (e) => {
      this.canvasClickHundler(e, this.canvas.node, this.buttons);
    });

    this.startLevel();
  }

  private canvasMoveHundler(event: MouseEvent, buttons: IButton[]) {
    buttons.forEach(btn => {
      const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
      if (this.commonFunction.determineCoords(event, scaleCoords)) {
        if (btn.name === 'well' || btn.name === 'storage') {
          console.log('well');
        } else {
          this.buttonsHover(btn, btn.stepY, btn.hover);
          this.changeAnimation(btn, true);
        }

      } else {
        switch (btn.name) {
          case "well": {
            break;
          }
          case "pig":
          case "chicken":
          case "cow":
          case "ostrich":
          case "dog":
          case "cat": {
            const hoverCoords = 192;
            const count = 1;
            // если можно купить, ховер работает
            this.buttonsHover(btn, hoverCoords, count);
            break;
          }
          default: {
            this.buttonsHover(btn, 0, 0);
            this.changeAnimation(btn, false);
          }
        }
      }
    });
  }

  private canvasClickHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IButton[]) {
    buttons.forEach(btn => {
      const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
      if (this.commonFunction.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Меню": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            // // ================================================
            // this.userInterfaceOptions.push(this.a);
            // const img = this.commonFunction.loadImage(this.a.image);
            // this.loadImages.push(img);
            // // ===================================================
            // console.log(this.loadImages);
            setTimeout(this.gameMapBack, 250);
            cancelAnimationFrame(this.animation);
            break;
          }
          case "well": {
            this.changeTotal(btn.name);
            if (this.animState.well) this.well.wellAnimation(btn, this.animState);
            if (this.animState.waterIndicator) this.well.fullWaterIndicator(this.animState);
            this.animState.well = false;
            this.animState.waterIndicator = false;
            break;
          }
          case 'chicken': {
            this.createAnimal("chicken");
            this.changeTotal(btn.name);
            this.buttonsClick(btn, btn.stepY, btn.click);
            break;
          }
          case 'pig': {
            this.buttonsClick(btn, btn.stepY, btn.click);
            this.well.waterIndicatorChange();
            console.log("chicken");
            break;
          }
          default: console.log("error");
        }
      } else {
        // переделать сброс кнопки
        // this.buttonsClick(btn, 0, 0);
      }
    });
  }

  private buttonsHover(btn: IButton, yStep: number, count: number) {
    btn.sy = yStep * count;
  }

  private buttonsClick(btn: IButton, yStep: number, count: number) {
    btn.sy = yStep * count;
  }

  private changeAnimation(btn: IPicture, animEnable: boolean) {
    this.textOptions.forEach((item) => {
      if (item.text === btn.name) item.animation = animEnable;
    });
  }

  private async startUI() {
    const loadImages = this.userInterfaceOptions.map(image => this.commonFunction.loadImage(image.image));

    const coefficients = this.commonFunction.canvasScale();
    this.curWidthK = coefficients.curWidthK;
    this.curHeightK = coefficients.curHeightK;

    const initialImages = await this.commonFunction.renderImages(loadImages);

    this.run(initialImages);
  }

  private startLevel() {
		this.imagesPath.forEach(async (path) => {
			const petName = path.slice(12, 12 + path.slice(12).indexOf("/"));
			const anim = path.slice(path.lastIndexOf("/") + 1, -4);
			let animName = petName + "-" + anim;
			if (path.slice(7, 11) !== "pets") // Если анимация не для животных
				animName = anim;
			this.images.set(animName, await this.commonFunction.loadImage(path));
		});
	}
    
  private async run(saveImg: HTMLImageElement[]) {
    this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
		this.context.globalAlpha = 1;
    await this.render(saveImg);
    // СДЕЛАТЬ ПО КНОПКЕ
    this.buildSpawn();
    this.coin.coinAnimation();

    this.grass.forEach((item, index, grassList) => {
			this.context.restore(); // Перед каждой отрисовкой возращаем канвасу стандартные настройки прозрачности
			this.context.globalAlpha = 1;

			let frame = Math.min(Math.max(Math.floor(this.gameFrame / this.staggeredFrames) % 16, item.age), item.maxAge);
			if (item.age < item.maxAge)
				item.age ++;
			
			let imageFile = this.images.get("grass") as HTMLImageElement;
			let dx = 48 * (frame % 4);
			let dy = 48 * Math.floor(frame / 4);
			let sWidth = 48 * this.curWidthK * this.heightRatio;
			let sHeight = 48 * this.curHeightK * this.heightRatio;

			if (imageFile instanceof HTMLImageElement)
				this.context.drawImage(imageFile, dx, dy, 48, 48, item.coordX, item.coordY, sWidth, sHeight);
		});

		
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
			let sWidth = item.width * this.curWidthK * this.heightRatio;
			let sHeight = item.height * this.curHeightK * this.heightRatio;

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
				if (!item.isWantGrass && this.grass.length > 0){ // Если желаемая точка не трава и трава на карте есть, то ищем траву
					let now = 10000000; // Очень много, чтобы любое расстояние было ближе чем
					this.grass.forEach((grass) => {
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
						this.grass.forEach((grass, index) => {
							if ((grass.coordX - item.coordX) * (grass.coordX - item.coordX) + (grass.coordY - item.coordY) * (grass.coordY - item.coordY) < now){
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

    this.animation = requestAnimationFrame(() => {
      this.run(saveImg);
    });
  }

  private createAnimal(name: string) {
		if (!(typeof this.id !== "number"))
			this.id = 0;
		if (name === "chicken")
			this.animals.push(new Chicken(this.id, 400 + Math.floor(Math.random() * 740), 430 + Math.floor(Math.random() * 420)));
		this.id ++;
	}

  private createGrass(clickX : number, clickY : number){
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
		if (clickY - k * 2>= 430)
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

  private async render(saveImg: HTMLImageElement[]) {
    this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
    this.commonFunction.drawImage(saveImg, this.userInterfaceOptions);
    this.commonFunction.drawText(this.textOptions);

    // пробуй вставить сюда

  }

  //Секция анимаций для зданий ==================

  // один раз только нужно запустить
  private buildSpawn() {
    this.animationBuildOptions.forEach((item, index) => {
      this.buttons.forEach(build => {
        setTimeout(() => this.buildAnimation(item, build), 500 * index);
      });
    });
  }

  private buildAnimation(item: IAnimBuild, build: IButton) {
    if (item.name === build.name) {
      if (item.maxY > build.y)
        build.y += item.speed;
    }
  }

  private changeTotal(product: string) {
    if (this.animState.well) {
      initialData.totalLevelSum.level1 -= this.price[product];
      this.textOptions.forEach(item => {
        if (item.name === 'total') {
          console.log('total');
          item.text = initialData.totalLevelSum.level1.toString();
        }
      });
    }
  }


  //Секция анимаций для зданий ==================
  gameMapBack() {
    throw new Error("Method not implemented.");
  }
}

