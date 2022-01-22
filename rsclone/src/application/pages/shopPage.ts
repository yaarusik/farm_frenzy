import  Control from "../../builder/controller";
import  { asideBlock, housesBlock, EngineeringBlock, PetsBlock, IContentBlock } from "../../utils/shopPageData";

export default class ShopPage extends Control {
   wrapper: Control<HTMLElement>;

   
   constructor(parentNode: HTMLElement){
      super(parentNode);

      this.wrapper = new Control(this.node, "div", "wrapper shop", "");

      const title = new Control(this.wrapper.node, "h2", "shop__title" ,"");

      const shopMain = new Control(this.wrapper.node, "div", "shop__main" ,"");

      const shopMainBlock = new Control(shopMain.node, "div", "shop__main-block" ,"");
      this.createContentBlocks(shopMainBlock.node, "contantBlock", 12, housesBlock);

      const shopMainAside = new Control(shopMain.node, "div", "shop__main-aside" ,"");
      this.createContentBlocks(shopMainAside.node, "contantAside", 3, asideBlock);

      const shopMainUnder =  new Control(this.wrapper.node, "div", "shop__main-under" ,"");

      const shopMainUnderEngineer =  new Control(shopMainUnder.node, "div", "shop__main-under__engineering" ,"");
      this.createContentBlocks(shopMainUnderEngineer.node, "contantEngineer", 2, EngineeringBlock);

      const shopMainUnderStarsBlock =  new Control(shopMainUnder.node, "div", "shop__main-under__block" ,"");
      const shopMainUnderStars =  new Control(shopMainUnderStarsBlock.node, "div", "shop__main-under__stars" ,"");
      const startAnimation = new Control<HTMLImageElement>(shopMainUnderStars.node, "img", "stars__img" ,"");
      startAnimation.node.src = "../images/shop/star/star_anim.png";
      const starsCounter = new Control(shopMainUnderStars.node, "div", "stars__count" ,"0");
      starsCounter.node.setAttribute("data-amount", "0");

      const shopMainUnderPets =  new Control(shopMainUnder.node, "div", "shop__main-under__pets" ,"");
      this.createContentBlocks(shopMainUnderPets.node, "contantPets", 2, PetsBlock);

      const shopBtn = new Control(shopMainUnderStarsBlock.node, "button", "btn__shop btn", "ОК");
      shopBtn.node.onclick = () => {
         this.gameMapBack();
      };

   }
   gameMapBack() {
      throw new Error("Method not implemented.");
   }

   createContentBlocks(parent: HTMLElement, className: string, count: number, obj?: IContentBlock) {
      if(!obj) {
         for (let i = 0; i < count; i += 1) {
            const contentBlock = new Control(parent, "div", className ,"");
         }
         return;
      }

      let key: keyof IContentBlock;

      for (key in obj) {
         const contentBlock = new Control(parent, "div", className ,"");
         const name = key.split("/")[0];
         const cost = key.split("/")[1];
         const link = obj[key];
         const blockClass = link.split("/").length === 5 ? link.split("/")[3] : link.split("/")[4];

         const contentName = new Control(contentBlock.node, "p", "content__name", name);
         const content = new Control(contentBlock.node, "div", "content" ,"");
         const contentBlockImg = new Control(content.node, "div", "content__block" ,"");
         const contentImg = new Control<HTMLImageElement>(contentBlockImg.node, "img", `${blockClass} content__img` ,"");
         contentImg.node.src = link;
         const contentBtn = new Control<HTMLButtonElement>(content.node, "button", "content__btn", cost);

         const btnImage = new Control<HTMLImageElement>(content.node, "img", "content__btn-img", "");
         btnImage.node.style.right = cost.length > 3 ? "36px" : "40px";
         btnImage.node.src = "../images/shop/star/star_btn.png";
      }

      while (parent.childElementCount < count) {
         const contentBlock = new Control(parent, "div", className ,"");
      }
   }

}