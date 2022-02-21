import Control from "../../builder/controller";
import { Music } from "../../utils/music/music";
import { houses, aside, Engineering, Pets, IcontentData } from "../../utils/shopPageData";
import { startMoney, setMoney, moneyBlock, setMoneyWindow, currentContent } from "../../utils/shopPageMoney";
import Preloader from "./../preloader";

export default class ShopPage extends Control {
   wrapper: Control<HTMLElement>;
   preloader: Preloader;
   music: Music;


   constructor (parentNode: HTMLElement, preloader: Preloader) {
      super(parentNode);
      this.preloader = preloader;
      this.wrapper = new Control(this.node, "div", "wrapper shop", "");
      this.music = new Music();

      const title = new Control(this.wrapper.node, "h2", "shop__title", "");

      const shopMain = new Control(this.wrapper.node, "div", "shop__main", "");

      const shopMainBlock = new Control(shopMain.node, "div", "shop__main-block", "");
      this.createContentBlocks(shopMainBlock.node, "contantBlock", 12, "5", houses);

      const shopMainAside = new Control(shopMain.node, "div", "shop__main-aside", "");
      this.createContentBlocks(shopMainAside.node, "contantAside", 3, "3", aside);

      const shopMainUnder = new Control(this.wrapper.node, "div", "shop__main-under", "");

      const shopMainUnderEngineer = new Control(shopMainUnder.node, "div", "shop__main-under__engineering", "");
      this.createContentBlocks(shopMainUnderEngineer.node, "contantEngineer", 2, "3", Engineering);

      const shopMainUnderStarsBlock = new Control(shopMainUnder.node, "div", "shop__main-under__block", "");
      const shopMainUnderStars = new Control(shopMainUnderStarsBlock.node, "div", "shop__main-under__stars", "");
      const startAnimation = new Control<HTMLImageElement>(shopMainUnderStars.node, "img", "stars__img", "");
      startAnimation.node.src = "../images/shop/star/star_anim.png";
      const starsCounter = new Control(shopMainUnderStars.node, "div", "stars__count", startMoney);
      starsCounter.node.setAttribute("data-amount", startMoney);
      setMoneyWindow(starsCounter);

      const shopMainUnderPets = new Control(shopMainUnder.node, "div", "shop__main-under__pets", "");
      this.createContentBlocks(shopMainUnderPets.node, "contantPets", 2, "3", Pets);

      const shopBtn = new Control(shopMainUnderStarsBlock.node, "button", "btn__shop btn", "ОК");
      shopBtn.node.onclick = () => {
         this.music.btnClick();
         this.gameMapBack();
      };

      this.preloader.hide(this.preloader.node);

   }
   gameMapBack() {
      throw new Error("Method not implemented.");
   }

   createContentBlocks(parent: HTMLElement, className: string, count: number, maxStage: string,
      obj: IcontentData) {
      let key: keyof IcontentData;

      for (key in obj) {
         const contentBlock = new Control(parent, "div", className, "");
         contentBlock.node.setAttribute("curstage", `${obj[key].currentStage}`);
         contentBlock.node.setAttribute("maxstage", maxStage);
         contentBlock.node.setAttribute("costs", obj[key].costs);
         const currentStage = obj[key].currentStage;
         const allCosts = obj[key].costs;
         const name = obj[key].name;
         const cost = obj[key].costs.split("/")[+currentStage - 1];
         const link = obj[key].src.split("-")[0] + `-0${obj[key].currentStage}.png`;
         const nameBlock = obj[key].name;
         const blockClass = link.split("/").length === 5 ? link.split("/")[3] : link.split("/")[4];

         const contentName = new Control(contentBlock.node, "p", "content__name", name);
         const content = new Control(contentBlock.node, "div", "content", "");
         const contentBlockImg = new Control(content.node, "div", "content__block", "");
         const contentImg = new Control<HTMLImageElement>(contentBlockImg.node, "img", `${blockClass} content__img`, "");
         contentImg.node.src = link;
         const contentBtn = new Control<HTMLButtonElement>(content.node, "button", "content__btn", cost);

         const btnImage = new Control<HTMLImageElement>(content.node, "img", "content__btn-img", "");
         btnImage.node.style.right = cost.length > 3 ? "36px" : "40px";
         btnImage.node.src = "../images/shop/star/star_btn.png";

         this.setBackground(contentBlockImg, cost);
         this.setButtonStyle(contentBtn, cost);

         contentBtn.node.onclick = () => this.shopButtonClick(contentBlock, contentBtn,
            contentImg, link, allCosts, obj, nameBlock);

         currentContent.push(contentBlock);

         this.updateShopBackground();
      }

      while (parent.childElementCount < count) {
         const contentBlock = new Control(parent, "div", className, "");
      }
   }

