<?php
enum TaskState
{
    case ToDo;
    case InProgress;
    case Done;
}

enum UserPrivilege
{
    case User;
    case Admin;
}

class Db
{

    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "webtm";
    private $mysqli;

    public function __construct()
    {
        $this->mysqli = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->mysqli->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
    }
    // visur kur ir parametri lieto mysqli::prepare

    function ValidLogin($user_identifier) // atgriez true ja identifier ir user tabulā
    {
        $stmt = $this->mysqli->prepare("SELECT identifier FROM user WHERE identifier = ?");
        $stmt->bind_param("s", $user_identifier);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
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

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }

    function UserExists($username)
    {

    }

    function FindUsers($partial_username) // LIMIT 10
    {

    }

    function RetrievePassword($user_identifier)
    {

    }

    function ListProjects($user_identifier)
    {
        return [
            [
                "ID" => 0,
                "Name" => "123",
                "Description" => "321"
            ]
        ];
    }

    function CreateProject($user_identifier, $name, $description)
    {

    }

    function IsProjectOwner($project_id, $user_identifier)
    {

    }

    function DeleteProject($project_id)
    {

    }

    function SetUserPrivilege($project_id, $user_identifier, $privilege) // privilege būs enum UserPrivilege
    {

    }

    function GetUserPrivilege($project_id) // atgriez kādu no enum UserPrivilege
    {

    }

    function AddWorker($project_id, $user_identifier)
    {
        // $stmt = $this->mysqli->prepare("INSERT INTO projectworkers(Username, Passord, identifier) VALUES(?, ?, ?)");
        // $stmt->bind_param("s", $user_identifier);
        // $stmt->execute();

        // if ($this->mysqli->affected_rows == 0){
        // 	return false;
        // } else{
        // 	return true;
        // }
    }

    function RemoveWorker($project_id, $user_identifier)
    {

    }

    function IsWorker($project_id, $user_identifier)
    {

    }

    function CreateTask($project_id, $name, $description, $expire_time, $creator_identifier, $asignee = null)
    {

    }

    function ListTasks($project_id)
    {
        $query = "SELECT * FROM tasks WHERE Project_ID = $project_id";
        $result = $this->mysqli->query($query);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
        // if ($this->mysqli->affected_rows == 0) {
        //     return false;
        // } else {
        //     return true;
        // }
        return [
            [
                "ID" => 0,
                "Name" => "123",
                "Description" => "321",
                "expire_time" => 123,
                "Status" => TaskState::ToDo,
                "CreatedBy" => "Username"
            ]
        ];
    }

    function Updatetask($task_id, $name, $description, $expire_time, $status)
    {
        $stmt = $this->mysqli->prepare("UPDATE tasks SET Title = ?, Description = ?, expire_time = ?, Status = ? WHERE task_id = ?");
        $stmt->bind_param("ssiii", $name, $description, $expire_time, $status, $task_id);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }
    function AssignTask($project_id, $task_id, $user_identifier) // identifier var būt null
    {

    }

    function DeleteTask($project_id, $task_id)
    {
        $stmt = $this->mysqli->prepare("DELETE FROM tasks WHERE Project_id = ? AND Task_id = ?");
        $stmt->bind_aram("ii", $project_id, $task_id);
        $stmt->execute();

        if ($this->mysqli->affected_rows == 0) {
            return false;
        } else {
            return true;
        }
    }
}

$obj = new Db;
print_r($obj->ListTasks(4));