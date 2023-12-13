import React, { useState } from 'react';
import '../style/Tasks.css';
import { DotsThreeVertical, Gear, X } from "@phosphor-icons/react";

const TaskList = ({ tasks }) => {
  return (
    <div className="ToDo">
      <div className='Labelw'><p>{tasks.label}</p></div>
      <table className='TodoTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Asignee</th>
            <th>Due Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.items.map((task, index) => (
            <TaskRow
              key={index}
              name={task.name}
              assignee={task.assignee}
              dueDate={task.dueDate}
              onAccept={task.onAccept}
              onDotsClick={task.onDotsClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
const TaskRow = ({ name, assignee, dueDate, onAccept, onDotsClick }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };
  
    const closeDropdown = () => {
      setDropdownVisible(false);
    };
  
  return (
    <tr>
      <td>{name}</td>
      <td><div className='icon'>{assignee}</div></td>
      <td>{dueDate}</td>
      <td><button className="Button" onClick={onAccept}>Accept</button></td>
      <td>
        <div className="DropdownContainer">
          <button className="ButtonDots" onClick={toggleDropdown}>
            <DotsThreeVertical />
          </button>
          {isDropdownVisible && (
            <div className="Dropdown" onClick={closeDropdown}>
                <button className="ButtonD" onClick={() => console.log('Task added')}> Edit </button>
                <button className="ButtonD" onClick={() => console.log('Task added')}> Delete </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
const ProjectSettingsPopup = ({ onClose }) => {
  return (
    <div className="Popup">
      <div className="PopupContent">
        <div className="CloseButton" onClick={onClose}>
          <X />
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

  const taskData = {
    todo: [
      { name: "Task 1", assignee: <div></div>, dueDate: "2023-12-31", onAccept: () => console.log('Task added'), onDotsClick: () => console.log('Dots button clicked') },
      // Add more tasks as needed
    ],
    inProgress: [
      { name: "Task 2", assignee: <div></div>, dueDate: "2023-12-31", onAccept: () => console.log('Task added'), onDotsClick: () => console.log('Dots button clicked') },
      // Add more tasks as needed
    ],
    finished: [
      { name: "Task 3", assignee: <div></div>, dueDate: "2023-12-31", onAccept: () => console.log('Task added'), onDotsClick: () => console.log('Dots button clicked') },
      // Add more tasks as needed
    ],
  };

  return (
    <div className="ParentBoxT">
      <div className="AddTask">
        <div className="AddAddTask">
          <button className="Button" onClick={() => console.log('Task added')}> Add Task </button>
        </div>
        <div className="ProjectSettings">
          
          <button className="Button2" onClick={openPopup}>
            <div className='GearAndText'>
          <div><Gear className='Gear' style={{ marginRight: '8px' }} /></div>
          <div>Project Settings</div>
          </div>
          </button>
        </div>
      </div>
      <TaskList tasks={{ label: 'TODO', items: taskData.todo }} />
      <TaskList tasks={{ label: 'In Progress', items: taskData.inProgress }} />
      <TaskList tasks={{ label: 'Finished', items: taskData.finished }} />

      {isPopupVisible && <ProjectSettingsPopup onClose={closePopup} />}
    </div>
  );
};

export default Tasks;


