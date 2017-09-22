var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (req, res) {
    var q = req.query.q;

    var md5Value = utility.md5(q);

    res.send(md5Value);

    // var sha1Value = utility.sha1(q);
    //
    // res.send(sha1Value);
});

app.listen(3000, function () {
    console.log('app is at running at port 3000')
});