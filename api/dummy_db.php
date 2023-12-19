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
					"id" => 0,
					"name" => "123",
					"description" => "321"
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

		function ListWorkers($project_id) // masīvs ar username un 
		{
			return [
				[
					"username" => "joe 123",
					"privilege" => UserPrivilege::Worker
				]
			];
		}

		function SetWorkerPrivilege($project_id, $username, $privilege) // privilege būs enum UserPrivilege
		{
			return true;
		}

		function GetWorkerPrivilege($project_id, $username) // atgriez kādu no enum UserPrivilege
		{
			return UserPrivilege::Owner;
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
					"id" => 0,
					"name" => "123",
					"description" => "321",
					"expire_time" => 123,
					"status" => TaskState::ToDo,
					"created_by" => "Username",
					"assignee" => "username2"
				]
			];
		}

		function UpdateTask($task_id, $name = null, $description = null, $status = null, $expire_time = null, $assignee = null) // pārveido lai visas kolonnas ir opcionālas (https://www.w3schools.com/sql/func_sqlserver_coalesce.asp)
		{
			return true;
		}

		function DeleteTask($project_id, $task_id)
		{			
			return true;
		}
	}
?>