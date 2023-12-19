<?php
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

	function Tr_StringToUserPriv()
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

	function Tr_StringToTaskState()
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

class TaskDatabase
{

    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "webtm";
    private $DB;

    public function __construct()
    {
        $this->mysqli = new mysqli($this->servername, $this->username, $this->password, $this->dbname, $this->mysqli);

        if ($this->mysqli->connect_error) {
            die("Connection failed: " . $this->mysqli->connect_error);
        }
    }
    // visur kur ir parametri lieto mysqli::prepare

    function ValidLogin($user_identifier) // atgriez true ja identifier ir user tabulā
    {
        $stmt = $this->mysqli->prepare("SELECT ID FROM users WHERE identifier = ?");
        $stmt->bind_param("s", $user_identifier);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->field_count == 1;
    }

    function RegisterUser($username, $user_identifier) // vienk uploado parametrus
    {
        $stmt = $this->mysqli->prepare("INSERT INTO users (username, identifier) VALUES (?, ?);");
        $stmt->bind_param("ss", $username, $user_identifier);
        $stmt->execute();

        return true;
    }

    function UserExists($username)
    {
        $stmt = $this->mysqli->prepare("SELECT ID FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false)
			return false;

		return $result->field_count == 1;
        
    }

    function GetUsername($user_identifier)
    {
		$stmt = $this->mysqli->prepare("SELECT username FROM users WHERE identifier = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();

		$result = $stmt->get_result();
		if($result == false || $result->field_count != 1)
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
		if($result == false || $result->field_count == 0)
			return [];

        $data = array_map(function($v){
			return $v[0];
		}, $result->fetch_all(MYSQLI_NUM));

        return $data;
    }

    function ListProjects($user_identifier) // ieskaitot tie kuros tu esi worker
    {
		//SELECT projects.ID, projects.name, projects.description FROM ((projects
    	//INNER JOIN users AS owner_user ON projects.owner_id = owner_use) )
        //WHERE projects.owner_id = owner_user.ID OR workers.project_id = projects.ID
		
        return [
            [
                "ID" => 0,
                "Name" => "123",
                "Description" => "321"
            ]
        ];
    }

	function ProjectExists($project_id, $task_id)
	{
		return true;
	}

    function CreateProject($user_identifier, $name, $description)
    {

    }

	function UpdateProject($project_id, $name, $description)
	{
		return true;
	}

    function DeleteProject($project_id)
    {
        $stmt = $this->mysqli->prepare("DELETE FROM projects WHERE Project_id = ?");
        $stmt->bind_param("i", $project_id);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    function IsProjectOwner($project_id, $user_identifier)
    {

    }

    function AddWorker($project_id, $username) // rindas ID
    {
        $stmt = $this->mysqli->prepare("INSERT INTO projectworkers(Username, Password, identifier) VALUES(?, ?, ?)");
        $stmt->bind_param("s", $user_identifier);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0){
        	return false;
        } else{
        	return true;
        }
    }

    function RemoveWorker($project_id, $username)
    {

    }

    function IsWorker($project_id, $user_identifier) // atgriez true arī ja ir projekta īpašnieks
    {

    }

    function ListWorkers($project_id) // masīvs ar rindas ID
    {
        $query = "SELECT User_ID FROM projectworkers WHERE Project_ID = $project_id";
        $result = $this->mysqli->query($query);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }

    function SetWorkerPrivilege($project_id, $username, $privilege) // privilege būs enum UserPrivilege
    {

    }

    function GetWorkerPrivilege($project_id) // atgriez kādu no enum UserPrivilege
    {

    }
    
    function CreateTask($project_id, $name, $description, $due_date, $creator_identifier, $asignee = null)
    {
        $stmt = $this->mysqli->prepare("INSERT INTO `tasks`(`Project_ID`, `Title`, `Description`, 
        `Created_at`, `due_date`, `Created_by`, `Asignee_ID`) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issiii", $username, $password, $user_identifier);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }

	function TaskExists($project_id, $task_id)
	{
		return true;
	}

    function ListTasks($project_id)
    {
        $query = "SELECT * FROM tasks WHERE Project_ID = $project_id";
        $result = $this->mysqli->query($query);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    //     return [
    //     //     [
    //     //         "ID" => 0,
    //     //         "Name" => "123",
    //     //         "Description" => "321",
    //     //         "expire_time" => 123,
    //     //         "Status" => TaskState::ToDo,
    //     //         "CreatedBy" => "Username"
    //     //     ]
    //     // ];
    }

    function UpdateTask($task_id, $name = null, $description = null, $expire_time = null, $status = null) // pārveido lai visas kolonnas ir opcionālas (https://www.w3schools.com/sql/func_sqlserver_coalesce.asp)
    {
        $stmt = $this->mysqli->prepare("UPDATE tasks SET Title = COALESCE(?, Title), Description = COALESCE(?, Description), expire_time = COALESCE(?, expire_time), Status = ? WHERE Task_id = ?");
        $stmt->bind_param("ssiii", $name, $description, $expire_time, $status, $task_id);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    function AssignTask($project_id, $task_id, $username=null)
    {
        $stmt = $this->mysqli->prepare("UPDATE tasks SET Project_ID = ?, Task_ID = ?, Asignee_ID = COALESCE(?, Asignee_ID) WHERE Task_ID = ?");
        $stmt->bind_param("iii", $project_id, $task_id, $user_id);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    function DeleteTask($project_id, $task_id)
    {
        $stmt = $this->mysqli->prepare("DELETE FROM tasks WHERE Project_id = ? AND Task_id = ?");
        $stmt->bind_param("ii", $project_id, $task_id);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }
}

$ob = new Db;
echo "<pre> ";
var_dump($ob->FindUsers("d"));
echo "</pre> ";