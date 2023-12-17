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
			{
				if($_SERVER["REQUEST_METHOD"] === "GET")
				{
					$workers = $DB->ListWorkers($_GET["id"]);
					exit(CreateResponse(ResponseType::Success, "Workers Retrieved Succesfully", ));
				}
				else
				{
					$RequestData = GetAllRequestData();
					if($_SERVER["REQUEST_METHOD"] === "PUT")
					{
						if(isset($RequestData["workers"]))
						{
							if(is_array($RequestData["workers"]) && ValidateObjectArray($RequestData["workers"], ["username", "privilege"]))
							{
								$workerCount = count($RequestData["workers"]);
								for($i = 0; $i < $workerCount; ++$i)
								{
									$priv = $RequestData["workers"][$i]["privilege"];
									if($priv !== "user" || $priv !== "manager")
										exit(CreateResponse(ResponseType::Failure, "Improper Privilege Format"));
								}

								for($i = 0; $i < $workerCount; ++$i)
									!if($DB->UserExists(RequestData["workers"][$i]["username"]))
										exit(CreateResponse(ResponseType::Failure, "Atleast One Username is Invalid"));
									
								
							}
							else
							{								
								exit(CreateResponse(ResponseType::Failure, "Improper Argument Format"));
							}
						}
						else
						{
							exit(CreateResponse(ResponseType::Failure, "Missing Arguments"));
						}
					}
				}
			}
			else if($_GET["intent"] === "tasks")
			{
				
			}
			else
			{
				exit(CreateResponse(ResponseType::Failure, "Unknown Request"));
			}
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