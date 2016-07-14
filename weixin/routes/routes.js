var path = require('path');
var signature = require('../signature');
var config = require('../config')();


var createSignature = signature.getSignature(config);

module.exports = function(app) {
    app.post('/getsignature', getSignature);
    app.get('/test', fun);
};

function fun(req, res) {
    var u = req.protocol + "://" + req.get('Host') + req.url;
    createSignature(u, function(error, result) {
        console.log(result);
        res.render('../public/test.html', result);
    });
}

function getSignature(req, res) {
    var url = req.body.url;
    console.log(url);
    createSignature(url, function(error, result) {
        if (error) {
            res.json({
                'error': error
            });
        } else {
            res.json(result);
        }
    });
}
