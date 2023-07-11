const encounters = [
    {
        enemies: [
            {
                name: "Giant Wasp",
                attack: 10,
                hp: 8,
                speed: [3,5]
            },
            {
                name: "Vulture",
                attack: 20,
                hp: 12,
                speed: [1,3]
            },
            {
                name: "Vulture",
                attack: 20,
                hp: 12,
                speed: [1,3]
            },
            {
                name: "Tiger",
                hp: 17,
                attack: 30,
                speed: [4, 6]
            },
        ],
        progression: 2
    },
    {
        enemies: [
            {
                name: "Kobold",
                hp: 10,
                attack: 15,
                speed: [6, 8]
            },
            {
                name: "Vulture",
                attack: 20,
                hp: 12,
                speed: [1,3]
            },
            {
                name: "Orc",
                hp: 15,
                attack: 25,
                speed: [4, 6]
            },
            {
                name: "Giant Wasp",
                attack: 10,
                hp: 8,
                speed: [3,5]
            },
        ],
        progression: 3
    },
    {
        enemies: [
            {
                name: "Giant Wasp",
                attack: 10,
                hp: 8,
                speed: [3,5]
            },
            {
                name: "Vulture",
                attack: 20,
                hp: 12,
                speed: [1,3]
            },
            {
                name: "Kobold",
                hp: 10,
                attack: 15,
                speed: [6, 8]
            },
            {
                name: "Kobold",
                hp: 10,
                attack: 15,
                speed: [6, 8]
            },
        ],
        progression: 4
    },
    {
        enemies: [
            {
                name: "Orc",
                hp: 15,
                attack: 25,
                speed: [4, 6]
            },
            {
                name: "Bear",
                hp: 19,
                attack: 35,
                speed: [6, 8]
            },
            {
                name: "Goblin",
                hp: 16,
                attack: 25,
                speed: [4, 6]
            },
            {
                name: "Eldritch ooze",
                hp: 20,
                attack: 35,
                speed: [4, 6]
            }
        ],
        progression: 5
    },
    {
        enemies: [
            {
                name: "Goblin",
                hp: 16,
                attack: 25,
                speed: [4, 6]
            },
            {
                name: "Tiger",
                hp: 17,
                attack: 30,
                speed: [4, 6]
            },
            {
                name: "Orc",
                hp: 15,
                attack: 25,
                speed: [4, 6]
            },
            {
                name: "Eldritch ooze",
                hp: 20,
                attack: 35,
                speed: [4, 6]
            }
        ],
        progression: 6
    },
];
    
export function findEncounter(data) {
    return encounters.find((prog) => prog.progression === data);
};   