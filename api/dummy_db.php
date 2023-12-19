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
			
		}

		function ValidLogin($user_identifier) // atgriez true ja identifier ir user tabulā
		{
			return true;
		}

		function RegisterUser($username, $user_identifier) // vienk uploado parametrus
		{
			if($username === "bad")
				return false;
			else
				return true;
		}

		function UserExists($username)
		{
			if($username === "bad")
				return false;
			else
				return true;
		}

		function GetUsername($user_identifier)
		{
			return "someone";
		}

		function FindUsers($partial_username) // atgriez masīvu ar rindas ID, kur lietotājvārds sākas ar $partial_username LIMIT 10
		{
			return ["user1", "user2"];
		}

		function ProjectExists($project_id, $task_id)
		{
			return true;
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

		function CreateProject($user_identifier, $name, $description)
		{
			return true;
		}

		function UpdateProject($project_id, $name, $description)
		{
			return true;
		}

		function DeleteProject($project_id)
		{
			return true;
		}

		function IsProjectOwner($project_id, $user_identifier)
		{
			return true;
		}

		function AddWorker($project_id, $username, $privilege = UserPrivilege::Worker) // rindas ID
		{
			return true;
		}

		function RemoveWorker($project_id, $username)
		{
			return true;
		}

		function IsWorker($project_id, $user_identifier) // atgriez true arī ja ir projekta īpašnieks
		{
			return true;
		}

		function ListWorkers($project_id) // masīvs ar rindas ID
		{
			return true;
		}

		function SetWorkerPrivilege($project_id, $username, $privilege) // privilege būs enum UserPrivilege
		{
			return true;
		}

		function GetWorkerPrivilege($project_id) // atgriez kādu no enum UserPrivilege
		{
			return true;
		}
		
		function CreateTask($project_id, $name, $description, $due_date, $creator_identifier, $asignee = null)
		{
			return true;
		}

		function TaskExists($project_id, $task_id)
		{
			return true;
		}

		function ListTasks($project_id)
		{
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

		function UpdateTask($task_id, $name = null, $description = null, $expire_time = null, $status = null) // pārveido lai visas kolonnas ir opcionālas (https://www.w3schools.com/sql/func_sqlserver_coalesce.asp)
		{
			return true;
		}
		function AssignTask($project_id, $task_id, $username=null)
		{
			return true;
		}

		function DeleteTask($project_id, $task_id)
		{			
			return true;
		}
	}
?>