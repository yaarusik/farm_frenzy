export interface IContentBlock {
    [key: string] : string;
}

export const housesBlock: IContentBlock = {
    // "Порошковый/130" : "../images/shop/houses/driedEggs/driedEggs-01.png"
};

export const asideBlock: IContentBlock = {
    "Колодец/200" : "../images/shop/wells/well-01.png",
    "Склад/150" : "../images/shop/depots/depot-01.png",
    "Клетка/100" : "../images/shop/cages/cage-01.png"
};

export const EngineeringBlock: IContentBlock = {
    "Автомобиль/100" : "../images/shop/cars/car-01.png",
    // "Самолёт/100" : "../images/shop/airplanes/airplane-01.png"
};

export const PetsBlock: IContentBlock = {
    "Собака/100" : "../images/shop/dogs/dog-01.png",
    "Кот/100" : "../images/shop/cats/cat-01.png"
};
