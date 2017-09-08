import React from 'react';
import Event from './Event';
import './EventsList.css';
var _ = require("lodash");

const EventsList = ({events}) => {
    if(!events.length){
        return <img id="loading" src="/images/loading.gif" alt="Loading..." />;
    }

    events = _.sortBy(events, ["start_time"]);
    return (
        <div id="eventsList">
            {events.map(event => {
                return <Event
                            details={event}
                            key={event.id} />
            })}
        </div>
    );
};

export default EventsList;
