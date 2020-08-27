/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-Node-js-Server
 *
 * @format
 * @flow
 */

const http = require('http');
const server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  const message = 'It works!\n',
    version = 'NodeJS ' + process.versions.node + '\n',
    response = [message, version].join('\n');
  res.end(response);
});
