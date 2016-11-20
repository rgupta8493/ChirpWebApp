//Creating RestFul Api services 

var express = require('express');  
var router = express.Router();

router.route('/posts') //making api name as posts that has 2 res get and post
  //return all posts     
  .get(function(req,res){
  
  //temporary solution as we dont have mongodb configured yet 
  
  res.send({message: 'TODO return all posts'});
  //everything sent in response is in json format 
  })

  .post(function(req,res){
  //temporary soluiton
  res.send({message:'TODO create a new Post'});
});
module.exports = router;