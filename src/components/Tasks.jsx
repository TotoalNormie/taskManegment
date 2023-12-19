import { useState } from 'react';
import '../style/Tasks.css';
import { DotsThreeVertical, Gear, X } from '@phosphor-icons/react';

const TaskRow = ({ name, id, assignee, assigneeColor, dueDate, onAccept, acceptLabel, onDotsClick }) => {
	const [isIconDropdownVisible, setIconDropdownVisible] = useState(false);
	const [isDotsDropdownVisible, setDotsDropdownVisible] = useState(false);

	// console.log(name, id, assignee, dueDate, onAccept, acceptLabel, onDotsClick);

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
				<div className='DropdownContainer'>
					<div className='icon' style={{backgroundColor: assigneeColor}} onClick={toggleIconDropdown}>
						{assignee}
					</div>
					{isIconDropdownVisible && (
						<div
							className='Dropdown'
							style={{ position: 'absolute', top: '100%', left: '0' }}
							onClick={closeDropdowns}>
							{/* Different dropdown content for the icon */}
							<button
								className='ButtonD2'
								onClick={() => console.log('Icon Action 1')}>
								<div className='icon23'></div>
								<div className='username'>Username</div>
							</button>
							<button
								className='ButtonD2'
								onClick={() => console.log('Icon Action 2')}>
								<div className='icon23'></div>
								<div className='username'>Username</div>
							</button>
							<button
								className='ButtonD2'
								onClick={() => console.log('Icon Action 3')}>
								<div className='icon23'></div>
								<div className='username'>Username</div>
							</button>
						</div>
					)}
				</div>
			</td>
			<td>{dueDate}</td>
			<td>
				<button className='Button' onClick={() => onAccept(id)}>
					{acceptLabel}
				</button>
			</td>
			<td>
				<div className='DropdownContainer'>
					<button className='ButtonDots' onClick={toggleDotsDropdown}>
						<DotsThreeVertical />
					</button>
					{isDotsDropdownVisible && (
						<div
							className='Dropdown'
							style={{ position: 'absolute', top: '100%', left: '0' }}
							onClick={closeDropdowns}>
							<button className='ButtonD' onClick={() => console.log('Edit')}>
								Edit
							</button>
							<button className='ButtonD' onClick={() => console.log('Delete')}>
								Delete
							</button>
						</div>
					)}
				</div>
			</td>
		</tr>
	);
};

