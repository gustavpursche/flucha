import React from 'react';

import Label from '../label';

import './style.css';

export default ({ label, type = 'text', ...attributes }) => (
  <Label text={label}>
    <input type={type} className="input" {...attributes} />
  </Label>
);
