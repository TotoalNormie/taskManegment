<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	
	require_once("utility.php");
	require_once("sessions.php");

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
			if($_SERVER["REQUEST_METHOD"] === "DELETE")
			{
				if($DB->ProjectExists($_GET["id"]))
					exit(CreateResponse(ResponseType::Failure, "Project Doesn't Exist"));

				if($DB->IsProjectOwner($_GET["id"], $session->user_identifier))
				{
					if($DB->DeleteProject($_GET["id"]))
						exit(CreateResponse(ResponseType::Success, "Project Deleted Succesfully"));
					else
						exit(CreateResponse(ResponseType::Failure, "Failed To Deleted Project"));
				}
				else
				{
					exit(CreateResponse(ResponseType::Failure, "Missing Authority"));
				}
			}
			else
			{
				$RequestData = GetAllRequestData();

				if($_SERVER["REQUEST_METHOD"] === "POST")
				{
					if(isset($RequestData["name"]) && isset($RequestData["description"]))
					{
						if($DB->ProjectExists($_GET["id"]))
							exit(CreateResponse(ResponseType::Failure, "Project Doesn't Exist"));
						
						if($DB->IsProjectOwner($_GET["id"], $session->user_identifier))
						{
							if($DB->UpdateProject($_GET["id"], $RequestData["name"], $RequestData["description"]))
								exit(CreateResponse(ResponseType::Success, "Project Updated Succesfully"));
							else
								exit(CreateResponse(ResponseType::Failure, "Failed To Update Project"));
						}
						else
						{
							exit(CreateResponse(ResponseType::Failure, "Missing Authority"));
						}
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
					if($DB->CreateProject($session->user_identifier, $RequestData["name"], $RequestData["description"]))
						exit(CreateResponse(ResponseType::Success, "Project Created Succesfully"));
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