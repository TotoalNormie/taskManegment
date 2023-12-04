import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Sidebar.css';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
	const [projects, setProjects] = useState([
		{ name: 'project 1', id: 1 },
		{ name: 'project 2', id: 2 },
		{ name: 'project 3', id: 3 },
		{ name: 'project 4', id: 4 },
	]);

	// console.log(projects);

	const [seen, setSeen] = useState(false);

	const projectLinks = projects.map(( { name, id } ) => <li key={id}><Link to={'/?id=' + id}>{name}</Link></li>);
	// projects.forEach(( { name, id } ) => console.log(name, id));


	const location = useLocation();
	if (
		location.pathname === '/login' ||
		location.pathname === '/signup' ||
		location.pathname === '/landing'
	)
		return null;

	return (
		<nav>
			<Link to='/test'>testing</Link>
			<button className={'drop'} onClick={()=> setSeen(!seen)}>
				<FontAwesomeIcon style={{transition: 'rotate .4s ease'}} className={seen ? 'flipped' : ''} icon={faAngleDown}></FontAwesomeIcon>
				<span> Your Projects</span>
			</button>
			<div className={`projects hidden ${seen ? 'stretched' : ''}`}>
				{projectLinks}
				<button>Add new project...</button>
			</div>
		</nav>
	);
};

export default Sidebar;
