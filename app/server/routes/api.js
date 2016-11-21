//Creating RestFul Api services 
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
//Used for routes that must be authenticated.
function isAuthenticated(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	//allow all get request methods
	if (req.method === "GET") {
		return next();
	}
	if (req.isAuthenticated()) {
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};
//Register the authentication middleware
router.use('/posts', isAuthenticated);
router.route('/posts') //making api name as posts that has 2 res get and post
	//creates a new post 
	.post(function (req, res) {
		var post = new Post();
		post.text = req.body.text;
		post.username = req.body.created_by;
		post.save(function (err, post) {
			if (err) {
				return res.send(500, err);
			}
			return res.json(post);
		});
	})
	//return all posts  
	.get(function (req, res) {
		Post.find(function (err, data) {
			if (err) {
				return res.send(500, err);
			}
			return res.send(200, data);
		});
	});
router.route('/posts/:id')
	// update existing post
	.put(function (req, res) {
		Post.findById(req.params.id, function (err, post) {
			if (err) res.send(err);
			post.username = req.body.created_by;
			post.text = req.body.text;
			post.save(function (err, post) {
				if (err) res.send(err);
				res.json(post);
			});
		});
	})
	//return a particular post
	.get(function (req, res) {
		Post.findById(req.params.id, function (err, post) {
			if (err) res.send(err);
			res.json(post);
		});
	})
	// delete existing post
	.delete(function (req, res) {
		Post.remove({
			_id: req.params.id
		}, function (err) {
			if (err) res.send(err);
			res.json("deleted :(");
		});
	});
module.exports = router; //expose the router object 
//basically gives you all the method that you might need to modify objects for instance post with id is every single point you can perform CRUD on it that what called Fully Restful api