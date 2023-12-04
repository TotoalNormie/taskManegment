<?php
if (isset($_GET['name'])) {
    $cookie_name = $_GET["name"];
    $cookie_value = $_GET["value"];
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
}
print_r($_COOKIE);
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <br>
        
        <form>
            <label for="">Cookie name: <input type="text" name="name"></label>
            <label for="">Cookie name: <input type="text" name="value"></label>
            <input type="submit" value="add cookie">
        </form>
    </body>

</html>