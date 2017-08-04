'use strict';
const HmacAuthorize = require('../index.js')({
  service: 'service',
  token: 'token',
  secret: 'secret'
});
const method = 'POST';
const path = '/sample/path';
const contentType = 'application/json';
const body = {
  key: 'value'
};
console.log(HmacAuthorize.sign(method, path,
  contentType, JSON.stringify(body)));
