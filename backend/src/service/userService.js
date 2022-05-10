const mongoose = require('mongoose');
const crypto = require('crypto');
require('../models/User');
const {InvalidLoginCredentialsError, UserWithThisNameAlreadyExists, ResourceNotFoundError} = require("../models/errors");
const {generateToken, hashPassword, passwordMatches} = require("../utils/securityUtils");

const User = mongoose.model('User');


const getUserByUsername = async (username) => {
    const user = await User.findOne({username: username});
    if (!user){
        throw new ResourceNotFoundError('User not found')
    }
    return user;
}

const createUser = async (user) => {

    const usersWithSameUsername = await User.findOne({username: user.username});
    if (usersWithSameUsername){
        throw new UserWithThisNameAlreadyExists('User with this login already exists')
    }

    const newUser = {
        username: user.username,
        accountType: user.accountType || 'USER',
        password: hashPassword(user.password),
        fullName: user.password || '',
        phone: user.phone || '',
        email: user.email || ''
    }

    const savedUser = await User.create(newUser);

    return savedUser;
}

const login = async (username, password) => {
    const user = await User.findOne({username: username});

    if (!user){
        throw new InvalidLoginCredentialsError('Invalid login or password')
    }

    if (passwordMatches(password, user.password)) {
        const token = generateToken(user);

        return {
            loggedIn: true,
            user: user,
            token
        }
    }

    throw new InvalidLoginCredentialsError('Invalid login or password')
}

module.exports = {
    getUserByUsername,
    createUser,
    login
}


