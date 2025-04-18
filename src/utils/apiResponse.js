class apiResponse {
    constructor(
        statusCode,
        message = "Success",
        data,
        stack = ""
    )
    {
        supper(message)
        this.statusCode = statusCode,
        this.message = message,
        this.data = data,
        this.success = statusCode < 400
    }
}

export { apiResponse}