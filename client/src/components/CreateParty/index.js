import React, { useState } from 'react';

function  ClassForm(){
let [class, setClass] = useState('');

const ClassType =['Ranger','Melee','Support','Tank']


<div>
      <form className="character-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name your character "
          value={input}
          name="text"
          className="character-input"
          onChange={handleChange}
        ></input>
        <div className="dropdown">
          <button className={`dropbtn ${class}`}>
            {class || 'ClassType'}
          </button>
          <div className="dropdown-content">
            <p onClick={() => setClass(ClassType[0])}>Wizard</p>
            <p onClick={() => setClass(ClassType[0])}>Ranger</p>
            <p onClick={() => setClass(ClassType[1])}>Rougue</p>
            <p onClick={() => setClass(ClassType[1])}>Barbarian</p>
            <p onClick={() => setClass(ClassType[2])}>Cleric</p>
            <p onClick={() => setClass(ClassType[2])}>Druid</p>
            <p onClick={() => setClass(ClassType[3])}>Fighter</p>
            <p onClick={() => setClass(ClassType[3])}>Paladin</p>
          </div>
        </div>
        <button className="party-button">Add Character to party </button>
        </form>
   </div>   
}  
{/* 
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Character Select
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Ranged</a>
        <li><a class="dropdown-item" href="#">Wizard</a></li>
        <li><a class="dropdown-item" href="#">Ranger</a></li>
    </li>
    <li><a class="dropdown-item" href="#">Melee</a>
        <li><a class="dropdown-item" href="#">Barbarian</a></li>
        <li><a class="dropdown-item" href="#">Rougue</a></li>
    </li>
    <li><a class="dropdown-item" href="#">Support</a>
        <li><a class="dropdown-item" href="#">Cleric</a></li>
        <li><a class="dropdown-item" href="#">Druid</a></li>
    
    </li>
    <li><a class="dropdown-item" href="#">Tank</a>
        <li><a class="dropdown-item" href="#">Fighter</a></li>
        <li><a class="dropdown-item" href="#">Paladin</a></li>
    </li>
  </ul>
</div> */}

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