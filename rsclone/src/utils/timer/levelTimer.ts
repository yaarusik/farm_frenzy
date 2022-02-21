import Picture from "../classes/canvasBtn";
import { endTextData } from "../gameData/endPanelData";
import { timerData, goldCup, silvCup, silvCupText, goldCupText, bestTime, Itime } from "./levelTimerData";
import { initialData } from "../../application/common/initialData";
import { IText } from "../../application/iterfaces";
import { addMoney } from "../shopPageMoney";
import { levelFinish, IlevelFinish } from "../gameData/mapData";
import { startPanelStaticText, IStartPanelText } from "../gameData/startPanelData";

export default class Timer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    min: number;
    sec: number;
    isRunning: boolean;
    strip: { gold: string; silver: string; x: number; y: number; width: number; height: number; };
    goldMin: number;
    goldSec: number;
    silvMin: number;
    silvSec: number;
    textX: number;
    textY: number;
    goldImg: HTMLImageElement;
    silvImg: HTMLImageElement;
    level: number;
    clock: { src: string; x: number; y: number; width: number; height: number; };
    clockImg: HTMLImageElement;
    bonus: string;
    goldCup: HTMLImageElement;
    silvCup: HTMLImageElement;

    constructor (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, level: number) {
        this.canvas = canvas;
        this.context = context;
        this.level = level;
        this.x = 1388;
        this.y = 1183;
        this.min = 0;
        this.sec = 0;
        this.bonus = "";
        this.isRunning = true;
        this.goldMin = timerData[this.level - 1].goldMin;
        this.goldSec = timerData[this.level - 1].goldSec;
        this.silvMin = timerData[this.level - 1].silvMin;
        this.silvSec = timerData[this.level - 1].silvSec;
        this.textX = timerData[this.level - 1].x;
        this.textY = timerData[this.level - 1].y;
        this.strip = {
            gold: "images/level/uiLevel/play_strip.png",
            silver: "images/level/uiLevel/play_strip_silver.png",
            x: 1470,
            y: 1148,
            width: 120,
            height: 48
        };
        this.clock = {
            src: "images/level/uiLevel/play_clock.png",
            x: 1340,
            y: 1150,
            width: 38,
            height: 44,
        };
        this.goldImg = new Image();
        this.goldImg.src = this.strip.gold;

        this.silvImg = new Image();
        this.silvImg.src = this.strip.silver;

        this.clockImg = new Image();
        this.clockImg.src = this.clock.src;

        this.goldCup = new Image();
        this.goldCup.src = goldCup.image;

        this.silvCup = new Image();
        this.silvCup.src = silvCup.image;
    }

    private content(min: number, sec: number) {
        return (min <= 9 ? `0${min}` : min) + ":" + (Math.trunc(sec) <= 9 ? `0${Math.trunc(sec)}` : Math.trunc(sec));
    }

    public drawText() {
        this.context.font = "30px Vag_Rounded-Bold CY";
        this.context.fillStyle = "white";

        if (this.min >= 60) return;
        this.context.fillText(this.content(this.min, this.sec), this.x, this.y);

        if (this.isRunning) this.updateTimer();
        this.drawStrip();
    }

    private updateTimer() {
        if (this.sec >= 60) {
            this.sec = 0;
            this.min += 1;
        }
        this.sec += (1 / 60);
    }

    public drawStrip() {
        const clockImage = new Picture(this.clockImg, this.clock.x, this.clock.y, this.clock.width, this.clock.height);
        clockImage.draw(this.context);

        if (this.min > this.silvMin || (this.min >= this.silvMin && this.sec >= this.silvSec)) return;

        const image = new Picture((this.min >= this.goldMin && this.sec >= this.goldSec ? this.silvImg : this.goldImg), this.strip.x, this.strip.y, this.strip.width, this.strip.height);
        image.draw(this.context);

        if (this.min >= this.goldMin && this.sec >= this.goldSec) {
            this.context.fillStyle = "#f7f9f7";
            this.context.fillText(this.content(this.silvMin, this.silvSec), this.textX, this.textY);
        } else {
            this.context.fillStyle = "yellow";
            this.context.fillText(this.content(this.goldMin, this.goldSec), this.textX, this.textY);
        }
    }

    countBonus() {
        let money;
        const tmData = timerData[this.level - 1];
        if (this.min > this.silvMin || (this.min >= this.silvMin && this.sec >= this.silvSec)) {
            this.bonus = "start";
            this.updateLevelFinish();
            money = tmData.deafultStar;
            addMoney(money);
            return `${money}`;
        }
        else if (this.min >= this.goldMin && this.sec >= this.goldSec) {
            this.bonus = "silver";
            this.updateLevelFinish();
            money = tmData.deafultStar + tmData.silverStar;
            addMoney(money);
            return `${money}`;
        } else money = tmData.deafultStar + tmData.goldStar;

        this.bonus = "gold";
        this.updateLevelFinish();
        addMoney(money);
        return `${money}`;
    }

    updateLevelFinish() {
        let key: keyof IlevelFinish;
        for (key in levelFinish) {
            if (+key === this.level)
                if (levelFinish[key] !== this.bonus) levelFinish[key] = this.bonus;
        }
    }

    showBestTime() {
        startPanelStaticText.forEach(el => {
            if (el.text.length === 5 && el.text.includes(':')) {
                this.updateBestTime();
            }
        });
    }

    updateBestTime() {
        let key: keyof Itime;

        for (key in bestTime) {
            if (key === `${this.level}`) {
                const min = +bestTime[key].split(':')[0];
                const sec = +bestTime[key].split(':')[1];

                if (bestTime[key] === 'null' || (this.min < min || (this.min === min && this.sec < sec))) {
                    bestTime[key] = this.content(this.min, this.sec);
                }
            }
        }
    }

    updateViewTime(level: string) {
        let key: keyof Itime;

        for (key in bestTime) {
            if (+key === +level) {
                if (bestTime[key] === 'null') startPanelStaticText[startPanelStaticText.length - 1].text = '00:00';
                else startPanelStaticText[startPanelStaticText.length - 1].text = bestTime[key];
            }
        }
    }

    showCup() {
        let cupImg;
        if (this.bonus === "start") return;

        if (this.bonus === "silver") {
            endTextData.push(silvCupText);
            cupImg = new Picture(this.silvCup, silvCup.x, silvCup.y, silvCup.width, silvCup.height);
            cupImg.draw(this.context);
        } else if (this.bonus === "gold") {
            endTextData.push(goldCupText);
            cupImg = new Picture(this.goldCup, goldCup.x, goldCup.y, goldCup.width, goldCup.height);
            cupImg.draw(this.context);
        }
    }

    endPanelView() {
        endTextData.forEach(el => {
            if (el.text === 'Время') {
                el.text = this.content(this.min, this.sec);
                this.timeAnimation(el);
            }
            if (el.text === 'Монеты')
                el.text = initialData.totalText.text;
            if (el.text === 'Бонус')
                el.text = this.countBonus();
        });
    }

    timeAnimation(el: IText) {
        this.showBestTime();
        let interval: NodeJS.Timer;
        setTimeout(() => {
            interval = setInterval(() => {
                this.countEndTime(el, interval);
            }, 12);
        }, 1000);
    }

    countEndTime(el: IText, interval: NodeJS.Timer) {
        if (this.sec > 0) {
            this.sec -= 1;
        } else if (this.min > 0) {
            this.sec = 59;
            this.min -= 1;
        } else {
            clearInterval(interval);
        }

        el.text = this.content(this.min, this.sec);
    }

    public checkZeroTime() {
        if (this.min === 0 && Math.trunc(this.sec) === 0) {
            this.showCup();
        }
    }
}