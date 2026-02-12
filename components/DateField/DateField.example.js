import React from 'react';
import DateField from './index';

module.exports = (
  <div>
    <DateField id="example1" />
    <DateField
      label="Date With Error"
      id="example2"
      errorMessage="Error: Invalid date"
      value="I am not a date"
    />
    <DateField id="example3" disabled label="Disabled Date" />
  </div>
);
