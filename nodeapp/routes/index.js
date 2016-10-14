var express = require('express');
var router = express.Router();

var bluemix = require('../config/bluemix');
var extend = require('util')._extend;
var watson = require('watson-developer-cloud');

var credentials = extend({
	version : 'v1',
    "url": "https://gateway.watsonplatform.net/natural-language-classifier/api",
    "username": "<username>",
    "password": "<password>"
}, bluemix.getServiceCreds('natural_language_classifier')); 

var nlClassifier = watson.natural_language_classifier(credentials);
var classifierId = '<classifier-id>';

router.post('/predict', function(req, res, next) {
	var params = {
		classifier : classifierId,
		text : req.body.text
	};

	nlClassifier.classify(params, function(err, results) {
		if (err)
			return next(err);
		else
			res.json(results);
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
