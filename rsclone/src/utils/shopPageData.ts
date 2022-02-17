export interface IcontentBl {
    name: string,
    costs: string,
    src: string,
    currentStage: number
}

export interface IcontentData {
    [key: string] : IcontentBl
}

export const houses: IcontentData = {
    "driedEggs": {
        name: "Порошковый",
        costs: "130/180/230/280/330/380",
        src: "../images/shop/houses/driedEggs/driedEggs-01.png",
        currentStage: 1
    }
};

export const aside: IcontentData = {
    "well": {
        name: "Колодец",
        costs: "200/250/300",
        src: "../images/shop/wells/well-01.png",
        currentStage: 1
    },
    "depot": {
        name: "Склад",
        costs: "150/200/250",
        src: "../images/shop/depots/depot-01.png",
        currentStage: 1
    },
    "cage": {
        name: "Клетка",
        costs: "100/150/200",
        src: "../images/shop/cages/cage-01.png",
        currentStage: 1
    }
};

export const Engineering: IcontentData = {
    "car": {
        name: "Автомобиль",
        costs: "100/150/200",
        src: "../images/shop/cars/car-01.png",
        currentStage: 1
    },
};

export const Pets: IcontentData = {
    "dog": {
        name: "Собака",
        costs: "100/150/200",
        src: "../images/shop/dogs/dog-01.png",
        currentStage: 1
    },
    "cat": {
        name: "Кот",
        costs: "100/150/200",
        src: "../images/shop/cats/cat-01.png",
        currentStage: 1
    }
};
