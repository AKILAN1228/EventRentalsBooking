// backend/routes/eventTypeRoutes.js

const express = require('express');
const router = express.Router();
const EventType = require('../models/EventType.js'); // Namma EventType Model

// GET /api/event-types/
// Yella event types-ayum database la irunthu eduthutu varum
router.get('/', async (req, res) => {
    try {
        const eventTypes = await EventType.find({}); // {} - yella data-vum venum
        res.json(eventTypes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Inime namma admin-ku "create", "update", "delete" routes kooda inga eluthalam
// Ippothaiku 'get' mattum pothum

module.exports = router;