import Picture from "../../utils/canvasBtn";
import CutPicture from "../../utils/cutPictures";
import Control from "../../builder/controller";

interface IPictures {
	type: string; name: string; image: string; x: number; y: number; width: number; height: number; sx: number; sy: number; swidth: number; sheight: number; stepY?: number; id?: number
}



export default class GameMapPage extends Control {
	startLevel!: () => void;
	onBack!: () => void;
	onSelectShop!: () => void;

	heightRatio: number;
	curWidthK: number;
	curHeightK: number;
	imagesOptions: IPictures[];
	buttons: IPictures[];
	canvas: Control<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;

	constructor (parentNode: HTMLElement, tagName = "div", className = "", content = "") {
		super(parentNode, tagName, className, content);

		this.imagesOptions = [
			{
				type: "picture",
				name: "карта",
				image: "images/map/gameMapStart.jpg",
				x: 0,
				y: 0,
				width: 1600,
				height: 1200,
				sx: 0,
				sy: 0,
				swidth: 0,
				sheight: 0
			},
			{
				type: "picture",
				name: "меню__бар",
				image: "images/map/map__menu.png",
				x: 0,
				y: 1092,
				width: 1600,
				height: 110,
				sx: 0,
				sy: 0,
				swidth: 0,
				sheight: 0
			},
			{
				type: "button",
				name: "магазин",
				image: "images/map/menuButtons.png",
				stepY: 44,
				x: 16,
				y: 1112,
				width: 148,
				height: 68,
				sx: 0,
				sy: 0,
				swidth: 80,
				sheight: 41,
			},
			{
				type: "button",
				name: "меню",
				image: "images/map/menuButtons.png",
				stepY: 44,
				x: 1456,
				y: 1112,
				width: 136,
				height: 66,
				sx: 0,
				sy: 0,
				swidth: 80,
				sheight: 41,
			},
			{
				type: "button",
				name: "уровень",
				image: "images/map/new__level.png",
				id: 1,
				x: 560,
				y: 928,
				width: 76,
				height: 76,
				sx: 0,
				sy: 0,
				stepY: 76,
				swidth: 76,
				sheight: 76,
			},
			{
				type: "button",
				name: "уровень",
				image: "images/map/new__level.png",
				id: 2,
				x: 635,
				y: 997,
				width: 76,
				height: 76,
				sx: 0,
				sy: 0,
				stepY: 76,
				swidth: 76,
				sheight: 76,
			},
			{
				type: "button",
				name: "уровень",
				image: "images/map/new__level.png",
				id: 3,
				x: 716,
				y: 1068,
				width: 76,
				height: 76,
				sx: 0,
				sy: 0,
				stepY: 76,
				swidth: 76,
				sheight: 76,
			},
			{
				type: "button",
				name: "уровень",
				image: "images/map/new__level.png",
				id: 4,
				x: 805,
				y: 1014,
				width: 76,
				height: 76,
				sx: 0,
				sy: 0,
				stepY: 76,
				swidth: 76,
				sheight: 76,
			},
			{
				type: "button",
				name: "уровень",
				image: "images/map/new__level.png",
				id: 5,
				x: 898,
				y: 945,
				width: 76,
				height: 76,
				sx: 0,
				sy: 0,
				stepY: 76,
				swidth: 76,
				sheight: 76,
			},
			{
				type: "button",
				name: "уровень",
				image: "images/map/new__level.png",
				id: 6,
				x: 995,
				y: 877,
				width: 76,
				height: 76,
				sx: 0,
				sy: 0,
				stepY: 76,
				swidth: 76,
				sheight: 76,
			}
		];

		this.buttons = this.imagesOptions.filter(btn => btn.type === "button");
		// коэффициенты масштаба
		this.curWidthK = 1;
		this.curHeightK = 1;
		this.heightRatio = 1.33333333;

		const canvasContainer = new Control(this.node, "div", "canvas__container", "");
		this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");
		this.canvas.node.width = 1600;
		this.canvas.node.height = 1200;
		this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
		this.startMap();

		window.onresize = () => {
			this.resize(this.canvas.node);
			this.canvasScale(this.canvas.node);
		};

		this.canvas.node.addEventListener("mousemove", (e) => {
			this.canvasMoveHundler(e, this.canvas.node, this.buttons);
		});
		this.canvas.node.addEventListener("click", (e) => {
			this.canvasClickHundler(e, this.canvas.node, this.buttons);
		});
	}

