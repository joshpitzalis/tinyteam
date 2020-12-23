/* eslint-disable */

import React from 'react';

export const Components = ({ value, setValue, placeholder }) => (
  <input
    type="text"
    value={value}
    className="db"
    placeholder={placeholder}
    onChange={(e) => setValue(value)}
  />
);
