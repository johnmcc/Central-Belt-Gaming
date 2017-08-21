import React from 'react';
import Event from './Event.js';
import './EventsList.css';
var _ = require("lodash");

const EventsList = ({events}) => {
    events = _.sortBy(events, ["start_time"]);

    let rows = [];
    for(let event of events) {
        rows.push(<Event details={event} key={event.id} />);
    }

    return (
        <div id="eventsList">
            {rows}
        </div>
    );
};

export default EventsList;
