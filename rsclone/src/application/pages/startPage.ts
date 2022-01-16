import  Control from "../../builder/controller";

export default class StartPage extends Control {
   wrapper: Control<HTMLElement>;
   
   constructor(parentNode: HTMLElement){
      super(parentNode);

      this.wrapper = new Control(this.node, "div", "main", "");
      this.resizeWindow();
      window.addEventListener("resize", this.resizeWindow);

      const logo = new Control<HTMLImageElement>(this.wrapper.node, "img", "logo", "");
      logo.node.src = "images/main/logo-ru.png";

      const panel = new Control(this.wrapper.node, "div", "panel", "");

      const greetings = new Control(panel.node, "div", "panel__greet", "Здравствуйте!");
      greetings.node.setAttribute("data-text", "Здравствуйте!");

      const nameInput = new Control<HTMLInputElement>(panel.node, "input", "panel__name", "");
      nameInput.node.type = "text";

      const campaignBtn = new Control<HTMLButtonElement>(panel.node, "button", "btn", "Карьера");
      campaignBtn.node.onclick = () => {
         this.onSelectMap();
      };

      const endlessBtn = new Control<HTMLButtonElement>(panel.node, "button", "btn btn_disabled", "Бесконечная");
      endlessBtn.node.disabled = true;

      const footer = new Control(this.wrapper.node, "footer", "footer", "");

      const settingsBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Настройки");
      settingsBtn.node.onclick = () => {
         this.onSettings();
      };
      const awardsBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Награды");
      awardsBtn.node.onclick = () => {
         this.onAwards();
      };
      const authorsBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Авторы");
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

   resizeWindow = () =>{
      this.wrapper.node.style.width = String(1140 * (window.innerHeight / 640)) + "px";
   };
}