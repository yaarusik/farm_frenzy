import { IPicture, IButton, IText, Coords } from "../../application/iterfaces";
import Common from "./../../application/common/common";


export default class PausePanel extends Common {
  pausePanelImg: IPicture[];
  initialImage: HTMLImageElement[];
  pausePanelBtn: IButton[];
  initialBtn: HTMLImageElement[];
  pausePanelText: IText[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.pausePanelImg = [
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
    this.pausePanelBtn = [
      {
        type: "button",
        name: "Продолжить",
        image: "images/level/panels/pauseBtn.png",
        stepY: 100,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 674,
        y: 345,
        width: 245,
        height: 70,
        sx: 0,
        sy: 0,
        swidth: 168,
        sheight: 48
      },
      {
        type: "button",
        name: "Главное меню",
        image: "images/level/panels/pauseBtn.png",
        stepY: 100,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 674,
        y: 435,
        width: 245,
        height: 70,
        sx: 0,
        sy: 0,
        swidth: 168,
        sheight: 48
      },
      {
        type: "button",
        name: "Перезапустить",
        image: "images/level/panels/pauseBtn.png",
        stepY: 100,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 674,
        y: 525,
        width: 245,
        height: 70,
        sx: 0,
        sy: 0,
        swidth: 168,
        sheight: 48
      },
      {
        type: "button",
        name: "Карта",
        image: "images/level/panels/pauseBtn.png",
        stepY: 100,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 674,
        y: 615,
        width: 245,
        height: 70,
        sx: 0,
        sy: 0,
        swidth: 168,
        sheight: 48
      },
      {
        type: "button",
        name: "Настройки",
        image: "images/level/panels/pauseBtn.png",
        stepY: 100,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 674,
        y: 705,
        width: 245,
        height: 70,
        sx: 0,
        sy: 0,
        swidth: 168,
        sheight: 48
      },
      {
        type: "button",
        name: "Помощь",
        image: "images/level/panels/pauseBtn.png",
        stepY: 100,
        stepX: 0,
        hover: 1,
        click: 2,
        x: 674,
        y: 795,
        width: 245,
        height: 70,
        sx: 0,
        sy: 0,
        swidth: 168,
        sheight: 48
      },
    ];

    this.pausePanelText = [
      {
        text: 'Продолжить',
        fontSize: '27px Vag_Rounded-Bold CY',
        color: '#fff',
        x: 706,
        y: 385,
        animation: false,
      },
      {
        text: "Главное Меню",
        fontSize: '27px Vag_Rounded-Bold CY',
        color: '#fff',
        x: 706,
        y: 475,
        animation: false,
      },
      {
        text: "Перезапустить",
        fontSize: '27px Vag_Rounded-Bold CY',
        color: '#fff',
        x: 708,
        y: 565,
        animation: false,
      },
    ];

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.pausePanelImg.map(image => this.loadImage(image.image));
    const loadBtn = this.pausePanelBtn.map(image => this.loadImage(image.image));
    this.initialBtn = await this.renderImages(loadBtn);
    this.initialImage = await this.renderImages(loadImage);
  }

  public render() {
    this.drawImage(this.initialImage, this.pausePanelImg);
    this.drawImage(this.initialBtn, this.pausePanelBtn);
    this.drawText(this.pausePanelText);
  }

  public clickHundler(event: MouseEvent, canvas: HTMLCanvasElement, widthK: number, heightK: number, isPaused: boolean) {
    this.pausePanelBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Продолжить": {
            isPaused = !isPaused;
            // console.log('Продолжить ', isPaused);
            break;
          }
          case "Главное Меню": {

            break;
          }
          default: {
            console.log("it's pausePanel");
          }
        }
      }
    });
  }

}