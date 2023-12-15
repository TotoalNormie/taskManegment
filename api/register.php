<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	
	require_once("dummy_db.php");
	require_once("sessions.php");
	require_once("utility.php");

	if($_SERVER["REQUEST_METHOD"] === "POST")
	{
		$RequestData = GetAllRequestData();
		if(isset($RequestData["user"]) && isset($RequestData["pass"]))
		{
			if(strlen($RequestData) < 4)
				exit(CreateResponse(ResponseType::Failure, "Username Too Short"));

			$DB = new TaskDatabase();
			
			if($DB->UserExists($RequestData["user"]))
				exit(CreateResponse(ResponseType::Failure, "Username Already Taken"));


			$user_identifier = GenerateUserID($RequestData["user"], $RequestData["pass"]);
			if($DB->RegisterUser($RequestData["user"], $RequestData["pass"], $user_identifier))
			{				
				$expire_time = time() + 60 * 60 * 24 * 5; // 5 days
				setcookie("token", (new Session($user_identifier, $expire_time, SessionAuthority::USER))->ToToken(), $expire_time, "/");				
				exit(CreateResponse(ResponseType::Success, "Account Registered Succesfully"));
			}
			else
			{
				exit(CreateResponse(ResponseType::Failure, "Failed To Upload User Data"));
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
?>