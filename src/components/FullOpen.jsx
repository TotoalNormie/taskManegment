import '../style/FullOpen.css';
import '../style/Calendar.css';
import Calendar from './Calendar';
import React, { useState } from 'react';

const FullOpen = () => {
  return (
        <div className='ParentBox'>
          <div className='Box'>
            <p>penis</p>
          </div>
          <div className='Box'>
            <Calendar />
          </div>
        </div>
  );
};

export default FullOpen;