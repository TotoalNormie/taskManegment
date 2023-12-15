<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	
	require_once("dummy_db.php");
	require_once("sessions.php");
	require_once("utility.php");
	
	$session = HandleSessionSoft();
	if(!$session)
		exit(CreateResponse(ResponseType::Success, "User Data Retrieved Succesfully", ["valid_session"=>false])); // no seperate output for lack of the token cookie since the client has no way of knowing if its set in the first place

	if($_SERVER["REQUEST_METHOD"] === "GET")
	{
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