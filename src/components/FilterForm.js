import React from 'react';
import Autocomplete from 'react-autocomplete';
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
            <h2>Filter Events</h2>
            <fieldset>
                <label>
                    Filter event name / description
                    <Autocomplete
                      getItemValue={(item) => item.label}
                      items={[
                        { label: 'destiny' },
                        { label: 'mtg' },
                        { label: 'netrunner' },
                        { label: 'x-wing' },
                      ]}
                      renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                          {item.label}
                        </div>
                      }
                      value={props.textValue}
                      onChange={props.handleAutocompleteChange}
                      onSelect={props.handleAutocompleteChange}
                    />
                </label>

                <label>
                    Filter event date
                    <input
                        type="date"
                        min={todayFormatted}
                        onChange={ props.dateChange } />
                </label>
            </fieldset>
        </form>
    );
};

export default FilterForm;
