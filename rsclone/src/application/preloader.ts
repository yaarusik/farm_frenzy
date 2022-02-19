import Control from "../builder/controller";

export default class Preloader extends Control {
  hidden: Control<HTMLImageElement>;
  waitTime: number;
  constructor (parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.waitTime = 200;

    const logo = new Control<HTMLImageElement>(this.node, "div", 'preloader__logo', '');
    this.render('../images/main/logo-ru.png', logo.node);

    const load = new Control<HTMLImageElement>(this.node, "div", 'preloader__load', '');
    this.render("images/preloader/load.png", load.node);

    this.hidden = new Control<HTMLImageElement>(load.node, "div", 'preloader__hidden', '');
    const loadProgress = new Control<HTMLImageElement>(null, "img", 'preloader__progress', '');
    loadProgress.node.src = 'images/preloader/load-progress.png';
    loadProgress.node.onload = () => {
      this.hidden.node.append(loadProgress.node);
      this.hidden.node.style.animation = `preloader 4s ease 1s forwards`;
    };
  }

  public hide(preloader: HTMLElement) {
    setTimeout(() => {
      this.hidden.node.style.overflow = 'visible';
      this.preloaderHide(preloader);
    }, this.waitTime);

  }

  private render(src: string, parent: HTMLElement) {
    const img = document.createElement("img");
    img.onload = () => parent.style.backgroundImage = `url(${src})`;
    img.src = src;
  }

  public preloaderHide(preloader: HTMLElement) {
    setTimeout(() => preloader.classList.add('preloader__hide'), this.waitTime);
    setTimeout(() => preloader.remove(), 1000);
  }








}