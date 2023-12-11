import '../style/FullOpen.css';
import '../style/Calendar.css';
import Calendar from './Calendar';
import { useEffect, useState } from 'react';
import makeAPIRequest from '../functions/makeAPIRequest';
import { useParams } from 'react-router';

const FullOpen = () => {
	const [tasks, setTasks] = useState(null);
  const [updated, setUpdated] = useState(false);
	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		if (id) {
			makeAPIRequest('projects/' + id, (response) => {
        setTasks(setTasks(response.data));
      });
		}
	}, []);
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
