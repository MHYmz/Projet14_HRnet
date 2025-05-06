// src/components/OptionSelector.jsx
import React from 'react';
import Select from 'react-select';

const OptionSelector = ({ optionList, selectedValue, handleSelect }) => {
  return (
    <Select 
      options={optionList} 
      value={selectedValue} 
      onChange={handleSelect} 
    />
  );
};

export default OptionSelector;
