const authResolver = require("./auth");
const eventResolver = require("./events");
const bokingResolver = require("./bookings");

const reootResolver = { ...authResolver, ...eventResolver, ...bokingResolver };

module.exports = reootResolver;
