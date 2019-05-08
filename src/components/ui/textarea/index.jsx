import React from 'react';

import Label from '../label';

import './style.css';

export default ({ label, explain, monospace = false, ...attributes }) => (
  <Label text={label} explain={explain}>
    <textarea
      className={`textarea ${monospace && 'textarea--monospace'}`}
      {...attributes}
    />
  </Label>
);
