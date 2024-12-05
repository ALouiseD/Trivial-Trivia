// Sign-up code

document.getElementById("signup-form").addEventListener("submit", async function (event) {

    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    if (!username || !email || !password || !confirmPassword) {
        alert("All fields are required.");
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
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login successful!');
      // Redirect to profile page
      window.location.href = `/profile?username=${encodeURIComponent(result.username)}`;
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    alert('An error occurred. Please try again.');
  }
});
