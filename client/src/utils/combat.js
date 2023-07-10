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

export function checkIfDown(targetObject) {
    if (targetObject.currentHp <= 0) {
        targetObject.currentHp = 0;
        targetObject.isDown = true;
    }
}

export function checkIfRevived(targetObject) {
    if (targetObject.isDown && targetObject.currentHp > 0) {
        targetObject.isDown = false;
    }
}