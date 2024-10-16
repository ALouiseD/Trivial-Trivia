// Saving user data during sign-up
function signUp() {
    var username = document.getElementById('signUpUsername').value;
    var password = document.getElementById('signUpPassword').value;
    
    // Storing user data in local storage (for demonstration only)
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    
    alert("Sign-up successful!");
}

// Checking user data during login
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var storedUsername = localStorage.getItem('username');
    var storedPassword = localStorage.getItem('password');
    
    if (username === storedUsername && password === storedPassword) {
        alert("Login successful!");
        // Redirect to the profile page
        window.location.href = "profile.html";
    } else {
        alert("Invalid username or password.");
    }
}
