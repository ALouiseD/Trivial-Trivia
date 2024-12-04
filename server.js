const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(express.static('public')); 
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'Trivial_trivia', 
    password: 'postgres', 
    port: 5432,
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'random.html'));
});

// Random Trivia Question API
app.get('/random-question', async (req, res) => {
    try {
        const query = `
            SELECT * FROM trivia_questions
            ORDER BY RANDOM()
            LIMIT 1;
        `;
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // Return the random trivia question
        } else {
            res.status(404).json({ error: "No trivia questions found." });
        }
    } catch (error) {
        console.error("Error fetching random trivia question:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(80, () => {
    console.log("Server is running on http://localhost/");
});
