import React from 'react';

import Label from '../label';

import './style.css';

export default ({ label, explain, type = 'text', ...attributes }) => (
  <Label text={label} explain={explain}>
    <input type={type} className="input" {...attributes} />
  </Label>
);
