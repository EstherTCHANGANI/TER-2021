class NotFoundError extends Error {
    constructor(resource) {
        this.name = "NotFoundError";
        this.message = `Resource not found: "${resource}"`
    }
}

export default NotFoundError;