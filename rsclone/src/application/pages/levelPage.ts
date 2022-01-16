import  Control from "../../builder/controller";

export default class LevelPage extends Control {
  

   
   constructor(parentNode: HTMLElement){
      super(parentNode);

   const title = new Control(this.node, "h2", "", "Уровень начался");

   // временная кнопка
   const mapBtn = new Control(this.node, "button", "", "карта");
   mapBtn.node.onclick = () => {
      this.gameMapBack();
   };

   }
   gameMapBack() {
      throw new Error("Method not implemented.");
   }
 
 
   



}