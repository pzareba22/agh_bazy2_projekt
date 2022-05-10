const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const SALT = 'ASDASDASDASDASDA';


const generateToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            email: user.email,
            accountType: user.accountType
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "24h",
        }
    );
}

const checkToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({message: 'No token provided.'});
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);

    } catch (e) {
        return res.status(401).send({message: 'No token provided.'});
    }

    const {username, accountType} = decoded;

    req.username = username;
    req.accountType = accountType;
    next();
};


const hashPassword = (password) => {
    return crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);
};

const passwordMatches = (inputPassword, userPassword) => {
    return hashPassword(inputPassword) === userPassword;
}


module.exports = {
    checkToken,
    generateToken,
    hashPassword,
    passwordMatches
}