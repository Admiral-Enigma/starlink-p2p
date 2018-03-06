var smoke = require('smokesignal')


var node = smoke.createNode({
  port: 8495
, seeds: [{port: 8495, address:'192.168.2.100'}] // 169.254.77.182 pi //169.254.120.192 mac
})
//ifconfig | grep broadcast | arp -a

// listen on network events...

node.on('connect', function() {
  // Hey, now we have at least one peer!

  // ...and broadcast stuff -- this is an ordinary duplex stream!
  node.broadcast.write('HEYO! I\'m here')
})

node.on('disconnect', function() {
  // Bah, all peers gone.
})

// Broadcast is a stream
process.stdin.pipe(node.broadcast).pipe(process.stdout)

// Start the darn thing
node.start()

// mah, i'd rather stop it
