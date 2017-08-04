# authorization-hmac256
Amazon style authorization using HMAC-SHA256 signing.

# installation

 $ npm install --save authorization-hmac256

# options

* service: (STRING) the name of the service, typically acronym like AWS or CWS (Classy Web Services)
* token: (STRING) unique identifier for client making call, like OAuth2 client ID
* secret: (STRING) secret value used for signing

# usage

HmacAuthorize.sign(method, path, contentType, body)

```javascript
const request = require('request');
const HmacAuthorize = require('authorization-hmac256')({
  service: 'service',
  token: 'token',
  secret: 'secret'
});

function postSomething(next) {
  let method = 'POST';
  let resource = '/sample/resource';
  let contentType = 'application/json';
  let body = {
    key: 'value'
  };
  let authorization = HmacAuthorize.sign(method, resource, contentType, JSON.stringify(body));
  request({
    url: 'http://api.acme.org',
    method,
    headers: {
      'Content-Type': contentType,
      'Authorization': authorization
    },
    body: JSON.stringify(body)
  }, next);
}
```
