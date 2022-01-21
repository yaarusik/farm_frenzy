import Control from "../../builder/controller";
import { Chicken, AnimalList } from "../types";

export default class LevelPage extends Control {
	canvasContainer: Control;
	canvas : Control<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	curWidthK: number;
	curHeightK: number;
	heightRatio: number;
	animals: AnimalList[];
	gameFrame : number;
	staggeredFrames : number;
	id : number; // Для животых
	images = new Map<string, HTMLImageElement>();
	imagesPath : string[];

	constructor (parentNode: HTMLElement) {
		super(parentNode);

		this.imagesPath = [
			"images/pets/chicken/down.png",
		];

		this.animals = [];
		this.createAnimal('chicken'); // Временно
		this.createAnimal('chicken');
		this.createAnimal('chicken');
		this.createAnimal('chicken');
		this.createAnimal('chicken');
		this.createAnimal('chicken');
		this.createAnimal('chicken');

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
	
	private startLevel(){
		this.resize(this.canvas.node);
		this.canvasScale(this.canvas.node);
		this.imagesPath.forEach(async (path) => {
			let petName = path.slice(12, 12 + path.slice(12).indexOf('/'));
			let anim = path.slice(path.lastIndexOf('/') + 1, -4);
			let animName = petName + '-' + anim;
			this.images.set(animName, await this.loadImage(path));
		});

		this.run();
	}

	private loadImage(src : string): Promise<HTMLImageElement>{
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

	private run(){
		this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
		this.animals.forEach((item) => {
			let animName = item.name + '-' + item.state;
			if (typeof this.images.get(animName) === 'undefined')
				return;
			const frame = (Math.floor(this.gameFrame / this.staggeredFrames) + item.frameRand) % 16;

			let imageFile = this.images.get(animName) as HTMLImageElement;
			let dx = item.width * (frame % 4);
			let dy = item.height * Math.floor(frame / 4);
			let sWidth = item.width * this.curWidthK * this.heightRatio;
			let sHeight = item.height * this.curHeightK * this.heightRatio;
			
			this.context.drawImage(imageFile, dx, dy, item.width, item.height, item.coordX, item.coordY, sWidth, sHeight);
		});

		this.gameFrame ++;
		requestAnimationFrame(this.run.bind(this));
	}


	private createAnimal(name : string){
		if (name === 'chicken')
			this.animals.push(new Chicken(this.id, Math.random() * 1000, Math.random() * 1000));

		this.id ++;
	}

	gameMapBack() {
		throw new Error("Method not implemented.");
	}

}