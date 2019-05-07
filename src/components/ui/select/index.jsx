import React from 'react';

import Label from '../label';

import './style.css';

export default ({ children, explain, label, ...attributes }) => (
  <Label text={label} explain={explain}>
    <select className="select" {...attributes}>
      {children}
    </select>
  </Label>
);