	private startMap() {
		const loadImages = this.imagesOptions.map(image => this.loadImage(image.image));
		this.canvasScale(this.canvas.node);

		this.run(loadImages);
	}

	private render(loadImages: Promise<HTMLImageElement>[]) {
		this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
		this.drawImage(this.context, loadImages);
	}

	private run(loadImages: Promise<HTMLImageElement>[]) {
		this.render(loadImages);


		requestAnimationFrame(() => {
			this.run(loadImages);
		});
	}

	private canvasScale(canvas: HTMLCanvasElement) {
		const widthContainer = getComputedStyle(canvas).width;
		const heightContainer = getComputedStyle(canvas).height;
		this.curWidthK = 1600 / parseInt(widthContainer, 10);
		this.curHeightK = 1200 / parseInt(heightContainer, 10);
	}

	private resize(canvas: HTMLCanvasElement): void {
		canvas.style.height = `${this.heightRatio * canvas.width}`;
	}

	private drawImage(ctx: CanvasRenderingContext2D, loadImages: Promise<HTMLImageElement>[]) {
		Promise.all(loadImages).then(responses => {
			responses.forEach((img, index) => {
				const item = this.imagesOptions[index];
				if (item.type === "button") {
					const cutPicture = new CutPicture(img, item.sx, item.sy, item.swidth, item.sheight, item.x, item.y, item.width, item.height);
					cutPicture.draw(ctx);
				} else {
					const btn = new Picture(img, item.x, item.y, item.width, item.height);
					btn.draw(ctx);
				}
			});
		});
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

	private buttonsHover(btn: IPictures, yStep: number) {
		btn.sy = yStep;
	}

	private buttonsClick(btn: IPictures, yStep: number) {
		btn.sy = yStep * 2;
	}

	private determineCoords(e: MouseEvent, scaleCoords: Coords): boolean {
		const rect = this.canvas.node.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		const { currentX, currentW, currentY, currentH } = scaleCoords;
		return mouseX >= currentX && mouseX < (currentX + currentW) && mouseY >= currentY && mouseY < currentY + currentH;
	}

	private canvasMoveHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IPictures[]) {
		buttons.forEach(btn => {
			const scaleCoords: Coords = {
				currentX: btn.x / this.curWidthK,
				currentW: btn.width / this.curWidthK,
				currentY: btn.y / this.curHeightK,
				currentH: btn.height / this.curHeightK
			};
			if (this.determineCoords(event, scaleCoords)) {
				this.buttonsHover(btn, btn.stepY as number);
			} else {
				this.buttonsHover(btn, 0 as number);
			}
		});
	}
	private canvasClickHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IPictures[]) {
		buttons.forEach(btn => {
			const scaleCoords: Coords = {
				currentX: btn.x / this.curWidthK,
				currentW: btn.width / this.curWidthK,
				currentY: btn.y / this.curHeightK,
				currentH: btn.height / this.curHeightK
			};
			if (this.determineCoords(event, scaleCoords)) {
				switch (btn.name) {
					case "магазин": {
						// УБРАТЬ ПРИВЕДЕНИЕ ТИПА
						this.buttonsClick(btn, btn.stepY as number);
						setTimeout(this.onSelectShop, 250);
						break;
					}
					case "меню": {
						this.buttonsClick(btn, btn.stepY as number);
						setTimeout(this.onBack, 250);
						break;
					}
					case "уровень": {
						this.buttonsClick(btn, btn.stepY as number);
						setTimeout(this.startLevel, 250);
						break;
					}
					default: console.log("error");
				}
			} else {
				this.buttonsClick(btn, 0 as number);
			}
		});
	}
}

interface Coords {
	currentX: number, currentY: number, currentW: number, currentH: number
}
