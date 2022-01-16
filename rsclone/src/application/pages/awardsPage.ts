import  Control from "../../builder/controller";

export default class AwardsPage extends Control {
  

  constructor(parentNode: HTMLElement){
      super(parentNode);

   const title = new Control(this.node, "h2", "", "Награды");

   const mainBackBtn = new Control(this.node, "button", "", "ОК");
      mainBackBtn.node.onclick = () => {
         this.onBack();
      };

}

  onBack() {
    throw new Error("Method not implemented.");
  }
}