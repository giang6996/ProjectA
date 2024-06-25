/**
 * Read and return body of request in string.
 * @param {http.IncomingMessage} req - Request object
 * @returns {Promise<string>} - Promise resolves with body of request
 */
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', (error) => {
            reject(error);
        });
    });
}

/**
 * Parse body of request into JSON object.
 * @param {http.IncomingMessage} req - Request object
 * @returns {Promise<object>} - Promise resolves with parsed JSON object
 */
async function getJSONBody(req) {
    const body = await getRequestBody(req);
    return JSON.parse(body);
}

/**
 * Send JSON response.
 * @param {http.ServerResponse} res - Response object
 * @param {number} statusCode - HTTP status code
 * @param {object} data - Data to send
 */
function sendJSONResponse(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

/**
 * Send JSON error response.
 * @param {http.ServerResponse} res - Response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
function sendJSONError(res, statusCode, message) {
    const errorResponse = {
        error: {
            status: statusCode.toString(),
            message: message
        }
    };
    sendJSONResponse(res, statusCode, errorResponse);
}

module.exports = {
    getRequestBody,
    getJSONBody,
    sendJSONError,
    sendJSONResponse,
};