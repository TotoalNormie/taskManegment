<?php
	// this assumes all input has been validated and is being called from projects.php

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
?>