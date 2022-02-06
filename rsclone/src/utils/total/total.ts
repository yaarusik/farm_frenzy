
import Common from "./../../application/common/common";
import { initialData } from "../../application/common/initialData";

export default class Total extends Common {

  level: { one: string; };


  constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);

    this.level = {
      one: '100',
    };

    this.startTotal();
  }

  private startTotal() {
    initialData.totalText.text = this.level.one;
  }

  public render() {
    this.drawText([initialData.totalText]);
  }




}