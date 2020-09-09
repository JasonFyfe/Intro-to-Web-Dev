<?php
// Setup and retrieve JSON data
header("Content-Type: application/json; charset=UTF-8");
global $user; 
$user = json_decode($_POST["x"], false);

// Database config
$servername = "localhost";
$username = "root";
$dbname = "jason_cs";

// init connection
$conn = new mysqli($servername, $username, null, $dbname);

// Error test connection
if ($conn->connect_error)
{
    die("Connection Failed: " . $conn->connect_error);
}

// Prepare SQL Statement to Update user
$statement = $conn->prepare("UPDATE `user` SET `email` = ? WHERE `email` = ?");
$statement->bind_param("ss", $user->newEmail, $user->currentEmail);

$statement->execute();

$result = $statement->get_result();

if(empty($result))
{
    // Output if SQL returns null
    echo "Success!";
}
else
{
    echo "Undefined Error!";
}

$statement->close();
$conn->close();
?>