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
        question: 'When was UM-Flint founded?',
        answer: '1956',
        wrongAnswer1: '1961',
        wrongAnswer2: '1952',
        wrongAnswer3: '1949',
        subject: 'flint',
        sequenceNumber: 1
    },
    {
        question: 'What river runs alongside the UM-Flint campus?',
        answer: 'The Flint River',
        wrongAnswer1: 'The Nile River',
        wrongAnswer2: 'The Mississippi River',
        wrongAnswer3: 'The Ohio River',
        subject: 'flint',
        sequenceNumber: 2
    },
    {
        question: 'What building on the UM-Flint campus is known for its distinctive glass pyramid?',
        answer: 'The Frances Willson Thompson Library',
        wrongAnswer1: 'The William S. White Building',
        wrongAnswer2: 'The Harding Mott University Center',
        wrongAnswer3: 'The Recreation Center',
        subject: 'flint',
        sequenceNumber: 3
    },
    {
        question: 'Which academic program is UM-Flint especially known for in the region?',
        answer: 'Nursing',
        wrongAnswer1: 'Architecture',
        wrongAnswer2: 'Astronomy',
        wrongAnswer3: 'Engineering',
        subject: 'flint',
        sequenceNumber: 4
    },
    {
        question: 'What notable feature is located at the heart of the UM-Flint campus?',
        answer: 'The Flint River Trail',
        wrongAnswer1: 'A clock tower',
        wrongAnswer2: 'A botanical garden',
        wrongAnswer3: 'An amphitheater',
        subject: 'flint',
        sequenceNumber: 5
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
