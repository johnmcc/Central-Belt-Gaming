import React, { Component } from 'react';
import EventsList from '../components/EventsList';
import FilterForm from '../components/FilterForm';
import config from '../config'
import './App.css';

var _ = require("lodash");
var {FB} = require('fb');

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            textValue: "",
            dateValue: "",
            events: [],
            filteredEvents: []
        };

        const access_token = config.key;
        const now = parseInt(+ new Date() / 1000, 10);

        const store_names = ["busstoptoyshop", "CommonGroundGames", "maxxpgaming", "KnightlyGaming", "GeekRetreatUK", "WestEndGamesGlasgow", "blacklionedinburgh", "GamesHubEdinburgh"];

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

    filter(){
        let textValue = this.state.textValue;
        let dateValue = this.state.dateValue;
        let events = this.state.events;

        let filteredEvents = this.textFilter(events, textValue);
        filteredEvents =this.dateFilter(filteredEvents, dateValue);

        this.setState({
            filteredEvents: filteredEvents
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.textValue !== this.state.textValue || prevState.dateValue !== this.state.dateValue){
            this.filter();
        }
    }

    textFilter(events, textValue){
        if(textValue === ""){
            return events;
        }

        return _.filter(events, event => {
            let description = event.description;
            if(description){
                return description.toLowerCase().includes(textValue.toLowerCase()) ||
                       event.name.toLowerCase().includes(textValue.toLowerCase());
            }
            return false;
        });
    }

    dateFilter(events, dateValue){
        if(dateValue === ""){
            return events;
        }

        var start = new Date(dateValue);
        var end = new Date(dateValue);

        end.setHours(23);
        end.setMinutes(59);

        return _.filter(events, event => {
            return event.start_time > start && event.start_time < end
        });
    }

    clear(event){
        event.preventDefault();
        this.setState({
            filteredEvents: this.state.events,
            textValue: "",
            dateValue: ""
        });
    }

    handleAutocompleteChange(thing){
        if(typeof(thing) === "string"){
            var value = thing;
        }else{
            var value = thing.target.value;
        }

        this.setState({
            textValue: value
        });
    }

    handleDateChange(event){
        this.setState({
            dateValue: event.target.value
        });
    }

    render() {
        return (
            <div id="app">
                <h1>Upcoming Events in Glasgow</h1>
                <FilterForm
                    textValue={this.state.textValue}
                    handleAutocompleteChange={this.handleAutocompleteChange.bind(this)}
                    dateChange={this.handleDateChange.bind(this)}
                    clear={this.clear.bind(this)} />

                <EventsList events={this.state.filteredEvents} />
            </div>
        );
    }
}

export default App;
