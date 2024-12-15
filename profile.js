document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the username and email from the local storage or fetch it from the server
  const username = localStorage.getItem("username");

  if (!username) {
    // If no user is logged in, redirect to the login page
    window.location.href = "/login";
  } else {
    // Display the username on the profile page
    document.getElementById("username-display").innerText = username;

    // Example: Fetch user email from the server
    fetch("/getUserInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensures cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("email-display").innerText = data.email || "Not provided";
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        alert("Failed to fetch user info.");
      });
  }

  // Logout functionality
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("username");
    alert("Logged out successfully!");
    window.location.href = "/login";
  });
});
