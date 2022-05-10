const mongoose = require('mongoose');
require('../models/Event');
require('../models/EventParticipation');
const {
    InvalidLoginCredentialsError,
    ResourceNotFoundError,
    AlreadyJoinedThisEvent,
    AlreadyConfirmedEventParticipation
} = require("../models/errors");

const Event = mongoose.model('Event');
const EventParticipation = mongoose.model('EventParticipation');


const getAllEvents = async () => {
    //TODO: filters and sorting
    const events = await Event.find({});

    return Promise.all(events.map(async event => await mapEventWithParticipants(event)));
}

const getEventById = async (eventId) => {
    const event = await Event.findOne({id: eventId});
    if (!event) {
        throw new ResourceNotFoundError('Event with this id not found')
    }

    return mapEventWithParticipants(event);
}

const findParticipantsForEvents = async (eventId) => {
    const eventParticipants = await EventParticipation.find({eventId});

    return eventParticipants.map(({participantUsername, participationConfirmed}) => ({
        participantUsername,
        participationConfirmed
    }))
}

const mapEventWithParticipants = async (event) => ({
    ...event.toJSON(),
    participants: await findParticipantsForEvents(event.id)
})


const createEvent = async (event) => {

    // TODO: validate or convert fields?
    const eventToSave = {
        ...event,
        verified: false
    };

    const savedEvent = await Event.create(eventToSave);

    return await mapEventWithParticipants(savedEvent);
}

const updateEvent = async (eventId, eventPatches) => {

    let existingEvent = getEventById(eventId);

    const updatedEvent = {
        ...existingEvent,
        ...eventPatches
    }

    const savedEvent = await Event.findOneAndUpdate({id: eventId}, updatedEvent, {new: true});

    return mapEventWithParticipants(savedEvent);
}

const joinEvent = async (eventId, participantUsername) => {
    // Check if event exists
    let existingEvent = getEventById(eventId);

    const existingEventParticipation = await EventParticipation.findOne({eventId, participantUsername});
    if (existingEventParticipation) {
        throw new AlreadyJoinedThisEvent(`Participant ${participantUsername} has already joined event with id ${eventId}`);
    }

    const eventParticipation = await EventParticipation.create({
        eventId,
        participantUsername,
        participationConfirmed: false
    })

    return eventParticipation;

}

const confirmEventParticipation = async (eventId, participantUsername) => {
    // Check if event exists
    const existingEventParticipation = await EventParticipation.findOne({eventId, participantUsername});

    if (!existingEventParticipation) {
        throw ResourceNotFoundError('User has never participated in this event')
    }
    if (existingEventParticipation.participationConfirmed) {
        throw AlreadyConfirmedEventParticipation('User has never participated in this event')
    }

    return EventParticipation.findOneAndUpdate({
        eventId,
        participantUsername
    }, {participationConfirmed: true}, {new: true});
}


module.exports = {
    getAllEvents,
    createEvent,
    getEventById,
    updateEvent,
    joinEvent,
    confirmEventParticipation
}


