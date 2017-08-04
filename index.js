'use strict';
const crypto = require('crypto');
let service;
let token;
let secret;

let hmacAuthorize = {
  sign: (method, path, contentType, body) => {
    let ts = Math.floor(new Date().getTime() / 1000);
    let message =
      `${method}\n${path}\n${(body ? contentType : '')}\n${ts}\n${(body ?
      crypto.createHash('md5').update(body).digest('hex') : '')}`;
    let signature =
      crypto.createHmac('sha256', secret).update(message).digest('hex');
    return `${service} ts=${ts} token=${token} signature=${signature}`;
  }
};

module.exports = function(config) {
  if (!config || !config.service || !config.token || !config.secret) {
    throw new Error('Missing service, token and/or secret.');
  }
  service = config.service;
  token = config.token;
  secret = config.secret;
  return hmacAuthorize;
};
