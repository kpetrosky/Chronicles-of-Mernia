import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_WEAPONS } from "../../utils/queries";
import {
  ADD_PARTY_MEMBER,
  ADD_PARTY,
  UPDATE_USER_PARTY,
  UPDATE_USER_PROGRESSION,
} from "../../utils/mutations";
import { findBaseStats } from "../../utils/baseStats";
import "../../styles/party.css";

function ClassForm({ handleProgChange }) {
  // Four forms render, each with a dropdown for class and name
  // Error handling for lack of selection
  // Once all selections are made and submit button clicked
  // Create helper function to get weapon based on class
  // Get position data from form component
  // Create array of objects that compile all the data needed to put to model
  // Map over array and update pm model using graphql
  // Then get all the newly created pm models and put into array, tie to party document
  // create party instance and tie to user automatically

  const { data: weaponsData } = useQuery(QUERY_WEAPONS);
  const [addPartyMember] = useMutation(ADD_PARTY_MEMBER);
  const [addParty] = useMutation(ADD_PARTY);
  const [updateUserParty] = useMutation(UPDATE_USER_PARTY);
  const [updateUserProgression] = useMutation(UPDATE_USER_PROGRESSION);

  const weapons = weaponsData?.weapons || [];

  function findWeaponIdByClass(characterClass) {
    const matchedWeapon = weapons.find(
      (weapon) => weapon.characterClass === characterClass
    );
    return matchedWeapon ? matchedWeapon._id : null;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name1 = document.getElementById("name1").value;
    const characterClass1 = event.target.elements.class1.value;
    const name2 = event.target.elements.name2.value;
    const characterClass2 = event.target.elements.class2.value;
    const name3 = event.target.elements.name3.value;
    const characterClass3 = event.target.elements.class3.value;
    const name4 = event.target.elements.name4.value;
    const characterClass4 = event.target.elements.class4.value;

    const characterArray = [
      {
        name: name1.trim(),
        characterClass: characterClass1,
        position: 1,
      },
      {
        name: name2.trim(),
        characterClass: characterClass2,
        position: 2,
      },
      {
        name: name3.trim(),
        characterClass: characterClass3,
        position: 3,
      },
      {
        name: name4.trim(),
        characterClass: characterClass4,
        position: 4,
      },
    ];

    const isEmpty = (value) => {
      return value === "";
    };

    const isUnselected = (value) => {
      return value === "Select Character Class...";
    };

    const containsEmpty = characterArray.some((character) => {
      return Object.values(character).some(isEmpty);
    });

    const containsUnselected = characterArray.some((character) => {
      return Object.values(character).some(isUnselected);
    });

    if (containsEmpty || containsUnselected) {
      alert("Please fill all fields!");
      return;
    } else {
      const compiledData = compilePartyData(characterArray);
      console.log(compiledData);
      const newPartyIds = [];
      try {
        for (const partyMember of compiledData) {
          const response = await addPartyMember({
            variables: { ...partyMember },
          });
          const partyMemberId = response.data.addPartyMember._id;
          newPartyIds.push(partyMemberId);
        }
        console.log(newPartyIds);
        const response = await addParty({
          variables: { members: newPartyIds },
        });
        const newPartyId = response.data.addParty._id;
        console.log(newPartyId);
        await updateUserParty({
          variables: { party: newPartyId },
        });
        console.log("Party Members Added!");

        await updateUserProgression({
          variables: { progression: 2 },
        });
        handleProgChange(2);
      } catch (error) {
        console.error("Error adding Party Members:", error);
      }
    }

    event.target.reset();
  };

  function compilePartyData(characterArray) {
    return characterArray.map((object) => {
      const { characterClass } = object;
      const weaponId = findWeaponIdByClass(characterClass);
      const baseStats = findBaseStats(characterClass);
      const { maxHp: hp } = baseStats;
      const updatedBaseStats = {
        ...baseStats,
        currentHp: hp,
      };
      return {
        ...object,
        weapon: weaponId,
        ...updatedBaseStats,
      };
    });
  }

  const characterClasses = [
    "Barbarian",
    "Rogue",
    "Ranger",
    "Wizard",
    "Cleric",
    "Druid",
    "Paladin",
    "Fighter",
  ];

  return (
    <div className="party-main">
      <h2 className="party-h2">Create Your Party!</h2>
      <form  onSubmit={handleFormSubmit}>
        <div className="classes-div">
          <section className="members" id="member-1">
            <h2 className="card-title">Party Member 1</h2>
            <div className="member-box">
              <div className="party-info">
                <label htmlFor="name" id="label1">
                  Name:
                </label>
                <input
                  type="text"
                  className="name-text"
                  id="name1"
                  name="name"
                />
                <select className="party-class" id="class1">
                  <option>Select Class...</option>
                  {characterClasses.map((CharacterClasses) => (
                    <option key={CharacterClasses} value={CharacterClasses}>
                      {CharacterClasses}
                    </option>
                  ))}
                </select>
              </div>
              <div className="party-pic"></div>
            </div>
          </section>
          <section className="members" id="member-2">
            <h2 className="card-title">Party Member 2</h2>
            <div className="member-box">
              <div className="party-info">
                <label htmlFor="name" id="label1">
                  Name:
                </label>
                <input
                  type="text"
                  className="name-text"
                  id="name2"
                  name="name"
                />
                <select className="party-class" id="class2">
                  <option>Select Class...</option>
                  {characterClasses.map((CharacterClasses) => (
                    <option key={CharacterClasses} value={CharacterClasses}>
                      {CharacterClasses}
                    </option>
                  ))}
                </select>
              </div>
              <div className="party-pic"></div>
            </div>
          </section>
          <section className="members" id="member-3">
            <h2 className="card-title">Party Member 3</h2>
            <div className="member-box">
              <div className="party-info">
                <label htmlFor="name" id="label1">
                  Name:
                </label>
                <input
                  type="text"
                  className="name-text"
                  id="name3"
                  name="name"
                />
                <select className="party-class" id="class3">
                  <option>Select Character Class...</option>
                  {characterClasses.map((CharacterClasses) => (
                    <option key={CharacterClasses} value={CharacterClasses}>
                      {CharacterClasses}
                    </option>
                  ))}
                </select>
              </div>
              <div className="party-pic"></div>
            </div>
          </section>
          <section className="members" id="member-4">
            <h2 className="card-title">Party Member 4</h2>
            <div className="member-box">
              <div className="party-info">
                <label htmlFor="name" id="label1">
                  Name:
                </label>
                <input
                  type="text"
                  className="name-text"
                  id="name4"
                  name="name"
                />
                <select className="party-class" id="class4">
                  <option>Select Character Class...</option>
                  {characterClasses.map((CharacterClasses) => (
                    <option key={CharacterClasses} value={CharacterClasses}>
                      {CharacterClasses}
                    </option>
                  ))}
                </select>
              </div>
              <div className="party-pic"></div>
            </div>
          </section>
        </div>
        <div className="button-party">
          {/* <button id="submit-btn" type="submit">Submit</button> */}
          <button id="create-btn" type="submit">
            Create Party
          </button>
        </div>
      </form>
    </div>
  );
}
export default ClassForm;

