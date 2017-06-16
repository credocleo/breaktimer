'use strict'
//import Promise from 'bluebird';
var sqlite3 = require('sqlite3').verbose();
var promise = require('promise');

let db = new sqlite3.Database('breaktime_db');

//import Hapi from 'hapi'
var Hapi = require('hapi');
let server = new Hapi.Server();
let port = process.env.port || 4000;
server.connection({port,
 routes: { cors: true } });

server.route({
	method: 'GET',
	path: '/db',
	handler: function(request, reply){
		db.serialize(()=>{
			//db.run("create table employees(name text, time text)");
			//db.run("insert into employees values ('cleo', 'wwww')");
			db.each("select * from employees", function(err,row){
				console.log("name : " + row.name + " time : " +  row.time);
			});		
		});
	}
});

server.route({
	method: 'GET',
	path: '/employees',
	handler: function(request, reply){
		db.serialize(()=>{
				var all_employees = [];
				var emplo = db.each("select * from employees", function(err, row){
				var each_employee = {"name" : row.name};
				//console.log(each_employee);
				all_employees.push(each_employee);
				},(err,rows)=>{
					console.log('completion')
					console.log(JSON.stringify(rows));	
					console.log("w " + JSON.stringify(all_employees));
					reply(JSON.stringify(all_employees));
				});
				console.log('emp testing')
			
			//console.log("each_db:" + " " + JSON.stringify(each_db));
			//db.finalize();
		});
	}
});

server.route({
	method: 'POST',
	path: '/insert',
	handler: function(request,reply){
		db.run('insert into employees(name) values (?)', [request.payload.name], function(err,row){
			var success_message = {'message' : 'inserted'};
			reply(JSON.stringify(success_message));
		});
		// var recievedData = {'name' : request.payload.name};
		// reply(JSON.stringify(recievedData));
	}
});

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