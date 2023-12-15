import React, { useState } from 'react';

const ParentTest = () => {
	const taskDataPlaceholder = {
		todo: [
			{ name: 'Task 1', task_id: 1, assignee: <div></div>, dueDate: '2023-12-31' },
			{ name: 'Task 4', task_id: 4, assignee: <div></div>, dueDate: '2023-12-31' },
			{ name: 'Task 5', task_id: 5, assignee: <div></div>, dueDate: '2023-12-31' },
			// Add more tasks as needed
		],
		inProgress: [{ name: 'Task 2', task_id: 2, assignee: <div></div>, dueDate: '2023-12-31' }],
		finished: [
			{ name: 'Task 3', task_id: 3, assignee: <div></div>, dueDate: '2023-12-31' },
			// Add more tasks as needed
		],
	};

	const onAcceptTask = id => {
		console.log('onAcceptTask', id);
	};

	const [todo, setTodo] = useState(taskDataPlaceholder.todo);

	return (
		<div>
			parentTest
			<Child data={todo} onAccept={onAcceptTask} />
		</div>
	);
};

const Child = ({ data, onAccept }) => {
	console.log(data);

	return (
		<div>
			{data.map(task => (
				<GrandChild
					key={task.task_id}
					id={task.task_id}
					onAccept={() => onAccept(task.task_id)}
				/>
			))}
		</div>
	);
};

const GrandChild = ({ id, onAccept }) => {
	return <button onClick={onAccept}>{id}</button>;
};

export default ParentTest;