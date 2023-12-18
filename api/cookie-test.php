<?php
$cookie_name = isset($_GET['cookie']) ? $_GET['cookie'] : "user";
$cookie_value = "John Doe";

echo $cookie_name;

setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
print_r($_COOKIE);
?>
<html>
<body>

<?php
if(!isset($_COOKIE[$cookie_name])) {
  echo "Cookie named '" . $cookie_name . "' is not set!";
} else {
  echo "Cookie '" . $cookie_name . "' is set!<br>";
  echo "Value is: " . $_COOKIE[$cookie_name];
}
?>

</body>
</html>