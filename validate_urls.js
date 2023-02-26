const validator = require('validator');

let options = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_protocol_relative_urls: true,
};

function isValidUrl(url) {
  return validator.isURL(url, options)
}

module.exports = {
  isValidUrl
}
