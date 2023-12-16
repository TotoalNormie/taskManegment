import { useState } from 'react';
import { CaretRight, CaretLeft } from '@phosphor-icons/react';
import { useUserContext } from './UserProvider';

const DayLabels = () => {
	// Array of day names to display
	const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	return (
		<div className='DayLabels'>
			{dayNames.map((day, index) => (
				<div key={index} className='day-label'>
					{day}
				</div>
			))}
		</div>
	);
};

const BottomDisplay = ({ selectedDate, shrunkenDiv, tasks }) => {
	const formatDate = date => {
		const dayOfMonth = date.getDate();
		const suffix = getNumberSuffix(dayOfMonth);

		const options = { weekday: 'long' };
		return `${date.toLocaleDateString('en-US', options)} ${dayOfMonth}${suffix}`;
	};

	const selectedDateDate = new Date(selectedDate.year, selectedDate.month - 1, shrunkenDiv);

	console.log(selectedDateDate);

	// console.log('Calendar:', tasks);
	console.log(selectedDate);
	console.log('shrunkenDiv', shrunkenDiv);

	// Function to get the suffix for numbers (e.g., "st", "nd", "rd", "th")
	const getNumberSuffix = number => {
		if (number >= 11 && number <= 13) {
			return 'th';
		}
		const lastDigit = number % 10;
		switch (lastDigit) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};
	// console.log(selectedDate);
	const dueDate = shrunkenDiv
		? tasks
				.filter(task => {
					// console.log(task.creationDate.getFullYear());
					// console.log(selectedDateDate.getFullYear());

					const selectedDateKey = getFullDate(selectedDateDate);

					const taskCreationDateKey = getFullDate(task.creationDate);
					if (selectedDateKey === taskCreationDateKey) {
						console.log(selectedDateKey, taskCreationDateKey, task);
					}

					return selectedDateKey === taskCreationDateKey;
				})
				.reduce((acc, cur) => (acc.dueDate > cur.dueDate ? acc : cur)).dueDate
		: null;

	console.log('dueDate', dueDate);

	const selectedTasks = dueDate
		? tasks.filter(
				task =>
					getFullDate(task.dueDate, true) >= getFullDate(selectedDateDate, true) &&
					getFullDate(task.dueDate, true) <= getFullDate(dueDate, true)
		  )
		: [];

	console.log('selectedTasks', selectedTasks);

	return (
		<>
			<div className={`BottomDisplay ${shrunkenDiv !== null ? 'visible' : ''}`}>
				{shrunkenDiv !== null && <p>{formatDate(selectedDateDate)}</p>}
			</div>
			<div className='Table2Div'>
				{shrunkenDiv ? (
					<>
						<table className='Table2'>
							<tbody>
								{selectedTasks.map(task => (
								<tr key={task.task_id}>
									<td>
										<div
											className='icon2'
											style={{ backgroundColor: task.asignee_color }}>
											{task.asignee}
										</div>
									</td>
									<td>{task.name}</td>
									<td>{formatDateShort(task.dueDate)}</td>
								</tr>
								))}
							</tbody>
						</table>
						<table className='Table3'>
							<tbody>
								<tr>
									<td>
										<div className='icon3'></div>
									</td>
									<td>other workers task</td>
									<td>Nov 12</td>
								</tr>
							</tbody>
						</table>
					</>
				) : null}
			</div>
		</>
	);
};

const formatDateShort = date => {
	return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
};

const getFullDate = (date, returnDate = false) => {
	// console.log(date);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	if (returnDate) return new Date(year, month, day);
	return day + '.' + month + '.' + year;
};

