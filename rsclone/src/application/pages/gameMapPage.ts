import  Control from "./../../builder/controller";

export default class GameMapPage extends Control {
   onSelectShop!: () => void;
   startLevel!: (levelNumber: number) => void;
   onBack!: () => void;

   

   
   constructor(parentNode: HTMLElement){
      super(parentNode);

      const title = new Control(this.node, "h2", "", "Карта");


      const shopBtn = new Control(this.node, "button", "", "Магазин");
      shopBtn.node.onclick = () => {
         this.onSelectShop();
      };

      const levelList = [1,2,3,4,5];
      const levelButtons = levelList.map( item => {
         const button = new Control(this.node, "button", "", `Уровень ${item.toString()}`);
         button.node.onclick = () => {
            this.startLevel(item);
         };
      });

      const mainBackBtn = new Control(this.node, "button", "", "Меню");
      mainBackBtn.node.onclick = () => {
         this.onBack();
      };
   }
 
   



}