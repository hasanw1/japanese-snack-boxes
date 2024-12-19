const express = require('express');
const router = express.Router();

const db = require('../db');

// Get all boxes
router.get('/', (req, res) => {
    db.query('SELECT * FROM Boxes', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Create a new box
router.post('/', (req, res) => {
    const { name, description, imageUrl } = req.body;
    db.query('INSERT INTO Boxes (name, description, imageUrl) VALUES (?, ?, ?)', [name, description, imageUrl], (err, results) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ id: results.insertId, name, description, imageUrl });
    });
});

// Update a box
router.put('/:id', (req, res) => {
    const { name, description, imageUrl } = req.body;
    db.query('UPDATE Boxes SET name = ?, description = ?, imageUrl = ? WHERE id = ?', [name, description, imageUrl, req.params.id], (err, results) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ message: 'Box updated' });
    });
});

// Delete a box
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM Boxes WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ message: 'Box deleted' });
    });
});

module.exports = router;
