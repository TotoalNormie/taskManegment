import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Sidebar.css';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { CaretDown, CaretLeft } from '@phosphor-icons/react';

const Sidebar = () => {
	const [projects, setProjects] = useState([
		{ name: 'project 1', id: 1 },
		{ name: 'project 2', id: 2 },
		{ name: 'project 3', id: 3 },
		{ name: 'project 4', id: 4 },
	]);
	const location = useLocation();
	const [seen, setSeen] = useState(true);
	const [toSide, setToSide] = useState(false);
	const projectLinks = projects.map(({ name, id }) => (
		<li className={'/' + id == location.pathname ? 'active' : ''} key={id}>
			<Link to={'/' + id}>{name}</Link>
		</li>
	));
	if (
		location.pathname === '/login' ||
		location.pathname === '/signup' ||
		location.pathname === '/landing'
	)
		return null;

	// useEffect(() => {}, []);

	return (
		<div className='wrapper'>
			<button className='toggleSidebar' onClick={() => setToSide(!toSide)}>
				<CaretLeft
					className={toSide ? 'flipped' : ''}
					style={{ transition: 'rotate .4s ease' }}
				/>
			</button>
			<nav className={toSide ? 'toSide' : ''}>
				<Link to='/test'>testing</Link>
				<button className={'drop'} onClick={() => setSeen(!seen)}>
					<CaretDown
						style={{ transition: 'rotate .4s ease' }}
						className={seen ? 'flipped' : ''}
					/>
					{/* <FontAwesomeIcon style={{transition: 'rotate .4s ease'}} className={seen ? 'flipped' : ''} icon={faAngleDown}></FontAwesomeIcon> */}
					<span> Your Projects</span>
				</button>
				<ul className={`projects hidden ${seen ? 'stretched' : ''}`}>
					{projectLinks}
					<button>Add new project...</button>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
