<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	
	require_once("utility.php");
	require_once("sessions.php");
	require_once("task_db_interface.php");

	$session = HandleSession();

	$DB = new TaskDatabase();

	if(isset($_GET["id"]))
	{
		$_GET["id"] = intval($_GET["id"]); // the user may try to pass a float

		if($_GET["id"]<1)
			exit(CreateResponse(ResponseType::Failure, "Invalid ID"));		
		
		if(!$DB->ProjectExists($_GET["id"]) || !$DB->IsWorker($_GET["id"], $session->user_identifier))
			exit(CreateResponse(ResponseType::Failure, "Project Not Found"));		

		if(isset($_GET["intent"]))
		{
			if($_GET["intent"] === "workers")
				require("project_worker_handler.php");
			else if($_GET["intent"] === "tasks")
				require("project_task_handler.php");
			else
				exit(CreateResponse(ResponseType::Failure, "Unknown Request"));
		}
		else
		{
			require("project_general_handler.php");
		}
	}
	else
	{
		if($_SERVER["REQUEST_METHOD"] === "GET")
		{
			exit(CreateResponse(ResponseType::Success, "Projects Retrieved Succesfully", $DB->ListProjects($session->user_identifier)));
		}
		else
		{
			$RequestData = GetAllRequestData();

			if($_SERVER["REQUEST_METHOD"] === "PUT")
			{
				if(isset($RequestData["name"]) && isset($RequestData["description"]))
				{
					$new_project_id = $DB->CreateProject($session->user_identifier, $RequestData["name"], $RequestData["description"]);
					if($new_project_id)
						exit(CreateResponse(ResponseType::Success, "Project Created Succesfully", $new_project_id));
					else
						exit(CreateResponse(ResponseType::Failure, "Failed To Create Project"));
				}
				else
				{
					exit(CreateResponse(ResponseType::Failure, "Missing Arguments"));
				}
			}
			else
			{
				exit(CreateResponse(ResponseType::Failure, "Unknown Method"));
			}
		}
	}
?>