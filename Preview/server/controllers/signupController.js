const { getJSONBody, sendJSONError, sendJSONResponse } = require('../supports/request');
const { hashPassword } = require('../supports/password');

const { getUsersFromFile, saveUsersToFile } = require('../repositories/userRepository');
const { getRolesFromFile } = require('../repositories/roleRepository');

async function signupController(req, res) {
    if (req.method !== 'POST') {
        return sendJSONError(res, 405, 'Method not allowed');
    }

    try {
        const { username, password, role } = await getJSONBody(req);

        if (!username || !password || !role) {
            return sendJSONError(res, 400, 'Missing required field.');
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            return sendJSONError(res, 422, 'Username must contain only alphanumeric characters.');
        }

        const users = await getUsersFromFile();
        const roles = await getRolesFromFile();

        const userExists = users.some(user => user.username === username);
        const isValidRole = roles.includes(role.trim());

        if (userExists) {
            return sendJSONError(res, 409, 'The username is already in use.');
        }

        if (!isValidRole) {
            return sendJSONError(res, 400, 'Invalid role.');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = { username, password: hashedPassword, role };
        users.push(newUser);
        await saveUsersToFile(users);

        sendJSONResponse(res, 201, {
            message: 'User registered successfully',
            username: username,
            role: role
        });
    } catch (error) {
        console.error('Error during signup:', error);
        sendJSONError(res, 500, 'An unexpected error occurred. Please try again later.');
    }
}

module.exports = {
    signupController,
}