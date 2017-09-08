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
    var location = null;
    if(details.place === undefined || !details.place.name) {
        location = <p className="event-location">Location: not set</p>
    }else{
        location = <p className="event-location">
                    Location: <a href={`https://www.facebook.com/profile.php?id=${details.place.id}`}>{details.place.name}</a>
                   </p>
    }

    return (
        <div className="event">
            <h2><a href={url}>{details.name}</a></h2>
            <p className="event-date">Date: {date}</p>
            {location}
            <p>{_.truncate(details.description, {length: 200})}</p>
            <a className="eventFooterLink" href={url}>Read more</a>
        </div>
    );
};

export default Event;
