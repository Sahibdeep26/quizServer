var http = require('http');
var url = require('url');
var appWriteUtil = require('./utils/appWrite');
var appReadUtil = require('./utils/appRead');
var appDeleteUtil = require('./utils/appDelete');

var appEditUtil = require('./utils/appEdit');


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

http.createServer(function (req, res) {
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.write('<title>DB Service</title>');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    let reqUrl = url.parse(req.url, true);

    console.log(reqUrl.pathname);
    const path = reqUrl.pathname;
    const parts = path.split('/').slice(1);

    //create table if not exists
    appWriteUtil.createTable();

    if (parts[0] == 'question' && req.method === 'GET') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

        appReadUtil.getData().then(result => {
            res.writeHead(200, { 'Content-Type': 'Application/json' });
            res.write(result);
            res.end();
            console.log("Request complete!");
        });         
    }else if(parts[0] == 'question' && req.method === 'POST') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

        var body = ''
        req.on('data', function (data) {
            body += data;
        })
        req.on('end', function () {
            var bodyObj = JSON.parse(body);
            try {
                appWriteUtil.insertData(bodyObj.question, bodyObj.opt1, bodyObj.opt2, bodyObj.opt3, bodyObj.opt4, bodyObj.Answer);
            } catch (error) {
                console.log(error);
                res.end("FAIL");
                throw error;
            }
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end();
        })

        console.log("Request complete!")

    } else if(parts[0] == 'question' && req.method === 'PUT') {
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

        var body = ''
        req.on('data', function (data) {
            body += data;
        })
        req.on('end', function () {
            var bodyObj = JSON.parse(body);
            console.log(bodyObj)
            try {
                appEditUtil.updateData(bodyObj.questionId, bodyObj.question, bodyObj.opt1, bodyObj.opt2, bodyObj.opt3, bodyObj.opt4, bodyObj.Answer);
            } catch (error) {
                console.log(error);
                res.end("FAIL");
                throw error;
            }
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end();
        })

        console.log("Request complete!")

    } else if(parts[0] == 'question' && req.method === 'DELETE'){
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);

        var body = ''
        req.on('data', function (data) {
            body += data;
        })
        req.on('end', function () {
            var bodyObj = JSON.parse(body);
            try {
                appDeleteUtil.deleteData(bodyObj.questionID);
            } catch (error) {
                console.log(error);
                res.end("FAIL");
                throw error;
            }
            res.writeHead(200, {'Content-Type': 'application/json' });
            res.end();
        })
        console.log("Request complete!")
    }else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('POST Done');
        res.end();
    }
}).listen(port, () => {
    console.log('Server listening on port 8080')
});

