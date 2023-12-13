import React, { useState } from 'react';
import '../style/Tasks.css';
import { DotsThreeVertical, Gear, X } from "@phosphor-icons/react";

const TaskList = ({ tasks, acceptLabel }) => {
  return (
    <div className="ToDo">
      <div className='Labelw'><p>{tasks.label}</p></div>
      <table className='TodoTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Assignee</th>
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
              acceptLabel={acceptLabel}
              onDotsClick={task.onDotsClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TaskRow = ({ name, assignee, dueDate, onAccept, acceptLabel, onDotsClick }) => {
  const [isIconDropdownVisible, setIconDropdownVisible] = useState(false);
  const [isDotsDropdownVisible, setDotsDropdownVisible] = useState(false);

  const toggleIconDropdown = () => {
    setIconDropdownVisible(!isIconDropdownVisible);
  };

  const toggleDotsDropdown = () => {
    setDotsDropdownVisible(!isDotsDropdownVisible);
  };

  const closeDropdowns = () => {
    setIconDropdownVisible(false);
    setDotsDropdownVisible(false);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
      <div className="DropdownContainer">
        <div className='icon' onClick={toggleIconDropdown}>
          {assignee}
        </div>
        {isIconDropdownVisible && (
          
          <div className="Dropdown" style={{ position: 'absolute', top: '100%', left: '0' }} onClick={closeDropdowns}>
            {/* Different dropdown content for the icon */}
            <button className="ButtonD2" onClick={() => console.log('Icon Action 1')}><div className='icon23'></div><div className='username'>Username</div></button>
            <button className="ButtonD2" onClick={() => console.log('Icon Action 2')}><div className='icon23'></div><div className='username'>Username</div></button>
            <button className="ButtonD2" onClick={() => console.log('Icon Action 2')}><div className='icon23'></div><div className='username'>Username</div></button>
          </div>
        
        )}
        </div>
      </td>
      <td>{dueDate}</td>
      <td><button className="Button" onClick={onAccept}>{acceptLabel}</button></td>
      <td>
        <div className="DropdownContainer">
          <button className="ButtonDots" onClick={toggleDotsDropdown}>
            <DotsThreeVertical />
          </button>
          {isDotsDropdownVisible && (
            <div className="Dropdown" style={{ position: 'absolute', top: '100%', left: '0' }} onClick={closeDropdowns}>
              {/* Different dropdown content for three vertical dots */}
              <button className="ButtonD" onClick={() => console.log('Edit')}>Edit</button>
              <button className="ButtonD" onClick={() => console.log('Delete')}>Delete</button>
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
        { name: "Task 1", assignee: <div></div>, dueDate: "2023-12-31", onAccept: () => console.log('Accept button clicked'), onDotsClick: () => console.log('Dots button clicked') },
      // Add more tasks as needed
    ],
    inProgress: [
      { name: "Task 2", assignee: <div></div>, dueDate: "2023-12-31", onAccept: () => console.log('Finish button clicked'), onDotsClick: () => console.log('Dots button clicked') },
    ],
    finished: [
      { name: "Task 3", assignee: <div></div>, dueDate: "2023-12-31", onAccept: () => console.log('Reset button clicked'), onDotsClick: () => console.log('Dots button clicked') },
      // Add more tasks as needed
    ],
  };

  return (
    <div className="ParentBoxT">
      <div className='CalendarPopup'>
          <button className="Button" >
            <div className='GearAndText'>
          <div>Show Calendar</div>
          </div>
          </button>
           </div>
      <div className="AddTask">
        
        <div className="AddAddTask">
          <button className="Button" onClick={() => console.log('Task added')}> Add Task </button>
        </div>
        <div className="ProjectSettings">
          
          <button className="Button" onClick={openPopup}>
            <div className='GearAndText'>
          <div><Gear className='Gear' style={{ marginRight: '8px' }} /></div>
          <div>Project Settings</div>
          </div>
          </button>
        </div>
      </div>
      <TaskList tasks={{ label: 'TODO', items: taskData.todo }} acceptLabel="Accept" />
<TaskList tasks={{ label: 'In Progress', items: taskData.inProgress }} acceptLabel="Finish" />
<TaskList tasks={{ label: 'Finished', items: taskData.finished }} acceptLabel="Reset" />

      {isPopupVisible && <ProjectSettingsPopup onClose={closePopup} />}
    </div>
  );
};

export default Tasks;


