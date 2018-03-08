var JSONTCPSOCKET = require('json-tcp-socket');

var JSONTCPSOCKET = new JSONTCPSOCKET({tls: false});
var socket = new JSONTCPSOCKET.Socket();

socket.on('connect', function () {
  console.log('Connected');
  socket.on('data', function (data) {
    if (data.blink) {
      console.log('BLINK');
    }
  })
})
socket.connect(1337, '192.168.123.88');
