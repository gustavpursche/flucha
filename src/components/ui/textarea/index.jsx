import React from 'react';

import Label from '../label';

import './style.css';

export default ({ label, monospace = false, ...attributes }) => (
  <Label text={label}>
    <textarea className={`textarea ${monospace && 'textarea--monospace'}`} {...attributes} />
  </Label>
);
