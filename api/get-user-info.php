<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	header("Access-Control-Allow-Headers: Content-Type, Authorization");
	
	require_once("Db.php");
	require_once("sessions.php");
	require_once("utility.php");	

	if($_SERVER["REQUEST_METHOD"] === "GET")
	{
		$session = HandleSessionSoft();
		if(!$session)
			exit(CreateResponse(ResponseType::Success, "User Data Retrieved Succesfully", ["valid_session"=>false]));

		try
		{
			$DB = new TaskDatabase();

			$username = $DB->GetUsername($session->user_identifier);

			exit(CreateResponse(ResponseType::Success, "User Data Retrieved Succesfully", [
				"username" => $username,
				"user_color" => GenerateColorFromString($username),
				"valid_session" => true
			]));
		}
		catch(Exception $e)
		{
			exit(CreateResponse(ResponseType::Failure, "Something Went Wrong - Server Side Error", $e->getMessage()));
		}
	}
	else
	{
		exit(CreateResponse(ResponseType::Failure, "Unknown Method"));
	}
?>