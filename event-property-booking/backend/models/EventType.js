// backend/models/EventType.js
const mongoose = require('mongoose');

const eventTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tamilName: { type: String, required: true },
    type: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    emoji: { type: String, required: true },
    popularity: { type: String, required: true },
    isMarriageEvent: { type: Boolean, default: false }
});

const EventType = mongoose.model('EventType', eventTypeSchema);
module.exports = EventType;