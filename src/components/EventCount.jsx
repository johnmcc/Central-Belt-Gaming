import React from 'react';
import './EventCount.css';

const EventCount = (props) => {
    return (
        <span>Showing {props.count} events</span>
    );
}

export default EventCount;
