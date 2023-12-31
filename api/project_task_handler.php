<?php
	// this assumes all input has been validated and is being called from projects.php
	
	if($_SERVER["REQUEST_METHOD"] === "GET")
	{
		$tasks = $DB->ListTasks($_GET["id"]);
		$taskCount = count($tasks);
		for($i = 0; $i < $taskCount; ++$i)
		{
			if(!($tasks[$i]["status"] = Tr_UserPrivToString($tasks[$i]["status"])))
				exit(CreateResponse(ResponseType::Failure, "Server Side Format Error"));

			$tasks[$i]["creator_color"] = GenerateColorFromString($tasks[$i]["created_by"]);
			if(isset($tasks[$i]["assignee"]))
				$tasks[$i]["assignee_color"] = GenerateColorFromString($tasks[$i]["assignee"]);
		}

		exit(CreateResponse(ResponseType::Success, "Tasks Retrieved Succesfully", $tasks));
	}
	else
	{
		$RequestData = GetAllRequestData();
		if($_SERVER["REQUEST_METHOD"] === "PUT")
		{
			$keys = ["name", "description", "status", "due_date"];
			$foundKeyCount = FindArrayKeys($RequestData, $keys);
			if($foundKeyCount == count($keys))
			{
				if(!is_string($RequestData["name"]))
				{
					exit(CreateResponse(ResponseType::Failure, "Name is Invalid"));
				}
				else
				{
					if(strlen($RequestData["name"]) < 4)
						exit(CreateResponse(ResponseType::Failure, "Name is Too Short"));
					if(strlen($RequestData["name"]) > 20)
						exit(CreateResponse(ResponseType::Failure, "Name is Too Long"));
				}


				if(!is_string($RequestData["description"]))
					exit(CreateResponse(ResponseType::Failure, "Description is Invalid"));
				else if(strlen($RequestData["description"]) > 1000)
					exit(CreateResponse(ResponseType::Failure, "Description is Too Long"));


				if(!is_string($RequestData["status"]))
					exit(CreateResponse(ResponseType::Failure, "Status is Invalid"));
				else if(!($RequestData["status"] = Tr_StringToTaskState($RequestData["status"])))
					exit(CreateResponse(ResponseType::Failure, "Improper State Format"));

					
				$floatVal = floatval($RequestData["due_date"]);
				if($floatVal == $RequestData["due_date"])
					$RequestData["due_date"] = intval($floatVal);
				else
					exit(CreateResponse(ResponseType::Failure, "due_date is invalid"));


				if(isset($RequestData["assignee"]) && !$DB->UserExists($RequestData["assignee"]))
					exit(CreateResponse(ResponseType::Failure, "Provided Assignee Username is Invalid"));
								
								
				for($i = 0; $i < $workerCount; ++$i)
					$DB->CreateTask($RequestData["task_id"], $RequestData["name"], $RequestData["description"], $RequestData["status"], $RequestData["due_date"], $RequestData["assignee"]);
			}
			else
			{
				exit(CreateResponse(ResponseType::Failure, "Missing Arguments"));
			}
		}
		else if($_SERVER["REQUEST_METHOD"] === "POST")
		{
			if(isset($RequestData["task_id"]))
			{
				if(FindArrayKey($RequestData, ["name", "description", "status", "due_date", "assignee"])) // TODO: rewrite this so that FindArrayKeys returns the amount of keys found and then subtract 1 every time you have to null one of the request data fields. 0 mean you don't call out to the database
				{
					if(isset($RequestData["name"]))
					{
						if(!is_string($RequestData["name"]))
						{
							$RequestData["name"] = null;
						}
						else
						{
							if(strlen($RequestData["name"]) < 4)
								exit(CreateResponse(ResponseType::Failure, "Name is Too Short"));
							if(strlen($RequestData["name"]) > 20)
								exit(CreateResponse(ResponseType::Failure, "Name is Too Long"));
						}
					}

					if(isset($RequestData["description"])  )
					{
						if(!is_string($RequestData["description"]))
							$RequestData["description"] = null;
						else if(strlen($RequestData["description"]) > 1000)
								exit(CreateResponse(ResponseType::Failure, "Description is Too Long"));
					}

					if(isset($RequestData["status"]))
					{
						if(!is_string($RequestData["status"]))
							$RequestData["status"] = null;
						else if(!($RequestData["status"] = Tr_StringToTaskState($RequestData["status"])))
							exit(CreateResponse(ResponseType::Failure, "Improper State Format"));
					}

					if(isset($RequestData["due_date"]))
					{
						$floatVal = floatval($RequestData["due_date"]);
						if($floatVal == $RequestData["due_date"])
							$RequestData["due_date"] = intval($floatVal);
						else
							$RequestData["due_date"] = null;
					}

					if(isset($RequestData["assignee"]))
					{
						if(!is_string($RequestData["assignee"]))
							$RequestData["assignee"] = null;
						else if(!$DB->UserExists($RequestData["assignee"]))
							exit(CreateResponse(ResponseType::Failure, "Provided Assignee Username is Invalid"));
					}
								
								
					for($i = 0; $i < $workerCount; ++$i)
						$DB->UpdateTask($RequestData["task_id"], $RequestData["name"], $RequestData["description"], $RequestData["status"], $RequestData["due_date"], $RequestData["assignee"]);
				}
				else
				{								
					exit(CreateResponse(ResponseType::Failure, "Missing Modifier"));
				}
			}
			else
			{
				exit(CreateResponse(ResponseType::Failure, "Missing Task ID"));
			}
		}
		else if($_SERVER["REQUEST_METHOD"] === "DELETE")
		{
			if(isset($RequestData["task_id"]))
			{
				$privilege = $DB->GetWorkerPrivilege();
				if($privilege === UserPrivilege::Manager || $privilege === UserPrivilege::Owner)
				{
					if($DB->TaskExists($_GET["id"], $RequestData["task_id"]))
					{
						$DB->DeleteTask($_GET["id"], $RequestData["task_id"]);
					}
					else
					{
						exit(CreateResponse(ResponseType::Failure, "Task Doesn't Exist"));
					}
				}
				else
				{
					exit(CreateResponse(ResponseType::Failure, "Missing Authority"));
				}
			}
			else
			{
				exit(CreateResponse(ResponseType::Failure, "Missing Task ID"));
			}
		}
	}
?>