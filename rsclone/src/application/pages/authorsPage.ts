import Control from "./../../builder/controller";
import ButtonEffect from "./../../builder/button";
import { IKeyString } from "../iterfaces";


export default class AuthorsPage extends Control {
  wrapper: Control<HTMLElement>;
  buttonEffect = new ButtonEffect();
  auforInform: {
    [key: string]: IKeyString;
  };

  constructor (parentNode: HTMLElement) {
    super(parentNode);

    this.auforInform = {
      ruslan: {
        img: 'images/author/Ruslan.jpg',
        git: 'https://github.com/yaarusik',
        role: 'Team lead, Frontend developer',
        name: "Руслан"
      },
      yakov: {
        img: 'images/author/author-back.jpg',
        git: 'https://github.com/YakovLya',
        role: 'Frontend/Backend developer',
        name: "Яков"
      },
      serafim: {
        img: 'images/author/author-back.jpg',
        git: 'https://github.com/Jirafek',
        role: 'Frontend developer',
        name: "Серафим"
      }
    };

    this.wrapper = new Control(this.node, "div", "wrapper author", "");
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow);

    const title = new Control(this.wrapper.node, "h2", "title author__title", "Авторы");
    title.node.setAttribute("data-text", "Авторы");

    const authorList = new Control<HTMLUListElement>(this.wrapper.node, "section", "author__list", "");
    this.authorWrapper(authorList.node, this.auforInform.ruslan);
    this.authorWrapper(authorList.node, this.auforInform.yakov);
    this.authorWrapper(authorList.node, this.auforInform.serafim);


    const mainBackBtn = new Control(this.wrapper.node, "button", "btn btn_close", "ОК");
    this.buttonEffect.devideButton(mainBackBtn.node);
    mainBackBtn.node.onclick = () => {
      this.onBack();
    };
  }

  onBack() {
    throw new Error("Method not implemented.");
  }

  resizeWindow = () => {
    this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
  };

  private authorWrapper(parent: HTMLElement, userInform: IKeyString) {
    const authorWrapper = new Control(parent, "div", 'author__wrapper');
    const authorBlock = new Control(authorWrapper.node, "div", 'author__block');
    const authorImg = new Control<HTMLImageElement>(authorBlock.node, "img", 'author__img');
    authorImg.node.src = userInform.img;
    authorImg.node.onload = () => {
      const authorFirst = new Control<HTMLAnchorElement>(authorWrapper.node, "a", "author__item", userInform.name);
      authorFirst.node.href = userInform.git;
      authorFirst.node.target = '_blank';
      const authorRole = new Control(authorWrapper.node, "p", 'author__role', userInform.role);
    };

  }
}