import React from 'react';

import './style.css';

export default ({ children, text, ...attributes }) => (
  <label className="label" {...attributes}>
    <span className="label__text">{text}</span>
    {children}
  </label>
);
