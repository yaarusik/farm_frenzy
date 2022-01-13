import  Control from "./../../builder/controller";

export default class SettingsPage extends Control {
  wrapper: Control<HTMLElement>;
  

  constructor(parentNode: HTMLElement){
      super(parentNode);

    this.wrapper = new Control(this.node, "div", "main", "");
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow);

    const panel = new Control(this.wrapper.node, "div", "panel panel__settings", "");

    const title = new Control(panel.node, "h2", "panel__name-settings", "Настройки");

    const settingsBox = new Control(panel.node, "div", "settings__box", "");

    const soundBox = new Control(settingsBox.node, "div", "sound__box", "");
    const sound = new Control(soundBox.node, "div", "sound", "Звуки");
    sound.node.id = "sound";
    const soundLabel = new Control<HTMLLabelElement>(soundBox.node, "label", "sousound__label", "");
    soundLabel.node.setAttribute("for", "sound");

    const soundInp = new Control<HTMLInputElement>(soundLabel.node, "input", "sousound__input", "");
    soundInp.node.type = "checkbox";

    const musicBox = new Control(settingsBox.node, "div", "music__box", "");
    const music = new Control(musicBox.node, "div", "music", "Музыка");
    music.node.id = "music";
    const musicLabel = new Control<HTMLLabelElement>(musicBox.node, "label", "music__label", "");
    musicLabel.node.setAttribute("for", "music");

    const musicInp = new Control<HTMLInputElement>(musicLabel.node, "input", "music__input", "");
    musicInp.node.type = "checkbox";

    const mainBackBtn = new Control(panel.node, "button", "btn", "ОК");
       mainBackBtn.node.onclick = () => {
          this.onBack();
       };

}

  onBack() {
    throw new Error("Method not implemented.");
  }
  resizeWindow = () =>{
     this.wrapper.node.style.width = String(1140 * (window.innerHeight / 640)) + "px";
  };
}