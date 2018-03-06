const express = require('express')
const bodyParser = require('body-parser')
var RpiLeds = require('rpi-leds');
var leds = new RpiLeds();

let app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/led/on', function (req,res) {
  leds.power.turnOn();
  leds.status.turnOn();
})

app.get('/led/off', function (req,res) {
  leds.power.turnOff();
  leds.status.turnOff();
})
app.listen(PORT, () => {
  console.log('Server running on port: '+PORT);
})
