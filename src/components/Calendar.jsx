// Import React and other necessary dependencies
import React, { useState } from 'react';
import '../style/Calendar.css';

const DayLabels = () => {
  // Array of day names to display
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="DayLabels">
      {dayNames.map((day, index) => (
        <div key={index} className="day-label">
          {day}
        </div>
      ))}
    </div>
  );
};

const BottomDisplay = ({ selectedDate, shrunkenDiv }) => {
  const formatDate = (date) => {
    const dayOfMonth = date.getDate();
    const suffix = getNumberSuffix(dayOfMonth);

    const options = { weekday: 'long'};
    return `${date.toLocaleDateString('en-US', options)} ${dayOfMonth}${suffix}`;
  };

  // Function to get the suffix for numbers (e.g., "st", "nd", "rd", "th")
  const getNumberSuffix = (number) => {
    if (number >= 11 && number <= 13) {
      return 'th';
    }
    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <div className={`BottomDisplay ${shrunkenDiv !== null ? 'visible' : ''}`}>
      {shrunkenDiv !== null && (
        <p>
          {formatDate(new Date(selectedDate.year, selectedDate.month - 1, shrunkenDiv - 5))}
        </p>
      )}
    </div>
  );
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState({
    year: 2023,
    month: 1,
    day: null,
  });

  const [toggledButtons, setToggledButtons] = useState([]);
  const [shrunkenDiv, setShrunkenDiv] = useState(null);

  const toggleButton = (index) => {
    setToggledButtons((prevToggledButtons) => {
      const newToggledButtons = [...prevToggledButtons];
      newToggledButtons[index] = !newToggledButtons[index];
      return newToggledButtons;
    });
  };

  const handleDoubleClick = (index) => {
    setShrunkenDiv((prev) => (prev === index ? null : index));
  };

  const generateDivs = () => {
    const divs = [];
    const daysInMonth = new Date(selectedDate.year, selectedDate.month, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.year, selectedDate.month - 1, 1).getDay();
  
    // Calculate the offset to start the week with Sunday
    const daysFromPrevMonth = (firstDayOfMonth - 1 + 7) % 7;
  
    // Days from the previous month
    const prevMonthLastDay = new Date(selectedDate.year, selectedDate.month - 1, 0).getDate();
    for (let i = daysFromPrevMonth; i > 0; i--) {
      divs.push(
        <button
          key={`prev-${i}`}
          className={`generated-div prev-next-month ${shrunkenDiv === i ? 'shrunken' : ''}`}
          disabled={true}
          onDoubleClick={() => handleDoubleClick(i)}
        >
          <span>{prevMonthLastDay - i + 1}</span>
        </button>
      );
    }
  
    // Days from the current month
    for (let i = 0; i < daysInMonth; i++) {
      const dayOfMonth = i + 1;
      divs.push(
        <button
          key={`current-${i}`}
          className={`generated-div ${toggledButtons[i] ? 'active' : ''} ${
            shrunkenDiv === i + daysFromPrevMonth ? 'shrunken' : ''
          }`}
          onClick={() => toggleButton(i)}
          onDoubleClick={() => handleDoubleClick(i + daysFromPrevMonth)}
        >
          <span>{dayOfMonth}</span>
        </button>
      );
    }
  
    // Days from the next month
    const totalDays = daysFromPrevMonth + daysInMonth;
    const daysFromNextMonth = 42 - totalDays; // Total number of cells in a 6x7 grid
  
    for (let i = 0; i < daysFromNextMonth; i++) {
      divs.push(
        <button
          key={`next-${i}`}
          className={`generated-div prev-next-month ${shrunkenDiv === i + totalDays ? 'shrunken' : ''}`}
          disabled={true}
          onDoubleClick={() => handleDoubleClick(i + totalDays)}
        >
          <span>{i + 1}</span>
        </button>
      );
    }
  
    return divs;
  };

  const handleMonthChange = (increment) => {
    const newDate = { ...selectedDate };
    newDate.month += increment;

    if (newDate.month === 0) {
      newDate.month = 12;
      newDate.year -= 1;
    } else if (newDate.month === 13) {
      newDate.month = 1;
      newDate.year += 1;
    }

    setSelectedDate(newDate);
    setToggledButtons([]);
    setShrunkenDiv(null); // Reset shrunken div on month change
  };

  return (
    <div className="ParentBox">
      <div className="YeMo">
        <div>
          <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        </div>
        <label className="Label">
          {new Date(selectedDate.year, selectedDate.month - 1, 1).toLocaleString('default', {
            month: 'long',
          })}{' '}
          {selectedDate.year}
        </label>
        <div>
          <button onClick={() => handleMonthChange(1)}>&gt;</button>
        </div>
      </div>
      <DayLabels />
      <div className="Calendar">
        <div id="divContainer">{selectedDate.year > 0 && generateDivs()}</div>
      </div>
      <BottomDisplay selectedDate={selectedDate} shrunkenDiv={shrunkenDiv} />
    </div>
  

  
  );
};

export default Calendar;