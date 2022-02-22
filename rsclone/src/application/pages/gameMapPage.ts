

import Control from "../../builder/controller";
import { imagesOptions, textOptions } from "../../utils/gameData/mapData";
import { IPicture, IText, Coords, IButton } from "./../iterfaces";
import Common from "./../common/common";
import { Music } from "../../utils/music/music";
import LevelProgress from "../../utils/gameProgress/levelProgress";
import Timer from "../../utils/timer/levelTimer";
import Preloader from './../preloader';

export default class GameMapPage extends Control {
	startLevel!: (level: number) => void;
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
	music: Music;
	levelBtn: LevelProgress;
	timer: Timer;
	preloader: Preloader;

	constructor (parentNode: HTMLElement, tagName = "div", className = "", content = "", preloader: Preloader) {
		super(parentNode, tagName, className, content);

		this.preloader = preloader;
		this.music = new Music();

		this.textOptions = JSON.parse(JSON.stringify(textOptions));
		this.imagesOptions = JSON.parse(JSON.stringify(imagesOptions));

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
		this.commonFunction = new Common(this.canvas.node, this.context);
		this.levelBtn = new LevelProgress(this.canvas.node, this.context);
		this.startMap();

		this.timer = new Timer(this.canvas.node, this.context, 1);

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

	private async startMap() {
		const loadImages = this.imagesOptions.map(image => this.commonFunction.loadImage(image.image));
		const coefficients = this.commonFunction.canvasScale();
		this.curWidthK = coefficients.curWidthK;
		this.curHeightK = coefficients.curHeightK;

		const initialImages = await this.commonFunction.renderImages(loadImages);

		this.preloader.hide(this.preloader.node);

		this.run(initialImages);
	}

	private async render(saveImg: HTMLImageElement[]) {
		this.context.clearRect(0, 0, this.canvas.node.width, this.canvas.node.height);
		this.commonFunction.drawImage(saveImg, this.imagesOptions);
		this.commonFunction.drawText(this.textOptions);
		this.levelBtn.render();
	}

	private async run(saveImg: HTMLImageElement[]) {
		this.render(saveImg);

		this.animation = requestAnimationFrame(() => {
			this.run(saveImg);
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
		[...buttons, ...this.levelBtn.levelBtnData].forEach(btn => {
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
	private stopAnimation(func: () => void) {
		setTimeout(func, 250);
		setTimeout(() => cancelAnimationFrame(this.animation), 250);
	}

	private canvasClickHundler(event: MouseEvent, canvas: HTMLCanvasElement, buttons: IButton[]) {
		[...buttons, ...this.levelBtn.levelBtnData].forEach(btn => {
			const scaleCoords: Coords = this.commonFunction.scaleCoords(btn, this.curWidthK, this.curHeightK);
			if (this.commonFunction.determineCoords(event, scaleCoords)) {
				switch (btn.name) {
					case "Магазин": {
						this.buttonsClick(btn, btn.stepY);
						this.stopAnimation(this.onSelectShop);
						break;
					}
					case "Меню": {
						this.music.btnClick();
						this.buttonsClick(btn, btn.stepY);
						this.stopAnimation(this.onBack);
						this.music.onStart();
						break;
					}
					case "1": {
						this.music.btnClick();
						this.buttonsClick(btn, btn.stepY);
						this.timer.updateViewTime(btn.name);
						this.stopAnimation(() => this.startLevel(1));
						break;
					}
					case "2": {
						this.music.btnClick();
						this.buttonsClick(btn, btn.stepY);
						this.timer.updateViewTime(btn.name);
						this.stopAnimation(() => this.startLevel(2));
						break;
					}
					case "3": {
						this.music.btnClick();
						this.buttonsClick(btn, btn.stepY);
						this.timer.updateViewTime(btn.name);
						this.stopAnimation(() => this.startLevel(3));
						break;
					}
					case "4": {
						this.music.btnClick();
						this.buttonsClick(btn, btn.stepY);
						this.timer.updateViewTime(btn.name);
						this.stopAnimation(() => this.startLevel(4));
						break;
					}
				}
			} else {
				this.buttonsClick(btn, 0);
			}
		});
	}


}

