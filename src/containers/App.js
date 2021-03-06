import React, { Component } from 'react';
import EventsList from '../components/EventsList';
import FilterForm from '../components/FilterForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import config from '../config';
import SearchTerms from '../lib/SearchTerms';
import store_names from '../lib/StoreNames';
import './App.css';

import uniq from "lodash/uniq";
import map from "lodash/map";
import compact from "lodash/compact";
import filter from "lodash/filter";
import sortBy from "lodash/sortBy";

var {FB} = require('../fb');

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            textValue: "",
            dateValue: "",
            locationValue: "",
            events: [],
            filteredEvents: [],
        };

        const access_token = config.key;
        const now = parseInt(+ new Date() / 1000, 10);

        this.urls = map(store_names, page => {
            return `/${page}/events?access_token=${access_token}&since=${now}`;
        });
    }

    componentDidMount() {
        for(var url of this.urls){
            FB.api(url, response => {
                map(response.data, event => {
                    event.start_time = new Date(event.start_time);
                    event.end_time = new Date(event.end_time);
                });

                // Fudge descriptions
                const newEvents = this.state.events.concat(response.data).map(event => {
                    if(event.description === undefined){
                        event.description = "";
                    }
                    return event;
                });

                this.setState((prevState, props) => {
                    return {
                        events: newEvents,
                        filteredEvents: newEvents,
                    };
                });
            });
        }
    }

    filter(){
        const textValue = this.state.textValue;
        const dateValue = this.state.dateValue;
        const locationValue = this.state.locationValue;
        const events = this.state.events;

        var filteredEvents = this.textFilter(events, textValue);
        filteredEvents = this.dateFilter(filteredEvents, dateValue);
        filteredEvents = this.locationFilter(filteredEvents, locationValue);

        this.setState({
            filteredEvents: filteredEvents
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.textValue !== this.state.textValue ||
            prevState.dateValue !== this.state.dateValue ||
            prevState.locationValue !== this.state.locationValue){
            this.filter();
        }
    }

    textFilter(events, textValue){
        if(textValue === ""){
            return events;
        }

        return filter(events, event => {
            var description = event.description.toLowerCase();

            const eventName = event.name.toLowerCase();
            const term = textValue;

            const st = new SearchTerms(term);

            for(let term of st.getTermArray()){
                return description.includes(term) || eventName.includes(term);
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

        return filter(events, event => {
            return event.start_time > start && event.start_time < end
        });
    }

    locationFilter(events, locationValue){
        if(locationValue === ""){
            return events;
        }
        return filter(events, event => { return event.place !== undefined && event.place.name === locationValue });
    }

    handleTextChange(thing){
        const value = typeof(thing) === "string" ? thing:thing.target.value;

        this.setState({
            textValue: value
        });
    }

    handleDateChange(event){
        this.setState({
            dateValue: event.target.value
        });
    }

    handleLocationChange(event){
        this.setState({
            locationValue: event.target.value
        });
    }

    isFiltered(){
        return !(this.state.textValue === "" &&
                this.state.textValue === "" &&
                this.state.locationValue === "");
    }

    getUniqueLocations(){
        const places = compact(this.state.events.map(event => event.place));
        const names = places.map(place => place.name);
        return sortBy(uniq(names));
    }

    render() {
        return (
            <div id="app">
                <Header />
                <FilterForm
                    textValue={this.state.textValue}
                    handleTextChange={this.handleTextChange.bind(this)}
                    handleDateChange={this.handleDateChange.bind(this)}
                    handleLocationChange={this.handleLocationChange.bind(this)}
                    count={this.state.filteredEvents.length}
                    locations={this.getUniqueLocations()}
                    />
                <EventsList
                    events={this.state.filteredEvents}
                    isFiltered={this.isFiltered()}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
