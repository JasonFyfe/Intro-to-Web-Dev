<?php
// Setup and retrieve JSON data
header("Content-Type: application/json; charset=UTF-8");
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

// Prepare SQL Statement
$statement = $conn->prepare("DELETE FROM `user` WHERE `user`.`email` = ?");
// Bind data from JSON to SQL statement
$statement->bind_param("s", $user->email);
// Execute and retrieve data if input matches
$statement->execute();

// Retrieve data from server
$result = $statement->get_result();

if(empty($result))
{
    // Output if SQL returns null
    echo "Deleted Account";
}



$statement->close();
$conn->close();
?>