// Event Listener to ensure that a user is logged in
window.onload = (event) => {
    if(localStorage.getItem("email") == null)
    {
        window.location.replace("home.html");
    }
};