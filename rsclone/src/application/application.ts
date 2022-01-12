import  Control from "../builder/controller";
import StartPage from "./pages/startPage";
import GameMapPage from "./pages/gameMapPage";
import ShopPage from "./pages/shopPage";
import LevelPage from "./pages/levelPage";
import SettingsPage from "./pages/settingsPage";
import AwardsPage from "./pages/awardsPage";
import AuthorsPage from "./pages/authorsPage";

export default class Application extends Control {
   constructor(parentNode: HTMLElement){
      super(parentNode);
      // preloader

      this.mainCycle();
      
   }
   // главная страница
   private mainCycle(){
      const startPage = new StartPage(this.node);
      startPage.onSelectMap = () => {
         startPage.destroy();
         // preloader
         this.gameMapCycle();
      };
      startPage.onSettings = () => {
         startPage.destroy();
         this.settingsCycle();
      };
      startPage.onAwards = () => {
         startPage.destroy();
         this.awardsCycle();
      };
      startPage.onAuthors = () => {
         startPage.destroy();
         this.awardsCycle();
      };
   }


   // страница карты
   private gameMapCycle(){
      const gameMapPage = new GameMapPage(this.node);
      gameMapPage.onSelectShop = () => {
         gameMapPage.destroy();
         this.shopCycle();
      };
      gameMapPage.startLevel = (levelNumber: number) => {   
         gameMapPage.destroy();
         this.levelCycle();
      };
      gameMapPage.onBack = () => {
         gameMapPage.destroy();
         this.mainCycle();
      };
   }

   // страница магазина
   private shopCycle(){
      const shopPage = new ShopPage(this.node);
      shopPage.gameMapBack = () => {
         shopPage.destroy();
         this.gameMapCycle();
      };
   }

   private levelCycle(){
      const levelPage = new LevelPage(this.node);
      levelPage.gameMapBack = () => {
         levelPage.destroy();
         this.gameMapCycle();
      };
   }

   private settingsCycle(){
      const settingsPage = new SettingsPage(this.node);
      settingsPage.onBack = () => {
         settingsPage.destroy();
         this.mainCycle();      
      };
   }
   private awardsCycle() {
      const awardsPage = new AwardsPage(this.node);
      awardsPage.onBack = () => {
         awardsPage.destroy();
         this.mainCycle();      
      };
   }

   private authorsCycle() {
      const authorsPage = new AuthorsPage(this.node);
      authorsPage.onBack = () => {
         authorsPage.destroy();
         this.mainCycle();      
      };
   }

}