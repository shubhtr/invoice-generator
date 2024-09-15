import constants from "./constants.js";

class AppError extends Error{

    constructor(message,statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
    static NotFound(message="resource not found"){
        return new AppError(message, constants.HttpStatusCode.NOT_FOUND)
    }
    static Unauthorized(message="Please Login"){
        return new AppError(message, constants.HttpStatusCode.UNAUTHORIZED)
    }
    static Forbidden(message="You don't have permission"){
        return new AppError(message, constants.HttpStatusCode.FORBIDDEN)
    }
    static ServerError(message="Server Error"){
        return new AppError(message, constants.HttpStatusCode.INTERNAL_SERVER_ERROR)
    }
    static Conflict(message="Already Exist"){
        return new AppError(message, constants.HttpStatusCode.CONFLICT_ERROR)
    }
    static BadRequest(message="Bad Request"){
        return new AppError(message, constants.HttpStatusCode.BAD_REQUEST)
    }
    static Validation(message="Required"){
        return new AppError(message, constants.HttpStatusCode.VALIDATION_ERROR)
    }
    static SessionExpired(message="Session Expired"){
        return new AppError(message, constants.HttpStatusCode.SESSIONEXPIRED)
    }

    static pathIndex(message="path_index should be <= max_path_index"){
        return new AppError(message, constants.HttpStatusCode.CONFLICT_ERROR)
    }

}
export default AppError;
