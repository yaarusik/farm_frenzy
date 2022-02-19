import Control from "./../../builder/controller";
import ButtonEffect from "./../../builder/button";
import { Music } from "../../utils/music/music";
import Backend from "../../utils/backend/backend";
import { ResponseSign } from "../types";

export default class RegPage extends Control {
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

    const greetings = new Control(panel.node, "div", "title panel__greet", "С присоединением!");
    greetings.node.setAttribute("data-text", "С присоединением!");

    const nameInput = new Control<HTMLInputElement>(panel.node, "input", "panel__name", "");
    nameInput.node.type = "text";
    nameInput.node.placeholder = "Фермерское имя";

    const passInput = new Control<HTMLInputElement>(panel.node, "input", "panel__name", ""); // Такой класс работает и ладно
    passInput.node.type = "password";
    passInput.node.placeholder = "Пароль";
    
    const regBtn = new Control<HTMLButtonElement>(panel.node, "button", "btn", "Начнём!");
    this.buttonEffect.devideButton(regBtn.node);

    const messageBox = new Control(panel.node, "div", "panel__msg", "");

    regBtn.node.onclick = () => {
      const name = nameInput.node.value;
      const password = passInput.node.value;
      this.backend.register(name, password).then((res : ResponseSign) => {
        if (!res){
          messageBox.node.textContent = 'Что-то пошло не так';
          return;
        }
        console.log("Final: ", res);
        messageBox.node.textContent = res.message;
        if (res.message.includes('Создан новый пользователь с ником ')){
          console.log('Log: Создал и вошёл в аккаунт с ником: ', name);
          this.backend.updateUser(name, password);
          setTimeout(() => {
            this.onBack();
          }, 750);
        }
      });
    };


    const footer = new Control(this.wrapper.node, "footer", "footer", "");

    const mainBackBtn = new Control<HTMLButtonElement>(footer.node, "button", "btn", "Меню");
      this.buttonEffect.devideButton(mainBackBtn.node);
      mainBackBtn.node.onclick = () => {
         this.onBack();
      };

    const loginBtn = new Control(footer.node, "button", "btn", "Авторизация");
    this.buttonEffect.devideButton(loginBtn.node);
    loginBtn.node.onclick = () => {
      this.onLogin();
    };  
  }

  onBack() {
    throw new Error("Method not implemented.");    
  }

  onLogin() {
    throw new Error("Method not implemented.");    
  }

  resizeWindow = () => {
    this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
  };
}