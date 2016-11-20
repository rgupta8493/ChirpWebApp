var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');//cryptology framework
//temporary data store
var users = {}; // later we will replace it with mongodb
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    //serializeUser determines, which data of the user object should be stored in the sessio n
    passport.serializeUser(function(user, done) {
        //tell passport which id t0 use for user
        console.log('serializing user:',user.username);
        return done(null, user.username);
        //The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function. check below
    });

    passport.deserializeUser(function(username, done) {
        //return user object back
        //like you see when you go to sites that already cache in your details
        return done(null, users[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
           //check if user exist
           if(!users[username]){
              return done('user not found',false);
            }  
         //check if password is valid
            if(!isValidPassword(users[username],password)){
              return done('Invalid Password',false); 
            }
          // Successfully signed in 
           console.log("Sucessfully signed in");
          
      
            return done(null, users[username]);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            //passport automatically parses username password info froma 
      //form body when yo do rest request
      // check if user already exist
       if(users[username]){
         return done('username alrady taken', false);
       }
      //add user to db
        users[username]={
          username: username,
          password: createHash(password)
          
        }
            return done(null, users[username]);

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};