const { Pool } = require('pg');

// Database connection
const pool = new Pool({
    user: 'postgres', // Replace with your database user
    host: 'localhost', // Database host
    database: 'Trivial_trivia', // Database name
    password: 'postgres', // Replace with your database password
    port: 5432, // Default PostgreSQL port
});

// Predefined trivia questions with default fallback for all fields
const triviaData = [
    {
        question: 'What is the capital of France?',
        answer: 'Paris',
        wrongAnswer1: 'London',
        wrongAnswer2: 'Berlin',
        wrongAnswer3: 'Madrid',
        subject: 'Geography',
        sequenceNumber: 1
    },
    {
        question: 'What is the capital of the USA?',
        answer: 'Washington DC',
        wrongAnswer1: 'New York City',
        wrongAnswer2: 'Montana',
        wrongAnswer3: 'Dallas',
        subject: 'Geography',
        sequenceNumber: 2
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answer: 'Harper Lee',
        wrongAnswer1: 'Mark Twain',
        wrongAnswer2: 'F. Scott Fitzgerald',
        wrongAnswer3: 'J.D. Salinger',
        subject: 'Literature',
        sequenceNumber: 2
    },
    {
        question: 'What is the largest planet in our solar system?',
        answer: 'Jupiter',
        wrongAnswer1: 'Earth',
        wrongAnswer2: 'Mars',
        wrongAnswer3: 'Venus',
        subject: 'Astronomy',
        sequenceNumber: 3
    }
];

// Function to insert trivia questions
async function insertTriviaQuestions() {
    const query = `
        INSERT INTO trivia_questions (
            question, answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, subject, sequence_number
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

    try {
        for (const trivia of triviaData) {
            const values = [
                trivia.question || '',
                trivia.answer || '',
                trivia.wrongAnswer1 || '',
                trivia.wrongAnswer2 || '',
                trivia.wrongAnswer3 || '',
                trivia.subject || '',
                trivia.sequenceNumber || 0
            ];
            console.log('Debugging - Trivia Object:', trivia); // Debugging log
            console.log('Debugging - Insert Values:', values); // Debugging log
            const result = await pool.query(query, values);
            console.log('Inserted trivia question:', result.rows[0]);
        }
        console.log('All trivia questions inserted successfully.');
    } catch (error) {
        console.error('Error inserting trivia questions:', error);
    } finally {
        pool.end();
    }
}

// Run the function
insertTriviaQuestions();
