var express = require('express');
var router = express.Router();
const UserService = require('../service/userService')
const {
    InvalidLoginCredentialsError,
    UserWithThisNameAlreadyExists,
    ResourceNotFoundError
} = require("../models/errors");
const {checkToken} = require("../utils/securityUtils");


router.get('/:username',
    checkToken,
    async (req, res, next) => {
        try {
            const {username} = req.params;

            console.log(`Getting user by username ${username}`);

            const conversationResponse = await UserService.getUserByUsername(username);
            res.json(conversationResponse);
        } catch (e) {
            console.error(e.message);
            if (e instanceof ResourceNotFoundError) {
                const {status, message} = e;
                res.status(status).json({message});
            } else {
                res.status(500).send();
            }
        }
    });

router.post('/', async (req, res, next) => {
    try {
        console.log(`Creating new user`);

        const conversationResponse = await UserService.createUser(req.body);
        res.json(conversationResponse);
    } catch (e) {
        console.error(e.message);
        if (e instanceof UserWithThisNameAlreadyExists) {
            const {status, message} = e;
            res.status(status).json({message});
        } else {
            res.status(500).send();
        }
    }
});

router.post('/login', async (req, res) => {

    try {
        const {username, password} = req.body;
        console.log(`Logging in user ${username}`);

        const loginResponse = await UserService.login(username, password);
        res.json(loginResponse);
    } catch (e) {
        if (e instanceof InvalidLoginCredentialsError) {
            const {status, message} = e;
            res.status(status).json({message});
        } else {
            res.status(500).send();
        }
    }
});

module.exports = router;
