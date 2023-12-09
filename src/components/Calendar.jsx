// Import React and other necessary dependencies
import React, { useState } from 'react';
import '../style/Calendar.css';

const DayLabels = () => {
  // Array of day names to display
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState({
    year: 2023,
    month: 1,
  });

  const [toggledButtons, setToggledButtons] = useState([]);

  const toggleButton = (index) => {
    setToggledButtons((prevToggledButtons) => {
      const newToggledButtons = [...prevToggledButtons];
      newToggledButtons[index] = !newToggledButtons[index];
      return newToggledButtons;
    });
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
          className={`generated-div prev-next-month`}
          disabled={true}
        >
          <span>{prevMonthLastDay - i + 1}</span>
        </button>
      );
    }
  
    // Days from the current month
    for (let i = 0; i < daysInMonth; i++) {
      divs.push(
        <button
          key={`current-${i}`}
          className={`generated-div ${toggledButtons[i] ? 'active' : ''}`}
          onClick={() => toggleButton(i)}
        >
          <span>{i + 1}.</span>
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
          className={`generated-div prev-next-month`}
          disabled={true}
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
    setToggledButtons([]); // Reset toggled buttons when the month changes
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
      <DayLabels /> {/* Add the new DayLabels component here */}
      <div className="Calendar">
        <div id="divContainer">{selectedDate.year > 0 && generateDivs()}</div>
      </div>
    </div>
  );
};

export default Calendar;