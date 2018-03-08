var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var JSONTCPSOCKET = require('json-tcp-socket');
var blinkInterval = null
var JSONTCPSOCKET = new JSONTCPSOCKET({tls: false});
var server = new JSONTCPSOCKET.Server()

server.on('connection', function (socket) {
  console.log('Client connected');
  blinkInterval = setInterval(function () {
    blinkLED(socket)
  }, 1000)

})


function blinkLED(socket) { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    LED.writeSync(1);
    var b = {blink: true}
    socket.write(b)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
}

setTimeout(endBlink, 5000); //stop blinking after 5 seconds
server.listen(1337, '0.0.0.0');
