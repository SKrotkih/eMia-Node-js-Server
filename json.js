/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-Node-js-Server
 *
 * @format
 * @flow
 */

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(`{"message": "This is a JSON response"}`);
};
