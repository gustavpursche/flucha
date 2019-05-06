import React from 'react';

import './style.css';

export default ({ children, type = 'button', ...attributes }) => (
  <button type={type} className="button" {...attributes}>
    {children}
  </button>
);
