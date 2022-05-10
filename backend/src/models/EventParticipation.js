const mongoose = require('mongoose');
const {jsonFormatterPlugin} = require("../utils/modelUtils");


// Schema
const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    participantUsername: {
        type: String,
        required: true
    },
    participationConfirmed: {
        type: Boolean,
        required: true
    }
});

eventSchema.plugin(jsonFormatterPlugin);

mongoose.model('EventParticipation', eventSchema);