// function  ClassForm(){
//     const [input, setInput] = useState('');
// let [characterClass, setCharacterClass] = useState('');

// const ClassType =['Range','Melee','Support','Tank']
//   const [characters, setCharacter] = useState([]);
//   const [input, setInput] = useState('');
//   const [characterClass, setCharacterClass] = useState('');

//   const classOptions = ['Wizard', 'Ranger', 'Rogue', 'Barbarian', 'Cleric', 'Druid', 'Fighter', 'Paladin'];

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setInput('');
//     setCharacterClass('');
//   };

//   const handleChange = (e) => {
//     setInput(e.target.value);
//   };

//   const handleClassChange = (value) => {
//     setCharacterClass(value);
//   };

//   return (
//     <div>
//       <form className="character-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name your character"
//           value={input}
//           name="text"
//           className="character-input"
//           onChange={handleChange}
//         />
//         <div className="dropdown">
//           <button className={`dropbtn ${characterClass}`}>
//             {characterClass || 'ClassType'}
//           </button>
//           <div className="dropdown-content">
//             {classOptions.map((option) => (
//               <p key={option} onClick={() => handleClassChange(option)}>
//                 {option}
//               </p>
//             ))}
//           </div>
//         </div>
//         <button className="party-button">Add Character to party</button>
//       </form>
//       <div className="dropdown">
//         <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//           Character Select
//         </button>
//         <ul className="dropdown-menu">
//           <li>
//             <a className="dropdown-item" href="#">Ranged</a>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" href="#">Wizard</a></li>
//               <li><a className="dropdown-item" href="#">Ranger</a></li>
//             </ul>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">Melee</a>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" href="#">Barbarian</a></li>
//               <li><a className="dropdown-item" href="#">Rogue</a></li>
//             </ul>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">Support</a>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" href="#">Cleric</a></li>
//               <li><a className="dropdown-item" href="#">Druid</a></li>
//             </ul>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">Tank</a>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" href="#">Fighter</a></li>
//               <li><a className="dropdown-item" href="#">Paladin</a></li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default ClassForm;

{
  /* 
const handleSubmit = (e) => {
    e.preventDefault();

    setInput('');
    setClass('');
  }; */
}
{
  /* //want to create an object for each character with  attributes for each object  


//establish a return function that displays the JSX of the characters 
//input field for names , option for class, helper funtions to gather attributes for party member 
//4 seperateforms containing name and a drop down for class, 
// create an array of objects with each character and map over Array to make 4 seperate models
// take the models and grab the ID and connect to party that was created 
// every time an action is taken it creates a global state varriable that creates progression */
}
