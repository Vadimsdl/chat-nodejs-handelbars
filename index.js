const express = require('express');
const config = require('config');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const PORT = config.get('port') || 8080;

app.set('views engine', 'hbs');
app.use('/api/signIn', require('./routes/signin.routs'));
app.use('/registration', (req, res) => {
	res.render('layouts/registration.hbs', {password: '', username: ''});
});
app.use('/api/register', require('./routes/register.routs'));
app.use('/api/update', require('./routes/update.routs'))
app.get('/', function (req, res) {
	res.render(__dirname + '/views/index.hbs');
});
app.get("/home/cubex/projects/chat/uploads/:img", (req, res) => {
  res.sendFile(path.join(__dirname, "./uploads/"+req.params.img));
});

let people = [];

io.on('connection', function (socket) {
	
	socket.on('join', function (name){
		people.push({name, id: socket.id});
		io.emit('getUsers', people);
	});
	socket.on('disconnect', function () {
		people = people.filter(us => us.id !== socket.id);
	});
	socket.on('private message', function ({msg, sendName, myName, img}) {
		const user = people.find(us => us.name === sendName);
		
		if (!!user)
			socket.to(user.id).emit('add mess', {msg, sendName, myName, img});
	});

});

http.listen(PORT, function () {
	console.log('listening server');
});
