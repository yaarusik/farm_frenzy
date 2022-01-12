import  Control from "./../../builder/controller";

export default class ShopPage extends Control {
  

   
   constructor(parentNode: HTMLElement){
      super(parentNode);

      const title = new Control(this.node, "h2", "" ,"Магазин");


      const shopBtn = new Control(this.node, "button", "", "ОК");
      shopBtn.node.onclick = () => {
         this.gameMapBack();
      };

   }
   gameMapBack() {
      throw new Error("Method not implemented.");
   }
 
   



}