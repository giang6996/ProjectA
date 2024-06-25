require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET
};