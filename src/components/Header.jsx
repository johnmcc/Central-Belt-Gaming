import React from 'react';
import Ad from './Ad';

import './Header.css';

const header = () => {
    return (
        <header>
            <h1>Central Belt Gaming</h1>
            <h2>Tabletop Gaming events in Glasgow, Edinburgh, and across the central belt of Scotland</h2>

            <Ad />
        </header>
    );
};

export default header;
