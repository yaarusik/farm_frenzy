export const soundVal = "50";
export let musicVal = "50";

export function changeVal(val: string) {
    musicVal = val;
}

const musicStart = new Audio();
musicStart.src = "audio/start.mp3";
musicStart.volume = 0.5;

const musicMain = new Audio();
musicMain.src = "audio/main.mp3";
musicMain.volume = 0.5;

export class Music {
    constructor() {
        this.startMusicPlay = this.startMusicPlay.bind(this);
    }

    public changeMusicVolume(val: string) {
        musicVal = val;
        musicStart.volume = +val / 100;
        musicMain.volume = +val / 100;
    }

    public start() {
        window.addEventListener("click", this.startMusicPlay);
    }

    public startMusicPlay() {
        musicStart.play();
        musicStart.addEventListener("ended", this.startMainMusic);

        window.removeEventListener("click", this.startMusicPlay);
    }

    private startMainMusic() {
        musicMain.play();
        musicMain.onended = () => this.startMainMusic();
    }

}