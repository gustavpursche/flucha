import React from 'react';

import './style.css';

export default ({ children, text, explain = false, ...attributes }) => (
  <label className="label" {...attributes}>
    <span className="label__text">{text}</span>
    {explain && (
      <small className="label__explain">{explain}</small>
    )}

    <div className="label__children-container">
      {children}
    </div>
  </label>
);
