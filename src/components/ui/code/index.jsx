import React from 'react';

import './style.css';

export default ({ children, ...attributes }) => (
  <code className="code" {...attributes}>
    {children}
  </code>
);
