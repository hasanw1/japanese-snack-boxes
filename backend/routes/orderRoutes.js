const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, selectedPlan, contactInfo, shippingAddress, paymentDetails } = req.body;

    // Validate required fields
    if (!userId || !selectedPlan || !contactInfo || !shippingAddress || !paymentDetails) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    // Construct the order object
    const order = {
      userId,
      contactInfo: JSON.stringify(contactInfo),
      shippingAddress: JSON.stringify(shippingAddress),
      selectedPlan: JSON.stringify(selectedPlan),
      paymentDetails: JSON.stringify(paymentDetails),
      createdAt: new Date()
    };

    // Insert order into the database
    const orderQuery = 'INSERT INTO orders SET ?';

    db.query(orderQuery, order, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ msg: 'Database error' });
      }
      res.status(201).json({ msg: 'Order completed successfully' });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch all orders
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT orders.*, accounts.firstName, accounts.lastName, accounts.email 
      FROM orders 
      JOIN accounts ON orders.userId = accounts.id
    `;
    const [orders] = await db.query(query);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ msg: 'Error fetching orders' });
  }
});

module.exports = router;