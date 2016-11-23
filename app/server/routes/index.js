var express = require('express');
var router = express.Router();

/* Get Home page */

router.get('/',function(req,res,next){
  res.render('index',{titile:"chirp"});
});

module.exports = router;