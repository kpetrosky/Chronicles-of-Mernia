
//want to create an object for each character with  attributes for each object  


//establish a return function that displays the JSX of the characters 


//create an array of objects 

const characters =[
{
    class:{
        type: 'Wizard',
        category:'Ranged'
    },
    weapon:{
        weaponChoice:'Spellbook'

    },
    healthPoints:{
        currentHP:12
    },
    speed:{
        currentSpeed:10
    },
    actions:{
        dodge:{
            movement:'roll'

        },
        attack:{
            base:'Fire Ball ',
         special: 'Magic Missle',
        },
        block:{
            defend:'Shield'
        }
    },
},
{
    class:{
        type: 'Barbarian',
        category:'Melee'
    },
    weapon:{
        weaponChoice:'Battleaxe'
    },
   
    healthPoints:{
        currentHP:15
    },
    speed:{
        currentSpeed:9
    },
    actions:{
        dodge:{
            movement:'roll'
        },
        attack:{
            base:'Migthy Slash',
            special:'Battle rage'
        },
        block:{
            defend: 'shield'
        }
    },
},
{
    class:{
        type: 'Rogue',
        category:'Melee'
    },
    weapon:{
        weaponChoice:'dagger'
    },
    healthPoints:{
        currentHP:13
    },
    speed:{
        currentSpeed:14
    },
    actions:{
        dodge:{
            movement:'roll'
        },
        attack:{
            base:'Slice',
            special:'Flash step',
        },
        block:{
            defend:'shield'
        }
    },
},
{
    class:{
        type: 'Ranger',
        category:'Ranged'
    },
    weapon:{
        weaponChoice:'Longbow'
    },
 
    healthPoints:{
        currentHP:'10'
    },
    speed:{
        currentSpeed:12
    },
    actions:{
        dodge:{
            movement:'roll'
        },
        attack:{
            base:'Straight shot',
            special:'buff potion',
        },
        block:{
            defend:'shield'
        }
    },
},
{
    class:{
        type: 'Cleric',
        category:'Support'
    },
    weapon:{
        weaponChoice:'Divine Symbol'
    },
  
    healthPoints:{
        currentHP:10
    },
    speed:{
        currentSpeed:7
    },
    actions:{
        dodge:{
            movement:'run'
        },
        attack:{
            base:'Divine blessing',
            special:'Grace from God',
        },
        block:{
            defend:'shield'
        }
    },
},
{
    class:{
        type: 'Druid',
        category:'Support'
    },
    weapon:{
        weaponChoice:'Staff'
    },
  
    healthPoints:{
        currentHP:11
    },
    speed:{
        currentSpeed:8
    },
    actions:{
        dodge:{
            movement:'roll'
        },
        attack:{
            base:'Vine Whip',
            special:'Mother Nature',
        },
        block:{
            defend:'shield'
        }
    },
},
{
    class:{
        type: 'Paladin',
        category:'Tank'
    },
    weapon:{
        weaponChoice:'Warhammer'
    },
  
    healthPoints:{
        currentHP:22
    },
    speed:{
        currentSpeed:5
    },
    actions:{
        dodge:{
            movement:'side-step'
        },
        attack:{
            base:'Thors Strike',
            special:'Holy Cloak',
        },
        block:{
            defend:'shield'
        }
    },
},
{
    class:{
        type: 'Fighter',
        category:'Tank'
    },
    weapon:{
        weaponChoice:'Longsword'
    },

    healthPoints:{
        currentHP:21
    },
    speed:{
        currentSpeed:6
    },
    actions:{
        dodge:{
            movement:'side-step'
        },
        attack:{
            base:'Mighty split',
            special:'Battle speech',
        },
        block:{
            defend:'shield'
        }
    },
},

]