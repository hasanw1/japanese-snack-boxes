const express = require('express');
const router = express.Router();

const db = require('../db');

// Get all accounts
router.get('/', (req, res) => {
    db.query('SELECT * FROM Accounts', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Create a new account
router.post('/', (req, res) => {
    const { firstName, lastName, email, password, profilePicture } = req.body;
    db.query(
        'INSERT INTO Accounts (firstName, lastName, email, password, profilePicture) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, email, password, profilePicture],
        (err, results) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.status(201).json({ id: results.insertId, firstName, lastName, email, profilePicture });
        }
    );
});

// Update an account
router.put('/:id', (req, res) => {
    const { firstName, lastName, email, password, profilePicture } = req.body;
    db.query(
        'UPDATE Accounts SET firstName = ?, lastName = ?, email = ?, password = ?, profilePicture = ? WHERE id = ?',
        [firstName, lastName, email, password, profilePicture, req.params.id],
        (err, results) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.json({ message: 'Account updated' });
        }
    );
});

// Delete an account
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Accounts WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ message: 'Account deleted' });
    });
});

module.exports = router;