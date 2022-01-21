import Picture from "../../utils/classes/canvasBtn";
import CutPicture from "../../utils/classes/cutPictures";
import Control from "../../builder/controller";
import { imagesOptions, textOptions } from "./../../utils/mapData";
import { IPictures, IText, Coords } from "./../iterfaces";
import Common from "./../common/common";
export default class GameMapPage extends Control {
	startLevel!: () => void;
	onBack!: () => void;
	onSelectShop!: () => void;

	curWidthK: number;
	curHeightK: number;
	imagesOptions: IPictures[];
	buttons: IPictures[];
	canvas: Control<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	textOptions: IText[];
	commonFunction: Common;

	constructor (parentNode: HTMLElement, tagName = "div", className = "", content = "") {
		super(parentNode, tagName, className, content);

		this.commonFunction = new Common();

		this.textOptions = textOptions;
		this.imagesOptions = imagesOptions;
		this.buttons = this.imagesOptions.filter(btn => btn.type === "button");
		// коэффициенты масштаба
		this.curWidthK = 1;
		this.curHeightK = 1;

		const canvasContainer = new Control(this.node, "div", "canvas__container", "");
		this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");
		this.canvas.node.width = 1600;
		this.canvas.node.height = 1200;
		this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
		this.startMap();

		window.onresize = () => {
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
		const loadImages = this.imagesOptions.map(image => this.commonFunction.loadImage(image.image));
		this.canvasScale(this.canvas.node);

		this.run(loadImages);
	}

	private async render(loadImages: Promise<HTMLImageElement>[]) {
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

			this.drawText(this.textOptions);
		});
	}

	private drawText(textArr: IText[]) {
		this.context.font = "24px Vag_Rounded-Bold CY";
		this.context.fillStyle = "#fff";
		const letterSpacing = 0.5;
		const step = 3;
		textArr.forEach(text => {
			if (!text.animation) {
				this.context.textAlign = "start";
				this.context.fillText(text.text, text.x, text.y);
			} else {
				const startY = text.y;
				const startX = text.x;
				for (let i = 0; i < text.text.length; i++) {
					const textSize = this.context.measureText(text.text[i]);
					text.x += Math.floor(textSize.width) + letterSpacing;
					i % 2 ? text.y = startY - step : text.y = startY + step;
					this.context.textAlign = "right";
					this.context.fillText(text.text[i], text.x, text.y);
				}
				text.x = startX;
				text.y = startY;
			}
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
			const scaleCoords: Coords = this.scaleCoords(btn);
			if (this.determineCoords(event, scaleCoords)) {
				this.buttonsHover(btn, btn.stepY as number);
				this.changeAnimation(btn, true);
			} else {
				this.buttonsHover(btn, 0 as number);
				this.changeAnimation(btn, false);
			}
		});
	}

	private scaleCoords(btn: IPictures) {
		return {
			currentX: btn.x / this.curWidthK,
			currentW: btn.width / this.curWidthK,
			currentY: btn.y / this.curHeightK,
			currentH: btn.height / this.curHeightK
		};
	}

	private changeAnimation(btn: IPictures, animEnable: boolean) {
		this.textOptions.forEach((item) => {
			if (item.text === btn.name) item.animation = animEnable;
		});
	}

	private canvasClickHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IPictures[]) {
		buttons.forEach(btn => {
			const scaleCoords: Coords = this.scaleCoords(btn);
			if (this.determineCoords(event, scaleCoords)) {
				switch (btn.name) {
					case "Магазин": {
						// УБРАТЬ ПРИВЕДЕНИЕ ТИПА
						this.buttonsClick(btn, btn.stepY as number);
						setTimeout(this.onSelectShop, 250);
						break;
					}
					case "Меню": {
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

