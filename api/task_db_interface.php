<?php
	require_once("utility.php");

	// TODO: rewrite sql create statements so that the owner of a project cannot be in the workers table
	// also disallow multiple workers with same id
	enum TaskState
	{
		case ToDo;
		case InProgress;
		case Done;
	}

	enum UserPrivilege
	{
		case Worker;
		case Manager;
		case Owner;
	}

	function Tr_UserPrivToString($value)
	{
		if($value === UserPrivilege::Worker)
			return "worker";
		else if($value === UserPrivilege::Manager)
			return "manager";
		else if($value === UserPrivilege::Owner)
			return "owner";
		else
			return false;
	}

	function Tr_StringToUserPriv($value)
	{
		if($value === "worker")
			return UserPrivilege::Worker;
		else if($value === "manager")
			return UserPrivilege::Manager;
		else if($value === "owner")
			return UserPrivilege::Owner;
		else
			return false;
	}

	function Tr_TaskStateToString($value)
	{
		if($value === TaskState::ToDo)
			return "todo";
		else if($value === TaskState::InProgress)
			return "in progress";
		else if($value === TaskState::Done)
			return "done";
		else
			return false;
	}

	function Tr_StringToTaskState($value)
	{
		if($value === "todo")
			return TaskState::ToDo;
		else if($value === "in progress")
			return TaskState::InProgress;
		else if($value === "done")
			return TaskState::Done;
		else
			return false;
	}

	function Tr_UserPrivToDB($value)
	{
		if($value === UserPrivilege::Worker)
			return 0;
		else if($value === UserPrivilege::Manager)
			return 1;
		else
			return false;
	}

	function Tr_TaskStateToDB($value)
	{
		if($value === TaskState::ToDo)
			return 0;
		else if($value === TaskState::InProgress)
			return 1;
		else if($value === TaskState::Done)
			return 2;
		else
			return false;
	}

	function Tr_DBToUserPriv($value)
	{
		if($value === 0)
			return UserPrivilege::Worker;
		else if($value === 1)
			return UserPrivilege::Manager;
		else
			return false;
	}

	function Tr_DBToTaskState($value)
	{
		if($value === 0)
			return TaskState::ToDo;
		else if($value === 1)
			return TaskState::InProgress;
		else if($value === 2)
			return TaskState::Done;
		else
			return false;
	}

class TaskDatabase
{

    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "taskdb";
    private $DB;

    public function __construct()
    {
        $this->mysqli = new mysqli("localhost", "root", "", "taskdb");

        if ($this->mysqli->connect_error) 
            exit(CreateResponse(ResponseType::Failure, "Failed to Connect to Database", $this->mysqli->connect_error));
    }

    function ValidLogin($user_identifier) // atgriez true ja identifier ir user tabulā
    {
        $stmt = $this->mysqli->prepare("SELECT ID FROM users WHERE identifier = ? LIMIT 1");
        $stmt->bind_param("s", $user_identifier);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->num_rows == 1;
    }

    function RegisterUser($username, $user_identifier) // vienk uploado parametrus
    {
        $stmt = $this->mysqli->prepare("INSERT INTO users (username, identifier) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $user_identifier);
        $stmt->execute();

        return $stmt->affected_rows == 1;
    }

    function UserExists($username)
    {
        $stmt = $this->mysqli->prepare("SELECT ID FROM users WHERE username = ? LIMIT 1");
        $stmt->bind_param("s", $username);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;
		
		return $result->num_rows == 1;
    }

    function GetUsername($user_identifier)
    {
		$stmt = $this->mysqli->prepare("SELECT username FROM users WHERE identifier = ? LIMIT 1");
        $stmt->bind_param("s", $username);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false || $result->num_rows != 1)
			return false;

		return $result->fetch_array(MYSQLI_NUM)[0];
    }

    function FindUsers($partial_username) // atgriez masīvu ar rindas ID, kur lietotājvārds sākas ar $partial_username LIMIT 10
    {
		$partial_username = $partial_username . "%";

        $stmt = $this->mysqli->prepare("SELECT username FROM users WHERE username LIKE ? LIMIT 10");
        $stmt->bind_param("s", $partial_username);
        $stmt->execute();
		
		$result = $stmt->get_result();
		if($result == false || $result->num_rows == 0)
			return [];

        $data = array_map(function($v){
			return $v[0];
		}, $result->fetch_all(MYSQLI_NUM));

        return $data;
    }

