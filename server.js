var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var JSONTCPSOCKET = require('json-tcp-socket');
var blinkInterval = setInterval(blinkLED, 500)
var gSocket = null
var JSONTCPSOCKET = new JSONTCPSOCKET({tls: false});
var server = new JSONTCPSOCKET.Server()

server.on('connection', function (socket) {
  console.log('Client connected');
  gSocket = socket

})


function blinkLED() { //function to start blinking
  if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
    var b = {blink: true}
    if (gSocket != null){
         gSocket.write(b)
         console.log('WRITE')
    }
    LED.writeSync(1);

  // console.log(gSocket)
  } else {
    var b = {blink: false}
    if (gSocket != null){
         gSocket.write(b)
         console.log('WRITE')
    }
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
}

function endBlink() { //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport GPIO to free resources
  process.exit()
}

//setTimeout(endBlink, 5000000); 
server.listen(1337, '0.0.0.0');
console.log('Server started')
