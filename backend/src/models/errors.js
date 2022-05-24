class HttpError extends Error {
    constructor(message, status, name) {
        super(message);
        this.status = status;
        this.name = name;
    }
}

class InvalidLoginCredentialsError extends HttpError {
    constructor(message) {
        super(message, 401, "InvalidLoginCredentialsError");
    }
}

class UnauthorizedError extends HttpError {
    constructor(message) {
        super(message, 401, "UnauthorizedError");
    }
}

class RequestForbiddenError extends HttpError {
    constructor(message) {
        super(message, 403, "RequestForbiddenError");
    }
}

class ResourceNotFoundError extends HttpError {
    constructor(message) {
        super(message, 404, "ResourceNotFoundError");
    }
}

class UserWithThisNameAlreadyExists extends HttpError {
    constructor(message) {
        super(message, 400, "UserWithThisNameAlreadyExists");
    }
}

class AlreadyJoinedThisEvent extends HttpError {
    constructor(message) {
        super(message, 400, "AlreadyJoinedThisEvent");
    }
}

class IsNotParticipatingInThisEvent extends HttpError {
    constructor(message) {
        super(message, 400, "IsNotParticipatingInThisEvent");
    }
}

class AlreadyConfirmedEventParticipation extends HttpError {
    constructor(message) {
        super(message, 400, "AlreadyConfirmedEventParticipation");
    }
}

module.exports = {
    InvalidLoginCredentialsError,
    RequestForbiddenError,
    UserWithThisNameAlreadyExists,
    ResourceNotFoundError,
    AlreadyJoinedThisEvent,
    AlreadyConfirmedEventParticipation,
    IsNotParticipatingInThisEvent,
};
