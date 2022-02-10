import { IPicture, IButton, IText, Coords, IFunctions, IKeyBoolean } from "../../application/iterfaces";
import Common from "./../../application/common/common";
import { storagePanelImg, storagePanelStaticText, storagePanelBtn, storagePanelText } from './../gameData/storagePanelData';

export default class StoragePanel extends Common {
  storageImg: IPicture[];
  initialImage: HTMLImageElement[];
  initialBtn: HTMLImageElement[];
  startImg: HTMLImageElement[];
  storageStaticText: IText[];
  storageBtn: IButton[];
  storageText: IText[];

  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);
    this.initialImage = [];
    this.initialBtn = [];
    this.startImg = [];
    this.storageImg = this.objParse(storagePanelImg);
    this.storageStaticText = this.objParse(storagePanelStaticText);
    this.storageBtn = this.objParse(storagePanelBtn);
    this.storageText = this.objParse(storagePanelText);

    this.startPanel();
  }

  private async startPanel() {
    const loadImage = this.storageImg.map(image => this.loadImage(image.image));
    const loadBtn = this.storageBtn.map(image => this.loadImage(image.image));
    this.initialImage = await this.renderImages(loadImage);
    this.initialBtn = await this.renderImages(loadBtn);
  }

  public render() {
    this.drawImage(this.initialImage, this.storageImg);
    this.drawImage(this.initialBtn, this.storageBtn);
    this.drawStaticText(this.storageStaticText);
    this.drawText(this.storageText);

  }

  drawStaticText(text: IText[]) {
    text.forEach(item => {
      this.context.fillStyle = item.color;
      this.context.font = item.fontSize;
      this.context.shadowColor = '#222222';

      this.context.shadowBlur = 4;
      this.context.shadowOffsetX = 4;
      this.context.shadowOffsetY = 4;

      this.context.strokeText(item.text, item.x, item.y);
      this.context.fillText(item.text, item.x, item.y);

      this.context.shadowBlur = 0;
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
    });
  }

  public moveHundler(event: MouseEvent, widthK: number, heightK: number) {
    this.storageBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            this.buttonsHover(btn, btn.stepY, btn.hover);
            this.changeAnimation(btn, true, this.storageText);
            break;
          }
          case "Отмена": {
            this.buttonsHover(btn, btn.stepY, btn.hover);
            this.changeAnimation(btn, true, this.storageText);
            break;
          }
        }

      } else {
        this.buttonsHover(btn, 0, 0);
        this.changeAnimation(btn, false, this.storageText);
      }
    });
  }

  public clickHundler(event: MouseEvent, widthK: number, heightK: number, isState: IKeyBoolean): void {
    this.storageBtn.forEach(btn => {
      const scaleCoords: Coords = this.scaleCoords(btn, widthK, heightK);
      if (this.determineCoords(event, scaleCoords)) {
        switch (btn.name) {
          case "Ок": {
            this.buttonsClick(btn, btn.stepY, btn.click);
            break;
          }
          case "Отмена": {
            setTimeout(() => isState.storagePanelSwitch = false, 200);
            this.buttonsClick(btn, btn.stepY, btn.click);
            break;
          }
        }
      } else {
        this.buttonsClick(btn, 0, 0);
      }
    });
  }

}