var JSONTCPSOCKET = require('json-tcp-socket');
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');

var JSONTCPSOCKET = new JSONTCPSOCKET({tls: false});
var socket = new JSONTCPSOCKET.Socket();

socket.on('connect', function () {
  console.log('Connected');
  socket.on('data', function (data) {
    if (data.blink) {
      blinkLED()
    } else if (!data.blink) {
      blinkLED()
    }
  })
})
function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1);
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}
socket.connect(1337, '192.168.123.88');
