var Song = require("../models/songs");
var User = require("../models/users");
var Artist = require("../models/artists");
var updateSong = function(data, update, conditions, callback){
    Song.update(data, update, conditions, function(err,changed){
        console.log(err)
        console.log(changed)
        if(callback){
            callback(err,changed)
        }
    })    
}
var updateUser = function(data, update, conditions, callback){
    User.update(data, update, conditions, function(err,changed){
        if(callback){
            callback(err,changed)
        }
    })
}
var updateArtist = function(data, update, conditions, callback){
    Artist.update(data, update, conditions, function(err,changed){
        console.log(err)
        console.log(changed)
        if(callback){
            callback(err,changed)
        }
    })
}
module.exports = {
    updateUser: updateUser,
    updateSong: updateSong,
    updateArtist: updateArtist
}