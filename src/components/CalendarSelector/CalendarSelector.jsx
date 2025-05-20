import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CalendarSelector({ selectedDay, onSelectDay }) {
  return (
    <DatePicker
      selected={selectedDay}
      onChange={onSelectDay}
      dateFormat="dd/MM/yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode='select'
      todayButton='Today'
    />
  );
}
