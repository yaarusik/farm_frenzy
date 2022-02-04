import { IPicture, IButton, IText, Coords, IFunctions } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { startPanelImg } from './../gameData/startPanelData';

export default class StartPanel extends Common {
  startPanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  // startPanelBtn: IButton[];
  initialBtn: HTMLImageElement[];
  // startPanelText: IText[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];

    this.startPanelImg = startPanelImg;
    // this.startPanelBtn = startPanelBtn;
    // this.startPanelText = pausePanelText;

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.startPanelImg.map(image => this.loadImage(image.image));
    // const loadBtn = this.startPanelBtn.map(image => this.loadImage(image.image));
    // this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);
  }

  public render() {
    this.drawImage(this.initialImage, this.startPanelImg);
    // this.drawImage(this.initialBtn, this.startPanelBtn);
    // this.drawText(this.startPanelText);
  }





}