const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'system',
    password: 'sandeep',
    database: 'mysql'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Registration Table
app.get('/createTable', (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS Registration (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            dob DATE NOT NULL
        )
    `;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('Registration table created');
    });
});

// Create User
app.post('/user', (req, res) => {
    const { name, email, dob } = req.body;
    const sql = 'INSERT INTO Registration (name, email, dob) VALUES (?, ?, ?)';
    db.query(sql, [name, email, dob], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({ message: 'User added successfully' });
    });
});

// Read Users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM Registration';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

// Update User
app.put('/user/:id', (req, res) => {
    const { name, email, dob } = req.body;
    const id = req.params.id;
    const sql = 'UPDATE Registration SET name=?, email=?, dob=? WHERE id=?';
    db.query(sql, [name, email, dob, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({ message: 'User updated successfully' });
    });
});

// Delete User
app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM Registration WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({ message: 'User deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
