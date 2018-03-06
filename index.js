var smoke = require('smokesignal')
var remoteevents = require('remote-events')

var node = smoke.createNode({
  port: 8495,
  address: smoke.localIp('192.168.43.1/255.255.255.0')
, seeds: [{port: 8495, address:'192.168.43.235'}] // 192.168.43.235 pi //192.168.43.36 mac
})
//ifconfig | grep broadcast | arp -a

// listen on network events...
console.log('Port', node.options.port)
console.log('IP', node.options.address)
console.log('ID', node.id)

node.on('connect', function() {
  // Hey, now we have at least one peer!
  var ree = new remoteevents()
  node.broadcast.pipe(ree.getStream()).pipe(node.broadcast)
  ree.on('fisk', function () {
    console.log('GOT FISK');
  })
  
  node.broadcast.write('HEYO')
})

node.on('disconnect', function() {
  // Bah, all peers gone.
})

// Broadcast is a stream
node.broadcast.pipe(process.stdout)

// Start the darn thing
node.start()

// mah, i'd rather stop it
