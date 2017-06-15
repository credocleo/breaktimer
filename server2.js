import http from 'http';
import express from 'express';

let port = process.env.port || 4000;

var router = express.Router();

router.get('/', function(req,res){
	res.send('hello cleo');
});

http.createServer((req,res) =>{
}).listen(port);