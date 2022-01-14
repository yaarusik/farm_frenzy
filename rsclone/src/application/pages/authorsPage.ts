import  Control from "./../../builder/controller";

export default class AuthorsPage extends Control {
  wrapper: Control<HTMLElement>;

  constructor(parentNode: HTMLElement){
    super(parentNode);

    this.wrapper = new Control(this.node, "div", "wrapper author", "");
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow);

    const title = new Control(this.wrapper.node, "h2", "title author__title", "Авторы");
    title.node.setAttribute("data-text", "Авторы");

    const status = new Control(this.wrapper.node, "div", "author__status", "Программисты");

    const authorList = new Control<HTMLUListElement>(this.wrapper.node, "ul", "author__list", "");

    const authorFirst = new Control<HTMLLIElement>(authorList.node, "li", "author__item", "Руслан");

    const authorSecond = new Control<HTMLLIElement>(authorList.node, "li", "author__item", "Яков");

    const authorThird = new Control<HTMLLIElement>(authorList.node, "li", "author__item", "Серафим");

    const mainBackBtn = new Control(this.wrapper.node, "button", "btn btn_close", "ОК");
    mainBackBtn.node.onclick = () => {
      this.onBack();
    };
  }

  onBack() {
    throw new Error("Method not implemented.");
  }

  resizeWindow = () =>{
    this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
  }
}