<?php
	// this assumes all input has been validated and is being called from projects.php

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
				if(is_array($RequestData["workers"]) && ValidateObjectArray($RequestData["workers"], ["worker", "privilege"]))
				{
					$workerCount = count($RequestData["workers"]);
					for($i = 0; $i < $workerCount; ++$i)
					{
						$priv = $RequestData["workers"][$i]["privilege"];
						if($priv === "worker")
							$priv = UserPrivilege::Worker;
						else if($priv == "manager")
							$priv = UserPrivilege::Manager;
						else
							exit(CreateResponse(ResponseType::Failure, "Improper Privilege Format"));
					}

					for($i = 0; $i < $workerCount; ++$i)
						if(!$DB->UserExists($RequestData["workers"][$i]["username"]))
							exit(CreateResponse(ResponseType::Failure, "Atleast One Username is Invalid"));
									
								
					for($i = 0; $i < $workerCount; ++$i)
						$DB->AddWorker($project_id, $RequestData["workers"][$i]["username"], $RequestData["workers"][$i]["privilege"]);
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
		else if($_SERVER["REQUEST_METHOD"] === "POST")
		{
			if(isset($RequestData["workers"]))
			{
				if(is_array($RequestData["workers"]) && ValidateObjectArray($RequestData["workers"], ["worker", "privilege"]))
				{
					$workerCount = count($RequestData["workers"]);
					for($i = 0; $i < $workerCount; ++$i)
					{
						$priv = $RequestData["workers"][$i]["privilege"];
					if($priv === "worker")
							$priv = UserPrivilege::Worker;
						else if($priv == "manager")
							$priv = UserPrivilege::Manager;
						else
							exit(CreateResponse(ResponseType::Failure, "Improper Privilege Format"));
					}

					for($i = 0; $i < $workerCount; ++$i)
						if(!$DB->UserExists($RequestData["workers"][$i]["username"]))
							exit(CreateResponse(ResponseType::Failure, "Atleast One Username is Invalid"));
								
								
					for($i = 0; $i < $workerCount; ++$i)
						$DB->AddWorker($project_id, $RequestData["workers"][$i]["username"], $RequestData["workers"][$i]["privilege"]);
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
?>