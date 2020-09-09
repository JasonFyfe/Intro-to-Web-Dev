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
$statement = $conn->prepare("SELECT * FROM `user` WHERE `email` = ?");
$statement->bind_param("s", $user->email);
$statement->execute();

// Retrieve data from server
$result = $statement->get_result();
$output = $result->fetch_array(MYSQLI_ASSOC);

$json = json_encode($output);

if(empty($output))
{
    // Output if SQL returns null
    echo "";
}
else
{
    if(password_verify($user->password, $output["password"]))
    {
        echo $json;
    }
    else
    {
        echo "Hash Match Error!";
    }    
}

$statement->close();
$conn->close();
?>