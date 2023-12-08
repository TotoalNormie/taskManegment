import '../style/Calendar.css';
import React, { useState } from 'react';


const Calendar = () => {
  const [selectedValue, setSelectedValue] = useState(0);
  const [toggledButtons, setToggledButtons] = useState([]);

  const toggleButton = (index) => {
    // Toggle the button at the specified index
    setToggledButtons((prevToggledButtons) => {
      const newToggledButtons = [...prevToggledButtons];
      newToggledButtons[index] = !newToggledButtons[index];
      return newToggledButtons;
    });
  };
  const generateDivs = () => {
    const divs = [];
    for (let i = 0; i < selectedValue; i++) {
      divs.push(
        <div key={i} className={`generated-div ${toggledButtons[i] ? 'active' : ''}`}>
          <button onClick={() => toggleButton(i)}>Toggle</button>
          <span>Div {i + 1}</span>
        </div>
      );
    }
    return divs;
  };

  return (
    <div className='ParentBox'>
      <div className='YeMo'> 
      <div></div>
      <div className='Mo'><label className="Label" htmlFor="selectNumber">Month</label>
      <select id="selectNumber" className='custom-select'
        onChange={(e) => {
          setSelectedValue(Number(e.target.value));
          setToggledButtons([]); // Reset toggled buttons when the selection changes
        }}
        value={selectedValue}
      >
        <option value={0}> </option>
        <option value={31}>January</option>
        <option value={28}>February</option>
        <option value={31}>March</option>
        <option value={30}>April</option>
        <option value={31}>May</option>
        <option value={30}>June</option>
        <option value={31}>July</option>
        <option value={31}>August</option>
        <option value={30}>September</option>
        <option value={31}>October</option>
        <option value={30}>November</option>
        <option value={31}>December</option>
      </select>
      </div>
      </div>
      <div className='Calendar'>

      <div>
     
     

      <div id="divContainer">
        {selectedValue > 0 && generateDivs()}
      </div>
    </div>
      
    </div>
</div>
    
  );
};
export default Calendar;