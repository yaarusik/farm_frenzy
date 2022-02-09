import Control from "./../../builder/controller";
import ButtonEffect from "./../../builder/button";

export default class StartPage extends Control {
   wrapper: Control<HTMLElement>;
   buttonEffect = new ButtonEffect();

   constructor (parentNode: HTMLElement, tagName: string, className: string) {
      super(parentNode, tagName, className);

      this.wrapper = new Control(this.node, "div", "wrapper main", "");
      this.resizeWindow();
      window.addEventListener("resize", this.resizeWindow);

      const logo = new Control<HTMLImageElement>(this.wrapper.node, "img", "logo", "");
      logo.node.src = "images/main/logo-ru.png";

      const panel = new Control(this.wrapper.node, "div", "panel", "");

      const greetings = new Control(panel.node, "div", "title panel__greet", "Здравствуйте!");

      greetings.node.setAttribute("data-text", "Здравствуйте!");

      const nameInput = new Control<HTMLInputElement>(panel.node, "input", "panel__name", "");
      nameInput.node.type = "text";

      const campaignBtn = new Control<HTMLButtonElement>(panel.node, "button", "btn", "Карьера");
      this.buttonEffect.devideButton(campaignBtn.node);
      campaignBtn.node.onclick = () => {
         this.onSelectMap();
      };

      const endlessBtn = new Control<HTMLButtonElement>(panel.node, "button", "btn btn_disabled", "Бесконечная");
      this.buttonEffect.devideButton(endlessBtn.node);
      endlessBtn.node.disabled = true;

      const footer = new Control(this.wrapper.node, "footer", "footer", "");

      const settingsBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Настройки");
      this.buttonEffect.devideButton(settingsBtn.node);
      settingsBtn.node.onclick = () => {
         this.onSettings();
      };
      const awardsBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Награды");
      this.buttonEffect.devideButton(awardsBtn.node);
      awardsBtn.node.onclick = () => {
         this.onAwards();
      };
      const authorsBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Авторы");
      this.buttonEffect.devideButton(authorsBtn.node);
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

   resizeWindow = () => {
      this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
   };
}