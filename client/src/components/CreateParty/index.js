import React, { useState } from 'react';

// function  ClassForm(){
//     const [input, setInput] = useState('');
// let [characterClass, setCharacterClass] = useState('');

const ClassType =['Range','Melee','Support','Tank']




function ClassForm() {
  const [characters, setCharacter] = useState([]);
  const [input, setInput] = useState('');
  const [characterClass, setCharacterClass] = useState('');

  const classOptions = ['Wizard', 'Ranger', 'Rogue', 'Barbarian', 'Cleric', 'Druid', 'Fighter', 'Paladin'];

  const handleSubmit = (e) => {
    e.preventDefault();

    setInput('');
    setCharacterClass('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClassChange = (value) => {
    setCharacterClass(value);
  };

  return (
    <div>
      <form className="character-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name your character"
          value={input}
          name="text"
          className="character-input"
          onChange={handleChange}
        />
        <div className="dropdown">
          <button className={`dropbtn ${characterClass}`}>
            {characterClass || 'ClassType'}
          </button>
          <div className="dropdown-content">
            {classOptions.map((option) => (
              <p key={option} onClick={() => handleClassChange(option)}>
                {option}
              </p>
            ))}
          </div>
        </div>
        <button className="party-button">Add Character to party</button>
      </form>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Character Select
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">Ranged</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Wizard</a></li>
              <li><a className="dropdown-item" href="#">Ranger</a></li>
            </ul>
          </li>
          <li>
            <a className="dropdown-item" href="#">Melee</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Barbarian</a></li>
              <li><a className="dropdown-item" href="#">Rogue</a></li>
            </ul>
          </li>
          <li>
            <a className="dropdown-item" href="#">Support</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Cleric</a></li>
              <li><a className="dropdown-item" href="#">Druid</a></li>
            </ul>
          </li>
          <li>
            <a className="dropdown-item" href="#">Tank</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Fighter</a></li>
              <li><a className="dropdown-item" href="#">Paladin</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ClassForm;


{/* 
const handleSubmit = (e) => {
    e.preventDefault();

    setInput('');
    setClass('');
  }; */}
{/* //want to create an object for each character with  attributes for each object  


//establish a return function that displays the JSX of the characters 
//input field for names , option for class, helper funtions to gather attributes for party member 
//4 seperateforms containing name and a drop down for class, 
// create an array of objects with each character and map over Array to make 4 seperate models
// take the models and grab the ID and connect to party that was created 
// every time an action is taken it creates a global state varriable that creates progression */}