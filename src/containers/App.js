import React, { Component } from 'react';
import EventsList from '../components/EventsList';
import config from '../config'
import './App.css';

var _ = require("lodash");
var {FB, FacebookApiException} = require('fb');

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            events: [],
            filteredEvents: []
        };

        const access_token = config.key;
        const now = parseInt(+ new Date() / 1000);

        const store_names = ["CommonGroundGames", "maxxpgaming", "KnightlyGaming", "GeekRetreatUK", "WestEndGamesGlasgow", "blacklionedinburgh", "GamesHubEdinburgh"];

        this.urls = _.map(store_names, page => {
            return `/${page}/events?access_token=${access_token}&since=${now}`;
        });
    }

    componentWillMount() {
        for(var url of this.urls){
            FB.api(url, response => {
                _.forEach(response.data, event => {
                    event.start_time = new Date(event.start_time);
                    event.end_time = new Date(event.end_time);

                    var events = this.state.events;
                    events.push(event);
                    this.setState({
                        events: events,
                        filteredEvents: events
                    });
                });
            });
        }
    }

    handleKeyUp(event){
        let value = event.target.value;
        let newEvents =  _.filter(this.state.events, (event) => {
            return event.description.toLowerCase().includes(value.toLowerCase()) ||
                   event.name.toLowerCase().includes(value.toLowerCase());
        });

        this.setState({
            filteredEvents: newEvents
        });
    }

    handleDateChange(event){
        var start = new Date(event.target.value);
        var end = new Date(event.target.value);

        end.setHours(23);
        end.setMinutes(59);

        let newEvents =  _.filter(this.state.events, (event) => {
            return event.start_time > start && event.start_time < end
        });

        this.setState({
            filteredEvents: newEvents
        });
    }

    clear(event){
        event.preventDefault();
        this.textInput.value = "";
        this.dateInput.value = "";
        this.setState({
            filteredEvents: this.state.events
        });
    }

    render() {
        return (
            <div id="app">
                <h1>Upcoming Events in Glasgow</h1>
                <form>
                    <h2>Filter Events</h2>
                    <label>
                        Filter event name / description
                        <input
                            type="text"
                            onKeyUp={this.handleKeyUp.bind(this)}
                            ref={input => { this.textInput = input; }} />
                    </label>

                    <label>
                        Filter event date
                        <input
                            type="date"
                            onChange={this.handleDateChange.bind(this)}
                            ref={input => { this.dateInput = input; }} />
                    </label>

                    <button onClick={this.clear.bind(this)}>Clear</button>
                </form>
                <EventsList events={this.state.filteredEvents} />
            </div>
        );
    }
}

export default App;
