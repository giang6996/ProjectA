const { verifyToken } = require('../supports/jwt');

async function logoutController(req, res) {
    if (req.method === 'POST') {
        const token = req.headers.authorization;

        if (!token) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No token provided' }));
            return;
        }

        try {
            const decoded = verifyToken(token);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Logged out successfully' }));
        } catch (error) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid token' }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
}

module.exports = logoutController;