import "../style/Calendar.css";
const Calendar = () => {
    const tasks = [
        { title: "Frontend", dueDate: "01.12.2023" },
        { title: "a", dueDate: "08.12.2023" },
        { title: "j", dueDate: "12.12.2023" },
        { title: "c", dueDate: "14.12.2023" },
        { title: "b", dueDate: "09.01.2024" },
    ];

    const Output = tasks.map((task) => (
        <div key={task.id} className="output-box">
            <div className="task-title">{task.title}</div>
            <div className="task-date">{task.dueDate}</div>
        </div>
    ))
    let date = [];
    for (let i = 1; i <= 31; i++) {
        date.push(i);
    }
    const days = date.map((day, index) => (
        <div key={index} className="day">
            {day}
        </div>
    ))
        
    return (
        <div>
            <h1>Task Calendar</h1>
            <div className="calendar">
                {Output}
                {days}
            </div>
        </div>

    );
};

export default Calendar;