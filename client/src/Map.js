import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import CreateParty from './components/CreateParty';
import Combat from './components/Combat';
import GameOver from './components/GameOver';
import './styles/map.css';

export default function Map() {
    const [progression, setProgression] = useState(0);

    // TODO: create Function to match encounter prog value to component

    const renderComponent = () => {
        if (progression === 0) {
            return <SignUp handleProgChange={handleProgChange}/>;
        }
        if (progression === 1) {
            return <CreateParty handleProgChange={handleProgChange}/>;
        }
        if (progression === 2) {
            return <Combat handleProgChange={handleProgChange}/>
        }
        if (progression === 3) {
            return <Combat handleProgChange={handleProgChange}/>
        }
        if (progression === 4) {
            return <Combat handleProgChange={handleProgChange}/>
        }
        if (progression === 5) {
            return <Combat handleProgChange={handleProgChange}/>
        }
        if (progression === 6) {
            return <Combat handleProgChange={handleProgChange}/>
        }
        if (progression === 7) {
            return <GameOver handleProgChange={handleProgChange}/>
        }
    };

    const handleProgChange = (prog) => setProgression(prog);

    //if we can instead of hard coding 'map-main for className set it up so it takes the component title that is rendered 
    return (
    <div className='map-main'>
        <Header className='header'/>
            <div className='container-main'>
                {renderComponent()}
            </div>
        <Footer className='footer'/>
    </div>
    );
}
