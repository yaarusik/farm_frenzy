export let soundVal = "50";
export let musicVal = "50";

let soundMusic = new Audio();
soundMusic.volume = 0.5;
const vol = {
    vol: 0.5
};

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
        vol.vol = +val / 100;
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
        audio.volume = vol.vol;
    }

    // CHICKEN

    public onChicken() {
        this.musicCreate("audio/chicken/chicken_voice.wav");
    }
    public chickenDie() {
        this.musicCreate("audio/chicken/chicken_die.wav");
    }
    public chickenFly() {
        this.musicCreate("audio/chicken/chicken_flyout.wav");
    }

    // CAR

    public car() {
        this.musicCreate("audio/car/car_came.wav");
    }
    // BEAR
    public bearAppiarance() {
        this.musicCreate("audio/bear/bear0_panda_scream.wav");
    }

    public cageCreate() {
        this.musicCreate("audio/cage/cage_click.wav");

    }

    public cageBroke() {
        this.musicCreate("audio/cage/cage_broke_bear_flee.wav");
    }

    public wellBevavior() {
        this.musicCreate("audio/well/action_well.wav");

    }
    public wellDisable() {
        this.musicCreate("audio/well/action_well_auto.wav");
    }

    public graceBevavior() {
        this.musicCreate("audio/grace/action_watering.wav");
    }
    public graceDisable() {
        this.musicCreate("audio/grace/fool_action.wav");
    }

    public btnClick() {
        this.musicCreate("audio/buttons/ui_button_click.wav");
    }

    public houseClick() {
        this.musicCreate("audio/house/house_click.wav");
    }

    public productDone() {
        this.musicCreate("audio/products/product_crack.wav");
    }

    public truncAdd() {
        this.musicCreate("audio/miniCarAdd/item_add.wav");
    }
    public truncCancel() {
        this.musicCreate("audio/miniCarAdd/item_cancel.wav");
    }

    public fanfareMedal() {
        this.musicCreate("audio/end/fanfare_medal.wav");
    }

    private musicCreate(src: string) {
        soundMusic = new Audio();
        this.UpdateMusic(soundMusic);
        soundMusic.src = src;
        soundMusic.play();
    }

}