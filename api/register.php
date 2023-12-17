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

			try
			{
				$DB = new TaskDatabase();
				
				if($DB->UserExists($RequestData["user"]))
					exit(CreateResponse(ResponseType::Failure, "Username Already Taken"));


				$user_identifier = GenerateUserID($RequestData["user"], $RequestData["pass"]);
				if($DB->RegisterUser($RequestData["user"], $RequestData["pass"], $user_identifier))
				{				
					$expire_time = time() + 60 * 60 * 24 * 5; // 5 days			
					exit(CreateResponse(ResponseType::Success, "Account Registered Succesfully", (new Session($user_identifier, $expire_time, SessionAuthority::USER))->ToResponse()));
				}
				else
				{
					exit(CreateResponse(ResponseType::Failure, "Failed To Upload User Data"));
				}
			}
			catch(Exception $e)
			{
				exit(CreateResponse(ResponseType::Failure, "Something Went Wrong - Server Side Error", $e->getMessage()));
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