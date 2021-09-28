#!/usr/bin/env node
const fetch = require('node-fetch');
const express = require('express');
const app = express();
let port = process.env.PORT || process.argv.slice(2)[0];
if (isNaN(port) || port < 0 || port > 1e5) {
	console.log('Invalid port input, using default port: 1234');
	port = 1234;
}
const server = app.listen(port);
const io = require('socket.io')(server);

app.use(express.static(__dirname));

io.on('connection', socket => {
	socket.on('hello', ()=> socket.emit('hi', Date.now()));
})

fetch('https://api.ipify.org/?format=json').then(result => result.json().then(json => {
	console.log(`Your public site is: ${json.ip}:${port}\nMake sure your port ${port} is open :)`)
}))
