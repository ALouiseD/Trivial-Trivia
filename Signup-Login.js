// Sign-up code
document.addEventListener("DOMContentLoaded", () => {

  // Check if the signup-form element exists
  console.log("Signup Form:", document.getElementById("signup-form"));

  // Check if the login-form element exists
  console.log("Login Form:", document.getElementById("login-form"));
  
  document.getElementById("signup-form").addEventListener("submit", async function (event) {

    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    if (!username || !email || !password || !confirmPassword) {
      document.getElementById("error-message").innerText = "All fields are required.";
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    // Send the data to the server
    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            // Handle success (e.g., redirect to login page)
            alert("Sign-up successful!");
            window.location.href = "/login";// redirect to login page
        } else {
            // Handle errors
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
        alert("An error occurred. Please try again.");
    }
});




//Login code
document.getElementById("login-form").addEventListener("submit", async function (event) {

    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Email and password are required.");
      return;
  }

    try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('username', result.username);
      // Redirect to profile page
      window.location.href = "/profile";
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    alert('An error occurred. Please try again.');
  }
});

});
