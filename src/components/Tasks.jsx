import '../style/Tasks.css';
import React, { useState } from 'react';

const ProjectSettingsPopup = ({ onClose }) => {
  return (
    <div className="Popup">
      <div className="PopupContent">
        {/* Add your project settings content here */}
        <p>Project Settings Popup</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="ParentBoxT">
      <div className="AddTask">
        <div className="AddAddTask">
          <button className="Button" onClick={() => console.log('Task added')}>
            Add Task
          </button>
        </div>
        <div className="ProjectSettings">
          <button className="Button2" onClick={openPopup}>
            Project Settings
          </button>
        </div>
      </div>
      <div className="ToDo"></div>
      <div className="ToDo"></div>
      <div className="ToDo"></div>

      {isPopupVisible && <ProjectSettingsPopup onClose={closePopup} />}
    </div>
  );
};

export default Tasks;