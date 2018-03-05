dbFind = require("../core/dbFind");
dbUpdate = require("../core/dbUpdate");
dbDelete = require("../core/dbDelete");
dbCreate = require("../core/dbCreate");
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    home: async function(req,res){
        if(req.params.artist == "artist"){
            var user = await dbFind.findArtist({'username':req.params.username}, {'username': true, 'gravatar':true, 'bio': true});
            var songs = await dbFind.searchSongs({'artist':req.params.username});
            res.render("artist", {session:req.session, user:user, songs:songs})
        }else{
            var user = await dbFind.findUser({'username':req.params.username}, {'username': true, 'gravatar':true, 'bio': true});
            var songs = await dbFind.searchSongs({'views.username':req.params.username});
            res.render("user", {session:req.session, user:user, songs:songs})
        }
    },
    renderLogin: function(req,res){
        res.render("login", {session:req.session})
    },
    renderSignup: function(req,res){
        res.render("signup", {session:req.session})
    },
    signup: function(req,res){
        if(req.body.type == "artist"){
            dbCreate.newArtist({username:req.body.username.trim(), password:req.body.password.trim(), gravatar:req.file.filename}, function(err, saved){
                if(err){
                    req.session.err = ["Please use a unique username"];
                    res.redirect("/signup")
                }else{
                    req.session.user = req.body.username;
                    req.session.userId = user._id;
                    req.session.artist = true;
                    req.session.gravatar = user.gravatar;
                    res.redirect("/usersartist/" + req.session.user)
                }
            })
        }else{
            dbCreate.newUser({username:req.body.username.trim(), password:req.body.password.trim(), gravatar:req.file.filename}, function(err, saved){
                if(err){
                    req.session.err = ["Please use a unique username"];
                    res.redirect("/signup")
                }else{
                    req.session.user = req.body.username;
                    req.session.userId = user._id;
                    req.session.artist = false;
                    req.session.gravatar = user.gravatar;
                    res.redirect("/usersuser/" + req.session.user)                    
                }
            })
        }
    },
    login: async function(req,res){
        if(req.body.type == "artist"){
            var user = await dbFind.findArtist({'username':req.body.username.trim(), 'password':req.body.password.trim()});
            if(user){
                    req.session.user = req.body.username;
                    req.session.userId = user._id;
                    req.session.artist = true;
                    req.session.gravatar = user.gravatar;
                    res.redirect("/usersartist/" + req.session.user) 
            }else{
                req.session.err = ["Incorrect credentials"];
                res.redirect("/login")
            }
        }else{
            var user = await dbFind.findUser({'username':req.body.username.trim(), 'password':req.body.password.trim()});
            if(user){
                req.session.user = req.body.username;
                req.session.userId = user._id;
                req.session.artist = false;
                req.session.gravatar = user.gravatar;
                res.redirect("/usersuser/" + req.session.user) 
            }else{
                req.session.err = ["Incorrect credentials"];
                res.redirect("/login")
            }
        }
    },
    logout: function(req,res){
        req.session.destroy();
        res.redirect("/login")
    }
}