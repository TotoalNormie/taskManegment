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

	console.log(tasks);

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

	return (
		<>
			<div className={`BottomDisplay ${shrunkenDiv !== null ? 'visible' : ''}`}>
				{shrunkenDiv !== null && (
					<p>
						{formatDate(
							new Date(selectedDate.year, selectedDate.month - 1, shrunkenDiv - 5)
						)}
					</p>
				)}
			</div>
			<div className='Table2Div'>
				<table className='Table2'>
					<tbody>
						<tr>
							<td>
								<div className='icon2'></div>
							</td>
							<td>Write APi Documentation</td>
							<td>Nov 12</td>
						</tr>
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
			</div>
		</>
	);
};

const getFullDate = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return day + '.' + month + '.' + year;
};

const tasksJson = `[
    {"name":"Task 1","description":"Description for Task 1","creation_date":1702296807,"status":"done","due_date":1701964754,"asignee":"user3","asignee_color":"#928FFF"},
    {"name":"Task 2","description":"Description for Task 2","creation_date":1701442624,"status":"in progress","due_date":1703035671,"asignee":null,"asignee_color":null},
    {"name":"Task 3","description":"Description for Task 3","creation_date":1702661489,"status":"done","due_date":1701874405,"asignee":"user2","asignee_color":"#ffff66"},
    {"name":"Task 4","description":"Description for Task 4","creation_date":1702904965,"status":"done","due_date":1703238883,"asignee":"user2","asignee_color":"#d3ffce"},
    {"name":"Task 5","description":"Description for Task 5","creation_date":1702727067,"status":"todo","due_date":1702274395,"asignee":"user1","asignee_color":"#FF4554"},
    {"name":"Task 6","description":"Description for Task 6","creation_date":1701763495,"status":"in progress","due_date":1702227637,"asignee":null,"asignee_color":"#00C3E3"},
    {"name":"Task 7","description":"Description for Task 7","creation_date":1703775106,"status":"done","due_date":1703973203,"asignee":"user1","asignee_color":null},
    {"name":"Task 8","description":"Description for Task 8","creation_date":1703232081,"status":"todo","due_date":1701736491,"asignee":"user2","asignee_color":"#00C3E3"},
    {"name":"Task 9","description":"Description for Task 9","creation_date":1701887820,"status":"todo","due_date":1701430225,"asignee":null,"asignee_color":"#A1B88D"},
    {"name":"Task 10","description":"Description for Task 10","creation_date":1703758651,"status":"todo","due_date":1703349511,"asignee":"user1","asignee_color":"#928FFF"},
    {"name":"Task 11","description":"Description for Task 11","creation_date":1703446270,"status":"todo","due_date":1702706351,"asignee":"user1","asignee_color":"#ffff66"},
    {"name":"Task 12","description":"Description for Task 12","creation_date":1702395717,"status":"todo","due_date":1701564225,"asignee":"user1","asignee_color":"#d3ffce"},
    {"name":"Task 13","description":"Description for Task 13","creation_date":1702493572,"status":"in progress","due_date":1701833121,"asignee":"user3","asignee_color":"#FF4554"},
    {"name":"Task 14","description":"Description for Task 14","creation_date":1703587970,"status":"todo","due_date":1702481296,"asignee":"user1","asignee_color":"#00C3E3"},
    {"name":"Task 15","description":"Description for Task 15","creation_date":1702199806,"status":"in progress","due_date":1702326060,"asignee":"user1","asignee_color":"#00C3E3"}
]
`;

const Calendar = () => {
	const now = new Date();
	// console.log({ year: now.getFullYear(), month: now.getMonth() });
	const [selectedDate, setSelectedDate] = useState({
		year: now.getFullYear(),
		month: now.getMonth() + 1,
		day: null,
	});

	const tasks = JSON.parse(tasksJson);
	// console.log('tasks: ', JSON.stringify(tasks));
	const { user } = useUserContext();
	const datesWithUserTasks = tasks
		// .filter(tasks => tasks.asignee === user)
		.map(task => {
			const date = new Date(task.creation_date * 1000);
			// console.log(task);
			const day = date.getDate();
			// console.log(day, task.creation_date);
			return getFullDate(date);
		});

	// console.log('days with user: ', datesWithUserTasks);

	const [toggledButtons, setToggledButtons] = useState([]);
	const [shrunkenDiv, setShrunkenDiv] = useState(null);

	const toggleButton = index => {
		setToggledButtons(prevToggledButtons => {
			const newToggledButtons = [...prevToggledButtons];
			newToggledButtons[index] = !newToggledButtons[index];
			return newToggledButtons;
		});
	};

	const handleDoubleClick = index => {
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
					className={`generated-div prev-next-month  ${
						shrunkenDiv === i ? 'shrunken' : ''
					}`}
					disabled={true}
					onDoubleClick={() => handleDoubleClick(i)}>
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
						toggledButtons[i] ||
						datesWithUserTasks.includes(getFullDate(currentMonthStart))
							? 'active'
							: ''
					} ${shrunkenDiv === i + daysFromPrevMonth ? 'shrunken' : ''}`}
					onClick={() => toggleButton(i)}
					onDoubleClick={() => handleDoubleClick(i + daysFromPrevMonth)}>
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
				<button
					key={`next-${i}`}
					className={`generated-div prev-next-month ${
						shrunkenDiv === i + totalDays ? 'shrunken' : ''
					}`}
					disabled={true}
					onDoubleClick={() => handleDoubleClick(i + totalDays)}>
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
