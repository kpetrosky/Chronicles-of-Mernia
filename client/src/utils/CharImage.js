const imagePaths = [
    {
        characterClass: "Barbarian",
        imagePath: "./characterImages/barbarian.png"
    },
    {
        characterClass: "Cleric",
        imagePath: "./characterImages/cleric.png"
    },
    {
        characterClass: "Druid",
        imagePath: "./characterImages/druid.png"
    },
    {
        characterClass: "Fighter",
        imagePath: "./characterImages/fighter.png"
    },
    {
        characterClass: "Paladin",
        imagePath: "./characterImages/pally.png"
    },
    {
        characterClass: "Ranger",
        imagePath: "./characterImages/rangers.png"
    },
    {
        characterClass: "Rogue",
        imagePath: "./characterImages/rogue.png"
    },
    {
        characterClass: "Wizard",
        imagePath: "./characterImages/wizard.png"
    },
    {
        characterClass: "Select Character Class...",
        imagePath: "./placeholder.png"
    },
    {
        characterClass: "Giant Wasp",
        imagePath: "./enemyImages/giant wasp.png"
    },
    {
        characterClass: "Kobold",
        imagePath: "./enemyImages/kobold.jpg"
    },
    {
        characterClass: "Vulture",
        imagePath: "./enemyImages/vulture.jpg"
    },
    {
        characterClass: "Orc",
        imagePath: "./enemyImages/orc.png"
    },
    {
        characterClass: "Tiger",
        imagePath: "./enemyImages/tiger.png"
    },
    {
        characterClass: "Goblin",
        imagePath: "./enemyImages/goblin.png"
    },
    {
        characterClass: "Bear",
        imagePath: "./enemyImages/bear.png"
    },
    {
        characterClass: "Eldritch Ooze",
        imagePath: "./enemyImages/eldritch ooze.png"
    },
]
export function findImagePaths(data) {
    const selectedObject = imagePaths.find((object) => object.characterClass === data);
    return selectedObject.imagePath;
};