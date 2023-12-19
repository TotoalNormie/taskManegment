import '../style/FullOpen.css';
import '../style/Calendar.css';
import '../style/Tasks.css';
import Calendar from './Calendar';
import Tasks from './Tasks';
import React, { useEffect, useState } from 'react';
import makeAPIRequest from '../functions/makeAPIRequest';
import { useParams, useNavigate } from 'react-router';
import NoProject from './NoProject';
import { useUserContext } from './UserProvider';

const tasksJson = `[
    {"task_id": 1, "name": "Task 1", "description": "Description for Task 1", "creation_date": 1701964754, "status": "done", "due_date": 1702296807, "asignee": "user3", "asignee_color": "#928FFF"},
    {"task_id": 2, "name": "Task 2", "description": "Description for Task 2", "creation_date": 1701442624, "status": "in progress", "due_date": 1703035671, "asignee": null, "asignee_color": null},
    {"task_id": 3, "name": "Task 3", "description": "Description for Task 3", "creation_date": 1701874405, "status": "done", "due_date": 1702661489, "asignee": "user2", "asignee_color": "#d3ffce"},
    {"task_id": 4, "name": "Task 4", "description": "Description for Task 4", "creation_date": 1702904965, "status": "done", "due_date": 1703238883, "asignee": "user2", "asignee_color": "#FF4554"},
    {"task_id": 5, "name": "Task 5", "description": "Description for Task 5", "creation_date": 1702274395, "status": "todo", "due_date": 1702727067, "asignee": "user1", "asignee_color": "#00C3E3"},
    {"task_id": 6, "name": "Task 6", "description": "Description for Task 6", "creation_date": 1701763495, "status": "in progress", "due_date": 1702227637, "asignee": null, "asignee_color": null},
    {"task_id": 7, "name": "Task 7", "description": "Description for Task 7", "creation_date": 1703775106, "status": "done", "due_date": 1703973203, "asignee": "user1", "asignee_color": "#A1B88D"},
    {"task_id": 8, "name": "Task 8", "description": "Description for Task 8", "creation_date": 1701736491, "status": "todo", "due_date": 1703232081, "asignee": "user2", "asignee_color": "#928FFF"},
    {"task_id": 9, "name": "Task 9", "description": "Description for Task 9", "creation_date": 1701430225, "status": "todo", "due_date": 1701887820, "asignee": null, "asignee_color": null},
    {"task_id": 10, "name": "Task 10", "description": "Description for Task 10", "creation_date": 1703349511, "status": "todo", "due_date": 1703758651, "asignee": "user1", "asignee_color": "#d3ffce"},
    {"task_id": 11, "name": "Task 11", "description": "Description for Task 11", "creation_date": 1702706351, "status": "todo", "due_date": 1703446270, "asignee": "user1", "asignee_color": "#FF4554"},
    {"task_id": 12, "name": "Task 12", "description": "Description for Task 12", "creation_date": 1701564225, "status": "todo", "due_date": 1702395717, "asignee": "user1", "asignee_color": "#00C3E3"},
    {"task_id": 13, "name": "Task 13", "description": "Description for Task 13", "creation_date": 1701833121, "status": "in progress", "due_date": 1702493572, "asignee": "user3", "asignee_color": "#00C3E3"},
    {"task_id": 14, "name": "Task 14", "description": "Description for Task 14", "creation_date": 1702481296, "status": "todo", "due_date": 1703587970, "asignee": "user1", "asignee_color": "#A1B88D"},
    {"task_id": 15, "name": "Task 15", "description": "Description for Task 15", "creation_date": 1702199806, "status": "in progress", "due_date": 1702326060, "asignee": "user1", "asignee_color": "#A1B88D"}
]`;

const FullOpen = () => {
	const { user } = useUserContext();
	const taskArray = JSON.parse(tasksJson);
	const formatted = taskArray.map(task => ({
		...task,
		dueDate: new Date(task.due_date * 1000),
		creationDate: new Date(task.creation_date * 1000),
	}));
	const [tasks, setTasks] = useState(formatted);
	const [updated, setUpdated] = useState(false);
	const [workers, setWorkers] = useState(null);
	const { id } = useParams();
	const navigate = useNavigate();


	useEffect(() => {
		if (id && !tasks) {
			makeAPIRequest('projects/' + id + '/tasks', response => {
				setTasks(response.data); // Corrected setTasks here
			});
		}
	}, [id]);

	useEffect(() => {
		makeAPIRequest('projects/' + id + '/workers', response => {
			setWorkers(response.data); // Corrected setWorkers here
		});
	}, [id]);

	useEffect(()=> {
		console.log(user, localStorage.getItem('user'));
		if(!user && !localStorage.getItem('user')) navigate('/home');
	}, [user]);


	const resetComponent = () => {
		setUpdated(!updated);
	};

	return id ? (
		<div className='ParentBox'>
			<div className='BoxL'>
				<Tasks tasks={tasks} workers={workers} />
			</div>
			<div className='Box'>
				<Calendar tasks={tasks} workers={workers} />
			</div>
		</div>
	) : (
		<NoProject />
	);
};

export default FullOpen;
