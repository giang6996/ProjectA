const fs = require('fs').promises;
const path = require('path');

const rolesFilePath = path.join(__dirname, '..', 'db', 'roles.txt');

async function getRolesFromFile() {
    try {
        const data = await fs.readFile(rolesFilePath, 'utf8');
        const roles = data.trim().split('\n').map(role => role.trim());
        return roles;
    } catch (error) {
        console.error('Error reading roles file:', error);
        return [];
    }
}

module.exports = { 
    getRolesFromFile,
};