import Control from "./../../builder/controller";
import ButtonEffect from "./../../builder/button";
import { Music } from "../../utils/music/music";
import Backend from "../../utils/backend/backend";
import { ResponseSign } from "../types";

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

    const messageBox = new Control(panel.node, "div", "panel__msg", "");

    loginBtn.node.onclick = () => {
      const name = nameInput.node.value;
      const password = passInput.node.value;
      this.backend.login(name, password).then((res : ResponseSign) => {
        if (!res){
          messageBox.node.textContent = 'Что-то пошло не так';
          return;
        }
        // console.log("Final: ", res);
        messageBox.node.textContent = res.message;
        if (res.message === 'Авторизация прошла успешно'){
          // console.log('Log: Вошёл в аккаунт с ником: ', name);
          this.backend.updateUser(name, password);
          this.backend.updateFrom(res.levelInfo, res.mapInfo, res.moneyInfo);
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

    const signBtn = new Control(footer.node, "button", "btn", "Регистрация");
    this.buttonEffect.devideButton(signBtn.node);
    signBtn.node.onclick = () => {
      this.onReg();  
    };  
  }

  onBack() {
    throw new Error("Method not implemented.");    
  }

  onReg() {
    throw new Error("Method not implemented.");    
  }

  resizeWindow = () => {
    this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
  };
}