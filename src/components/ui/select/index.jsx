import React from 'react';

import Label from '../label';

import './style.css';

export default ({ children, label, ...attributes }) => (
  <Label text={label}>
    <select className="select" {...attributes}>
      {children}
    </select>
  </Label>
);
