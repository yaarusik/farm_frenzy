import Control from "../../builder/controller";

interface IPictures {
	type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; stepY?: number; id?: number
}

interface Animal{
	type: string; name: string; id: number; state: number; image: string; coordX: number; coordY: number; width: number; height: number;
}
export default class LevelPage extends Control {
	canvasContainer: Control;
	canvas : Control<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	imagesOptions: IPictures[];
	curWidthK: number;
	curHeightK: number;
	animals: Animal[];

	constructor (parentNode: HTMLElement) {
		super(parentNode);

		this.imagesOptions = [
			{
				type: "picture",
				name: "карта",
				image: "images/level/level-back.jpg",
				x: 0,
				y: 0,
				width: 1600,
				height: 1200,
				sx: 0,
				sy: 0,
				swidth: 0,
				sheight: 0
			}
		];

		this.animals = [
			{
				type: "animal",
				name: "chicken",
				id: 0,
				state: 0,
				image: "images/pets/chicken/down.png",
				coordX: 0,
				coordY: 0,
				width: 64,
				height: 64,
			}
		]

		this.canvasContainer = new Control(this.node, "div", "wrapper wrapper_level", "");
		this.canvas = new Control<HTMLCanvasElement>(this.canvasContainer.node, "canvas", "canvas", "");
		this.canvas.node.width = 1600;
		this.canvas.node.height = 1200;
		this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");

		this.curWidthK = 1;
		this.curHeightK = 1;
		
		this.startLevel();
	}
	
	private startLevel(){
		// this.canvasScale(this.canvas.node);
		this.animals.forEach(item => {
			const animal = new Control<HTMLImageElement>(this.canvasContainer.node, "img", "animal", "");
			animal.node.src = item.image;
			item.state = 0; // Надо будет обсудить номера для состояний
		});
		console.log(this.animals);
	}

	gameMapBack() {
		throw new Error("Method not implemented.");
	}






}