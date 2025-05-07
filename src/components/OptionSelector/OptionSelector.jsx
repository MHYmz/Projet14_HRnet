import React from 'react';
import Select from 'react-select';

const OptionSelector = ({ optionsList, selectedValue, onChange }) => {
  return (
    <Select 
      options={optionsList} 
      value={optionsList.find(option => option.value === selectedValue) || null}
      onChange={(selectedOption) => onChange(selectedOption ? selectedOption.value : "")}
      isClearable
      placeholder="Select an option"
    />
  );
};

export default OptionSelector;
