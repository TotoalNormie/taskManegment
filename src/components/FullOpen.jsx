import '../style/FullOpen.css';
import '../style/Calendar.css';
import '../style/Tasks.css';
import Calendar from './Calendar';
import Tasks from './Tasks';
import React from 'react';

const FullOpen = () => {
  return (
    <div className='ParentBox'>
      <div className='BoxL'>
      <Tasks />
      </div>
      <div className='Box'>
        <Calendar />
      </div>
    </div>
  );
};

export default FullOpen;

