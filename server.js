var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var package = require('./package.json');

var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var url = process.env.LEDGER_BACKEND_URL || 'http://localhost:3000';
var version = package.version;

var server = express();
server.use(morgan('combined'));

server.get('/', function (request, response) {
  fs.readFile(
    'static/index.html',
    { encoding: 'utf-8' },
    function (error, data) {
      if (error) {
        console.error(error);
        response.status(500).send();
      } else {
        response.send(data
          .replace('LEDGER_BACKEND_URL_PLACEHOLDER', url)
          .replace('LEDGER_FRONTEND_VERSION_PLACEHOLDER', version));
      }
    }
  );
});

server.use(express.static('static'));
server.use('/fonts', express.static('bower_components/bootstrap/fonts'));

server.listen(port, host, function () {
  console.info(host + ':' + port);
});
