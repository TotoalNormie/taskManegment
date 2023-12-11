import { useState } from 'react';
import '../style/Tasks.css';
import { DotsThreeVertical, Gear, X } from "@phosphor-icons/react";

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
            <div className='GearAndText'>
          <div><Gear className='Gear' style={{ marginRight: '8px' }} /></div>
          <div>Project Settings</div>
          </div>
          </button>
        </div>
      </div>
      <div className="ToDo">
        <div className='Labelw'><p>TODO</p></div>
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
            <tr>
              <td>Task 1</td>
              <td>Not Started</td>
              <td>2023-12-31</td>
              <td><button className="Button" onClick={() => console.log('Task added')}>Accept</button></td>
              <td><button className="ButtonDots" onClick={() => console.log('Dots button clicked')}>
                <DotsThreeVertical />
              </button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ToDo">
        <div className='Labelw'><p>In Progress</p></div>
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
            <tr>
              <td>Task 1</td>
              <td>Not Started</td>
              <td>2023-12-31</td>
              <td><button className="Button" onClick={() => console.log('Task added')}>Accept</button></td>
              <td><button className="ButtonDots" onClick={() => console.log('Dots button clicked')}>
                <DotsThreeVertical />
              </button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="ToDo">
        <div className='Labelw'><p>Finished</p></div>
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
            <tr>
              <td>Task 1</td>
              <td>Not Started</td>
              <td>2023-12-31</td>
              <td><button className="Button" onClick={() => console.log('Task added')}>Accept</button></td>
              <td><button className="ButtonDots" onClick={() => console.log('Dots button clicked')}>
                <DotsThreeVertical />
              </button></td>
            </tr>
          </tbody>
        </table>
      </div>

      {isPopupVisible && <ProjectSettingsPopup onClose={closePopup} />}
    </div>
  );
};

export default Tasks;
