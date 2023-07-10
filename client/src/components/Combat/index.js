import React, { useState, useEffect } from 'react';
import { 
    diceRoller, 
    letThatSinkIn,
} from '../../utils/combat';

export default function Combat({handleProgChange}) {
    const [initiativeState, setInitiativeState] = useState([]);
    const [positions, setPositions] = useState([]);
    const [buttonsClickable, setButtonsClickable] = useState(false);
    const [targets, setTargets] = useState([]);
    const [numberOfTargets, setNumberOfTargets] = useState(9);

    let isSpecial = '';
    
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
                            position: 1
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
                            position: 2
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
                            position: 3
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
                            position: 4
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
                const position = enemies.indexOf(object) + 5;
                return {
                    ...object,
                    isDown: false,
                    isPlayer: false,
                    position: position
                }
            });
        };

        const battleArray = battleReadyParty(exampleParty).concat(battleReadyEncounter(exampleEncounter));

        function updateSpeed(battleArray) {
            return battleArray.map((object) => {
                const { speed, ...rest } = object;
                const newSpeed = diceRoller(speed);
                return {
                    ...rest,
                    speed: newSpeed
                }
            });
        };

        const initiativeOrder = updateSpeed(battleArray).sort((a, b) => b.speed - a.speed);
        const positionOrder = battleArray.sort((a, b) => a.position - b.position);
        
        setInitiativeState(initiativeOrder);
        setPositions(positionOrder);
    }, []);
    
    function checkIfDown(targetObject) {
        if (targetObject.currentHp <= 0) {
            targetObject.currentHp = 0;
            targetObject.isDown = true;
        }
    }
    
    function checkIfRevived(targetObject) {
        if (targetObject.isDown && targetObject.currentHp > 0) {
            targetObject.isDown = false;
        }
    }

    console.log(initiativeState);
    console.log(targets);
    console.log(numberOfTargets);

    const initiativeCopy = [...initiativeState];

    const handleAction = (event) => {
        if (event.target.id === 'attack') {
            initiativeCopy[0].isBlocking = false;
            setButtonsClickable(true);
            setNumberOfTargets(1);
        } else if (event.target.id === 'block') {
            initiativeCopy[0].isBlocking = true;
            wrapUpTurn();
        } else if (event.target.id === 'special') {
            initiativeCopy[0].isBlocking = false;
            isSpecial = initiativeCopy[0].characterClass;
            const specialUser = initiativeCopy[0];
            switch (specialUser.characterClass) {
                case 'Barbarian':
                    specialUser.attack = specialUser.attack + specialUser.special;
                    specialUser.specialUsed = true;
                    wrapUpTurn();
                    break;
                case 'Rogue':
                    specialUser.dodge = specialUser.dodge + specialUser.special;
                    specialUser.specialUsed = true;
                    wrapUpTurn();
                    break;
                case 'Ranger':
                    specialUser.attack = specialUser.attack + specialUser.special;
                    specialUser.specialUsed = true;
                    setButtonsClickable(true);
                    setNumberOfTargets(1)
                break;
                case 'Wizard':
                    specialUser.attack = specialUser.special;
                    specialUser.specialUsed = true;
                    handleAttack([5, 6, 7, 8]);
                    break;
                case 'Cleric':
                    specialUser.specialUsed = true;
                    setButtonsClickable(true);
                    setNumberOfTargets(1)
                    break;
                case 'Druid':
                    specialUser.specialUsed = true;
                    setButtonsClickable(true);
                    setNumberOfTargets(2)
                    break;
                case 'Paladin':
                    specialUser.specialUsed = true;
                    handleTeamBuff();
                    break;
                case 'Fighter':
                    specialUser.specialUsed = true;
                    handleTeamBuff();
                    break;
                default:
                    console.log('Error! No characterClass found');
                    break;
            } 
        } else {
            console.log('Error! Not a valid action');
        }
    }

    const handleTargeting = (event) => {
        const newTarget = event.target.id.slice(-1);
        setTargets((prevTargets) => [...prevTargets, newTarget]);
        if (targets.length === numberOfTargets && isSpecial === '') {
            handleAttack(targets);
            setButtonsClickable(false);
        }
        if (targets.length === numberOfTargets && isSpecial !== '') {
            switch (isSpecial) {
                case 'Ranger':
                    handleAttack(targets);
                    setButtonsClickable(false);
                    break;
                case 'Cleric':
                    handleHeal(targets);
                    setButtonsClickable(false);
                    break;
                case 'Druid':
                    handleHeal(targets);
                    setButtonsClickable(false);
                    break;
                default:
                    console.log('Error! Current class special does not use targeting');
                    break;
            }
        }
    }

    const handleAttack = async (targetPosition) => {
        const attacker = initiativeCopy[0];
            const targetObject = initiativeCopy.find((obj) => obj.position === targetPosition);
            if (targetObject.dodge) {
                const numberToBeat = diceRoller([1,100]);
                if (targetObject.dodge >= numberToBeat) {
                    console.log(`${targetObject.name} dodged the attack from ${attacker.name}!`);
                    await letThatSinkIn();
                    wrapUpTurn();
                }
            }
            if (targetObject.isBlocking) {
                let damage = attacker.attack - targetObject.defense;
                if (damage < 0) {
                    damage = 0;
                }
                targetObject.currentHp = targetObject.currentHp - damage;
                console.log(`${targetObject.name} blocked the attack from ${attacker.name} and took ${damage} damage!`);
                checkIfDown(targetObject);
                await letThatSinkIn();
                wrapUpTurn();
            }
            if (attacker.weapon) {
                let damage = attacker.attack + diceRoller(attacker.weapon.damage);
                targetObject.currentHp = targetObject.currentHp - damage;
                console.log(`${attacker.name} hit ${targetObject.name}(${targetObject.position}) for ${damage} with their ${attacker.weapon.name}!`);
                checkIfDown(targetObject);
                await letThatSinkIn();
                return;
            }
            let damage = attacker.attack;
            targetObject.currentHp = targetObject.currentHp - damage;
            console.log(`${attacker.name} hit ${targetObject.name}(${targetObject.position}) for ${damage}!`);
            checkIfDown(targetObject);
            await letThatSinkIn();
            wrapUpTurn();
    }

    const handleHeal = async (targetPositions) => {
        const healer = initiativeCopy[0];
        for (const targetPosition of targetPositions) {
            const targetObject = initiativeCopy.find((obj) => obj.position === targetPosition);
            targetObject.currentHp = targetObject.currentHp + healer.special;
            if (targetObject.currentHp > targetObject.maxHp) {
                targetObject.currentHp = targetObject.maxHp;
            }
            console.log(`${healer.name} healed ${targetObject.name} for ${healer.special}HP!`);
            checkIfRevived(targetObject);
            await letThatSinkIn();
            continue;
        }
        wrapUpTurn();
    }

    const handleTeamBuff = async () => {
        const buffer = initiativeCopy[0];
        const team = initiativeCopy.filter((obj) => obj.position >= 1 && obj.position <= 4);
        if (buffer.characterClass === "Paladin") {
            for (const teamMember of team) {
                teamMember.defense = teamMember.defense + buffer.special;
                console.log(`${buffer.name} improved ${teamMember.name}'s defense stat!`);
                await letThatSinkIn();
                continue;
            }
        }
        if (buffer.characterClass === "Fighter") {
            for (const teamMember of team) {
                teamMember.attack = teamMember.attack + buffer.special;
                console.log(`${buffer.name} improved ${teamMember.name}'s attack stat!`);
                await letThatSinkIn();
                continue;
            }
        }
        wrapUpTurn();
    }

    function wrapUpTurn() {
        if (isSpecial !== "") {
            if (isSpecial === 'Ranger') {
                initiativeCopy[0].attack = initiativeCopy[0].special;
                isSpecial = "";
            } else if (isSpecial === 'Wizard') {
                initiativeCopy[0].attack = initiativeCopy[0].special * 4;
                isSpecial = "";
            } else {
                isSpecial = "";
            }
        }

        const playersDown = initiativeCopy.filter((obj) => obj.isPlayer && obj.isDown);
        const enemiesDown = initiativeCopy.filter(obj => !obj.isPlayer && obj.isDown);

        if (playersDown.length === 4) {
            // Render Game Over
            console.log('Game Over! You Lose');
            return;
        }

        if (enemiesDown.length === 4) {
            // Render next Combat
            console.log('Game Over! You Won');
            return;
        }

        
        const shiftInitiative = [...initiativeCopy.slice(1), initiativeCopy[0]];
        initiativeCopy = shiftInitiative;
        // setInitiativeState(initiativeCopy);
        // const shiftInitiative = [...initiativeState.slice(1), initiativeState[0]];
        // setNumberOfTargets(9);
        // setTargets([]);
        // setInitiativeState(shiftInitiative);
    }
    
    function startEnemyTurn(event) {
        if (!initiativeCopy[0].isPlayer) {
            if (!initiativeCopy[0].isDown) {
                let targetedPlayer;
                do {
                    const randomPosition = diceRoller([1,4]);
                    targetedPlayer = initiativeCopy.find((obj) => obj.position === randomPosition && !obj.isDown);
                } while (!targetedPlayer);
                handleAttack(targetedPlayer.position);  
            } else {
                wrapUpTurn();
            }
        }
    }

    
    
    return (
        <div>
            {initiativeCopy.length === 8 ? (
            <div>
                <div id="initiative-bar">
                    {/* The name values are placeholders. The final version will have the positions listed in the paragraph tags, and images to depict who is who. */}
                    <div>
                        <img />
                        <p>{initiativeCopy[0].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[1].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[2].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[3].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[4].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[5].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[6].name}</p>
                    </div>
                    <div>
                        <img />
                        <p>{initiativeCopy[7].name}</p>
                    </div>
                </div>
                <div id='party-container'>
                    <button 
                    id='position-1' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[0].name}
                    </button>
                    <button 
                    id='position-2' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[1].name}
                    </button>
                    <button 
                    id='position-3' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[2].name}
                    </button>
                    <button 
                    id='position-4' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[3].name}
                    </button>
                </div>
                <div id='actions'>
                    {initiativeCopy[0].isPlayer && (
                        <button 
                        id='attack'
                        onClick={handleAction}>
                            Attack
                        </button>
                    )}
                    {initiativeCopy[0].isPlayer && (
                        <button 
                        id='block'
                        onClick={handleAction}>
                            Block
                        </button>
                    )}
                    {initiativeCopy[0].isPlayer && !initiativeCopy[0].specialUsed && (
                        <button 
                        id='special'
                        onClick={handleAction}>
                            Special
                        </button>
                    )}
                </div>
                <div id="turn-taker">

                </div>
                <div id="target">

                </div>
                <div id="start-turn">
                    <button
                    onClick={startEnemyTurn}>Start Enemy Turn</button>
                </div>
                <div id='enemy-container'>
                    <button 
                    id='position-5' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[4].name}
                    </button>
                    <button 
                    id='position-6' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[5].name}
                    </button>
                    <button 
                    id='position-7' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[6].name}
                    </button>
                    <button 
                    id='position-8' 
                    disabled={!buttonsClickable}
                    onClick={handleTargeting}>
                        {positions[7].name}
                    </button>
                </div>
                <div id='combat-log'>
                    <p>(combat log)</p>
                </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
