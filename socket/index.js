const ws = require('ws');

const wss = new ws.Server({port: 8000}, ()=> console.log('server start'));

wss.on('connection', (ws) => {
  ws.send('подключился')
  console.log(123);
})

wss.on('connection', (ws) => {
  ws.on('message', (message) =>{
    message = JSON.parse(message);
    switch(message.event) {
      case 'message': 
        broadcastMessage(message)
      break;
      case 'connection': 
        broadcastMessage(message)
      break;
    }
  })
});

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(message);
  });
}

module.exports = {wss}