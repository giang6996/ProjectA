const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '..', 'db', 'users.txt');

async function getUsersFromFile() {
    const fileData = await fs.promises.readFile(usersFilePath, 'utf8');
    if (!fileData) {
        return [];
    }
    const lines = fileData.trim().split('\n');
    return lines.map(line => JSON.parse(line));
}

async function saveUsersToFile(users) {
    const lines = users.map(user => JSON.stringify(user));
    const fileData = lines.join('\n');
    await fs.promises.writeFile(usersFilePath, fileData);
}

module.exports = {
    getUsersFromFile,
    saveUsersToFile,
};