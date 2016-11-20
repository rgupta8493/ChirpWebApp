//Creating RestFul Api services 

var express = require('express');  
var router = express.Router();
router.use(function(req,res,next){
  if(req.method === "GET"){
   //continue to next middleware or request handler
    return next();
  }
  if(!req.isAuthenticated()){
   //user not authenticated , redirect to login page
    res.redirect('/#login');
  }
  //user authenticated continue to next middleware or handler
  return next();
});
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

router.route('/posts/:id')
    //return a particular post
      .get(function(req,res){
    res.send({message:'TODO return post with ID '+ req.params.id});
  //like get me the post of user having this id
})

 // update existing post

    .put(function(req,res){ 
  res.send({message : 'TODO modify post with ID '+ req.params.id});
})

 
 // delete existing post

    .delete(function(req,res){ 
  res.send({message : 'TODO delete post with ID '+ req.params.id});
});

    
module.exports = router; //expose the router object 


//basically gives you all the method that you might need to modify objects for instance post with id is every single point you can perform CRUD on it that what called Fully Restful api