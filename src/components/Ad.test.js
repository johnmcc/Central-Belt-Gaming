import React from 'react';
import ReactDOM from 'react-dom';
import Ad from './Ad';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ad />, div);
});
