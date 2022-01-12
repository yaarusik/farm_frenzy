import  Control from "./../../builder/controller";

export default class StartPage extends Control {
   

   
   constructor(parentNode: HTMLElement){
      super(parentNode);

      const title = new Control(this.node, "h2", "", "Веселая ферма");


      const nameInput = new Control<HTMLInputElement>(this.node, "input", "", "");
      nameInput.node.type = "text";

      const campaignBtn = new Control<HTMLButtonElement>(this.node, "button", "", "Карьера");
      campaignBtn.node.onclick = () => {
         this.onSelectMap();
      };
      const settingsBtn = new Control<HTMLButtonElement>(this.node, "button", "", "Настройки");
      settingsBtn.node.onclick = () => {
         this.onSettings();
      };
      const awardsBtn = new Control<HTMLButtonElement>(this.node, "button", "", "Награды");
      awardsBtn.node.onclick = () => {
         this.onAwards();
      };
      const authorsBtn = new Control<HTMLButtonElement>(this.node, "button", "", "Авторы");
      authorsBtn.node.onclick = () => {
         this.onAuthors();
      };
   }
   onSettings() {
      throw new Error("Method not implemented.");
   }
   onAwards() {
      throw new Error("Method not implemented.");
   }
   onAuthors() {
      throw new Error("Method not implemented.");
   }
   onSelectMap() {
      throw new Error("Method not implemented.");
   }

}