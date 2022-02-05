export default class Timer {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    min: number;
    sec: number;
    isRunning: boolean;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.x = 1388;
        this.y = 1183;
        this.min = 0;
        this.sec = 0;
        this.isRunning = true;
    }

    content() {
        return (this.min <= 9 ? `0${this.min}` : this.min) + ":" + (this.sec <= 10 ? `0${Math.trunc(this.sec)}` : Math.trunc(this.sec));
    }

    drawText() {
        this.context.font = "30px Vag_Rounded-Bold CY";
        this.context.fillStyle = "white";

        if (this.min >= 60) return;
        this.context.fillText(this.content(), this.x, this.y);

        if (this.isRunning) this.updateTimer();
    }

    updateTimer() {
        if (this.sec >= 60) {
            this.sec = 0;
            this.min += 1;
        }
        this.sec += (1 / 60);
    }
}