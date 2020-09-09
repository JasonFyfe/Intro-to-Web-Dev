// Get the modal
var registerModal = document.getElementById('Register');
var loginModal = document.getElementById('Login');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    } else if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
}

// Create connection and submit data to the server
function serverLogin(json) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "") {
                alert("No user found. Have you registered?");
                console.log(this.responseText);
            }
            else if(this.responseText == "Hash Match Error!")
            {
                alert("Password is incorrect!");
            }
            else
            {
                var user = JSON.parse(this.responseText);

                var path = window.location.pathname;
                var page = path.split("/").pop();
                window.location.replace("_" + page);
                
                window.localStorage.setItem("email", user.email);

                alert("Welcome " + user.firstname + ", you are now logged in.");            
            }
        }
    };

    xhttp.open("POST", "http://localhost:8080/jason_cs/main/php/login.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x=" + json);
}

// Function call for logging in users
function submitLogin() {
    var user =
    {
        email: document.forms["login_form"]["login_email"].value,
        password: document.forms["login_form"]["login_password"].value
    };

    var userJSON = JSON.stringify(user);

    loginModal.style.display = "none";
    serverLogin(userJSON);
}

// Create connection and submit data to the server
function serverRegister(json) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };

    xhttp.open("POST", "http://localhost:8080/jason_cs/main/php/register.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x=" + json);
}

// Function for creating new users
function submitRegister() {
    var newUser =
    {
        firstname: document.forms["register_form"]["register_first_name"].value,
        lastname: document.forms["register_form"]["register_last_name"].value,
        email: document.forms["register_form"]["register_email"].value,
        password: document.forms["register_form"]["register_password"].value,
        confirm: document.forms["register_form"]["register_confirm"].value
    };

    if (newUser.password != newUser.confirm) {
        alert("Passwords do not match!");
    }
    else {
        var newUserJSON = JSON.stringify(newUser);

        registerModal.style.display = "none";
        serverRegister(newUserJSON);
    }
}