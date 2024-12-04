const { Pool } = require('pg');

// Database connection
const pool = new Pool({
    user: 'postgres', // Replace with your database user
    host: 'localhost', // Database host
    database: 'Trivial_trivia', // Database name
    password: 'postgres', // Replace with your database password
    port: 5432, // Default PostgreSQL port
});

// Predefined trivia questions
const triviaData = [
    { question: 'What state is UM-Flint located in?', answer: 'Michigan', sequenceNumber: 1 },
    { question: 'When was UM-Flint founded"?', answer: '1956', sequenceNumber: 2 },
    { question: 'What river runs next to the UM-Flint campus?', answer: 'The Flint River', sequenceNumber: 3 },
];

// Function to insert trivia questions
async function insertTriviaQuestions() {
    const query = `
        INSERT INTO trivia_questions (question, answer, sequence_number)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    try {
        for (const trivia of triviaData) {
            const values = [trivia.question, trivia.answer, trivia.sequenceNumber];
            const result = await pool.query(query, values);
            console.log('Inserted trivia question:', result.rows[0]);
        }
        console.log('All trivia questions inserted successfully.');
    } catch (error) {
        console.error('Error inserting trivia questions:', error);
    } finally {
        // End the connection pool
        pool.end();
    }
}

// Run the function
insertTriviaQuestions();
