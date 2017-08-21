import React from 'react';
import Event from './Event.js';
import './EventsList.css';
var _ = require("lodash");

var days = require("days");
var months = require("months");

const EventsList = ({events}) => {
    if(!events.length){
        return <img id="loading" src="/images/loading.gif" alt="Loading..." />;
    }

    events = _.sortBy(events, ["start_time"]);

    events = _.groupBy(events, (event) => {
        const day = days[event.start_time.getDay()];
        const date = event.start_time.getDate();
        const month = months[event.start_time.getMonth()];
        const year = event.start_time.getFullYear();

        return `${day} ${date} ${month}, ${year}`;
    });

    let rows = [];

    for(let day in events){
        let event_date = new Date(Date.parse(day));
        rows.push(
            <div className="eventDay" key={day}>
                <h3>{day}</h3>
                <div className="events">
                    {events[day].map(event => {
                        return <Event details={event} key={event.id} />
                    })}
                </div>
            </div>
        );
    }

    return (
        <div id="eventsList">
            {rows}
        </div>
    );
};

export default EventsList;
