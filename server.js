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
			//db.run("create table employees(employee_id INTEGER PRIMARY KEY AUTOINCREMENT, name text, time text)");
			//db.run("insert into employees values ('cleo', 'wwww')");
			db.each("select * from employees", function(err,row){
				
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
				var each_employee = {"empIdNum" : row.employee_id,
									"name" : row.name};
				
				all_employees.push(each_employee);
				},(err,rows)=>{
					// console.log(JSON.stringify(rows));	
					// console.log("w " + JSON.stringify(all_employees));
					reply(JSON.stringify(all_employees));
				});
		});
	}
});

server.route({
	method: 'GET',
	path: '/searchemployee/name/{empName}',
	handler: function(request,reply){
		db.serialize(()=>{
			var theEmployee = [];
			var employee_name = encodeURIComponent(request.params.empName);
			var searchEmpQuery = "select * from employees where name like '%"+employee_name+"%'";
			var searchedEmployee = db.each(searchEmpQuery, [] ,function(err,row){
				var searchingEmployee = {"empIdNum" : row.employee_id,
										 "name" : row.name,
										 "time" : row.time
										};
				theEmployee.push(searchingEmployee);
			},(err,rows)=>{
				reply(JSON.stringify(theEmployee));
			});	
		});
	}	
});

server.route({
	method: 'POST',
	path: '/insert',
	handler: function(request,reply){
		db.run('insert into employees(name) values (?)', [request.payload.name], function(err,row){
			var success_message = {'message' : 'inserted','success':true};
			reply(JSON.stringify(success_message));
		});
	}
});

server.route({
	method: 'POST',
	path: '/delete',
	handler: function(request, reply){
		db.run('delete from employees where employee_id=?', [request.payload.employee_id], function(err,row){
			var delete_success = {'message' : 'deleted' , 'success': true};
			//or you can output the deleted item
			reply(JSON.stringify(delete_success));
		});
		
	}
});

server.route({
	method: 'POST',
	path: '/update',
	handler: function(request, reply){
		db.run('update employees set name=? where employee_id=?', [request.payload.name, request.payload.employee_id], function(err,row){
			var update_success = {'message' : 'updated' , 'success' : true};
			reply(JSON.stringify(update_success));	
		});
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