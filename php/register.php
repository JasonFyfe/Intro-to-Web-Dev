<?php
header("Content-Type: application/json; charset=UTF-8");
$newUser = json_decode($_POST["x"], false);
$hash = password_hash($newUser->password, PASSWORD_DEFAULT);

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
// INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `confirmpassword`) VALUES (NULL, '', '', '', '', '');
$statement = $conn->prepare("INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `role`) VALUES (NULL, ?, ?, ?, ?, 'user')");
// Bind data from JSON to SQL statement
$statement->bind_param("ssss", $newUser->firstname, $newUser->lastname, $newUser->email, $hash);

// Execute statement inserting new user into database
if (!$statement->execute())
{
    if($statement -> errno == 1062)
    {
        // Return an error if user already exists
        echo "The email address: " . $newUser->email . " is already in use. Please login.";
    }
}
else
{
    // Return if new user registered successfully
    echo "Welcome " . $newUser->firstname . ", you are now registered";
}



$statement->close();
$conn->close();
