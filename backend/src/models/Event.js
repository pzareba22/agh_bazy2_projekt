const mongoose = require('mongoose');
const {jsonFormatterPlugin} = require("../utils/modelUtils");


// Schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    location: {
        city: String,
        postalCode: String,
        address: String,
    },
    verified: {
        type: Boolean,
        required: true
    },
    imageUrl: {
        type: String,
    },
    organizerUsername: {
        type: String,
        required: true
    },
});

eventSchema.plugin(jsonFormatterPlugin);

mongoose.model('Event', eventSchema);
