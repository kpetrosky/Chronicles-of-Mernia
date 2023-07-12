import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
    diceRoller, 
    letThatSinkIn,
} from '../../utils/combat';
import { QUERY_USER } from '../../utils/queries';
import { UPDATE_USER_PROGRESSION, UPDATE_PARTY_MEMBER_HP } from '../../utils/mutations';
import "../../styles/combat-1.css";
import { findImagePaths } from "../../utils/CharImage";
import placeholderImage from '../../images/placeholder.png'

export default function Combat({handleProgChange, encounter, handleLoss}) {
    const [initiativeState, setInitiativeState] = useState([]);
    const [positions, setPositions] = useState([]);
    const [buttonsClickable, setButtonsClickable] = useState(false);
    const [combatLog, setCombatLog] = useState('');
    const [targetBox, setTargetBox] = useState({ imagePath: "./characterImages/placeholder.png"})


    
    const { data: userData } = useQuery(QUERY_USER);
    
    const [updateUserProgression] = useMutation(UPDATE_USER_PROGRESSION);
    const [updatePartyMemberHp] = useMutation(UPDATE_PARTY_MEMBER_HP);

    const updateCombatLog = () => {
        const combatLogElement = document.getElementById('combat-log');
        if (combatLogElement) {
            combatLogElement.textContent = combatLog;
        }
    }

    useEffect(() => {
        updateCombatLog();
    }, [combatLog]);
    
    useEffect(() => {
        function battleReadyParty(party) {
            const partyMembers = party?.user.party.members || [];
            return partyMembers.map((object) => {
                const imagePath = findImagePaths(object.characterClass)
                return {
                    ...object,
                    isBlocking: false,
                    isDown: false,
                    isPlayer: true,
                    specialUsed: false,
                    specialUsedThisTurn: false,
                    imagePath: imagePath
                }
            });
        };

        function battleReadyEncounter(encounter) {
            const enemies = encounter.enemies;
            return enemies.map((object) => {
                const position = enemies.indexOf(object) + 5;
                const { hp } = object;
                const imagePath = findImagePaths(object.name)
                return {
                    ...object,
                    currentHp: hp,
                    isDown: false,
                    isPlayer: false,
                    turnTaken: false,
                    position: position,
                    imagePath: imagePath
                }
            });
        };

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
        const battleArray = battleReadyParty(userData).concat(battleReadyEncounter(encounter));
        const initiativeOrder = updateSpeed(battleArray).sort((a, b) => b.speed - a.speed);
        const positionOrder = battleArray.sort((a, b) => a.position - b.position);
        
        setInitiativeState(initiativeOrder);
        setPositions(positionOrder);
    }, [userData, encounter]);

    async function checkIfDown(targetObject) {
        if (targetObject.currentHp <= 0) {
            targetObject.currentHp = 0;
            targetObject.isDown = true;
            await letThatSinkIn();
            setCombatLog(`${targetObject.name} is down!`);
        }
    }
    
    async function checkIfRevived(targetObject) {
        if (targetObject.isDown && targetObject.currentHp > 0) {
            targetObject.isDown = false;
            await letThatSinkIn();
            setCombatLog(`${targetObject.name} has been revived!`);
        }
    }

    function matchHp(positionObject) {
        const initiativeObject = initiativeCopy.find((object) => object.position === positionObject.position);
        return initiativeObject.currentHp;
    }

    const initiativeCopy = [...initiativeState];

    const handleAction = async (event) => {
        if (event.target.id === 'attack') {
            initiativeCopy[0].isBlocking = false;
            setButtonsClickable(true);
        } else if (event.target.id === 'block') {
            initiativeCopy[0].isBlocking = true;
            setCombatLog(`${initiativeCopy[0].name} is blocking!`);
            wrapUpTurn();
        } else if (event.target.id === 'special') {
            initiativeCopy[0].isBlocking = false;
            const specialUser = initiativeCopy[0];
            switch (specialUser.characterClass) {
                case 'Barbarian':
                    specialUser.attack = specialUser.attack + specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    setCombatLog(`${specialUser.name} increased their attack stat!`);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Rogue':
                    specialUser.dodge = specialUser.dodge + specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    setCombatLog(`${specialUser.name} increased their dodge stat!`);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Ranger':
                    specialUser.attack = specialUser.attack + specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    setCombatLog("Who would you like to attack (double damage)?")
                    setButtonsClickable(true);
                break;
                case 'Wizard':
                    specialUser.attack = specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    handleAttack(5);
                    await letThatSinkIn();
                    handleAttack(6);
                    await letThatSinkIn();
                    handleAttack(7);
                    await letThatSinkIn();
                    handleAttack(8);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Cleric':
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    setCombatLog("Who would you like to heal?")
                    setButtonsClickable(true);
                    break;
                case 'Druid':
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    handleHeal(1);
                    await letThatSinkIn();
                    handleHeal(2);
                    await letThatSinkIn();
                    handleHeal(3);
                    await letThatSinkIn();
                    handleHeal(4);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Paladin':
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    handleTeamBuff();
                    break;
                case 'Fighter':
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
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

    const handleTargeting = async (event) => {
        const newTarget = event.target.className.slice(-1);
        const newTargetInt = parseInt(newTarget);
        setTargetBox(positions[newTargetInt - 1]);
        if (!initiativeCopy[0].specialUsedThisTurn) {
            handleAttack(newTargetInt);
            setButtonsClickable(false);
            await letThatSinkIn();
            wrapUpTurn();
        }
        else if (initiativeCopy[0].specialUsedThisTurn) {
            switch (initiativeCopy[0].characterClass) {
                case 'Ranger':
                    handleAttack(newTargetInt);
                    setButtonsClickable(false);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Cleric':
                    handleHeal(newTargetInt);
                    setButtonsClickable(false);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                default:
                    console.log('Error! Current class special does not use targeting');
                    break;
            }
        }
    }

    const handleAttack = (targetPosition) => {
        const attacker = initiativeCopy[0];
            const targetObject = initiativeCopy.find((obj) => obj.position === targetPosition);
            if (targetObject.isPlayer) {
                const numberToBeat = diceRoller([1,100]);
                if (targetObject.dodge >= numberToBeat) {
                    setCombatLog(`${targetObject.name} dodged the attack from ${attacker.name}!`);
                    initiativeCopy[0].turnTaken = true;
                    return;
                } else if (targetObject.isBlocking) {
                    let damage = attacker.attack - targetObject.defense;
                    if (damage < 0) {
                        damage = 0;
                    }
                    targetObject.currentHp = targetObject.currentHp - damage;
                    setCombatLog(`${targetObject.name} blocked the attack from ${attacker.name} and took ${damage} damage!`);
                    checkIfDown(targetObject);
                    initiativeCopy[0].turnTaken = true;
                    return;
                } else {
                    let damage = attacker.attack;
                    targetObject.currentHp = targetObject.currentHp - damage;
                    setCombatLog(`${attacker.name}(${attacker.position}) hit ${targetObject.name} for ${damage}!`);
                    checkIfDown(targetObject);
                    initiativeCopy[0].turnTaken = true;
                    return;
                }
            } else if (attacker.weapon) {
                let damage = attacker.attack + diceRoller(attacker.weapon.damage);
                targetObject.currentHp = targetObject.currentHp - damage;
                setCombatLog(`${attacker.name} dealt ${damage} damage to ${targetObject.name}(${targetObject.position}) using their ${attacker.weapon.name}!`);
                checkIfDown(targetObject);
                return;
            }
    }

    const handleHeal = (targetPosition) => {
        const healer = initiativeCopy[0];
            const targetObject = initiativeCopy.find((obj) => obj.position === targetPosition);
            targetObject.currentHp = targetObject.currentHp + healer.special;
            if (targetObject.currentHp > targetObject.maxHp) {
                targetObject.currentHp = targetObject.maxHp;
            }
            setCombatLog(`${healer.name} healed ${targetObject.name} for ${healer.special}HP!`);
            checkIfRevived(targetObject);
            return;
    }

    const handleTeamBuff = async () => {
        const buffer = initiativeCopy[0];
        const team = initiativeCopy.filter((obj) => obj.position >= 1 && obj.position <= 4);
        if (buffer.characterClass === "Paladin") {
            for (const teamMember of team) {
                teamMember.defense = teamMember.defense + buffer.special;
                setCombatLog(`${buffer.name} improved ${teamMember.name}'s defense stat!`);
                await letThatSinkIn();
                continue;
            }
            wrapUpTurn()
        }
        if (buffer.characterClass === "Fighter") {
            for (const teamMember of team) {
                teamMember.attack = teamMember.attack + buffer.special;
                setCombatLog(`${buffer.name} improved ${teamMember.name}'s attack stat!`);
                await letThatSinkIn();
                continue;
            }
            wrapUpTurn()
        }
    }
    
    async function wrapUpTurn() {
        if (initiativeCopy[0].specialUsedThisTurn) {
            if (initiativeCopy[0].characterClass === 'Ranger') {
                initiativeCopy[0].attack = initiativeCopy[0].special;
                initiativeCopy[0].specialUsedThisTurn = false;
            } else if (initiativeCopy[0].characterClass === 'Wizard') {
                initiativeCopy[0].attack = initiativeCopy[0].special * 4;
                initiativeCopy[0].specialUsedThisTurn = false;
            } else {
                initiativeCopy[0].specialUsedThisTurn = false;
            }
        }

        if (!initiativeCopy[0].isPlayer && initiativeCopy[0].turnTaken) {
            initiativeCopy[0].turnTaken = false;
        }
        
        setTargetBox({ imagePath: "./characterImages/placeholder.png"});

        const playersDown = initiativeCopy.filter((obj) => obj.isPlayer && obj.isDown);
        const enemiesDown = initiativeCopy.filter((obj) => !obj.isPlayer && obj.isDown);

        if (playersDown.length === 4) {
            // Render Game Over
            console.log('Game Over! You Lose');
            handleLoss();
            handleProgChange(7);
            return;
        }

        if (enemiesDown.length === 4) {
            // Render next Combat
            setCombatLog('You Won! Prepare for your next battle');

            const updatePromises = []

            for (const object of initiativeCopy) {
                if (object.isPlayer) {
                    let { _id, currentHp, maxHp } = object;
                    currentHp = currentHp + 10;
                    if (currentHp > maxHp) {
                        currentHp = maxHp;
                    }

                    updatePromises.push(
                        updatePartyMemberHp({
                            variables: { id: _id, currentHp: currentHp }
                        })
                    );
                } else {
                    continue;
                }
            }

            await Promise.all(updatePromises);

            const currentUserProgression = userData.user.progression;
            const newUserProgression = currentUserProgression + 1;
            await updateUserProgression({
                variables: { progression: newUserProgression }
            });

            await letThatSinkIn();

            

            handleProgChange(newUserProgression);
            return;
        }

        setInitiativeState(initiativeCopy);
        const shiftInitiative = [...initiativeState.slice(1), initiativeState[0]];
        setInitiativeState(shiftInitiative);
    }
    
    function startEnemyTurn() {
        if (!initiativeCopy[0].isPlayer) {
            initiativeCopy[0].turnTaken = true;
            setInitiativeState(initiativeCopy);
            if (!initiativeCopy[0].isDown) {
                // let targetedPlayer;
                // do {
                //     const randomPosition = diceRoller([1,4]);
                //     targetedPlayer = initiativeCopy.find((obj) => obj.position === randomPosition && !obj.isDown);
                // } while (!targetedPlayer);
                const targetedPlayer = diceRoller([1,4]);
                handleAttack(targetedPlayer);
                setTargetBox(positions[targetedPlayer - 1]);
            } 
        }
        if (initiativeCopy[0].isDown) {
            wrapUpTurn();
        }
    }

    if (initiativeCopy.length === 8) {
        if (initiativeCopy[0].isDown) {
            wrapUpTurn();
        }
    }
    
    return (
        <div className="combat-main">
            <h2 className="combat-h2">Initiative Order:</h2>
            {initiativeCopy.length === 8 ? (
            <div className="combat-screen">
                <div className="initiative-bar">
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[0].imagePath} alt="Turn 1 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[1].imagePath} alt="Turn 2 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[2].imagePath} alt="Turn 3 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[3].imagePath} alt="Turn 4 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[4].imagePath} alt="Turn 5 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[5].imagePath} alt="Turn 6 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[6].imagePath} alt="Turn 7 in Initiative Order"/>
                    </div>
                    <div id="init-1">
                        <img className="init-img" src={initiativeCopy[7].imagePath} alt="Turn 8 in Initiative Order"/>
                    </div>
                </div>
                {/* WARNING: Do NOT remove any className 'position-x' OR place any classNames AFTER them! They are necessary for targeting. */}
                <div className='combat-container'>
                    <div className='party-container'>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-1" : "button-holder-active position-1"}>
                            <img src={positions[0].imagePath} 
                            alt="Player 1" 
                            className="target-button position-1"/>
                            <p className="hp-ratio position-1">{`${matchHp(positions[0])}/${positions[0].maxHp}`}</p>                            
                        </button>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-2" : "button-holder-active position-2"}>
                            <img src={positions[1].imagePath} 
                            alt="Player 2" 
                            className="target-button position-2"/>
                            <p className="hp-ratio position-2">{`${matchHp(positions[1])}/${positions[1].maxHp}`}</p>
                        </button>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-3" : "button-holder-active position-3"}>
                            <img src={positions[2].imagePath} 
                            alt="Player 3" 
                            className="target-button position-3"/>
                            <p className="hp-ratio position-3">{`${matchHp(positions[2])}/${positions[2].maxHp}`}</p>
                        </button>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-4" : "button-holder-active position-4"}>
                            <img src={positions[3].imagePath} 
                            alt="Player 4" 
                            className="target-button position-4"/>
                            <p className="hp-ratio position-4">{`${matchHp(positions[3])}/${positions[3].maxHp}`}</p>
                        </button>
                    </div>

                    <div className='actions'>
                    {initiativeCopy[0].isPlayer && (
                        <button
                        className="action-btn" 
                        id='attack'
                        onClick={handleAction}>
                            Attack
                        </button>
                    )}
                    {initiativeCopy[0].isPlayer && (
                        <button
                        className="action-btn" 
                        id='block'
                        onClick={handleAction}>
                            Block
                        </button>
                    )}
                    {initiativeCopy[0].isPlayer && !initiativeCopy[0].specialUsed && (
                        <button
                        className="action-btn" 
                        id='special'
                        onClick={handleAction}>
                            Special
                        </button>
                    )}
                    </div>

                    <div id="player">
                        {initiativeCopy[0].isPlayer && (
                            <img src={initiativeCopy[0].imagePath} alt="Current Player"/>
                        )}
                        {!initiativeCopy[0].isPlayer && (
                            <img src={targetBox.imagePath} alt="Current Enemy Target"/>
                        )}
                    </div>
                    
                    <div className="turn-taker">
                        {!initiativeCopy[0].isPlayer && !initiativeCopy[0].turnTaken && (
                            <button id="start-btn" onClick={startEnemyTurn}>Start Enemy Turn</button>
                        )}
                        {!initiativeCopy[0].isPlayer && initiativeCopy[0].turnTaken && (
                            <button id="end-btn" onClick={wrapUpTurn}>End Enemy Turn</button>
                       )}     
                    </div>
                    
                    <div id="target">
                        {!initiativeCopy[0].isPlayer && (
                            <img src={initiativeCopy[0].imagePath} alt="Current Enemy"/>
                        )}
                        {initiativeCopy[0].isPlayer && (
                            <img src={targetBox.imagePath} alt="Current Player Target"/>
                        )}
                    </div>

                    <div className='enemy-container'>
                        <button 
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-5" : "button-holder-active-enemy position-5"}>
                            <img src={positions[4].imagePath} 
                            alt="Enemy 1" 
                            className="target-button position-5"/>
                            <p className="hp-ratio position-5">{`${matchHp(positions[4])}/${positions[4].hp}`}</p>
                        </button>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-6" : "button-holder-active-enemy position-6"}>
                            <img src={positions[5].imagePath} 
                            alt="Enemy 2" 
                            className="target-button position-6"/>
                            <p className="hp-ratio position-6">{`${matchHp(positions[5])}/${positions[5].hp}`}</p>
                        </button>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-7" : "button-holder-active-enemy position-7"}>
                            <img src={positions[6].imagePath} 
                            alt="Enemy 3" 
                            className="target-button position-7"/>
                            <p className="hp-ratio position-7">{`${matchHp(positions[6])}/${positions[6].hp}`}</p>
                        </button>
                        <button  
                        disabled={!buttonsClickable}
                        onClick={handleTargeting}
                        className={!buttonsClickable ? "button-holder position-8" : "button-holder-active-enemy position-8"}>
                            <img src={positions[7].imagePath} 
                            alt="Enemy 4" 
                            className="target-button position-8"/>
                            <p className="hp-ratio position-8">{`${matchHp(positions[7])}/${positions[7].hp}`}</p>
                        </button>
                    </div>
                </div>
                <div className="combat-text">
                    <p id='combat-log'>Time for battle!</p>
                </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
