import Control from "../../builder/controller";
import { Chicken, AnimalList } from "../types";

export default class LevelPage extends Control {
	canvasContainer: Control;
	canvas: Control<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	curWidthK: number;
	curHeightK: number;
	heightRatio: number;
	animals: AnimalList[];
	gameFrame: number;
	staggeredFrames: number;
	id: number; // Для животых
	images = new Map<string, HTMLImageElement>();
	imagesPath: string[];

	constructor (parentNode: HTMLElement) {
		super(parentNode);

		this.imagesPath = [
			"images/pets/chicken/down.png",
			"images/pets/chicken/down-left.png",
			"images/pets/chicken/down-right.png",
			"images/pets/chicken/left.png",
			"images/pets/chicken/right.png",
			"images/pets/chicken/up.png",
			"images/pets/chicken/up-left.png",
			"images/pets/chicken/up-right.png",
		];

		this.animals = [];
		this.createAnimal("chicken"); // Временно
		this.createAnimal("chicken");
		this.createAnimal("chicken");
		this.createAnimal("chicken");
		this.createAnimal("chicken");
		this.createAnimal("chicken");
		this.createAnimal("chicken");

		this.canvasContainer = new Control(this.node, "div", "wrapper wrapper_level", "");
		this.canvas = new Control<HTMLCanvasElement>(this.canvasContainer.node, "canvas", "canvas", "");
		this.canvas.node.width = 1600;
		this.canvas.node.height = 1200;
		this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");

		this.curWidthK = 1;
		this.curHeightK = 1;
		this.heightRatio = 1.333333333;

		this.gameFrame = 0;
		this.staggeredFrames = 3;
		this.id = 0;

		this.startLevel();
	}

	private startLevel() {
		this.resize(this.canvas.node);
		this.canvasScale(this.canvas.node);
		this.imagesPath.forEach(async (path) => {
			const petName = path.slice(12, 12 + path.slice(12).indexOf("/"));
			const anim = path.slice(path.lastIndexOf("/") + 1, -4);
			const animName = petName + "-" + anim;
			this.images.set(animName, await this.loadImage(path));
		});

		this.run();
	}

	private loadImage(src: string): Promise<HTMLImageElement> {
		return new Promise((resolve) => {
			const image = new Image();
			image.src = src;
			image.onload = () => {
				resolve(image);
			};
		});
	}

	private resize(canvas: HTMLCanvasElement): void {
		canvas.style.height = `${this.heightRatio * canvas.width}`;
	}

	private canvasScale(canvas: HTMLCanvasElement) {
		const widthContainer = getComputedStyle(canvas).width;
		const heightContainer = getComputedStyle(canvas).height;
		this.curWidthK = 1600 / parseInt(widthContainer, 10);
		this.curHeightK = 1200 / parseInt(heightContainer, 10);
	}

	private run() {
		this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
		this.animals.forEach((item) => {

			let animName = item.name + '-' + item.state;
			// console.log(animName);
			if (typeof this.images.get(animName) === 'undefined')
				return;
			const frame = (Math.floor(this.gameFrame / this.staggeredFrames) + item.frameRand) % 16;

			const imageFile = this.images.get(animName) as HTMLImageElement;
			const dx = item.width * (frame % 4);
			const dy = item.height * Math.floor(frame / 4);
			const sWidth = item.width * this.curWidthK * this.heightRatio;
			const sHeight = item.height * this.curHeightK * this.heightRatio;

			this.context.drawImage(imageFile, dx, dy, item.width, item.height, item.coordX, item.coordY, sWidth, sHeight);

			if (Math.abs(item.coordX - item.wantX) < 3 && Math.abs(item.coordY - item.wantY) < 3){
				item.wantX = 400 + Math.floor(Math.random() * 740);
				item.wantY = 430 + Math.floor(Math.random() * 470);

			}
			
			let state = '';

			if (item.coordY - item.wantY < -2){
				state = 'down';
				item.coordY ++;
			} else if (item.coordY - item.wantY > 2){
				state = 'up';
				item.coordY --;
			}

			if (item.coordX - item.wantX < -2){
				state += (state.length > 0 ? '-' : '') + 'right';
				item.coordX += 1 * this.heightRatio; // Иначе слишком медленно по горизонтали идёт
			} else if (item.coordX - item.wantX > 2){
				state += (state.length > 0 ? '-' : '') + 'left';
				item.coordX -= 1 * this.heightRatio;
			}

			if (frame === 0)
				console.log(state);

			if (state === '') // Мало ли
				state = item.state
			item.state = state;
		});

		this.gameFrame++;
		requestAnimationFrame(this.run.bind(this));
	}


	private createAnimal(name: string) {
		if (name === 'chicken')
			this.animals.push(new Chicken(this.id, 400 + Math.floor(Math.random() * 740), 430 + Math.floor(Math.random() * 470)));

		this.id++;
	}

	gameMapBack() {
		throw new Error("Method not implemented.");
	}

}