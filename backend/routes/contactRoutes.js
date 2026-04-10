const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Submits a new contact message
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please provide name, email, and message.' });
    }

    try {
        const newMsg = new Message({ name, email, message });
        await newMsg.save();
        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error, please try again later.' });
    }
});

module.exports = router;
