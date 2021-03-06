export const goldCup = {
    image: "images/level/panels/complete_gold_cup.png",
    x: 920,
    y: 280,
    width: 250,
    height: 250,
};

export const goldCupText = {
    text: 'ЗОЛОТОЙ',
    fontSize: '40px Vag_Rounded-Bold CY',
    color: 'yellow',
    x: 950,
    y: 620,
    animation: false,
};

export const silvCup = {
    image: "images/level/panels/complete_silver_cup.png",
    x: 920,
    y: 280,
    width: 250,
    height: 250,
};

export const silvCupText = {
    text: 'СЕРЕБРЯНЫЙ',
    fontSize: '40px Vag_Rounded-Bold CY',
    color: '#f7f9f7',
    x: 930,
    y: 620,
    animation: false,
};

export const timerData = [
    {
        deafultStar: 25,
        goldStar: 75,
        silverStar: 25,
        x: 1495,
        y: 1183,
        goldMin: 1,
        goldSec: 0,
        silvMin: 2,
        silvSec: 0
    },
    {
        deafultStar: 40,
        goldStar: 120,
        silverStar: 40,
        x: 1495,
        y: 1183,
        goldMin: 1,
        goldSec: 30,
        silvMin: 2,
        silvSec: 40
    },
    {
        deafultStar: 50,
        goldStar: 150,
        silverStar: 50,
        x: 1495,
        y: 1183,
        goldMin: 2,
        goldSec: 0,
        silvMin: 3,
        silvSec: 0
    },
    {
        deafultStar: 60,
        goldStar: 190,
        silverStar: 60,
        x: 1495,
        y: 1183,
        goldMin: 2,
        goldSec: 30,
        silvMin: 4,
        silvSec: 0
    },
    {
        deafultStar: 75,
        goldStar: 175,
        silverStar: 75,
        x: 1495,
        y: 1183,
        goldMin: 3,
        goldSec: 10,
        silvMin: 4,
        silvSec: 10
    }
];

export interface Itime {
    [key: string]: string
}

export const bestTime: Itime = {
    '1': 'null',
    '2': 'null',
    '3': 'null',
    '4': 'null',
    '5': 'null',
};
