#!/usr/bin/env node
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = process.argv.slice(2)[0];
if (isNaN(port) || port < 0 || port > 1e5) 
	return console.log('Invalid port input!');
const server = app.listen(port || 1234);
const io = require('socket.io')(server);

app.use(express.static(__dirname));

io.on('connection', socket => {
	socket.on('hello', ()=> socket.emit('hi', Date.now()));
})

fetch('https://api.ipify.org/?format=json').then(result => result.json().then(json => {
	console.log(`Your public site is: ${json.ip}:${port}`)
}))