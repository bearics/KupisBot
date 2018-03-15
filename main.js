var express = require('express');
var app = express();

var Buffer = require('buffer').Buffer;
var request = require('request');
var cheerio = require('cheerio');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/keyboard', function(req, res) {
	const menu = {
		"type" : 'buttons',
		"buttons" : ["2014726001", "2014726058"]
	};

	res.set({
		'content-type' : 'application/json'
	}).send(JSON.stringify(menu));
});

app.post('/message', function(req, res) {
	const _obj = {
		user_key: req.body.user_key,
		type: req.body.type,
		content: req.body.content
	};

	console.log(_obj.content);
	msg = _obj.content;

	// if message is number
	hakbun = msg;

	var base64 = Buffer.from('0'+msg).toString('base64');
	var url = "http://mobileid.kw.ac.kr/mobile/MA/xml_userInfo.php?real_id=#&new_check=Y";
	url = url.replace("#", base64);
	console.log(url);
	request(url, function(error, response, html) {
		if(error) throw error;
		console.log(html);

		var qr = html.split("qr_code")[1].substr(10, 37).replace("    ","++++");
		console.log("a : " + qr );

		qrUrl = "http://asciiqr.com/index.php?i=&t=" + qr;
		console.log(qrUrl);
		request(qrUrl, function(error, response, body) {
			if(error) throw error;
			//	console.log(body);
			$ = cheerio.load(body);
	
			sendqr = $('#QRImage>img').attr("src");
			console.log(sendqr);
		        let send = {
	                "message" : {
		                        "text" : "남용하지마세요",
					"photo": {
						"url": sendqr,
						"width":400,
						"height":400
					},
		        }
		        }
     			      res.set({
			     'content-type' : 'application/json'
		        }).send(JSON.stringify(send));

		});
	});
});

app.listen(3000, function() {
	console.log("Express server has started on port 3000")
});
