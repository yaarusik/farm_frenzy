import  Control from "./../../builder/controller";

export default class ShopPage extends Control {
   wrapper: Control<HTMLElement>;

   
   constructor(parentNode: HTMLElement){
      super(parentNode);

      this.wrapper = new Control(this.node, "div", "wrapper shop", "");

      const title = new Control(this.wrapper.node, "h2", "shop__title" ,"");

      const shopMain = new Control(this.wrapper.node, "div", "shop__main" ,"");

      const shopMainBlock = new Control(shopMain.node, "div", "shop__main-block" ,"");
      this.createContentBlocks(shopMainBlock.node, "contantBlock", 12);

      const shopMainAside = new Control(shopMain.node, "div", "shop__main-aside" ,"");
      this.createContentBlocks(shopMainAside.node, "contantAside", 3);

      const shopMainUnder =  new Control(this.wrapper.node, "div", "shop__main-under" ,"");

      const shopMainUnderEngineer =  new Control(shopMainUnder.node, "div", "shop__main-under__engineering" ,"");
      this.createContentBlocks(shopMainUnderEngineer.node, "contantEngineer", 2);

      const shopMainUnderStarsBlock =  new Control(shopMainUnder.node, "div", "shop__main-under__block" ,"");
      const shopMainUnderStars =  new Control(shopMainUnderStarsBlock.node, "div", "shop__main-under__stars" ,"");
      const starsCounter = new Control(shopMainUnderStars.node, "div", "stars__count" ,"0");
      starsCounter.node.setAttribute("data-amount", "0");

      const shopMainUnderPets =  new Control(shopMainUnder.node, "div", "shop__main-under__pets" ,"");
      this.createContentBlocks(shopMainUnderPets.node, "contantPets", 2);

      const shopBtn = new Control(shopMainUnderStarsBlock.node, "button", "btn__shop btn", "ОК");
      shopBtn.node.onclick = () => {
         this.gameMapBack();
      };

   }
   gameMapBack() {
      throw new Error("Method not implemented.");
   }

   createContentBlocks(parent: HTMLElement, className: string, count: number) {
      for (let i = 0; i < count; i += 1) {
         const contentBlock = new Control(parent, "div", className ,"");
         contentBlock.node.id = `${className}-${i}`;
      }
   }

}