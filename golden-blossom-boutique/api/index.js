/**
 * Vercel Serverless Function entry point for Golden Blossom Boutique
 * Routes all /api/* requests to the central requestHandler in server.js
 */
const requestHandler = require('../server.js');

module.exports = (req, res) => {
  return requestHandler(req, res);
};
