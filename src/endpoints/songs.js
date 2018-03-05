dbFind = require("../core/dbFind");
dbUpdate = require("../core/dbUpdate");
dbDelete = require("../core/dbDelete");
dbCreate = require("../core/dbCreate");
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    add: function(req,res){
        dbCreate.newSong({name:req.body.name, artist:req.session.user, song:req.file.filename, mimetype:req.file.mimetype});
        res.redirect("/usersartist/" + req.session.user)
    },
    delete: function(req,res){
        var songId = ObjectId(req.params.id);
        dbDelete.delSong({'_id':songId});
        res.redirect("/usersartist/" + req.session.user)
    },
    play: async function(req,res){
        var songId = ObjectId(req.params.id);
        var song = await dbFind.findSong({'_id':songId});
        dbUpdate.updateSong({'_id':songId}, {$push:{'views':{'username':req.session.user}}});
        res.render("showSong", {session:req.session, song:song})
    }
}