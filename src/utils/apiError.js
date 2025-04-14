class apiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    )
    {
        supper(message)
        this.statusCode = statusCode,
        this.message = message,
        this.error = error,
        this.success = false
        if(stack)
        {
            this.stack=  stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { apiError}