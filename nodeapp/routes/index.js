var express = require('express');
var router = express.Router();

var bluemix = require('../config/bluemix');
var extend = require('util')._extend;
var watson = require('watson-developer-cloud');

/**
*/

var credentials = extend({
	version : 'v1',
    "url": "https://gateway.watsonplatform.net/natural-language-classifier/api",
    "username": "a2930248-5ebc-4a94-9460-1da3cbd45fc3",
    "password": "fVcF3nsB6dBC"
}, bluemix.getServiceCreds('natural_language_classifier')); 

var nlClassifier = watson.natural_language_classifier(credentials);
var classifierId = '2d7ae7x101-nlc-9334';

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
