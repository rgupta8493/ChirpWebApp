var mongoose = require('mongoose');

//create a schema here

var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});


//one more posts schema model 

var postSchema = new mongoose.Schema({
  text : String,
  username : String,
  created_at :{type: Date, default: Date.now}
});


//declare a model called User which has schema userSchema
mongoose.model("User",userSchema);
//declare a model called Post which has schema postSchema
mongoose.model("Post",postSchema)