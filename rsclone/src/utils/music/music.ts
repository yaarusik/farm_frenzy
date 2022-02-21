export let soundVal = "50";
export let musicVal = "50";

const soundMusic = new Audio();
soundMusic.volume = 0.5;

const musicStart = new Audio("audio/front_music/start.mp3");
musicStart.volume = 0; // Change on 0.5

const musicMain = new Audio("audio/front_music/main.mp3");
musicMain.volume = 0; // Change on 0.5

export class Music {
    constructor () {
        this.startMusicPlay = this.startMusicPlay.bind(this);
    }

    public changeMusicVolume(val: string) {
        musicVal = val;
        musicStart.volume = +val / 100;
        musicMain.volume = +val / 100;
    }

    public changeSoundVolume(val: string) {
        soundVal = val;
        soundMusic.volume = +val / 100;
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

    public onStart() {
        musicMain.pause();
        musicMain.currentTime = 0;
        musicStart.currentTime = 0;
        musicStart.play();
    }

    public onMain() {
        musicStart.pause();
        musicStart.currentTime = 0;
        musicMain.currentTime = 0;
        musicMain.loop = true;
        musicMain.play();
    }

    private UpdateMusic(audio: HTMLAudioElement) {
        audio.pause();
        audio.currentTime = 0;
    }

    // CHICKEN

    public onChicken() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/chicken/chicken_voice.wav";
        soundMusic.play();
    }
    public chickenDie() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/chicken/chicken_die.wav";
        soundMusic.play();
    }
    public chickenHungry() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/chicken/chicken_hungry.wav";
        soundMusic.play();
    }

    // CAR

    public car() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/car/car_came.wav";
        soundMusic.play();
    }

    // BEAR

    public bearAppiarance() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/bear/bear_landing.wav";
        soundMusic.play();
    }

    public wellBevavior() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/well/action_well.wav";
        soundMusic.play();
    }
    public wellDisable() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/well/action_well_auto.wav";
        soundMusic.play();
    }

    public graceBevavior() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/grace/action_watering.wav";
        soundMusic.play();
    }
    public graceDisable() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/grace/fool_action.wav";
        soundMusic.play();
    }

    public btnClick() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/buttons/ui_button_click.wav";
        soundMusic.play();
    }

    public houseClick() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/house/house_click.wav";
        soundMusic.play();
    }

    public productDone() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/products/product_crack.wav";
        soundMusic.play();
    }

    public truncAdd() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/miniCarAdd/item_add.wav";
        soundMusic.play();
    }
    public truncCancel() {
        this.UpdateMusic(soundMusic);
        soundMusic.src = "audio/miniCarAdd/item_cancel.wav";
        soundMusic.play();
    }

}