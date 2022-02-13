export const soundVal = "50";
export let musicVal = "50";

export function changeVal(val: string) {
    musicVal = val;
}

const musicStart = new Audio("audio/front_music/start.mp3");
musicStart.volume = 0; // Change on 0.5

const musicMain = new Audio("audio/front_music/main.mp3");
musicMain.volume = 0; // Change on 0.5

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
        window.removeEventListener("click", this.startMusicPlay);
        if (musicMain.paused) {
            musicMain.pause();
            musicMain.currentTime = 0;
            musicStart.play();
            musicStart.addEventListener("ended", this.onMain);
        }
    }

    onStart() {
        musicMain.pause();
        musicMain.currentTime = 0;
        musicStart.currentTime = 0;
        musicStart.play();
    }

    onMain() {
        musicStart.pause();
        musicStart.currentTime = 0;
        musicMain.currentTime = 0;
        musicMain.loop = true;
        musicMain.play();
    }

}