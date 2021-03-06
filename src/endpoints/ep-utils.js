var dbFind = require('../core/dbFind');
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    checkDev: function(req, res, next){
        if(!req.session.userId){
            res.redirect("/login")
        }else if(!req.session.dev){
            res.redirect("/clients/" + req.session.user)
        }else{
            next()
        }
    },
    checkClient: function(req,res, next){
        if(!req.session.userId){
            res.redirect("/login")
        }else if(req.session.dev){
            res.redirect("/devs/" + req.session.user)
        }else{
            next()
        }
    },
    checkUser: function(req,res,next){
        if(req.session.userId){
            if(req.session.dev){
                res.redirect("/devs/" + req.session.user)
            }else{
                res.redirect("/clients/" + req.session.user)
            }
        }else{
            next()
        }
    },
    notEmpty: function(redTo){
        return function(req,res,next){
            for(key in req.body){
                req.checkBody(key, key.toTitle() + ' is required').notEmpty();
            }
            var errors = req.validationErrors();
            if(errors){
                var errArr = [];
                for(var i = 0; i < errors.length; i++){
                    errArr.push(errors[i].msg)
                }
                req.session.err = errArr;
                res.redirect(redTo)
            }else{
                next()
            }
        }
    },
    checkAuth: async function(req,res,next){
        var websiteId = ObjectId(req.params.websiteId);
        var website = await dbFind.findSite({'_id':websiteId});
        if(website.author == req.session.user){
            next()
        }else{
            res.redirect("/websites/" + req.params.websiteId)
        }
    },
    checkProfile: async function(req,res, next){
        if(req.params.userName == req.session.user){
            next()
        }else{
            res.redirect(req.params.dev + '/' + req.params.userName)
        }
    }
}