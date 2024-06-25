const { getJSONBody, sendJSONError, sendJSONResponse } = require('../supports/request');
const { comparePassword } = require('../supports/password');
const { generateToken } = require('../supports/jwt');

const { getUsersFromFile } = require('../repositories/userRepository');

async function loginController(req, res) {
    try {
        const { username, password } = await getJSONBody(req);

        if (!username || !password) {
            return sendJSONError(res, 400, 'Username and password are required.');
        }

        const users = await getUsersFromFile();
        const user = users.find(user => user.username === username);

        if (!user || !(await comparePassword(password, user.password))) {
            return sendJSONError(res, 401, 'Invalid username or password.');
        }

        const token = generateToken({ 
            username: user.username, 
            role: user.role 
        });

        sendJSONResponse(res, 200, {
            data: {
                username: user.username,
                token: token
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Error during login:', error);
        sendJSONError(res, 500, 'An unexpected error occurred. Please try again later.');
    }
}

module.exports = {
    loginController,
}