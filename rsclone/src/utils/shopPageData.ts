// export interface IContentBlock {
//     [key: string] : string;
// }

// export const housesBlock: IContentBlock = {
//     "Порошковый/130" : "../images/shop/houses/driedEggs/driedEggs-01.png"
// };

// export const asideBlock: IContentBlock = {
//     "Колодец/200" : "../images/shop/wells/well-01.png",
//     "Склад/150" : "../images/shop/depots/depot-01.png",
//     "Клетка/100" : "../images/shop/cages/cage-01.png"
// };

// export const EngineeringBlock: IContentBlock = {
//     "Автомобиль/100" : "../images/shop/cars/car-01.png"
// };

// export const PetsBlock: IContentBlock = {
//     "Собака/100" : "../images/shop/dogs/dog-01.png",
//     "Кот/100" : "../images/shop/cats/cat-01.png"
// };

interface IcontentBl {
    name: string,
    costs: string,
    src: string
}

export interface IcontentData {
    [key: string] : IcontentBl
}

export const houses: IcontentData = {
    "driedEggs": {
        name: "Порошковый",
        costs: "130/180/230/280/330/380",
        src: "../images/shop/houses/driedEggs/driedEggs-01.png"
    }
};

export const aside: IcontentData = {
    "well": {
        name: "Колодец",
        costs: "200/250/300",
        src: "../images/shop/wells/well-01.png"
    },
    "gr": {
        name: "Склад",
        costs: "150/200/250",
        src: "../images/shop/depots/depot-01.png"
    },
    "cage": {
        name: "Клетка",
        costs: "100/150/200",
        src: "../images/shop/cages/cage-01.png"
    }
};

export const Engineering: IcontentData = {
    "car": {
        name: "Автомобиль",
        costs: "100/150/200",
        src: "../images/shop/cars/car-01.png"
    },
};

export const Pets: IcontentData = {
    "dog": {
        name: "Собака",
        costs: "100/150/200",
        src: "../images/shop/dogs/dog-01.png"
    },
    "cat": {
        name: "Кот",
        costs: "100/150/200",
        src: "../images/shop/cats/cat-01.png"
    }
};
