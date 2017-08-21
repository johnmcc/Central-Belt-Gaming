import React from 'react';
import './Event.css';

var _ = require("lodash");

const Event = ({details}) => {
    const url = `https://www.facebook.com/events/${details.id}`;
    const event_date = details.start_time;

    const day = event_date.getDate();
    const month = event_date.getMonth() + 1;
    const year = event_date.getFullYear();
    const time = event_date.getHours() + ":" + (event_date.getMinutes() === 0 ? "00":event_date.getMinutes());

    const date = `${day}/${month}/${year}, ${time}`;

    // fix stores not entering place details
    if(details.place === undefined || !details.place.name) {
        details.place = {
                name: "Location not set"
        };
    }

    return (
        <div className="event">
            <h2>{details.name}</h2>
            <p className="event-place-date">{date} - {details.place.name}</p>
            <p>{_.truncate(details.description, {length: 150})}</p>
            <a href={url}>Read more</a>
        </div>
    );
};

export default Event;
