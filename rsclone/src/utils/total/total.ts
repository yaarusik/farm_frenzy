
import Common from "./../../application/common/common";
import { initialData } from "../../application/common/initialData";
import { IKeyString } from "../../application/iterfaces";

export default class Total extends Common {

  levelTotal: IKeyString;
  level: string;



  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: number) {
    super(canvas, context);

    this.level = level.toString();

    this.levelTotal = {
      '1': '10000',
      '2': '90',
      '3': '190',
    };



    this.startTotal();
  }

  private startTotal() {
    initialData.totalText.text = this.levelTotal[this.level];
  }



  public render() {
    this.drawText([initialData.totalText]);
  }




}