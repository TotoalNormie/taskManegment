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

class TaskDatabase
{

    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "webtm";
    private $mysqli;

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
        $stmt = $this->mysqli->prepare("SELECT identifier FROM user WHERE identifier = ? LIMIT 1");
        $stmt->bind_param("s", $user_identifier);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return false;
        } else {
            return true;
        }
    }

    function RegisterUser($username, $password, $user_identifier) // vienk uploado parametrus
    {
        $stmt = $this->mysqli->prepare("INSERT INTO user(Username, Password, identifier) VALUES(?, ?, ?)");
        $stmt->bind_param("sss", $username, $password, $user_identifier);
        $stmt->execute();

        $result = $stmt->get_result();

        return !$result;
    }

    function UserExists($username)
    {
        $query = "SELECT Username FROM user WHERE Username = '$username'";
        $result = $this->mysqli->query($query);
        $data = $result->fetch_all(MYSQLI_ASSOC);

        if (empty($data)) {
            return false;
        } else {
            return true;
        }
        
    }

    function GetUsername($user_identifier)
    {
        $stmt = $this->mysqli->prepare("SELECT Username FROM user WHERE identifier = ? LIMIT 1");
        $stmt->bind_param("s", $user_identifier);
        $stmt->execute();
        
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return false;
        } else {
            return $result->fetch_row()["Username"];
        }
    }

    function FindUsers($partial_username) // atgriez masīvu ar rindas ID, kur lietotājvārds sākas ar $partial_username LIMIT 10
    {
        $query = "SELECT Username FROM user WHERE Username LIKE '$partial_username%' LIMIT 10";
        $result = $this->mysqli->query($query);
        $data = $result->fetch_all(MYSQLI_ASSOC);

        $users = array();
        foreach ($data as $row) {
            $users[] = $row["Username"];
        }
        return $users;
    }
    function GetUserID($username)
    {
        $query = "SELECT User_ID FROM user WHERE Username = '$username'";
        $result = $this->mysqli->query($query);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        if(empty($data)){
            return false;
        } else {
            return $data[0]["User_ID"];
        }
    }

    function ListProjects($user_identifier) // ieskaitot tie kuros tu esi worker
    {
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

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return false;
        } else {
            return true;
        }
    }

    function RemoveWorker($project_id, $username)
    {
        $userID = $this->GetUserID($username);
        if($userID === false){
            return false;
        }
        $stmt = $this->mysqli->prepare("DELETE FROM projectworkers WHERE Project_id = ? AND User_ID = ?");
        $stmt->bind_param("ii", $project_id, $userID);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return false;
        } else {
            return true;
        }
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

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
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

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
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

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
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

        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            return false;
        } else {
            return true;
        }
    }
}

// $ob = new Db;
// echo "<pre> ";
// var_dump($ob->GetUserID("ssss"));
// echo "</pre> ";
