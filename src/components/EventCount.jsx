import React from 'react';
import './EventCount.css';

const EventCount = (props) => {
    return (
        <h3>Showing {props.count} events</h3>
    );
}

export default EventCount;
