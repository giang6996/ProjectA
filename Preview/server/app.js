const http = require('http');
const url = require('url');

// Set up middleware to serve static files from the 'public' directory
const serveStatic = require('serve-static');
const serveStaticFile = serveStatic('public', { index: ['index.html'] });

const { port } = require('./config');

const { signupController } = require('./controllers/signupController');
const { loginController } = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');

const routes = {
    '/auth/signup': signupController,
    '/auth/login': loginController,
    '/logout': logoutController,
};

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (routes[pathname]) {
        await routes[pathname](req, res);
    } else {
        serveStaticFile(req, res, async () => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        });
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
