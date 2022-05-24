var express = require("express");
var router = express.Router();
const EventService = require("../service/eventService");
const {
    ResourceNotFoundError,
    UserWithThisNameAlreadyExists,
    AlreadyJoinedThisEvent,
    AlreadyConfirmedEventParticipation,
    IsNotParticipatingInThisEvent,
} = require("../models/errors");
const { checkToken } = require("../utils/securityUtils");

router.get("/", async (req, res, next) => {
    console.log("Getting all events");
    try {
        const { username } = req.params;
        const eventList = await EventService.getAllEvents(username);
        res.json(eventList);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/:eventId", async (req, res, next) => {
    try {
        const { eventId } = req.params;
        console.log(`Getting event with id ${eventId}`);

        const event = await EventService.getEventById(eventId);
        res.json(event);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/", checkToken, async (req, res, next) => {
    console.log(`Creating new event`);

    try {
        const createdEvent = await EventService.createEvent(req.body);
        res.json(createdEvent);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch("/:eventId", checkToken, async (req, res, next) => {
    const { eventId } = req.params;

    console.log(`Creating new event`);

    try {
        const updatedEvent = await EventService.updateEvent(eventId, req.body);
        res.json(updatedEvent);
    } catch (e) {
        res.status(500).send();
    }
});

router.post("/:eventId/join", checkToken, async (req, res, next) => {
    const { eventId } = req.params;
    const { participantUsername } = req.body;

    console.log(
        `Participant ${participantUsername} is joining event ${eventId}`
    );

    try {
        const updatedEventParticipation = await EventService.joinEvent(
            eventId,
            participantUsername
        );
        res.json(updatedEventParticipation);
    } catch (e) {
        if (e instanceof AlreadyJoinedThisEvent) {
            const { status, message } = e;
            res.status(status).json({ message });
        } else {
            res.status(500).send();
        }
    }
});

router.post("/:eventId/leave", checkToken, async (req, res, next) => {
    const { eventId } = req.params;
    const { participantUsername } = req.body;
    console.log(
        `Participant ${participantUsername} is leaving event ${eventId}`
    );
    try {
        await EventService.leaveEvent(eventId, participantUsername);
        console.log("success");
        res.status(200).send();
    } catch (e) {
        if (e instanceof IsNotParticipatingInThisEvent) {
            const { status, message } = e;
            res.status(status).json({ message });
        } else {
            res.status(500).send();
        }
    }
});

router.post("/:eventId/confirm", checkToken, async (req, res, next) => {
    const { eventId } = req.params;
    const { participantUsername } = req.body;

    console.log(
        `Participant ${participantUsername} is being confirmed at event ${eventId}`
    );

    try {
        const updatedEventParticipation =
            await EventService.confirmEventParticipation(
                eventId,
                participantUsername
            );
        res.json(updatedEventParticipation);
    } catch (e) {
        if (
            e instanceof AlreadyConfirmedEventParticipation ||
            e instanceof ResourceNotFoundError
        ) {
            const { status, message } = e;
            res.status(status).json({ message });
        } else {
            res.status(500).send();
        }
    }
});

router.get("/:eventId/participants", checkToken, async (req, res, next) => {
    const { eventId } = req.params;
    console.log(`Getting event ${eventId} participants`);
    res.status(200);
    data = await EventService.getEventParticipants(eventId);
    res.json({ data: data });
});

// router.get("/:paticipantUsername", checkToken, async (req, res, next) => {
//     const { participantUsername } = req.params;
//     console.log(`getting users: ${participantUsername} events`);
//     res.status(200).send();
// });

module.exports = router;