   setBackground(htmlBlock: Control<HTMLElement>, cost: string) {
      htmlBlock.node.style.backgroundImage = `url(${+cost <= +startMoney ?
         "../images/shop/layers/shop_layer-blue.png" : "../images/shop/layers/shop_layer-grey.png"})`;
   }

   setButtonStyle(btn: Control<HTMLButtonElement>, cost: string) {
      if (+cost <= +startMoney) {
         btn.node.style.transform = "translate(-50%)";
         btn.node.classList.add("btn");
      }
   }

   shopButtonClick(contentBlock: Control<HTMLElement>, btn: Control<HTMLButtonElement>,
      img: Control<HTMLImageElement>, link: string, allCosts: string, fullObbject: IcontentData, name: string) {
      this.music.btnClick();
      let key: keyof IcontentData;
      let curStage;

      for (key in fullObbject) {
         if (fullObbject[key].name === name) {
            fullObbject[key].currentStage += 1;
            curStage = fullObbject[key].currentStage;
         }
      }
      const maxStage = contentBlock.node.getAttribute("maxstage");

      if (!maxStage || !curStage) return;
      if (+maxStage === (curStage - 1)) return;
      const cost = allCosts.split("/")[curStage - 2];
      if (+startMoney < +cost) return;

      const currentCount = `${+startMoney - +cost}`;
      setMoney(currentCount);

      moneyBlock.node.style.animationName = "money_anim";
      moneyBlock.node.onanimationend = () => {
         moneyBlock.node.style.animationName = "money_backAnim";
         moneyBlock.node.textContent = currentCount;
      };

      contentBlock.node.setAttribute("curstage", `${curStage}`);


      const newLink = link.split("-")[0] + `-0${curStage}.png`;
      const newCost = allCosts.split("/")[curStage - 1];

      this.updateShopData(btn, img, newLink, newCost);
   }

   updateShopData(btn: Control<HTMLButtonElement>, img: Control<HTMLImageElement>,
      link: string, cost: string) {
      btn.node.textContent = cost;
      img.node.src = link;

      this.updateShopBackground();
   }

   updateShopBackground() {
      currentContent.forEach(el => {
         const currentStage = el.node.getAttribute("curstage");
         const maxStage = el.node.getAttribute("maxstage");
         const costs = el.node.getAttribute("costs");

         if (!currentStage || !costs || !maxStage) return;

         const currentCost = costs.split("/")[+currentStage - 1];

         const currentBlock = <HTMLElement>el.node.childNodes[1];
         const BackgroundBlock = <HTMLElement>currentBlock.childNodes[0];
         const button = <HTMLElement>currentBlock.childNodes[1];
         const star = <HTMLElement>currentBlock.childNodes[2];

         if (+maxStage === +currentStage) {
            BackgroundBlock.style.backgroundImage = "none";
            button.style.zIndex = "-2";
            star.style.zIndex = "-2";
            const maxLevel = new Control(currentBlock, "div", "level__max", "");
         } else if (+currentCost > +startMoney) {
            BackgroundBlock.style.backgroundImage = "url(../images/shop/layers/shop_layer-grey.png)";
            button.classList.remove("btn");
         }
      });
   }

}