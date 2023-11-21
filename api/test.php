<?php
// Allow any origin to access this resource
header("Access-Control-Allow-Origin: *");

// Other headers you might need to include
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Your actual API logic goes here...

// Example response
echo json_encode(["message" => "Hello from the API"]);
?>
