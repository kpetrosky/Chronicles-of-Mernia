export function diceRoller(array) {
    return Math.floor(Math.random() * (array[1] - array[0] + 1)) + array[0];
}

export function letThatSinkIn() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });
}