    function ListProjects($user_identifier)
    {
		$stmt = $this->mysqli->prepare("WITH this_user AS (SELECT users.ID FROM users WHERE users.identifier = ?)
	                                    SELECT projects.ID AS id, projects.name, projects.description FROM projects
	                                    WHERE projects.owner_id = (SELECT ID FROM this_user) OR projects.ID = (SELECT workers.project_id FROM workers WHERE workers.user_id = (SELECT ID FROM this_user));");
		$stmt->bind_param("s", $user_identifier);
		$stmt->execute();
		
		$result = $stmt->get_result();
		if($result == false || $result->num_rows == 0)
			return [];

        return $result->fetch_all(MYSQLI_ASSOC);
    }

	function ProjectExists($project_id)
	{
		$stmt = $this->mysqli->prepare("SELECT ID FROM projects WHERE ID = ? LIMIT 1");
        $stmt->bind_param("i", $project_id);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->num_rows == 1;
	}

    function CreateProject($user_identifier, $name, $description)
    {		
		$stmt = $this->mysqli->prepare("INSERT INTO projects (name, description, owner_id) VALUES (?, ?, (SELECT users.ID FROM users WHERE users.identifier=?))");
        $stmt->bind_param("sss", $name, $description, $user_identifier);
        $stmt->execute();

        if($stmt->affected_rows == 1)
			return $this->mysqli->insert_id;
		else
			return false;
    }

	function UpdateProject($project_id, $name, $description)
	{
		$stmt = $this->mysqli->prepare("UPDATE projects SET name=COALESCE(?, name), description=COALESCE(?, description) WHERE ID=? LIMIT 1");
        $stmt->bind_param("ssi", $name, $description, $project_id);
        $stmt->execute();

		return $stmt->affected_rows == 1;
	}

    function DeleteProject($project_id)
    {
        $stmt = $this->mysqli->prepare("DELETE FROM projects WHERE ID = ? LIMIT 1");
        $stmt->bind_param("i", $project_id);
        $stmt->execute();
		
		return $stmt->affected_rows == 1;
    }

    function IsProjectOwner($project_id, $user_identifier)
    {
		$stmt = $this->mysqli->prepare("SELECT projects.ID FROM projects WHERE projects.ID = ? AND projects.owner_id=(SELECT users.id FROM users WHERE users.identifier=?)");
        $stmt->bind_param("is", $project_id, $user_identifier);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->num_rows == 1;
    }

    function IsProjectOwnerByUsername($project_id, $username)
    {
		$stmt = $this->mysqli->prepare("SELECT projects.ID FROM projects WHERE projects.ID = ? AND projects.owner_id=(SELECT users.id FROM users WHERE users.username=?)");
        $stmt->bind_param("is", $project_id, $username);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->num_rows == 1;
    }

    function AddWorker($project_id, $username, $privilege=UserPrivilege::Worker) // rindas ID
    {
		if(!($privilege = Tr_UserPrivToDB($privilege)))
			exit(CreateResponse(ResponseType::Failure, "ALERT!!! THE DEVELOPER IS RETARDED (bad privilege given to AddWorker)"));

        $stmt = $this->mysqli->prepare("INSERT INTO workers (project_id, privilege, user_id) VALUES (?, ?, (SELECT users.ID FROM users WHERE users.username=?))");
        $stmt->bind_param("iis", $project_id, $privilege, $username);
        $stmt->execute();

        return $stmt->affected_rows == 1;
    }

    function RemoveWorker($project_id, $username)
    {
        $stmt = $this->mysqli->prepare("DELETE FROM workers WHERE workers.project_id=? AND workers.user_id = (SELECT users.ID FROM users WHERE users.username=?) LIMIT 1");
        $stmt->bind_param("is", $project_id, $username);
        $stmt->execute();

        return $stmt->affected_rows == 1;
    }

    function IsWorker($project_id, $user_identifier) // atgriez true arī ja ir projekta īpašnieks
    {
		$stmt = $this->mysqli->prepare("SELECT this_user.ID FROM users AS this_user
		                                WHERE this_user.identifier=? AND
			                                (this_user.ID = (SELECT projects.owner_id FROM projects WHERE projects.ID = ?) OR
			                                 this_user.ID = (SELECT workers.user_id FROM workers WHERE workers.project_id = ?));");
		
        $stmt->bind_param("sii", $user_identifier, $project_id, $project_id); // this is cringe but there no real alternative (i dont want to use user variables)
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->num_rows == 1;
    }

    function ListWorkers($project_id) // masīvs ar rindas ID
    {		
		$stmt = $this->mysqli->prepare("SELECT users.username FROM users WHERE users.ID=(SELECT workers.user_id FROM workers WHERE workers.project_id=?)");
		$stmt->bind_param("i", $project_id);
		$stmt->execute();
		
		$result = $stmt->get_result();
		if($result == false || $result->num_rows == 0)
			return [];
		
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    function SetWorkerPrivilege($project_id, $username, $privilege) // privilege būs enum UserPrivilege
    {
		if($privilege == UserPrivilege::Owner || !($privilege = Tr_UserPrivToDB($privilege)))
			exit(CreateResponse(ResponseType::Failure, "ALERT!!! THE DEVELOPER IS RETARDED (bad privilege given to SetWorkerPrivilege)"));

		$stmt = $this->mysqli->prepare("UPDATE workers SET workers.privilege=1 WHERE workers.project_id=? AND workers.user_id=(SELECT users.ID FROM users WHERE users.username = ?) LIMIT 1");
        $stmt->bind_param("iis", $privilege, $project_id, $username);
        $stmt->execute();

		return $stmt->affected_rows == 1;
    }

    function GetWorkerPrivilege($project_id, $username) // atgriez kādu no enum UserPrivilege
    {
		if($this->IsProjectOwnerByUsername($project_id, $username)) // this is bad, turn this into a single query
		{
			return UserPrivilege::Owner;
		}
		else
		{
			$stmt = $this->mysqli->prepare("SELECT workers.privilege FROM workers WHERE workers.project_id=? AND workers.user_id=(SELECT users.ID FROM users WHERE users.username=?)");
			$stmt->bind_param("is", $project_id, $username);
			$stmt->execute();
			
			$result = $stmt->get_result();
			if($result == false || $result->num_rows == 0)
				return false;

			return Tr_DBToUserPriv($result->fetch_array(MYSQLI_NUM)[0]);
		}
    }
    
    function CreateTask($project_id, $name, $description, $due_date, $state = null, $assignee = null)
    {
		if($state)
			$state = Tr_TaskStateToDB($state);

        $stmt = $this->mysqli->prepare("INSERT INTO tasks (project_id, name, description, due_date, state, assignee) VALUES (?, ?, ?, ?, COALESCE(?, 0), (SELECT users.ID FROM users WHERE users.username = ?))");
        $stmt->bind_param("issiis", $project_id, $name, $description, $due_date, $state, $assignee);
        $stmt->execute();
        
        if($stmt->affected_rows == 1)
			return $this->mysqli->insert_id;
		else
			return false;
    }

	function TaskExists($task_id)
	{
		$stmt = $this->mysqli->prepare("SELECT tasks.ID FROM tasks WHERE tasks.ID = ? LIMIT 1");
        $stmt->bind_param("i", $task_id);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->num_rows == 1;
	}

    function ListTasks($project_id)
    {
        $stmt = $this->mysqli->prepare("SELECT ID AS id, name, description, due_date, state, assignee FROM tasks WHERE tasks.project_id = ?");
		$stmt->bind_param("i", $project_id);
		$stmt->execute();
		
		$result = $stmt->get_result();
		if($result == false || $result->num_rows == 0)
			return [];

        return array_map(function($v){
			$v["state"] = Tr_DBToTaskState($v["state"]);
			return $v; 
		}, $result->fetch_all(MYSQLI_ASSOC));
    }

    function UpdateTask($task_id, $name = null, $description = null, $due_date = null, $state = null, $assignee = null) // pārveido lai visas kolonnas ir opcionālas (https://www.w3schools.com/sql/func_sqlserver_coalesce.asp)
    {
		if($state && !($state = Tr_TaskStateToDB($state)))
			exit(CreateResponse(ResponseType::Failure, "ALERT!!! THE DEVELOPER IS RETARDED (bad state given to UpdateTask)"));

        $stmt = $this->mysqli->prepare("UPDATE tasks SET name = COALESCE(?, name), description = COALESCE(?, description), due_date = COALESCE(?, due_date), state = COALESCE(?, state), assignee=COALESCE((SELECT users.ID FROM users WHERE users.username=?), assignee) WHERE tasks.ID = ? LIMIT 1");
        $stmt->bind_param("ssiisi", $name, $description, $due_date, $state, $assignee, $task_id);
        $stmt->execute();

        return $stmt->affected_rows == 1;
    }

    function DeleteTask($task_id)
    {
        $stmt = $this->mysqli->prepare("DELETE FROM tasks WHERE tasks.ID = ? LIMIT 1");
        $stmt->bind_param("i", $task_id);
        $stmt->execute();
        
        return $stmt->affected_rows == 1;
    }
}

?>