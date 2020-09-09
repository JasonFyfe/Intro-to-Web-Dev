function changePass()
{
    var changePass = 
    {
        email: window.localStorage.getItem("email"),
        oldPass: document.forms["profile_form"]["oldPass"].value,
        newPass: document.forms["profile_form"]["newPass"].value,
        confirmPass: document.forms["profile_form"]["confirmPass"].value
    };

    if (changePass.oldPass == "" || changePass.newPass == "")
    {
        alert("Password fields cannot be blank!");
    }
    else
    {
        if(changePass.newPass != changePass.confirmPass)
        {
            alert("New Password does not match Confirm Password!");
        }
        else
        {
            var changePassJSON = JSON.stringify(changePass);
            serverChangePass(changePassJSON);
        }
    }
    
}

// Create connection and submit data to the server
function serverChangePass(json) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "Success!")
            {
                alert("Password changed!");
            }
            else
            {
                alert(this.responseText);
            }
        }
    };

    xhttp.open("POST", "http://localhost:8080/jason_cs/main/php/newpass.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x=" + json);

    document.forms["profile_form"]["oldPass"].value = "";
    document.forms["profile_form"]["newPass"].value = "";
    document.forms["profile_form"]["confirmPass"].value = "";
}


function changeEmail()
{
    var changeEmail = 
    {
        user: window.localStorage.getItem("email"),
        currentEmail: document.forms["email_form"]["currentEmail"].value,
        newEmail: document.forms["email_form"]["newEmail"].value
    };

    if(changeEmail.currentEmail != changeEmail.user)
    {
        alert("Emails do not match!");
    }
    else
    {
        var changeEmailJSON = JSON.stringify(changeEmail);
        serverChangeEmail(changeEmailJSON);
    }
    
    var changeEmailJSON = JSON.stringify(changeEmail);
    // Submit JSON to server    
}

// Create connection and submit data to the server
function serverChangeEmail(json) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText == "Success!")
            {
                alert("Email changed!");
            }
            else
            {
                alert(this.responseText);
            }
        }
    };

    xhttp.open("POST", "http://localhost:8080/jason_cs/main/php/newemail.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x=" + json);

    window.localStorage.setItem("email", document.forms["email_form"]["newEmail"].value);
    document.forms["email_form"]["currentEmail"].value = "";
    document.forms["email_form"]["newEmail"].value = "";
}

function logout()
{
    alert("Logging Out");
    window.localStorage.removeItem("email");
    window.location.replace("home.html");
}

function deleteAccount()
{
    if(confirm("Are you sure?"))
    {
        var account = 
        {
            email: window.localStorage.getItem("email")
        }

        var accountJSON = JSON.stringify(account);
        console.log(accountJSON);
        serverDeleteAccount(accountJSON);        
    }
}

function serverDeleteAccount(json) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Deleted Account") {
                window.localStorage.removeItem("email");
                alert("You're account has been deleted!");
                window.location.replace("home.html");
            }
            else
            {
                console.log(this.responseText)                
            }
        }
    };

    xhttp.open("POST", "http://localhost:8080/jason_cs/main/php/deleteuser.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x=" + json);
}