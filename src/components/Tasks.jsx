import React, { useState } from 'react';
import '../style/Tasks.css';

const ProjectSettingsPopup = ({ onClose }) => {
  return (
    <div className="Popup">
      <div className="PopupContent">
        <div className="CloseButton" onClick={onClose}>
          X
        </div>
        <p>Project Settings</p>
        <div className='Project'><p>Project Name</p><p className='thing'>The name of this project</p></div>
        <div className='EnterName'>
          <input type='text' className='EnterNameInput' placeholder='Enter name' />
        </div>
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
      {/* First TODO div with a table */}
      <div className="ToDo">
        <div className='Labelw'><p>TODO</p></div>
        {/* Table for the first TODO div */}
        <table className='TodoTable'>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Due Date</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {/* Add rows for tasks */}
            <tr>
              <td>Task 1</td>
              <td>Not Started</td>
              <td>2023-12-31</td>
              {/* Add more cells as needed */}
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        {/* End of table */}
      </div>
      {/* End of first TODO div with a table */}

      {/* Other TODO, In Progress, and Finished divs */}
      <div className="ToDo">
        <div className='Labelw'><p>In Progress</p></div>
        {/* Add content for the In Progress div */}
      </div>

      <div className="ToDo">
        <div className='Labelw'><p>Finished</p></div>
        {/* Add content for the Finished div */}
      </div>
      {/* End of other TODO, In Progress, and Finished divs */}

      {isPopupVisible && <ProjectSettingsPopup onClose={closePopup} />}
    </div>
  );
};

export default Tasks;