const Calendar = ({ tasks }) => {
	const now = new Date();
	// console.log({ year: now.getFullYear(), month: now.getMonth() });
	const [selectedDate, setSelectedDate] = useState({
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: null,
	});
	console.log(tasks);
	// console.log('tasks: ', JSON.stringify(tasks));
	const { user } = useUserContext();
	const datesWithUserTasks = tasks
		// .filter(tasks => tasks.asignee === user)
		.map(task => {
			return getFullDate(task.creationDate);
		});

	// console.log('days with user: ', datesWithUserTasks);

	const [shrunkenDiv, setShrunkenDiv] = useState(null);

	const handleClick = index => {
		setShrunkenDiv(prev => (prev === index ? null : index));
	};

	const generateDivs = () => {
		const divs = [];
		// console.log(selectedDate);
		const currentMonthStart = new Date(selectedDate.year, selectedDate.month - 1, 1);
		// console.log(currentMonthStart);
		const daysInMonth = new Date(selectedDate.year, selectedDate.month, 0).getDate();
		const firstDayOfMonth = new Date(selectedDate.year, selectedDate.month - 1, 1).getDay();

		// Calculate the offset to start the week with Sunday
		const daysFromPrevMonth = (firstDayOfMonth - 1 + 7) % 7;

		// Days from the previous month
		const prevMonthLastDay = new Date(selectedDate.year, selectedDate.month - 1, 0).getDate();
		for (let i = daysFromPrevMonth; i > 0; i--) {
			divs.push(
				<button
					key={`prev-${i}`}
					className={`generated-div prev-next-month`}
					disabled={true}>
					<span>{prevMonthLastDay - i + 1}</span>
				</button>
			);
		}
		// console.log(currentMonthStart);
		// Days from the current month
		for (let i = 0; i < daysInMonth; i++) {
			const dayOfMonth = i + 1;
			currentMonthStart.setDate(dayOfMonth);
			// console.log(currentMonthStart);
			divs.push(
				<button
					key={`current-${i}`}
					className={`generated-div ${
						datesWithUserTasks.includes(getFullDate(currentMonthStart)) ? 'active' : ''
					} ${shrunkenDiv === dayOfMonth ? 'shrunken' : ''}`}
					onClick={
						datesWithUserTasks.includes(getFullDate(currentMonthStart))
							? () => handleClick(dayOfMonth)
							: null
					}>
					<span>{dayOfMonth}</span>
				</button>
			);
		}
		currentMonthStart.setDate(1);
		// Days from the next month
		const totalDays = daysFromPrevMonth + daysInMonth;
		const daysFromNextMonth = 42 - totalDays; // Total number of cells in a 6x7 grid
		for (let i = 0; i < daysFromNextMonth; i++) {
			divs.push(
				<button key={`next-${i}`} className='generated-div prev-next-month' disabled={true}>
					<span>{i + 1}</span>
				</button>
			);
		}

		return divs;
	};

	const handleMonthChange = increment => {
		const newDate = { ...selectedDate };
		newDate.month += increment;

		if (newDate.month === 0) {
			newDate.month = 12;
			newDate.year -= 1;
		} else if (newDate.month === 13) {
			newDate.month = 1;
			newDate.year += 1;
		}

		setSelectedDate(newDate);
		setToggledButtons([]);
		setShrunkenDiv(null); // Reset shrunken div on month change
	};

	return (
		<div className='ParentBoxCal'>
			<div className='YeMo'>
				<div>
					<button className='arrow-button' onClick={() => handleMonthChange(-1)}>
						<CaretLeft />
					</button>
				</div>
				<label className='Label'>
					{new Date(selectedDate.year, selectedDate.month - 1, 1).toLocaleString(
						'default',
						{
							month: 'long',
						}
					)}{' '}
					{selectedDate.year}
				</label>
				<div>
					<div>
						<button className='arrow-button' onClick={() => handleMonthChange(1)}>
							<CaretRight />
						</button>
					</div>
				</div>
			</div>
			<DayLabels />
			<div className='Calendar'>
				<div id='divContainer'>{selectedDate.year > 0 && generateDivs()}</div>
			</div>
			<BottomDisplay selectedDate={selectedDate} shrunkenDiv={shrunkenDiv} tasks={tasks} />
		</div>
	);
};

export default Calendar;
