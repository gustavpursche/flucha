/* eslint-disable react/button-has-type */

import React from 'react';

import './style.css';

export default ({
  children,
  type = 'button',
  secondary = false,
  ...attributes
}) => (
  <button
    type={type}
    className={`button ${secondary && 'button--is-secondary'}`}
    {...attributes}
  >
    {children}
  </button>
);
