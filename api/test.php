<?php
// Allow any origin to access this resource
header("Access-Control-Allow-Origin: http://localhost:5173");

echo json_encode(["message" => "Hello from the API"]);
?>
