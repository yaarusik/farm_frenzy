import { IPicture } from "../../application/iterfaces";
import Common from "./../../application/common/common";

export default class PausePanel extends Common {
  pausePanel: IPicture[];
  initialImages: HTMLImageElement[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImages = [];
    this.pausePanel = [
      {
        type: "picture",
        name: "pause",
        image: "images/level/panels/pause_panel.png",
        x: 569,
        y: 300,
        width: 462,
        height: 600,
        sx: 0,
        sy: 0,
        swidth: 0,
        sheight: 0
      },
    ];

    this.startPanel();
  }

  private async startPanel() {
    const loadImages = this.pausePanel.map(image => this.loadImage(image.image));
    this.initialImages = await this.renderImages(loadImages);
  }

  public render() {
    console.log('render');
    this.drawImage(this.initialImages, this.pausePanel);
  }

}