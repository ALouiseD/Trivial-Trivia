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

/Signup Route
  app.post('/signup', async (req, res) => {
    console.log('Request body:', req.body);//log incoming data
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, password]
        );

        const values = [username, email, password]; 

        res.status(201).json({ message: 'User created successfully', userId: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'random.html'));
});

// Fetch a trivia question by sequence number
app.get('/question/:sequenceNumber', async (req, res) => {
    const { sequenceNumber } = req.params;

    try {
        const query = `SELECT * FROM trivia_questions WHERE sequence_number = $1`;
        const values = [sequenceNumber];

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching trivia question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch all trivia questions in order
app.get('/questions', async (req, res) => {
    try {
        const query = `SELECT * FROM trivia_questions ORDER BY sequence_number ASC`;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(80, () => {
    console.log("Server is running on http://localhost/");
});
