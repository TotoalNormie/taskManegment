<?php
// Allow any origin to access this resource
header("Access-Control-Allow-Origin: *");

echo json_encode(["message" => "Hello from the API"]);
?>
