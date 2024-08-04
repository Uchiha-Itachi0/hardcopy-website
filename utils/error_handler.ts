export function errorHandler(statusCode: number): {status: boolean, message: string} {
    switch (statusCode) {
        case 401:
            return {status: false, message: "You are not authorized to access this page"};
        case 403:
            return {status: false, message: "You are forbidden to access this page"};
        case 404:
            return {status: false, message: "Page not found"};
        case 500:
            return {status: false, message: "Internal server error"};
        default:
            return {status: false, message: "Something went wrong"};
    }
}
