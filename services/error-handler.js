/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 *
 */

const handleError = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error)
        }

    }
}

module.exports = {
    handleError
}
