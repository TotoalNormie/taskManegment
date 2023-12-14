import { DotsThreeVertical } from '@phosphor-icons/react';
import { useState } from 'react';

const TaskRow = ({ name, task_id, assignee, dueDate, onAccept, acceptLabel, onDotsClick }) => {
	const [isIconDropdownVisible, setIconDropdownVisible] = useState(false);
	const [isDotsDropdownVisible, setDotsDropdownVisible] = useState(false);

	console.log({ name, task_id, assignee, dueDate, onAccept, acceptLabel, onDotsClick });


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
					<div className='icon' onClick={toggleIconDropdown}>
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
								onClick={() => console.log('Icon Action 2')}>
								<div className='icon23'></div>
								<div className='username'>Username</div>
							</button>
						</div>
					)}
				</div>
			</td>
			<td>{dueDate}</td>
			<td>
				<button className='Button' onClick={() => onAccept(task_id)}>
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
							{/* Different dropdown content for three vertical dots */}
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

export default TaskRow;