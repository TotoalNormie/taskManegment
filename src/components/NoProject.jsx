import '../style/NoProject.css';
import React from 'react';

const NoProject = () => {
  return (
    <div className='ParentBoxNO'>
      <div className='No'>
    <p>No Projects Found</p>
      </div>
      <div className='ButtonDiv'>
      <button className="BUTTONNO" onClick={() => console.log('Task added')}> Create New Project </button>
      </div>
    </div>
  );
};

export default NoProject;