const TaskList = ({ tasks, acceptLabel, onAccept }) => {
    return (
        <div className='ToDo'>
            <div className='Labelw'>
                <p>{tasks.label}</p>
            </div>
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
                    {tasks.items.map((task) => (
                        <TaskRow
                            key={task.task_id}
                            name={task.name}
                            assignee={task.asignee}
                            assigneeColor={task.asignee_color}
                            dueDate={task.dueDate}
                            id={task.task_id}
                            onAccept={onAccept}
                            acceptLabel={acceptLabel}
                            onDotsClick={task.onDotsClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ProjectSettingsPopup = ({ onClose }) => {
	return (
		<div className='Popup'>
			<div className='PopupContent'>
				<div className='CloseButton' onClick={onClose}>
					<X />
				</div>
				<div className='upperhalf'>
				<p>Project Settings</p>
				
				<div className='Project'>
					<p>Project Name</p>
					<p className='thing'>The name of this project</p>
					<p>Project Description</p>
					<p className='thing'>The description of this project</p>

				</div>
				<div className='EnterName'>
  					<input type='text' className='EnterNameInput' placeholder='Enter name' />
				</div>
					<div className='EnterDescription'>
 			 <input type='text' className='EnterDescriptionInput' placeholder='Enter description' />
			  </div>
</div>
<div className='lowerhalf'>
		<div className='WorkerTable'>
<table className='Table'>
	<thead>
		<th>Worker</th>
		<th>Privilage</th>
	</thead>
	<tbody>
		<tr>
		<td2><div className='icon23'></div><div className='username'>Ralfs Labutis</div></td2>
		<td>Owner</td>
		</tr>
		<tr>
		<td2><div className='icon23'></div><div className='username'>Vitālijs Vlads Juhno</div></td2>
		<td>Manager</td>
		</tr>
		<tr>
		<td2><div className='icon23'></div><div className='username'>Raivo Kingovskis</div></td2>
		<td>Worker</td>
		</tr>
	</tbody>
</table>
		</div>
		<div className='AddWorker'>
		<p>Add Workers</p>
 			 <input type='text' className='EnterDescriptionInput2' placeholder='Enter a Username' />
			  <button className='ButtonW'>
						{' '}
						Add Worker{' '}
					</button>
		</div>
</div>

			
				
			</div>
		</div>
	);
};

const formatDate = date => {
	return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
};

const Tasks = ({ tasks }) => {
	const [isProjectSettingsPopupVisible, setProjectSettingsPopupVisible] = useState(false);
	const [isAddTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
  
	const openProjectSettingsPopup = () => {
	  setProjectSettingsPopupVisible(true);
	};
  
	const closeProjectSettingsPopup = () => {
	  setProjectSettingsPopupVisible(false);
	};
  
	const openAddTaskPopup = () => {
	  setAddTaskPopupVisible(true);
	};
  
	const closeAddTaskPopup = () => {
	  setAddTaskPopupVisible(false);
	};

	// const taskDataPlaceholder = {
	// 	todo: [
	// 		{ name: 'Task 1', task_id: 1, assignee: <div></div>, dueDate: '2023-12-31' },
	// 		{ name: 'Task 4', task_id: 4, assignee: <div></div>, dueDate: '2023-12-31' },
	// 		{ name: 'Task 5', task_id: 5, assignee: <div></div>, dueDate: '2023-12-31' },
	// 		// Add more tasks as needed
	// 	],
	// 	inProgress: [{ name: 'Task 2', task_id: 2, assignee: <div></div>, dueDate: '2023-12-31' }],
	// 	finished: [
	// 		{ name: 'Task 3', task_id: 3, assignee: <div></div>, dueDate: '2023-12-31' },
	// 		// Add more tasks as needed
	// 	],
	// };

	// const [taskData, setTaskData] = useState(taskDataPlaceholder);

	// console.log('tasks',tasks);
	const formattedTasks = tasks.map(task => ({ ...task, dueDate: formatDate(task.dueDate) }));
	const [todo, setTodo] = useState(formattedTasks.filter(task => task.status === 'todo'));
	const [inProgress, setInProgress] = useState(
		formattedTasks.filter(task => task.status === 'in progress')
	);
	const [finished, setFinished] = useState(formattedTasks.filter(task => task.status === 'done'));

	// console.log(formattedTasks);

	const onAcceptToDo = taskID => {
		console.log(taskID);
		const taskArray = todo.filter(task => task.task_id === taskID);
		const task = taskArray[0];
		console.log(taskArray);
		console.log(task);
		setInProgress([...inProgress, task]);
		console.log(todo.filter(task => task.task_id !== taskID));

		setTodo(todo.filter(task => task.task_id !== taskID));
	};

	const onAcceptInProgress = taskID => {
		const taskArray = inProgress.filter(task => task.task_id === taskID);
		const task = taskArray[0];
		setFinished([...finished, task]);
		setInProgress(inProgress.filter(task => task.task_id !== taskID));
	};

	const onAcceptFinished = taskID => {
		const taskArray = finished.filter(task => task.task_id === taskID);
		const task = taskArray[0];
		setTodo([...todo, task]);
		setFinished(finished.filter(task => task.task_id !== taskID));
	};

	return (
		<div className='ParentBoxT'>
			<div className='CalendarPopup'>
				<button className='ButtonC'>
						<div>Show Calendar</div>
				</button>
			</div>
			<div className='AddTask'>
				<div className='AddAddTask'>
					<button className='Button' onClick={openAddTaskPopup} >
						{' '}
						Add Task{' '}
					</button>
				</div>
				<div className='ProjectSettings'>
					<button className='ButtonG' onClick={openProjectSettingsPopup}>
						<div className='GearAndText'>
							<div>
								<Gear className='Gear' style={{ marginRight: '8px' }} />
							</div>
							<div>Project Settings</div>
						</div>
					</button>
				</div>
			</div>
			<TaskList
				tasks={{ label: 'TODO', items: todo }}
				acceptLabel='Accept'
				onAccept={onAcceptToDo}
			/>
			<TaskList
				tasks={{ label: 'In Progress', items: inProgress }}
				acceptLabel='Finish'
				onAccept={onAcceptInProgress}
			/>
			<TaskList
				tasks={{ label: 'Finished', items: finished }}
				acceptLabel='Reset'
				onAccept={onAcceptFinished}
			/>

{isProjectSettingsPopupVisible && <ProjectSettingsPopup onClose={closeProjectSettingsPopup} />}
      {isAddTaskPopupVisible && (
        <div className='Popup'>
          <div className='PopupContent'>
            <div className='CloseButton' onClick={closeAddTaskPopup}>
              <X />
            </div>
			<div className='top'>
            <div className='name'>
				<p>Name</p>
			<input type='text' className='nameInput' placeholder='Enter name' />
			</div>
			<div className='dropdown'>
			<p>Asignee</p>
      <select className='nameInput'>
        <option value="">None</option>
        <option value="option1"><div className='icon23'></div><div className='username'>Ralfs Labutis</div></option>
        <option value="option2">Raivo Kingovskis</option>
        <option value="option3">Vitālijs Juhno Vlads</option>
      </select>
				</div>
				
          </div>
		  <div className='bottom'>
		  <div className='description'>
					<p>Description</p>
					<textarea type='text' className='descInput' placeholder='Enter description' />
				</div>
				<div className='Ddate'>
					<div className='EndlessFrontend'>
						<p>Due Date</p>
						<input type='text' className='nameInput' placeholder='DD/MM/YY' />
						</div>
						
				</div>
				
				</div>
				<div className='AnotherFKbutton'>
				<button className='Buttonsrfrsg'>Upload Task</button>
							</div>
		  </div>
        </div>
      )}
		</div>
	);
};

export default Tasks;
