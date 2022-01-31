

import Control from "../../builder/controller";
import { imagesOptions, textOptions } from "../../utils/gameData/mapData";
import { IPicture, IText, Coords, IButton } from "./../iterfaces";
import Common from "./../common/common";
export default class GameMapPage extends Control {
	startLevel!: () => void;
	onBack!: () => void;
	onSelectShop!: () => void;

	curWidthK: number;
	curHeightK: number;
	imagesOptions: IPicture[];
	buttons: IButton[];
	canvas: Control<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	textOptions: IText[];
	commonFunction: Common;
	animation: number;

	constructor (parentNode: HTMLElement, tagName = "div", className = "", content = "") {
		super(parentNode, tagName, className, content);


		this.textOptions = textOptions;
		this.imagesOptions = imagesOptions;

		this.buttons = this.imagesOptions.filter(btn => btn.type === "button") as IButton[];
		// коэффициенты масштаба
		this.curWidthK = 1;
		this.curHeightK = 1;
		this.animation = 0;

		const canvasContainer = new Control(this.node, "div", "canvas__container", "");
		this.canvas = new Control<HTMLCanvasElement>(canvasContainer.node, "canvas", "canvas", "");
		this.canvas.node.width = 1600;
		this.canvas.node.height = 1200;
		this.context = <CanvasRenderingContext2D>this.canvas.node.getContext("2d");
		// создание общего класса с функциями
		this.commonFunction = new Common(this.canvas.node, this.context);

		this.startMap();

		window.onresize = () => {
			const coefficients = this.commonFunction.canvasScale();
			this.curWidthK = coefficients.curWidthK;
			this.curHeightK = coefficients.curHeightK;
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
		const coefficients = this.commonFunction.canvasScale();
		this.curWidthK = coefficients.curWidthK;
		this.curHeightK = coefficients.curHeightK;
		this.run(loadImages);
	}

	private async render(loadImages: Promise<HTMLImageElement>[]) {
		this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
		this.commonFunction.drawImageAndText(loadImages, this.imagesOptions, this.textOptions);
	}

	private run(loadImages: Promise<HTMLImageElement>[]) {
		this.render(loadImages);


		this.animation = requestAnimationFrame(() => {
			this.run(loadImages);
		});
	}

	// СДЕЛАТЬ ЕДИНУЮ ВЕРСИЮ ХОВЕР И КЛИК
	private buttonsHover(btn: IPicture, yStep: number) {
		btn.sy = yStep;
	}

	private buttonsClick(btn: IPicture, yStep: number) {
		btn.sy = yStep * 2;
	}

	private canvasMoveHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IButton[]) {
		buttons.forEach(btn => {
			const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
			if (this.commonFunction.determineCoords(event, scaleCoords)) {
				this.buttonsHover(btn, btn.stepY);
				this.changeAnimation(btn, true);
			} else {
				this.buttonsHover(btn, 0);
				this.changeAnimation(btn, false);
			}
		});
	}

	private changeAnimation(btn: IPicture, animEnable: boolean) {
		this.textOptions.forEach((item) => {
			if (item.text === btn.name) item.animation = animEnable;
		});
	}



	private canvasClickHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IButton[]) {
		buttons.forEach(btn => {
			const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
			if (this.commonFunction.determineCoords(event, scaleCoords)) {
				switch (btn.name) {
					case "Магазин": {
						// асинхронно дождаться settimeout
						this.buttonsClick(btn, btn.stepY);
						setTimeout(this.onSelectShop, 250);
						cancelAnimationFrame(this.animation);
						break;
					}
					case "Меню": {
						this.buttonsClick(btn, btn.stepY);
						setTimeout(this.onBack, 250);
						cancelAnimationFrame(this.animation);
						break;
					}
					case "уровень": {
						this.buttonsClick(btn, btn.stepY);
						setTimeout(this.startLevel, 250);
						cancelAnimationFrame(this.animation);
						break;
					}
					default: console.log("error");
				}
			} else {
				this.buttonsClick(btn, 0);
			}
		});
	}
}

