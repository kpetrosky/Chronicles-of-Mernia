import React, { useState, useEffect } from 'react';

export default function Combat({handleProgChange}) {
    const [initiative, setInitiative] = useState([]);
    
    useEffect(() => {
        const exampleParty = {
            user: {
                _id: 1,
                party: {
                    _id: 2,
                    members: [
                        {
                            _id: 11,
                            name: 'zach',
                            characterClass: 'Paladin',
                            special: 10,
                            maxHp: 30,
                            currentHp: 30,
                            attack: 15,
                            defense: 30,
                            speed: [1,3],
                            dodge: 5,
                            weapon: {
                                _id: 111,
                                name: 'Warhammer',
                                damage: [1,8],
                            },
                            position: 5
                        },
                        {
                            _id: 12,
                            name: 'krystal',
                            characterClass: 'Druid',
                            special: 10,
                            maxHp: 15,
                            currentHp: 15,
                            attack: 15,
                            defense: 20,
                            speed: [2,4],
                            dodge: 10,
                            weapon: {
                                _id: 112,
                                name: 'Staff',
                                damage: [1,4],
                            },
                            position: 6
                        },
                        {
                            _id: 13,
                            name: 'geoff',
                            characterClass: 'Rogue',
                            special: 1,
                            maxHp: 15,
                            currentHp: 15,
                            attack: 25,
                            defense: 15,
                            speed: [6,8],
                            dodge: 20,
                            weapon: {
                                _id: 113,
                                name: 'Dagger',
                                damage: [1,4],
                            },
                            position: 7
                        },
                        {
                            _id: 14,
                            name: 'markell',
                            characterClass: 'Wizard',
                            special: 5,
                            maxHp: 10,
                            currentHp: 10,
                            attack: 20,
                            defense: 20,
                            speed: [5,7],
                            dodge: 10,
                            weapon: {
                                _id: 114,
                                name: 'Spellbook',
                                damage: [1,8],
                            },
                            position: 8
                        },
                    ]
                }
            }
        }

        const exampleEncounter = {
            encounter: {
                _id: 9,
                enemies: [
                    {
                        _id: 99,
                        name: "Giant Wasp",
                        attack: 10,
                        hp: 8,
                        speed: [3,5]
                    },
                    {
                        _id: 99,
                        name: "Giant Wasp",
                        attack: 10,
                        hp: 8,
                        speed: [3,5]
                    },
                    {
                        _id: 98,
                        name: "Kobold",
                        attack: 15,
                        hp: 10,
                        speed: [6,8]
                    },
                    {
                        _id: 97,
                        name: "Vulture",
                        attack: 20,
                        hp: 12,
                        speed: [1,3]
                    }
                ],
                biome: 'Forest',
                progression: 2
            }
        }

        function battleReadyParty(party) {
            const partyMembers = party.user.party.members;
            return partyMembers.map((object) => {
                return {
                    ...object,
                    isBlocking: false,
                    isDown: false,
                    isPlayer: true,
                    specialUsed: false
                }
            });
        };

        function battleReadyEncounter(encounter) {
            const enemies = encounter.encounter.enemies;
            return enemies.map((object) => {
                return {
                    ...object,
                    isDown: false,
                    isPlayer: false
                }
            });
        };

        const battleArray = battleReadyParty(exampleParty).concat(battleReadyEncounter(exampleEncounter));

        function updateSpeed(battleArray) {
            return battleArray.map((object) => {
                const { speed, ...rest } = object;
                const newSpeed = Math.floor(Math.random() * (speed[1] - speed[0] + 1)) + speed[0];
                return {
                    ...rest,
                    speed: newSpeed
                }
            });
        };

        const initiativeOrder = updateSpeed(battleArray).sort((a, b) => b.speed - a.speed);
        
        setInitiative(initiativeOrder);
    }, []);
    
    console.log(initiative);

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return (
        <div>
            <h1>Combat</h1>
        </div>
    )
}