import React from 'react';
import Event from './Event';
import './EventsList.css';
import sortBy from "lodash/sortBy";

const EventsList = ({events, isFiltered}) => {
    if(!events.length){
        if(isFiltered){
            return <p id="noResults">There are no results for that search.</p>
        }else{
            return <img id="loading" src="/images/loading.gif" alt="Loading..." />;
        }
    }

    events = sortBy(events, ["start_time"]);
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
