import Control from "../builder/controller";

// Update money
export let startMoney = "1000"; // Start money
export const setMoney = (update: string) => {
    startMoney = update;
};

export const addMoney = (update: number) => startMoney = `${+startMoney + update}`;

// Update money on window
export let moneyBlock: Control<HTMLElement>;
export const setMoneyWindow = (update: Control<HTMLElement>) => {
    moneyBlock = update;
};

// Save blocks with content
export const currentContent: Array<Control<HTMLElement>> = [];
