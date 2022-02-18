import Control from "./../../builder/controller";
import ButtonEffect from "./../../builder/button";
import { Music } from "../../utils/music/music";
import Backend from "../../utils/backend/backend";

export default class LoginPage extends Control {
  wrapper: Control<HTMLElement>;
  buttonEffect = new ButtonEffect();
  music: Music;
  backend: Backend;

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.wrapper = new Control(this.node, "div", "wrapper main", "");
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow);

    this.music = new Music();
    this.backend = new Backend();

    const logo = new Control<HTMLImageElement>(this.wrapper.node, "img", "logo", "");
    logo.node.src = "images/main/logo-ru.png";

    const panel = new Control(this.wrapper.node, "div", "panel panel_login", "");

    const greetings = new Control(panel.node, "div", "title panel__greet", "С возвращением!");
    greetings.node.setAttribute("data-text", "С возвращением!");

    const nameInput = new Control<HTMLInputElement>(panel.node, "input", "panel__name", "");
    nameInput.node.type = "text";
    nameInput.node.placeholder = "Фермерское имя";

    const passInput = new Control<HTMLInputElement>(panel.node, "input", "panel__name", ""); // Такой класс работает и ладно
    passInput.node.type = "password";
    passInput.node.placeholder = "Пароль";
    
    const loginBtn = new Control<HTMLButtonElement>(panel.node, "button", "btn", "Войти");
    this.buttonEffect.devideButton(loginBtn.node);
    loginBtn.node.onclick = () => {
      const name = nameInput.node.value;
      const password = passInput.node.value;
      const status = this.backend.login(name, password);
      console.log(status);
    };

    const footer = new Control(this.wrapper.node, "footer", "footer", "");

    const mainBackBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Меню");
      this.buttonEffect.devideButton(mainBackBtn.node);
      mainBackBtn.node.onclick = () => {
         this.onBack();
      };

    const signBtn = new Control(footer.node, "button", "btn", "Регистрация");
    this.buttonEffect.devideButton(signBtn.node);
    signBtn.node.onclick = () => {
      throw new Error("Method not implemented.");    
    };  
  }

  onBack() {
    throw new Error("Method not implemented.");    
  }

  resizeWindow = () => {
    this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
  };
}