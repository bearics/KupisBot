var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/keyboard', function(req, res) {
	const menu = {
		"type" : 'buttons',
		"buttons" : ["광운대", "운영진"]
	};

	res.set({
		'content-type' : 'application/json'
	}).send(JSON.stringify(menu));
});

app.listen(3000, function() {
	console.log("Express server has started on port 3000")
});
