'use strict'
//import Hapi from 'hapi'
var Hapi = require('hapi');
let server = new Hapi.Server();
let port = process.env.port || 4000;
server.connection({port,
 routes: { cors: true } });

server.route({
	method: 'GET',
	path: '/',
	handler: function(request,reply){
		reply('hello cleo');
	}
});

server.route({
	method: 'GET',
	path: '/name/{fname}',
	handler: function(request,reply){
		let name = encodeURIComponent(request.params.fname);

		reply(JSON.stringify({name}));
	}
});

server.route({
	method: 'GET',
	path: '/lastname',
	handler: function(request,reply){
		reply('result: ' + JSON.stringify(request.payload.name));
	}
});


server.start((err) => {
	if(err){
		throw err;
	}
	console.log('server running at '+ server.info.uri);
});