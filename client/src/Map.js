import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import CreateParty from './components/CreateParty';
import Combat from './components/Combat';
import GameOver from './components/GameOver';
import './styles/map.css';
import { findEncounter } from './utils/enemies';

export default function Map() {
    const [progression, setProgression] = useState(0);
    const [loss, setLoss] = useState(false);

    const encounter1 = findEncounter(2);
    const encounter2 = findEncounter(3);
    const encounter3 = findEncounter(4);
    const encounter4 = findEncounter(5);
    const encounter5 = findEncounter(6);

    const renderComponent = () => {
        if (progression === 0) {
            return <SignUp handleProgChange={handleProgChange}/>;
        }
        if (progression === 1) {
            return <CreateParty handleProgChange={handleProgChange}/>;
        }
        if (progression === 2) {
            return <Combat handleProgChange={handleProgChange} handleLoss={handleLoss} encounter={encounter1}/>
        }
        if (progression === 3) {
            return <Combat handleProgChange={handleProgChange} handleLoss={handleLoss} encounter={encounter2}/>
        }
        if (progression === 4) {
            return <Combat handleProgChange={handleProgChange} handleLoss={handleLoss} encounter={encounter3}/>
        }
        if (progression === 5) {
            return <Combat handleProgChange={handleProgChange} handleLoss={handleLoss} encounter={encounter4}/>
        }
        if (progression === 6) {
            return <Combat handleProgChange={handleProgChange} handleLoss={handleLoss} encounter={encounter5}/>
        }
        if (progression === 7) {
            return <GameOver handleProgChange={handleProgChange} loss={loss} handleLoss={handleLoss}/>
        }
    };

    const handleProgChange = (prog) => setProgression(prog);

    const handleLoss = () => setLoss(true);


    //if we can instead of hard coding 'map-main for className set it up so it takes the component title that is rendered 
    return (
    <div className={`main-${progression}`}>
        <Header className='header'/>
            <div className={`container-${progression}`}>
                {renderComponent()}
            </div>
        <Footer className='footer'/>
    </div>
    );


}

