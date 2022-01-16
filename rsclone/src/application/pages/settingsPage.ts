import  Control from "../../builder/controller";

export default class SettingsPage extends Control {
  wrapper: Control<HTMLElement>;
  
  constructor(parentNode: HTMLElement){
    super(parentNode);

    this.wrapper = new Control(this.node, "div", "wrapper main", "");
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow);

    const panel = new Control(this.wrapper.node, "div", "panel panel__settings", "");

    const title = new Control(panel.node, "div", "panel__name-settings", "");

    const settingsBox = new Control(panel.node, "div", "settings__box", "");

    const soundBox = new Control(settingsBox.node, "div", "sound__box", "");
    const soundText = new Control(soundBox.node, "div", "sound", "Звуки");

    const soundBar = new Control(soundBox.node, "div", "sound__bar", "");

    const soundMinVolume = new Control(soundBar.node, "div", "sound__volume-min settings__volume", "");
    this.createRangeInput(soundBar.node, "sound__input settings__range");
    const soundMaxVolume = new Control(soundBar.node, "div", "sound__volume-max settings__volume", "");

    const soundLine = new Control(soundBar.node, "div", "settings__line", "");


    const musicBox = new Control(settingsBox.node, "div", "music__box", "");
    const musicText = new Control(musicBox.node, "div", "music", "Музыка");

    const musicBar = new Control(musicBox.node, "div", "music__bar", "");

    const musicMinVolume = new Control(musicBar.node, "div", "music__volume-min settings__volume", "");
    this.createRangeInput(musicBar.node, "music__input settings__range");
    const musicMaxVolume = new Control(musicBar.node, "div", "music__volume-max settings__volume", "");

    const musicLine = new Control(musicBar.node, "div", "settings__line", "");

    const fullScreenBox = new Control(settingsBox.node, "div", "screen__box", "На весь экран");
    const fullScreenCheckBox = new Control<HTMLInputElement>(fullScreenBox.node, "input", "settings__checkbox", "");
    fullScreenCheckBox.node.id = "fullScreen";
    fullScreenCheckBox.node.type = "checkbox";
    const fullScreenLabel = new Control<HTMLLabelElement>(fullScreenBox.node, "label", "fullScreen__label", "");
    fullScreenLabel.node.setAttribute("for", "fullScreen");
    const checkedInput = new Control(fullScreenLabel.node, "div", "input__checked", "");

    const mainBackBtn = new Control(panel.node, "button", "btn__settings btn", "ОК");
       mainBackBtn.node.onclick = () => {
          this.onBack();
       };

}
  createRangeInput(parent: HTMLElement, className: string) {
    const input = new Control<HTMLInputElement>(parent, "input", className, "");
    input.node.type = "range";
    input.node.min = "0";
    input.node.max = "100";
    input.node.step = "1";
  }

  onBack() {
    throw new Error("Method not implemented.");
  }
  resizeWindow = () =>{
    this.wrapper.node.style.width = String(800 * (window.innerHeight / 600)) + "px";
  }
}