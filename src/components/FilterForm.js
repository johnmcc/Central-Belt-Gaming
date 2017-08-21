import React from 'react';
import Autocomplete from 'react-autocomplete';

const FilterForm = (props) => {
    return (
        <form>
            <h2>Filter Events</h2>
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
                    onChange={ props.dateChange } />
            </label>
        </form>
    );
}

export default FilterForm;
