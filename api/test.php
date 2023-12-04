<?php
// Allow any origin to access this resource
header("Access-Control-Allow-Origin: http://localhost:5173");

$cookie_name = "user";
$cookie_value = "John Doe";
setcookie($cookie_name, $cookie_value, time() + (86400), "/"); // 86400 = 1 day

echo json_encode(["message" => "Hello from the API"]);
?>
