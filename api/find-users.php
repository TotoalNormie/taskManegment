<?php
	header("Access-Control-Allow-Origin: http://localhost:5173");
	
	require_once("dummy_db.php");
	require_once("sessions.php");
	require_once("utility.php");
	
	$session = HandleSession();

	if($_SERVER["REQUEST_METHOD"] === "GET")
	{
		$RequestData = GetAllRequestData();
		if(isset($RequestData["username"]))
		{
			if(strlen($RequestData["username"]) < 4)
				exit(CreateResponse(ResponseType::Failure, "Username Too Short"));

			try
			{
				$DB = new TaskDatabase();

				exit(CreateResponse(ResponseType::Success, "Users Succesfully Retrieved", $DB->FindUsers($RequestData["username"])));
			}
			catch(Exception $e)
			{
				exit(CreateResponse(ResponseType::Failure, "Something Went Wrong - Server Side Error", $e->getMessage()));
			}
		}
	}
	else
	{
		exit(CreateResponse(ResponseType::Failure, "Unknown Method"));
	}
?>