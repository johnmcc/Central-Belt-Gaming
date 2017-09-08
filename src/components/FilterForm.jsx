import React from 'react';
import EventCount from './EventCount';
import './FilterForm.css';

const FilterForm = (props) => {
    const today = new Date();

    const year = today.getFullYear();
    var month = today.getMonth() + 1;
    month = month < 9 ? "0" + month: month;
    const day = today.getDate();

    const todayFormatted = `${year}-${month}-${day}`;

    return (
        <form>
            <EventCount count={props.count} />

            <fieldset>
                <div id="fieldset-flex">
                    <label>
                        Filter event name / description
                        <input
                            type="text"
                            onChange={props.handleTextChange}
                            placeholder=""
                        />
                    </label>

                    <label>
                        Filter event date
                        <input
                            type="date"
                            min={todayFormatted}
                            onChange={ props.dateChange } />
                    </label>
                </div>
            </fieldset>
        </form>
    );
};

export default FilterForm;
