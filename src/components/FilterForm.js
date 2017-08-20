import React from 'react';

const FilterForm = (props) => {
    return (
        <form>
            <h2>Filter Events</h2>
            <label>
                Filter event name / description
                <input
                    type="text"
                    onKeyUp={ props.keyUp }
                    ref={(input) => { this.textInput = input; }}  />
            </label>

            <label>
                Filter event date
                <input
                    type="date"
                    onChange={ props.dateChange }
                    ref={(input) => { this.dateInput = input; }}  />
            </label>
        </form>
    );
}

export default FilterForm;
