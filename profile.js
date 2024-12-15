/ Get user info (Profile data)
app.get("/getUserInfo", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  // Return user information from session
  res.status(200).json({ email: req.session.user.email });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." });
    }
    res.status(200).json({ message: "Logged out successfully." });
  });
});
