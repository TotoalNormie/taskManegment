<?php
	// this assumes all input has been validated and is being called from projects.php

	if($_SERVER["REQUEST_METHOD"] === "GET")
	{
		$workers = $DB->ListWorkers($_GET["id"]);
		$workerCount = count($workers);
		for($i = 0; $i < $workerCount; ++$i)
		{
			if($workers["Privilege"] === UserPrivilege::Worker)
				$workers["Privilege"] = "worker";
			else if($workers["Privilege"] == UserPrivilege::Manager)
				$workers["Privilege"] = "manager";
			else
				exit(CreateResponse(ResponseType::Failure, "Server Side Format Error"));
		}

		exit(CreateResponse(ResponseType::Success, "Workers Retrieved Succesfully", $workers));
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
				if(is_array($RequestData["workers"]) && ValidateObjectArray($RequestData["workers"], ["username", "privilege"]))
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
						$DB->SetWorkerPrivilege($project_id, $RequestData["workers"][$i]["username"], $RequestData["workers"][$i]["privilege"]);
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
		else if($_SERVER["REQUEST_METHOD"] === "DELETE")
		{
			if(isset($RequestData["workers"]))
			{
				if(is_array($RequestData["workers"]) && ValidateObjectArray($RequestData["workers"], ["username", "privilege"]))
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
						$DB->SetWorkerPrivilege($project_id, $RequestData["workers"][$i]["username"], $RequestData["workers"][$i]["privilege"]);
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