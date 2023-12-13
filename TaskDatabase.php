<?php
	/*
		general DB struktura
		project privileges
			user
				lasit
				accept tasks
			
			manager
				all of the above
				edit/delete
				assign users to tasks


		user
			username
			password - VARCHAR(50)
			identifier - CHAR(64) (nelieto sito ka rindas ID, tas ir 64 characteru garš hash)

		projects
			name
			description
			owner_id

			workers
				user_id
				privilege

			task
				name
				description
				expire_time
				state (todo, in progress, done)
				asignee
				creation_date
				created_by



	*/

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

	// visur kur ir parametri lieto mysqli::prepare

	class TaskDatabase
	{
		static function ValidLogin($user_identifier) // atgriez true ja identifier ir user tabulā
		{
			$stmt = $mysqli->prepare("SELECT identifier FROM user WHERE identifier = ?");
			$stmt->bind_param("s", $user_identifier);
			$stmt->execute();

			if ($mysqli->affected_rows == 0){
				return false;
			} else{
				return true;
			}
		}

		static function RegisterUser($username, $password, $user_identifier) // vienk uploado parametrus
		{
			$stmt = $mysqli->prepare("INSERT INTO user(Username, Passord, identifier) VALUES(?, ?, ?)");
			$stmt->bind_param("sss", $username, $password, $user_identifier);
			$stmt->execute();

			if ($mysqli->affected_rows == 0){
				return false;
			} else{
				return true;
			}
		}

		static function UserExists($username)
		{

		}

		static function FindUsers($partial_username) // LIMIT 10
		{

		}

		static function RetrievePassword($user_identifier)
		{

		}
		
		static function ListProjects($user_identifier)
		{
			return [
				[
					"ID" => 0,
					"Name" => "123",
					"Description" => "321"
				]
			];
		}

		static function CreateProject($user_identifier, $name, $description)
		{
			
		}
		
		static function IsProjectOwner($project_id, $user_identifier)
		{

		}

		static function DeleteProject($project_id)
		{

		}

		static function SetUserPrivilege($project_id, $user_identifier, $privilege) // privilege būs enum UserPrivilege
		{

		}

		static function GetUserPrivilege($project_id) // atgriez kādu no enum UserPrivilege
		{
			
		}

		static function AddWorker($project_id, $user_identifier)
		{
			// $stmt = $mysqli->prepare("INSERT INTO projectworkers(Username, Passord, identifier) VALUES(?, ?, ?)");
			// $stmt->bind_param("s", $user_identifier);
			// $stmt->execute();

			// if ($mysqli->affected_rows == 0){
			// 	return false;
			// } else{
			// 	return true;
			// }
		}

		static function RemoveWorker($project_id, $user_identifier)
		{

		}

		static function IsWorker($project_id, $user_identifier)
		{

		}

		static function CreateTask($project_id, $name, $description, $expire_time, $creator_identifier, $asignee=null)
		{

		}

		static function ListTasks($project_id)
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

		static function Updatetask($task_id, $name, $description, $expire_time, $status)
		{
			$stmt = $mysqli->prepare("UPDATE tasks SET Title = ?, Description = ?, expire_time = ?, Status = ? WHERE task_id = ?");
			$stmt->bind_param("ssiii", $name, $description, $expire_time, $status, $task_id);
			$stmt->execute();

			if ($mysqli->affected_rows == 0){
				return false;
			} else{
				return true;
			}
		}
		static function AssignTask($project_id, $task_id, $user_identifier) // identifier var būt null
		{

		}

		static function DeleteTask($project_id, $task_id)
		{
			$stmt = $mysqli->prepare("DELETE FROM tasks WHERE Project_id = ? AND Task_id = ?");
			$stmt->bind_aram("ii", $project_id, $task_id);
			$stmt->execute();

			if ($mysqli->affected_rows == 0){
				return false;
			} else{
				return true;
			}
		}
	}
?>
