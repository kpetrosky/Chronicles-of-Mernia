import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { 
    diceRoller, 
    letThatSinkIn,
} from '../../utils/combat';
import { QUERY_USER } from '../../utils/queries';
import { UPDATE_USER_PROGRESSION, UPDATE_PARTY_MEMBER_HP } from '../../utils/mutations';
import "../../styles/combat-1.css";
import placeholderImage from '../../images/placeholder.png'

export default function Combat({handleProgChange, encounter}) {
    const [initiativeState, setInitiativeState] = useState([]);
    const [positions, setPositions] = useState([]);
    const [buttonsClickable, setButtonsClickable] = useState(false);
    // const [combatLog, setCombatLog] = useState('');
    
    const { data: userData } = useQuery(QUERY_USER);
    
    const [updateUserProgression] = useMutation(UPDATE_USER_PROGRESSION);
    const [updatePartyMemberHp] = useMutation(UPDATE_PARTY_MEMBER_HP);

    // useEffect(() =>{
    //     const combatLogElement = document.getElementById('combat-log');
    //     combatLogElement.value = combatLog;
    // }, [combatLog]);
    
    useEffect(() => {
        function battleReadyParty(party) {
            const partyMembers = party?.user.party.members || [];
            return partyMembers.map((object) => {
                return {
                    ...object,
                    isBlocking: false,
                    isDown: false,
                    isPlayer: true,
                    specialUsed: false,
                    specialUsedThisTurn: false
                }
            });
        };

        function battleReadyEncounter(encounter) {
            const enemies = encounter.enemies;
            return enemies.map((object) => {
                const position = enemies.indexOf(object) + 5;
                const { hp } = object;
                return {
                    ...object,
                    currentHp: hp,
                    isDown: false,
                    isPlayer: false,
                    position: position
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

    function checkIfDown(targetObject) {
        if (targetObject.currentHp <= 0) {
            targetObject.currentHp = 0;
            targetObject.isDown = true;
            console.log(`${targetObject.name} is down!`);
        }
    }
    
    function checkIfRevived(targetObject) {
        if (targetObject.isDown && targetObject.currentHp > 0) {
            targetObject.isDown = false;
            console.log(`${targetObject.name} has been revived!`);
        }
    }

    const initiativeCopy = [...initiativeState];

    const handleAction = async (event) => {
        if (event.target.id === 'attack') {
            initiativeCopy[0].isBlocking = false;
            setButtonsClickable(true);
        } else if (event.target.id === 'block') {
            initiativeCopy[0].isBlocking = true;
            wrapUpTurn();
        } else if (event.target.id === 'special') {
            initiativeCopy[0].isBlocking = false;
            const specialUser = initiativeCopy[0];
            switch (specialUser.characterClass) {
                case 'Barbarian':
                    specialUser.attack = specialUser.attack + specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    console.log(`${specialUser.name} increased their Attack!`);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Rogue':
                    specialUser.dodge = specialUser.dodge + specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
                    console.log(`${specialUser.name} increased their Dodge!`);
                    await letThatSinkIn();
                    wrapUpTurn();
                    break;
                case 'Ranger':
                    specialUser.attack = specialUser.attack + specialUser.special;
                    specialUser.specialUsed = true;
                    specialUser.specialUsedThisTurn = true;
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
        const newTarget = event.target.id.slice(-1);
        const newTargetInt = parseInt(newTarget);
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
                    console.log(`${targetObject.name} dodged the attack from ${attacker.name}!`);
                    return;
                } else if (targetObject.isBlocking) {
                    let damage = attacker.attack - targetObject.defense;
                    if (damage < 0) {
                        damage = 0;
                    }
                    targetObject.currentHp = targetObject.currentHp - damage;
                    console.log(`${targetObject.name} blocked the attack from ${attacker.name} and took ${damage} damage!`);
                    checkIfDown(targetObject);
                    return;
                } else {
                    let damage = attacker.attack;
                    targetObject.currentHp = targetObject.currentHp - damage;
                    console.log(`${attacker.name} hit ${targetObject.name}(${targetObject.position}) for ${damage}!`);
                    checkIfDown(targetObject);
                    return;
                }
            } else if (attacker.weapon) {
                let damage = attacker.attack + diceRoller(attacker.weapon.damage);
                targetObject.currentHp = targetObject.currentHp - damage;
                // setCombatLog(`${attacker.name} hit ${targetObject.name}(${targetObject.position}) for ${damage} with their ${attacker.weapon.name}!`);
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
            console.log(`${healer.name} healed ${targetObject.name} for ${healer.special}HP!`);
            checkIfRevived(targetObject);
            return;
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
            wrapUpTurn()
        }
        if (buffer.characterClass === "Fighter") {
            for (const teamMember of team) {
                teamMember.attack = teamMember.attack + buffer.special;
                console.log(`${buffer.name} improved ${teamMember.name}'s attack stat!`);
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
        

        const playersDown = initiativeCopy.filter((obj) => obj.isPlayer && obj.isDown);
        const enemiesDown = initiativeCopy.filter((obj) => !obj.isPlayer && obj.isDown);

        if (playersDown.length === 4) {
            // Render Game Over
            console.log('Game Over! You Lose');
            return;
        }

        if (enemiesDown.length === 4) {
            // Render next Combat
            console.log('Game Over! You Won');

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
    
    if (initiativeCopy.length === 8) {
        if (!initiativeCopy[0].isPlayer) {
            if (!initiativeCopy[0].isDown) {
                // let targetedPlayer;
                // do {
                //     const randomPosition = diceRoller([1,4]);
                //     targetedPlayer = initiativeCopy.find((obj) => obj.position === randomPosition && !obj.isDown);
                // } while (!targetedPlayer);
                const targetedPlayer = diceRoller([1,4]);
                handleAttack(targetedPlayer);
            } 
        }
        if (initiativeCopy[0].isDown) {
            wrapUpTurn();
        }
    }

    
    
    return (
        <div className="combat-main">
            <h2 className="combat-h2">Prepare for Combat!</h2>
            {initiativeCopy.length === 8 ? (
            <div className="combat-screen">
                <div className="initiative-bar">
                    {/* The name values are placeholders. The final version will have the positions listed in the paragraph tags, and images to depict who is who. */}
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[0].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[1].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[2].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[3].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[4].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[5].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[6].name}</p>
                    </div>
                    <div id="init-1">
                        <img style={{ width: "50%", height: "20%" }} src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                        <p className='init-p'>{initiativeCopy[7].name}</p>
                    </div>
                </div>
                <div className='combat-container'>
                    <div className='party-container'>
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

                    <div className='actions'>
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

                    <div id="target">
                        <img src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                    </div>

                    <div id="player">
                        <img src={placeholderImage} alt="Image of spot 1 in Initiative order"/>
                    </div>

                    <div className="turn-taker">
                        <button onClick={wrapUpTurn}>End Enemy Turn</button>
                    </div>

                    <div className='enemy-container'>
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
                </div>
                <div className='combat-text'>
                    <p id='combat-log'>Combat Text Box Here</p>
                </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
