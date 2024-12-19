const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM reviews';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Failed to fetch reviews' });
        return;
      }
      res.json(results);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new review
router.post('/', async (req, res) => {
  try {
    const { title, rating, comment } = req.body;
    console.log('Received new review:', req.body);
    const query = 'INSERT INTO reviews (title, rating, comment) VALUES (?, ?, ?)';
    const values = [title, rating, comment];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error creating review:', err);
        res.status(500).json({ message: 'Failed to create review' });
        return;
      }
      console.log('Review created with ID:', results.insertId);
      res.status(201).json({ id: results.insertId, title, rating, comment });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, rating, comment } = req.body;
    const query = 'UPDATE reviews SET title = ?, rating = ?, comment = ? WHERE id = ?';
    const values = [title, rating, comment, id];

    db.query(query, values, (err) => {
      if (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ message: 'Failed to update review' });
        return;
      }
      res.json({ message: 'Review updated successfully' });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM reviews WHERE id = ?';

    db.query(query, [id], (err) => {
      if (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Failed to delete review' });
        return;
      }
      res.json({ message: 'Review deleted successfully' });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;